# 🇹🇭 Thaïlande 2026 — Guide Famille PWA

## 📁 Fichiers
- `index.html` — Guide personnel (toutes les fonctionnalités)
- `voyage.html` — Page pour les proches (timeline + photos)
- `sw.js` — Service Worker (mode offline)
- `manifest.json` — Infos PWA

---

## 🚀 Mise en ligne GitHub Pages

### Première fois
1. **github.com** → New repository → `thailande-2026` → **Public** → Create
2. Cliquer **"uploading an existing file"**
3. Glisser les 4 fichiers (`index.html`, `voyage.html`, `sw.js`, `manifest.json`)
4. **Commit changes**
5. **Settings → Pages → Branch: main → Save**
6. L'appli est en ligne : `https://TON-PSEUDO.github.io/thailande-2026/`

### Mettre à jour un fichier
1. Aller sur le dépôt GitHub → cliquer sur le fichier
2. **Add file → Upload files** → glisser le nouveau fichier → **Commit changes**

---

## 📱 Installer sur téléphone

### iPhone — Safari uniquement
1. Ouvrir le lien dans **Safari** (pas Chrome)
2. Icône **Partager** (↑) → **"Sur l'écran d'accueil"**

### Android — Chrome
1. Menu **⋮** → **"Ajouter à l'écran d'accueil"**

### Si l'appli ne se met pas à jour
- Pratique → Config → **Vérifier les mises à jour**
- Ou : supprimer l'icône → vider le cache → réinstaller

---

## 🔐 Connexion Google (index.html)

L'appli utilise la connexion Google au lieu d'un code PIN.

### Première connexion
1. Ouvrir l'appli → écran de connexion Google s'affiche
2. Appuyer **"Se connecter avec Google"**
3. Choisir son compte Gmail → Autoriser
4. L'écran d'accueil s'affiche avec les 6 tuiles de destinations
5. La connexion est mémorisée — pas besoin de se reconnecter

### Déconnexion
- Appuyer sur la photo/prénom en haut à droite → **Se déconnecter**

### Retour à l'écran d'accueil
- Appuyer sur le titre **"Thaïlande 2026"** dans la barre du haut

---

## 🔐 Connexion Google (voyage.html)

La page des proches nécessite aussi une connexion Google pour protéger les photos.

### Configuration dans Google Cloud Console
1. **console.cloud.google.com** → ton projet `Thailande 2026`
2. **APIs et services → Identifiants → ton Client OAuth** → icône ✏️
3. Dans **"URI de redirection autorisées"**, vérifier :
   ```
   https://s-dsf.github.io
   https://s-dsf.github.io/thailande-2026/voyage.html
   https://s-dsf.github.io/thailande-2026/index.html
   ```
4. Dans **"Origines JavaScript autorisées"** :
   ```
   https://s-dsf.github.io
   ```
5. **Enregistrer**

### Donner accès à des personnes (mode Test)
1. **APIs et services → Écran de consentement OAuth**
2. Section **"Utilisateurs test"** → **"+ Add users"**
3. Ajouter les adresses Gmail des membres du groupe

### Donner accès à tout le monde (mode Production)
1. **APIs et services → Écran de consentement OAuth**
2. Bouton **"Publier l'application"** → Confirmer
3. N'importe quel compte Google peut se connecter

---

## 🤖 Cloudflare Worker (proxy Claude API)

Protège la clé API Claude — elle reste côté serveur, invisible dans le code.

### Créer le Worker
1. **cloudflare.com** → Workers & Pages → Create → Start with Hello World
2. Nommer : `claude-proxy-thailande`
3. Remplacer le code par :
```javascript
export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    if (request.method !== 'POST') return new Response('OK', { status: 200 });
    try {
      const body = await request.json();
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
};
```
4. **Deploy**

### Ajouter la clé API Claude
1. Worker → **Settings → Variables and Secrets → Add**
2. Type : **Secret** · Nom : `CLAUDE_API_KEY` · Valeur : `sk-ant-...`
3. **Save**

### URL du Worker
L'URL apparaît sur la page du Worker :
`https://claude-proxy-thailande.s-desferet.workers.dev`

Cette URL est déjà configurée dans `index.html`.

---

## 📊 Google Sheets (synchronisation notes & activités)

### Créer le Google Sheet
1. **sheets.google.com** → Nouveau fichier
2. Renommer : `Thaïlande 2026 — Notes voyage`
3. Première ligne colonnes : `timestamp | type | key | value | device`

### Créer le script Apps Script
1. Dans le Sheet : **Extensions → Apps Script**
2. Supprimer tout le code et coller :
```javascript
const SHEET_NAME = 'Feuille 1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([new Date().toISOString(), data.type, data.key, data.value, data.device || 'inconnu']);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({ error: e.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });
    return ContentService.createTextOutput(JSON.stringify({ data: rows })).setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({ error: e.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
```
3. **Enregistrer** (Ctrl+S) → Nommer : `Thailande2026`
4. **Déployer → Nouveau déploiement**
   - Type : **Application Web**
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
5. **Déployer** → Autoriser → Copier l'URL

L'URL actuelle est déjà configurée dans `index.html` et `voyage.html`.

### Synchroniser manuellement
- **Pratique → Config → 🔄 Synchroniser maintenant**

---

## 📷 Google Drive (photos privées)

Les photos sont stockées dans ton Drive personnel et restent **privées**.
Les proches y accèdent via leur propre connexion Google.

### Configuration OAuth (déjà faite)
- Client ID : `149294989704-njs9lik8j598ufbp99quni6qfjqlvg6e.apps.googleusercontent.com`
- Dossier Drive : `1sZCQKYH_yFOfvx1smwXB3BeU0khbuupk`
- Scope : `drive.file` + `userinfo.profile`

### Reconnecter Google Drive
- **Pratique → Config → 🔑 (Re)connecter Google Drive**
- Le token expire après 1h — renouvellement automatique si déjà connecté

### Ajouter des photos
1. **Pratique → Photos → 📷 Ajouter des photos**
2. Choisir destination + journée + diffusion :
   - 🔒 **Privé** — visible uniquement sur ton guide
   - 👨‍👩‍👧 **Proches** — visible sur voyage.html
   - 🌍 **Les deux**
3. Sélectionner les photos → légende optionnelle → **Publier**

---

## 📋 Organisation des onglets Pratique

| Onglet | Contenu |
|---|---|
| 🛠 **Outils** | Convertisseur THB · Traducteur · Assistant IA |
| 📋 **Pratique** | Phrases utiles · Contacts · Us & coutumes |
| ℹ️ **Infos** | Météo historique juillet-août |
| 🗓 **Avant** | Applis à télécharger · Check-list · Vaccins · Documents |
| 📸 **Photos** | Upload Google Drive · Galerie |
| ⚙️ **Config** | Sync · Mises à jour · Mode nuit · Récap PDF · Journal |

---

## 🌙 Mode nuit
- Bouton **🌙** en bas à droite de l'écran
- Ou : **Pratique → Config → Mode nuit**

---

## 🔄 Mises à jour de l'appli
- **Pratique → Config → 🔍 Vérifier les mises à jour**
- Une bannière orange s'affiche si une mise à jour est disponible → appuyer pour l'appliquer

---

## 📄 Récap PDF souvenir
- **Pratique → Config → 📄 Générer le récap PDF souvenir**
- Contient : activités cochées + notes + photos

## 📔 Journal de voyage automatique
- **Pratique → Config → Journal de voyage**
- Se remplit automatiquement avec les activités cochées et notes saisies

---

## ✏️ Modifier le contenu (itinéraires, adresses, horaires)
Dans `index.html`, chercher `const DATA = {` — toutes les données du voyage sont dans cet objet JSON.

---

## 🆘 Problèmes courants

| Problème | Solution |
|---|---|
| L'appli ne se met pas à jour | Pratique → Config → Vérifier mises à jour |
| Traducteur / IA ne fonctionne pas | Vérifier que le Worker Cloudflare est actif |
| Photos ne s'affichent pas sur voyage.html | Reconnecter Google sur voyage.html · Re-uploader les photos |
| Notes non synchronisées | Pratique → Config → Synchroniser maintenant |
| Erreur OAuth `invalid_request` | Vérifier les URIs de redirection dans Google Cloud Console |
| Écran de connexion bloqué | Vérifier que l'app est publiée dans Google Cloud Console |
| Token Google expiré | Se reconnecter via Pratique → Config → (Re)connecter Google Drive |

