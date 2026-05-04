# Nuum Robotics — Landing Page

Static HTML/CSS/JS landing page. No build step. Open `index.html` in a browser to preview.

## Local preview

```bash
cd nuum-robotics
python3 -m http.server 8080
# then open http://localhost:8080
```

## Free hosting + custom domain

All of these are free and let you connect the domain you bought.

### Cloudflare Pages (recommended — fastest, free SSL, free custom domain)
1. Push this folder to a GitHub repo.
2. Go to https://dash.cloudflare.com → Pages → Create project → Connect to GitHub.
3. Build command: *(leave blank)*. Output directory: `/`.
4. After deploy, go to **Custom domains** → add your domain.
5. Cloudflare will give you DNS records to point at — add them at your registrar (or move DNS to Cloudflare for one-click setup).

### Netlify
1. Drag the `nuum-robotics` folder onto https://app.netlify.com/drop.
2. Site settings → Domain management → Add custom domain → follow DNS instructions.

### Vercel
1. `npx vercel` from inside this folder, or import the GitHub repo at https://vercel.com/new.
2. Project Settings → Domains → add your domain.

### GitHub Pages
1. Push to a repo, e.g. `nuum-robotics`.
2. Settings → Pages → Source: `main` branch, root.
3. Add a `CNAME` file with your domain, then point an A/CNAME record at GitHub's IPs.

## Customize

- **Copy/headlines:** edit `index.html`.
- **Colors / type:** CSS variables at the top of `styles.css` (`--bg`, `--fg`, `--accent`, fonts).
- **Stats in hero:** the three numbers live in the `.hero-meta` block.
- **Email:** replace `hello@nuumrobotics.com` in the contact section.
