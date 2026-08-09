# SmaRTy Saini website — GitHub Pages

Production static site for `smartysaini.com`.

## Deploy

Upload the **contents of this folder** to the GitHub Pages publishing root. `index.html`, `CNAME`, `.nojekyll`, `.well-known/`, and `assets/` should all sit at the repository root.

## GitHub Pages settings

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/(root)`
- Custom domain: `smartysaini.com`
- Turn on **Enforce HTTPS** after the certificate is provisioned.
- Verify the custom domain in GitHub account/organization Pages settings.
- Avoid wildcard DNS records for the Pages domain.

## Security model

- Static site: no server-side secrets belong in this repository.
- No PHI, client credentials, API keys, private certificates, tokens, or private client records may be committed.
- Contact submissions use an external form relay and are explicitly not a PHI channel.
- Credential verification stores only SHA-256 fingerprints of public certificate references; holder PII is not in the public source.
- Executable JavaScript is served from local static assets; inline event handlers are not used.
- Pages include a defense-in-depth meta Content Security Policy. Stronger HTTP response-header controls require a reverse proxy/CDN you control.

## SEO after deploy

1. Submit `https://smartysaini.com/sitemap.xml` in Google Search Console.
2. Request indexing for the homepage and priority service pages.
3. Keep case studies public-safe and anonymized.
