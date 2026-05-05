# G17 — Domínio e HTTPS (passos manuais)

O ficheiro `CNAME` na raiz do repositório define o hostname alvo para **GitHub Pages**.

## O que tens de fazer no GitHub

1. **Settings → Pages → Custom domain**: introduzir `kangalearner.com.au` e guardar.
2. Ativar **Enforce HTTPS** após o certificado ficar válido.
3. **DNS** no teu registador:
   - Apex (`kangalearner.com.au`): registos `A` para os IPs do GitHub Pages (ver [documentação](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)), ou `ALIAS`/`ANAME` conforme o provedor.
   - Opcional `www`: `CNAME` para `<user>.github.io` ou redirect para apex no próprio DNS/CDN.

## TODO (operacional)

- Verificar `www` → apex redirect conforme a tua política de marca.
- Adicionar propriedade no **Google Search Console** e submeter `sitemap.xml` após o domínio estar live.
