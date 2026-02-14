# Tic‑Tac‑Toe (Mobile Responsive)

Open `index.html` in a browser to play. The game is responsive for mobile and desktop.

Files:
- `index.html` — main page and UI
- `styles.css` — mobile-first responsive styles
- `script.js` — game logic, keyboard accessibility, and scores

Usage:
1. Open the folder and double-click `index.html` or serve it with a static server.
2. Tap/click cells to place X / O. Use Enter/Space to activate focused cells.
3. Press `Reset Board` to start a new round. Scores persist in localStorage.

Install as an App (PWA):
- The project now includes a basic `manifest.json` and `service-worker.js`. Open the site in a browser (Chrome/Edge/Firefox Android recommended) and use the browser menu to "Install" or "Add to Home screen".
- For local testing, serve the folder with a simple static server (HTTPS is required on some platforms for install prompts):

```bash
python -m http.server 8000
```

Other publish options:
- Electron: package as a desktop app. I can scaffold `electron` files if you want.
- Capacitor / Cordova: wrap as a native Android/iOS app. I can add a Capacitor config and build steps on request.

