# 🇹🇭 Thaïlande 2026 — Guide Famille PWA

## 📁 Fichiers
- `index.html` — Guide personnel (toutes les fonctionnalités)
- `voyage.html` — Page pour les proches (timeline + photos)
- `sw.js` — Service Worker (mode offline)
- `manifest.json` — Infos PWA
- `AppsScript_Thailande2026.js` — Script Google Sheets à copier-coller

---

## 🚀 Mise en ligne GitHub Pages

### Première fois
1. **github.com** → New repository → `thailande-2026` → **Public** → Create
2. **"uploading an existing file"** → Glisser les 4 fichiers
3. **Settings → Pages → Branch: main → Save**
4. URL : `https://s-dsf.github.io/thailande-2026/`

### Mettre à jour
1. GitHub → cliquer sur le fichier → **Add file → Upload files** → Commit

---

## 📱 Installer sur téléphone

### iPhone — Safari uniquement
1. Ouvrir dans **Safari**
2. Icône **Partager ↑** → **"Sur l'écran d'accueil"**

### Android — Chrome
1. Menu **⋮** → **"Ajouter à l'écran d'accueil"**

---

## 🔐 Connexion Google

### index.html (guide personnel)
- Écran de connexion au premier accès
- Token mémorisé — reconnexion automatique
- Badge prénom/photo en haut à droite → tap pour déconnecter
- Tap sur **"🏠 Thaïlande 2026"** dans la topbar → retour à l'écran d'accueil

### voyage.html (page des proches)
- Connexion Google obligatoire pour voir les photos
- Les photos restent **privées** dans Drive

### Donner accès (Google Cloud Console)
1. **console.cloud.google.com** → projet `Thailande 2026`
2. **APIs et services → Identifiants → Client OAuth** → ✏️
3. Vérifier **URI de redirection** :
   ```
   https://s-dsf.github.io
   https://s-dsf.github.io/thailande-2026/voyage.html
   https://s-dsf.github.io/thailande-2026/index.html
   ```
4. **Écran de consentement OAuth → "Publier l'application"** pour que tout le monde puisse se connecter

---

## 📋 Organisation des onglets Pratique

| Onglet | Contenu |
|---|---|
| 🛠 **Outils** | Convertisseur EUR/USD/THB · Traducteur · Assistant IA · Applis |
| 📋 **Pratique** | Phrases utiles (recherche) · Contacts · Us & coutumes |
| ℹ️ **Infos** | Météo historique juillet-août avec temp. mer |
| 🗓 **Avant** | Applis · Check-list valise · Vaccins · Documents |
| 📸 **Photos** | Upload Drive · Galerie · Modifier · Supprimer |
| ⚙️ **Config** | Sync GS · Mises à jour · Mode nuit · Drive · PDF · Journal |

---

## 📷 Google Drive (photos privées)

### Architecture
```
Photo uploadée → Drive (PRIVÉ) → URL via Cloudflare Worker
                                         ↓
voyage.html charge → Worker s'authentifie avec Service Account
                                         ↓
                     Worker transmet la photo à l'utilisateur connecté
```

### Connexion dans l'appli
- **Pratique → Config → 🔑 (Re)connecter Google Drive**
- Token valide 1h — renouvellement automatique

### Diffusion
- 🔒 **Privé** — visible uniquement dans ton guide
- 👨‍👩‍👧 **Proches** — visible sur voyage.html
- 🌍 **Les deux**

### Modifier / supprimer une photo
- Onglet **Photos** → survol/tap → ✏️ ou 🗑

---

## 🤖 Cloudflare Worker

URL : `https://claude-proxy-thailande.s-desferet.workers.dev`

Gère :
- Proxy API Claude (IA voyage)
- Proxy photos Drive privées (`/photo?id=FILE_ID`)

### Variables secrètes requises
| Nom | Valeur |
|---|---|
| `CLAUDE_API_KEY` | `sk-ant-...` |
| `GOOGLE_SERVICE_KEY` | Contenu JSON du Service Account |

---

## 📊 Google Sheets

URL script : `AKfycbzkoXJ3BUbPBGSkZM8d8kBtPgDaj46qInSvU9n6aiXxf6bLd4QCZwI4to2GWhtauYFn/exec`

Synchronise : activités cochées, notes, photos, réactions, visiteurs

### Nettoyage automatique
1. **Extensions → Apps Script** → coller le contenu de `AppsScript_Thailande2026.js`
2. Sauvegarder → exécuter `createWeeklyTrigger()` une fois
3. Le Sheet est nettoyé automatiquement chaque lundi à 3h

### Synchroniser manuellement
**Pratique → Config → 🔄 Synchroniser maintenant**

---

## 🌙 Mode nuit
- Bouton **🌙** en bas à droite
- Ou : **Pratique → Config → Mode nuit**

## 🔄 Mises à jour
- **Pratique → Config → 🔍 Vérifier les mises à jour**
- Bannière orange si mise à jour disponible

## 📄 Récap PDF souvenir
- **Pratique → Config → 📄 Générer le récap PDF**
- Inclut : activités cochées + notes avec auteur + photos Drive
- Génération async — toast "⏳" pendant le chargement des photos

---

## 🆘 Problèmes courants

| Problème | Solution |
|---|---|
| Erreur OAuth `invalid_request` | Vérifier les URIs de redirection dans Google Cloud |
| Photos non visibles sur voyage.html | Re-uploader les photos depuis index.html |
| Token Google Drive expiré | Pratique → Config → Reconnecter Google Drive |
| Onglet Pratique qui ne charge pas | Vider le cache → recharger |
| Notes non synchronisées | Pratique → Config → Synchroniser maintenant |
| PDF sans photos | Vérifier que le token Drive est valide avant génération |
| App pas à jour | Pratique → Config → Vérifier mises à jour |

