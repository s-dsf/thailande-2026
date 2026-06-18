# 🇹🇭 Thaïlande 2026 — Guide Famille PWA

Application web progressive (PWA) de voyage pour 7 personnes · 20 juillet – 6 août 2026  
Bangkok · Chiang Mai · Koh Tao · Koh Samui

---

## 📁 Fichiers du repo

| Fichier | Rôle |
|---|---|
| `index.html` | App principale (guide, notes, photos, outils) |
| `voyage.html` | Page pour les proches (timeline + photos) |
| `sw.js` | Service Worker (mode offline + cache) |
| `manifest.json` | Métadonnées PWA |
| `docx.umd.js` | Librairie Word pour génération du journal |

---

## 🚀 Mise en ligne GitHub Pages

### Première fois
1. **github.com** → New repository → `thailande-2026` → **Public** → Create
2. **"uploading an existing file"** → Glisser les 5 fichiers
3. **Settings → Pages → Branch: main → Save**
4. URL : `https://s-dsf.github.io/thailande-2026/`

### Mettre à jour
1. GitHub → cliquer sur le fichier → icône crayon ou **Add file → Upload files** → Commit
2. ⚠️ Toujours uploader `sw.js` avec un numéro de version incrémenté pour forcer le rechargement du cache

---

## 📱 Installer sur téléphone

### iPhone — Safari uniquement
1. Ouvrir dans **Safari**
2. Icône **Partager ↑** → **"Sur l'écran d'accueil"**

### Android — Chrome
1. Menu **⋮** → **"Ajouter à l'écran d'accueil"**

---

## 🔐 Accès & sécurité

- **PIN** : `2026` (mémorisé 1h · modifiable dans l'onglet Config)
- **Google OAuth** : optionnel pour l'app principale, obligatoire pour voyage.html
- Les photos Drive restent privées via Service Account

---

## 📖 Fonctionnalités principales

### Guide de voyage
- Programme jour par jour avec adresses françaises **et thaï** 🚕
- Activités cochables synchronisées entre tous les téléphones
- Météo temps réel par destination

### Notes & souvenirs (3 onglets par journée)
- **✅ Fait** — activités du programme pré-remplies + champ libre
- **💛 Souvenir** — souvenir préféré de la journée
- **😄 Anecdote** — petite histoire drôle ou inattendue

### Journal Word
- Bouton **"📥 Télécharger le journal Word"** dans l'onglet Pratique → Config
- Génère un `.docx` avec 36 pages : couverture + 17 jours × (page texte + page photos)
- Les notes saisies et photos uploadées sont intégrées automatiquement
- Entièrement éditable dans Word ou Pages

### Outils
- Convertisseur THB ↔ EUR ↔ USD (taux temps réel)
- Traducteur français ↔ thaï (écrit + vocal)
- Assistant IA
- Phrases utiles avec recherche

### Photos
- Upload depuis l'app (tous les membres de la famille)
- Galerie partagée synchronisée
- Visible sur voyage.html pour les proches

### Notifications
- Rappels automatiques aux bons moments (heure thaïlandaise UTC+7)
- Vols, check-outs, activités clés

---

## 🔧 Services tiers

| Service | Usage |
|---|---|
| Cloudflare Worker | Proxy IA Claude + upload photos |
| Google Drive | Stockage photos (Service Account) |
| Google Sheets | Synchronisation entre appareils |
| Google OAuth | Identification membres famille |
| Open-Meteo | Météo temps réel |
| open.er-api.com / frankfurter.app | Taux de change |

---

## ♿ Mise à jour du cache

Le Service Worker met l'app en cache pour le mode offline.  
Pour forcer le rechargement après une mise à jour :
1. Incrémenter `CACHE = 'thailand-2026-vX'` dans `sw.js`
2. Uploader `sw.js` sur GitHub
3. Ou utiliser le bouton "🔄 Vérifier les mises à jour" dans l'app (Config)
