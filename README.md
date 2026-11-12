# MENTEN — Slides & Sandals

My MENTEN sandal shop website, built with HTML, CSS and JavaScript. Customers can choose a slide and EU size, add it to an inquiry bag, and send an email to ask about an order. No payments are collected on this website.

## Project folder

```text
menten-website-github/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── images/
│   └── product-*.jpg
├── .gitignore
├── .nojekyll
├── index.html
├── style.css
├── script.js
├── favicon.svg
└── README.md
```

## Open it in VS Code

Open this folder with **File > Open Folder**, then use the **Live Server** extension on `index.html`, or open `index.html` in a browser.

## Create my GitHub repository

1. Sign in to https://github.com/new
2. Repository name: **menten-website**
3. Choose **Public** (required for GitHub Pages on GitHub Free).
4. Do **not** add a README, .gitignore or license when creating it (those files are already here).
5. Click **Create repository**.
6. Open this folder in VS Code, choose **Terminal > New Terminal**, then run:

```bash
git init
git add .
git commit -m "Build MENTEN website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/menten-website.git
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username. GitHub may prompt you to sign in. If Git is not installed, install it from https://git-scm.com/.

## Publish with GitHub Pages

1. Open your GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Source: GitHub Actions**.
4. Go to the **Actions** tab and wait for the `Deploy MENTEN to GitHub Pages` workflow to finish successfully.
5. Your website will usually be at:

   `https://YOUR-GITHUB-USERNAME.github.io/menten-website/`

The workflow also shows the actual published URL after deployment. It can take a few minutes for the first deployment to finish.

## Update my website later

After editing files in VS Code:

```bash
git add .
git commit -m "Update MENTEN website"
git push
```

Every push to `main` triggers a new deployment.

## Before I share the website

- Check product photos, style names and sizes. Listed EU sizes are not guaranteed stock.
- Confirm actual product availability and prices directly with customers.
- Test the email inquiry flow on mobile and desktop. It opens the customer's email app; it does **not** send orders automatically.
- Check social links and contact details.
- No checkout, payment processor, customer account or order database is included.
- For a custom domain, purchase/own a domain, then configure it under **Settings > Pages > Custom domain** and set the DNS records GitHub provides.

## Contact

Email: sivphengphann@gmail.com  
Instagram: https://www.instagram.com/menten2006/  
Facebook: https://www.facebook.com/profile.php?id=100065083050645  
TikTok: https://www.tiktok.com/@menten2006bart  
Telegram: 016453186
