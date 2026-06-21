# 🇹🇭 Thaïlande 2026 — Guide Famille PWA

Application web progressive (PWA) de voyage pour 7 personnes · 20 juillet – 6 août 2026  
Bangkok · Chiang Mai · Koh Tao · Koh Samui

---

## 📁 Fichiers du repo (liste exacte)

| Fichier | Rôle |
|---|---|
| `index.html` | App principale (guide, notes, photos, outils) |
| `voyage.html` | Page pour les proches (photos + itinéraire) |
| `sw.js` | Service Worker v20 (cache offline) |
| `manifest.json` | Métadonnées PWA |
| `docx.umd.js` | Librairie Word pour génération du journal |
| `README.md` | Ce fichier |
| `Thailande2026_souvenir.docx` | Template journal vierge |

> ⚠️ Ne pas avoir d'autres versions de `index.html` dans le repo (`index (1).html` etc.) — cela crée des conflits de cache.

---

## 🚀 Mise en ligne GitHub Pages

### Première fois
1. **github.com** → New repository → `thailande-2026` → **Public** → Create
2. **"uploading an existing file"** → Glisser les 7 fichiers ci-dessus
3. **Settings → Pages → Branch: main → Save**
4. URL : `https://s-dsf.github.io/thailande-2026/`

### Mettre à jour (procédure propre)
1. GitHub → cliquer sur le fichier → icône crayon → coller le nouveau contenu → **Commit**
2. Toujours incrémenter le numéro de version dans `sw.js` (`thailand-2026-vX`) pour vider le cache
3. Supprimer les anciens fichiers en double (`index (1).html`, etc.)

---

## 🔧 Services externes

### Cloudflare Worker
URL : `https://claude-proxy-thailande.s-desferet.workers.dev`

**Variables à configurer** (Settings → Variables and secrets) :

| Nom | Type | Valeur |
|---|---|---|
| `CLAUDE_API_KEY` | Secret | Clé API Anthropic |
| `GOOGLE_SERVICE_KEY` | Plaintext | JSON complet du Service Account |
| `UPLOAD_SECRET` | Plaintext | `THAI2026SECRET` |

**Pour déployer le Worker :**
Workers & Pages → `claude-proxy-thailande` → Edit Code → coller `cloudflare_worker.js` → Deploy

### Google Sheets
Script ID : `AKfycbzkoXJ3BUbPBGSkZM8d8kBtPgDaj46qInSvU9n6aiXxf6bLd4QCZwI4to2GWhtauYFn/exec`

---

## 📱 Installer sur téléphone

### iPhone — Safari uniquement
1. Ouvrir dans **Safari** (pas Chrome)
2. Icône **Partager ↑** → **"Sur l'écran d'accueil"**

### Android — Chrome
1. Menu **⋮** → **"Ajouter à l'écran d'accueil"**

---

## 🔐 Accès

| Élément | Valeur |
|---|---|
| PIN app principale | `2026` |
| Page proches | https://s-dsf.github.io/thailande-2026/voyage.html |
| Connexion Google | Optionnelle (pour le prénom dans les notes) |

---

## 📖 Fonctionnalités

### Guide de voyage
- Programme jour par jour avec adresses françaises **et thaï** 🚕
- Activités cochables synchronisées entre tous les téléphones
- Météo temps réel par destination

### Notes & souvenirs (3 onglets par journée)
- **✅ Fait** — activités du programme pré-remplies + champ libre
- **💛 Souvenir** — souvenir préféré de la journée
- **😄 Anecdote** — petite histoire drôle ou inattendue
- Modifier ✏️ et supprimer 🗑 chaque note

### Journal Word
- Pratique → Config → **📥 Télécharger le journal Word (.docx)**
- 36 pages : couverture photo + 17 jours × (page texte + page photos)
- Notes et photos intégrées automatiquement

### Photos
- Upload depuis l'app — n'importe quel téléphone sans connexion Google
- Via Cloudflare Worker → Google Drive (Service Account)
- Galerie partagée entre tous les membres de la famille
- 3 niveaux de diffusion : Privé · Proches · Les deux

### Outils
- Convertisseur THB ↔ EUR ↔ USD (taux temps réel)
- Traducteur français ↔ thaï (écrit + vocal)
- Assistant IA (connaît le programme et les 7 participants)
- Phrases utiles

### Page proches (voyage.html)
- Connexion Google requise
- 2 onglets : 📸 Photos · 🗺 Itinéraire
- Horloges 🇫🇷 et 🇹🇭 en temps réel
- Réactions ❤️ et commentaires sous chaque journée

---

## ♻️ Mise à jour du cache

Le Service Worker met l'app en cache pour le mode offline.  
Pour forcer le rechargement après une mise à jour :
1. Incrémenter `CACHE = 'thailand-2026-vX'` dans `sw.js`
2. Uploader `sw.js` sur GitHub
3. Ou utiliser le bouton **"🔍 Vérifier les mises à jour"** dans l'app (Pratique → Config)
