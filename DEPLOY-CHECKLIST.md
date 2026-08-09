# Final deployment checklist

1. Back up the current repository or create a rollback branch.
2. Upload the **contents** of this folder to the repository root.
3. Confirm `index.html`, `CNAME`, `.nojekyll`, `.well-known/`, and `assets/` are at root.
4. GitHub Settings → Pages → deploy from `main` / `(root)`.
5. Confirm custom domain is `smartysaini.com`.
6. Turn on **Enforce HTTPS**.
7. Verify the custom domain in GitHub to reduce takeover risk.
8. Confirm DNS has no unnecessary wildcard record for this domain.
9. Open `/work.html` and test every portfolio filter.
10. Open `/verify.html?id=SSC-INT-26-MFJMY7` and confirm a valid credential result.
11. Submit one non-sensitive test contact form and confirm the FormSubmit destination is activated.
12. Open `/sitemap.xml`, `/robots.txt`, and `/.well-known/security.txt`.
13. Submit the sitemap in Google Search Console.
