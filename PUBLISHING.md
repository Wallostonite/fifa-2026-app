# Publishing FanPass to the App Stores

FanPass is an Expo (React Native) app published via **EAS** (Expo Application
Services). EAS builds the binaries in the cloud and submits them — no local
Xcode/Android Studio required.

---

## Architecture (already deployed)

- **Web + API** → Railway: `https://fifa-2026-app-production.up.railway.app`
  - Static SPA (`build/client`) + Hono API server (`server.js`)
  - Database: Neon PostgreSQL (`DATABASE_URL` set in Railway → Variables)
- **Mobile** → calls the Railway URL via `EXPO_PUBLIC_BASE_URL` in `apps/mobile/.env`

---

## One-time accounts

| Service | Purpose | Cost |
|---------|---------|------|
| [Expo](https://expo.dev/signup) | Cloud builds | Free tier OK |
| [Apple Developer](https://developer.apple.com/programs/) | iOS App Store | $99 / year |
| [Google Play Console](https://play.google.com/console/signup) | Android | $25 once |

---

## App identity (already set in `apps/mobile/app.json`)

- Name: **FanPass**
- Slug: `fanpass-2026`
- iOS bundle ID: `com.fanpass.app`
- Android package: `com.fanpass.app`
- Version: `1.0.0`

---

## Build & submit

```bash
cd apps/mobile

# 1. Install the EAS CLI and log in
npm install -g eas-cli
eas login

# 2. Link the project (writes extra.eas.projectId into app.json)
eas init

# 3. Cloud builds (EAS generates signing certs/keystores automatically)
eas build --platform android     # -> .aab
eas build --platform ios         # -> .ipa (prompts for Apple login)

# 4. Submit to the stores
eas submit --platform android    # -> Google Play Console
eas submit --platform ios        # -> App Store Connect
```

---

## Store-listing requirements (manual, in each web console)

Both stores reject submissions missing these:

- [ ] **Screenshots** — at least 2 per required device size (capture from a
      simulator or your phone running the app)
- [ ] **App description** + category → **Sports**
- [ ] **Privacy policy URL** → `https://fifa-2026-app-production.up.railway.app/privacy`
- [ ] **Content / age rating** questionnaire
- [ ] App icon 1024×1024 (already at `apps/mobile/assets/images/icon.png` —
      replace with final FanPass art if needed)

### Apple-specific
- [ ] App loads remote content + has community posts → Apple may ask for a
      **demo account** or a content-moderation note. There's no login, so state
      "no account required" in the review notes.
- [ ] Account/data deletion path — covered by the Privacy Policy contact email.

---

## Review times
- **Apple:** ~1–3 days
- **Google:** few hours – 2 days

---

## Updating the app later

1. Bump `version` in `apps/mobile/app.json` (e.g. `1.0.1`).
2. `eas build --platform all` then `eas submit --platform all`.
   (`autoIncrement` in `eas.json` handles the internal build number.)

For JS-only changes (no native deps), you can use EAS Update for instant OTA
pushes without a store review:
```bash
eas update --branch production --message "..."
```

---

## Before you submit — checklist

- [x] Anything-platform code removed
- [x] API server live on Railway
- [x] `EXPO_PUBLIC_BASE_URL` → `https://...railway.app` (with scheme)
- [x] Privacy policy page at `/privacy`
- [ ] Replace `support@fanpass.app` in `apps/web/src/app/privacy/page.jsx` with a real contact email
- [ ] Final app icon / splash art
- [ ] Screenshots captured
- [ ] Store listings filled in
