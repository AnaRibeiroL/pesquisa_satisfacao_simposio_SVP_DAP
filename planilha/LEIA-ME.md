# Planilha central das pesquisas

- `Pesquisas_Simposio_SVP_DAP_2026.xlsx`: planilha modelo, com todas as colunas da pesquisa. Também recebe o CSV exportado pelo painel de resultados.
- `apps-script.gs`: faz o formulário publicado gravar cada resposta, automaticamente, numa planilha do Google.

## Ligar o formulário à planilha (uma vez)

1. No Google Drive, importe o `.xlsx` como Planilha Google (ou crie uma planilha em branco).
2. Na planilha: **Extensões > Apps Script**, cole o conteúdo de `apps-script.gs` e salve.
3. **Implantar > Nova implantação > Aplicativo da Web**: executar como *Eu*; acesso *Qualquer pessoa*. Copie a URL gerada.
4. No GitHub: **Settings > Secrets and variables > Actions > Variables**, crie `VITE_SHEETS_URL` com essa URL.
5. Rode de novo o workflow **Publicar no GitHub Pages** (aba Actions).

Para testar localmente, crie um `.env` com `VITE_SHEETS_URL=<url>`.
