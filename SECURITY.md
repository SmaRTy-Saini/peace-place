# Security Policy

Report website or software security concerns privately to `contact@smartysaini.com`.

Do not publish exploit details, credentials, personal information, protected health information, or confidential client data in a public GitHub issue.

The public disclosure endpoint is `https://smartysaini.com/.well-known/security.txt`.

## GitHub Pages deployment safeguards

- Enforce HTTPS in repository **Settings → Pages**.
- Verify `smartysaini.com` in GitHub Pages domain verification settings.
- Do not use wildcard DNS records for the Pages domain.
- Never commit secrets or regulated data; Git history is public/persistent unless explicitly rewritten.
- The website contact form is not approved for PHI, passwords, API keys, or other sensitive credentials.
