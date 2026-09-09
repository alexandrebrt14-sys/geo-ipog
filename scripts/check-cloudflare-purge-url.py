#!/usr/bin/env python3
"""Testes da validação e requisição reais, sem rede ou credenciais reais."""
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("purge", Path(__file__).with_name("cloudflare-purge-url.py"))
purge = importlib.util.module_from_spec(spec)
spec.loader.exec_module(purge)
BASE = "https://posgraduacaopsicologia.com"
TOKEN = "token-ficticio-nao-e-credencial"
ZONE = "a" * 32


class FakeResponse:
    def __init__(self, status=200, body=b'{"success":true}'):
        self.status, self.body = status, body

    def read(self, limit):
        return self.body[:limit]


class FakeConnection:
    def __init__(self, response=None):
        self.response = response or FakeResponse()
        self.calls, self.closed = [], False

    def request(self, *args, **kwargs):
        self.calls.append((args, kwargs))

    def getresponse(self):
        return self.response

    def close(self):
        self.closed = True


class PurgeTests(unittest.TestCase):
    def test_urls_validas_preservam_caminho_e_query(self):
        for value in [BASE, BASE + "/", BASE + "/ipog/marca/logo-ipog-branca.svg", BASE + "/arquivo%20com%20espaco.svg?v=2026&tema=claro", BASE + '/recurso?q="texto"&literal=$(sem-shell)']:
            with self.subTest(value=value):
                self.assertEqual(purge.validate_url(value), value)

    def test_urls_invalidas_rejeitadas_antes_da_rede(self):
        invalid = ["", "http://posgraduacaopsicologia.com/a", "//posgraduacaopsicologia.com/a", "/arquivo.svg", "https://example.com/a", "https://www.posgraduacaopsicologia.com/a", "https://posgraduacaopsicologia.com.evil.test/a", "https://posgraduacaopsicologia.com./a", "https://posgraduacaopsicologia.com:443/a", "https://posgraduacaopsicologia.com:/a", "https://u@posgraduacaopsicologia.com/a", "https://u:p@posgraduacaopsicologia.com/a", "https://posgraduacaopsicologia.com@evil.test/a", BASE + "/a#x", BASE + "/a#", BASE + "/a\n", "\t" + BASE, BASE + "/a b", BASE + "/a\x00", BASE + "/a\x7f", BASE + "/a\u0085", BASE + "/a%0a", BASE + "/a%0D", BASE + "/a%00", BASE + "/a%7f", BASE + "/a%GG", BASE + "/a%", BASE + "\\@evil.test/a", "https://posgraduacaopsicologia.com%2eevil.test/a", BASE + "/" + "a" * 4096]
        for value in invalid:
            with self.subTest(value=repr(value)):
                called = []
                with self.assertRaises(ValueError):
                    purge.purge_one_url(value, TOKEN, ZONE, connection_factory=lambda *a, **k: called.append(a))
                self.assertEqual(called, [])

    def test_json_contem_uma_url_sem_interpretacao_de_shell(self):
        value = BASE + '/a?q="texto"&literal=$(sem-shell)'
        connection = FakeConnection()
        factory_calls = []
        def factory(*args, **kwargs):
            factory_calls.append((args, kwargs))
            return connection
        purge.purge_one_url(value, TOKEN, ZONE, connection_factory=factory)
        self.assertEqual(factory_calls, [(("api.cloudflare.com",), {"timeout": 30})])
        args, kwargs = connection.calls[0]
        self.assertEqual(args, ("POST", "/client/v4/zones/" + ZONE + "/purge_cache"))
        self.assertEqual(json.loads(kwargs["body"]), {"files": [value]})
        self.assertEqual(kwargs["headers"]["Authorization"], "Bearer " + TOKEN)
        self.assertNotIn("purge_everything", json.loads(kwargs["body"]))
        self.assertTrue(connection.closed)

    def test_zona_e_token_invalidos_nao_abrem_conexao(self):
        for token, zone in [("", ZONE), (TOKEN + "\n", ZONE), (TOKEN, ""), (TOKEN, "../../outra-zona"), (TOKEN, "g" * 32)]:
            with self.subTest(token_empty=not token, zone=zone):
                with self.assertRaises(ValueError):
                    purge.purge_one_url(BASE, token, zone, connection_factory=lambda *a, **k: self.fail("Não deve abrir conexão"))

    def test_success_precisa_ser_booleano_true(self):
        for body in [b'{"success":false}', b'{"success":1}', b'{"success":"true"}', b'{}', b'[]', b'null', b'nao-json']:
            with self.subTest(body=body):
                connection = FakeConnection(FakeResponse(body=body))
                with self.assertRaises(RuntimeError):
                    purge.purge_one_url(BASE, TOKEN, ZONE, connection_factory=lambda *a, **k: connection)
                self.assertTrue(connection.closed)

    def test_http_erro_redirect_e_resposta_excessiva_falham(self):
        for response in [FakeResponse(status=302), FakeResponse(status=403), FakeResponse(status=500), FakeResponse(body=b'x' * (1024 * 1024 + 1))]:
            connection = FakeConnection(response)
            with self.assertRaises(RuntimeError):
                purge.purge_one_url(BASE, TOKEN, ZONE, connection_factory=lambda *a, **k: connection)
            self.assertEqual(len(connection.calls), 1)
            self.assertTrue(connection.closed)

    def test_main_le_ambiente_e_nao_expoe_segredos(self):
        output, errors = io.StringIO(), io.StringIO()
        with patch.dict(purge.os.environ, {"PURGE_URL": BASE + "/ipog/marca/logo-ipog-branca.svg", "CLOUDFLARE_API_TOKEN": TOKEN, "CLOUDFLARE_ZONE_ID": ZONE}), patch.object(purge.http.client, "HTTPSConnection", return_value=FakeConnection()), contextlib.redirect_stdout(output), contextlib.redirect_stderr(errors):
            self.assertEqual(purge.main(), 0)
        self.assertNotIn(TOKEN, output.getvalue() + errors.getvalue())
        self.assertNotIn(ZONE, output.getvalue() + errors.getvalue())
        with patch.dict(purge.os.environ, {"PURGE_URL": "https://example.com"}), contextlib.redirect_stderr(errors):
            self.assertEqual(purge.main(), 1)
        self.assertNotIn(TOKEN, errors.getvalue())


if __name__ == "__main__":
    unittest.main(verbosity=2)
