# Nishil Bhimani — Portfolio (Linux Desktop Simulation)

A personal portfolio website themed as a Linux desktop, built with Next.js & Tailwind CSS.


To run this on localhost:
type `npm install` then `npm run dev`, and when you're done coding, `npm run build` to build the app.

_NOTE: if you have yarn, just replace `npm` with `yarn` in the commands above._

### Before deploying — things YOU still need to do

1. **Profile photo** — drop your real photo at `public/images/logos/profile.png` (currently a placeholder "NB" avatar, since I can't pull images from a LinkedIn profile — it's behind a login wall).
2. **Resume** — add your resume PDF at `public/files/Nishil-Bhimani-Resume.pdf` (the "Resume" tab in the About app expects this exact filename/path).
3. **Contact form (EmailJS)** — to make the "Contact Me" (gedit) app actually send mail:
   - Create an account at [emailjs.com](https://www.emailjs.com/) and connect your Gmail/Outlook.
   - Create a new service and template, grab your Service ID, Template ID, and Public Key.
   - Create a `.env` file in the project root:

```
NEXT_PUBLIC_USER_ID = 'YOUR_PUBLIC_KEY'
NEXT_PUBLIC_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
NEXT_PUBLIC_SERVICE_ID = 'YOUR_SERVICE_ID'
```

4. **Google Analytics (optional)** — set `NEXT_PUBLIC_TRACKING_ID` in `.env` if you want pageview tracking, or remove the `ReactGA` calls if you don't.

## Deploying to GitHub Pages

This repo is meant to live at `realnishil.github.io`. Run `npm run build && npm run export`, then push the exported static output (or wire up a GitHub Actions workflow) to the `realnishil.github.io` repo.

## Scripts

### `npm run dev`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`
Builds the app for production.

## Credits

Original Ubuntu-desktop-simulation concept & codebase by [Vivek Patel](https://github.com/vivek9patel), MIT licensed. Rebranded and customized by Nishil Bhimani.
