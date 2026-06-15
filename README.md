# 🇹🇭 Thaïlande 2026 — Guide Famille PWA

## 📁 Fichiers
- `index.html` — L'appli guide personnel (code + données + toutes fonctionnalités)
- `voyage.html` — Page pour les proches (timeline + photos)
- `sw.js` — Service Worker (mode offline)
- `manifest.json` — Infos PWA (icône, nom…)

---

## 🚀 Mise en ligne sur GitHub Pages (gratuit, illimité)

### Première fois
1. Créer un compte sur **github.com**
2. Cliquer **"New repository"**
3. Nom : `thailande-2026` → cocher **Public** → **Create repository**
4. Cliquer **"uploading an existing file"**
5. Glisser-déposer les 4 fichiers (`index.html`, `voyage.html`, `sw.js`, `manifest.json`)
6. Cliquer **"Commit changes"**
7. Aller dans **Settings → Pages → Branch: main → Save**
8. L'appli est en ligne à :
   👉 `https://TON-PSEUDO.github.io/thailande-2026/`

### Partager aux proches
- Guide personnel : `https://TON-PSEUDO.github.io/thailande-2026/`
- Page proches : `https://TON-PSEUDO.github.io/thailande-2026/voyage.html`

---

## 📱 Installer sur téléphone (mode appli)

### iPhone / iPad — Safari uniquement
1. Ouvrir le lien dans **Safari** (pas Chrome)
2. Icône **Partager** (carré avec flèche ↑)
3. **"Sur l'écran d'accueil"**
4. L'icône 🇹🇭 apparaît comme une vraie appli

### Android — Chrome
1. Ouvrir le lien dans **Chrome**
2. Menu **⋮ → "Ajouter à l'écran d'accueil"**
3. Confirmer

---

## ✏️ Mettre à jour le contenu

### Modifier un texte, horaire, adresse…
1. Aller sur **github.com** → ton dépôt `thailande-2026`
2. Cliquer sur `index.html`
3. Icône ✏️ (crayon) en haut à droite
4. Faire la modification (Ctrl+F pour chercher)
5. Cliquer **"Commit changes"** → **"Commit directly to main"**
6. L'appli est mise à jour en ~1 minute

### Ou demander à Claude de modifier
Revenir dans la conversation et dire ce qu'il faut changer → Claude génère le fichier corrigé → re-glisser sur GitHub.

### Forcer la mise à jour sur les téléphones
Fermer et rouvrir l'appli avec une connexion internet → mise à jour automatique.
Si ça ne se met pas à jour : supprimer l'icône → vider le cache Safari/Chrome → réinstaller.

---

## 🔐 Code PIN
- PIN par défaut : **2026**
- Modifier dans l'appli : onglet Pratique → Configuration → Changer le PIN

---

## 🔥 Configurer Firebase (synchronisation temps réel)
Pour que les notes et activités cochées se synchronisent entre tous les téléphones :

1. Créer un projet sur **firebase.google.com** (gratuit)
2. Activer **Realtime Database** (mode test)
3. Dans l'appli : onglet Pratique → Configuration → Configurer Firebase
4. Copier-coller les clés depuis la console Firebase

---

## 📷 Configurer Cloudinary (photos page proches)
Pour ajouter des photos visibles par les proches sur `voyage.html` :

1. Créer un compte gratuit sur **cloudinary.com** (25 Go gratuits)
2. Dashboard → Settings → Upload → Add upload preset → **Unsigned**
3. Dans `voyage.html` : bouton 📷 → onglet Config → coller Cloud Name + Preset

---

## 🗂 Points à améliorer (noté pour plus tard)
- 🔐 Masquer les clés Cloudinary du localStorage
- 💰 Budget estimatif par destination
- 📱 SIM / eSIM locale

