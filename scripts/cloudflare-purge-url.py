#!/usr/bin/env python3
"""Purga uma URL validada com secrets recebidos pelo ambiente, sem shell.

API: https://developers.cloudflare.com/api/resources/cache/methods/purge/
"""
from __future__ import annotations

import http.client
import json
import os
import re
import sys
import unicodedata
from urllib.parse import unquote, urlsplit

DOMAIN = "posgraduacaopsicologia.com"
API_HOST = "api.cloudflare.com"


def validate_url(value: str) -> str:
    if not isinstance(value, str) or not value or len(value) > 4096:
        raise ValueError("Informe uma única URL HTTPS válida, com até 4096 caracteres.")
    if any(char.isspace() or unicodedata.category(char).startswith("C") for char in value):
        raise ValueError("A URL não pode conter espaços ou caracteres de controle.")
    if "\\" in value or "#" in value:
        raise ValueError("A URL não pode conter barras invertidas ou fragmento.")
    if re.search(r"%(?![0-9a-fA-F]{2})", value):
        raise ValueError("A URL contém escape percentual inválido.")
    decoded = unquote(value)
    if any(unicodedata.category(char).startswith("C") for char in decoded):
        raise ValueError("A URL não pode conter controles codificados.")
    try:
        parts = urlsplit(value)
    except ValueError:
        raise ValueError("A URL não pôde ser interpretada.") from None
    # Comparar a autoridade inteira também impede usuário/senha, porta e aliases.
    if parts.scheme != "https" or parts.netloc != DOMAIN:
        raise ValueError("A URL deve usar HTTPS e o domínio exato posgraduacaopsicologia.com, sem credenciais ou porta.")
    if parts.path and not parts.path.startswith("/"):
        raise ValueError("O caminho da URL é inválido.")
    return value


def purge_one_url(value: str, token: str, zone_id: str, *, connection_factory=None) -> None:
    url = validate_url(value)
    if not re.fullmatch(r"[0-9a-fA-F]{32}", zone_id or ""):
        raise ValueError("CLOUDFLARE_ZONE_ID ausente ou inválido.")
    if not token or any(char.isspace() or unicodedata.category(char).startswith("C") for char in token):
        raise ValueError("CLOUDFLARE_API_TOKEN ausente ou inválido.")
    body = json.dumps({"files": [url]}, ensure_ascii=True).encode("utf-8")
    factory = connection_factory or http.client.HTTPSConnection
    connection = factory(API_HOST, timeout=30)
    try:
        # HTTPSConnection não segue redirects, preservando o token no host fixo.
        connection.request(
            "POST", f"/client/v4/zones/{zone_id}/purge_cache", body=body,
            headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"},
        )
        response = connection.getresponse()
        if not 200 <= response.status < 300:
            raise RuntimeError(f"Cloudflare retornou HTTP {response.status}; a purga não foi confirmada.")
        raw = response.read(1024 * 1024 + 1)
        if len(raw) > 1024 * 1024:
            raise RuntimeError("A resposta Cloudflare excedeu o limite esperado.")
        try:
            payload = json.loads(raw)
        except (ValueError, UnicodeError):
            raise RuntimeError("A resposta Cloudflare não contém JSON válido.") from None
        if not isinstance(payload, dict) or payload.get("success") is not True:
            raise RuntimeError("Cloudflare não confirmou success=true; a purga não foi confirmada.")
    finally:
        connection.close()


def main() -> int:
    try:
        purge_one_url(os.environ.get("PURGE_URL", ""), os.environ.get("CLOUDFLARE_API_TOKEN", ""), os.environ.get("CLOUDFLARE_ZONE_ID", ""))
    except (ValueError, RuntimeError) as error:
        print(f"Falha na purga restrita: {error}", file=sys.stderr)
        return 1
    except (OSError, http.client.HTTPException):
        print("Falha de conexão com Cloudflare; a purga não foi confirmada.", file=sys.stderr)
        return 1
    print("Purga restrita concluída: uma URL do domínio autorizado.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
