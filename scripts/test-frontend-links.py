"""Regressões do gate sobre arquivos temporários, sem rede."""
import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("frontend_gate", Path(__file__).with_name("check-frontend-links.py"))
gate = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = gate
spec.loader.exec_module(gate)

class FrontendAssetsTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.write("index.html", '<html><head><link rel="stylesheet" href="/assets/main.css"></head><body><main><h1>Portal</h1></main></body></html>')
        self.write("assets/main.css", "")

    def write(self, name, content):
        target = self.root / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")

    def test_font_missing_blocks_release(self):
        self.write("assets/main.css", '@font-face {src: url("../fonts/ausente.woff2")}')
        self.assertEqual(gate.audit(self.root).failures["Recurso CSS ausente"], 1)

    def test_relative_font_and_quoted_import_are_resolved(self):
        self.write("assets/main.css", '@import "./theme.css"; @font-face {src:url(../fonts/inter.woff2?v=1)}')
        self.write("assets/theme.css", 'body { background: url("../images/papel%20claro.svg") }')
        self.write("fonts/inter.woff2", "fixture")
        self.write("images/papel claro.svg", "<svg/>")
        result = gate.audit(self.root)
        self.assertFalse(result.failures)
        self.assertEqual(result.stylesheets, 2)
        self.assertEqual(result.resources, 4)

    def test_external_data_fragment_and_comment_are_not_missing_files(self):
        self.write("assets/main.css", '/* url(missing.png) */ .a {background:url(data:image/svg+xml;base64,AAAA);filter:url(#f)} @import "https://example.org/remote.css";')
        self.assertFalse(gate.audit(self.root).failures)

    def test_removed_import_is_not_hidden_by_cache(self):
        self.write("assets/main.css", '@import url("theme.css");')
        self.write("assets/theme.css", "body{}")
        self.assertFalse(gate.audit(self.root).failures)
        (self.root / "assets/theme.css").unlink()
        self.assertEqual(gate.audit(self.root).failures["Recurso CSS ausente"], 1)

    def test_escaped_path_cannot_leave_build(self):
        self.write("assets/main.css", 'body{background:url(/%2e%2e/secret.svg)}')
        self.assertEqual(gate.audit(self.root).failures["Recurso CSS ausente"], 1)

    def test_html_link_and_anchor_regression_still_blocks(self):
        self.write("index.html", '<main><h1>Portal</h1><a href="/missing/">Destino</a><a href="#missing">Seção</a></main>')
        result = gate.audit(self.root)
        self.assertEqual(result.failures["Link ausente"], 1)
        self.assertEqual(result.failures["Âncora ausente"], 1)

if __name__ == "__main__":
    unittest.main()
