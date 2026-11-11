# Karti — annuaire intelligent de cartes de visite

Application web (PWA) installable sur téléphone : recherche « IA » des commerces par wilaya et par activité, ajout de carte (scan ou création en ligne), favoris, version arabe / français / anglais, mobile et desktop.

Aucune compilation n'est nécessaire : c'est un site statique.

## Contenu du dossier

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Toute l'application (HTML, CSS et JavaScript) |
| `manifest.webmanifest` | Nom, icônes et couleurs pour l'installation sur téléphone |
| `sw.js` | Service worker : installation + démarrage rapide hors ligne |
| `icons/` | Icônes de l'app (192, 512, maskable, Apple) |
| `cards/` | Les 19 cartes de démo (Bouira) |
| `designs/` | Les modèles illustrés pour « Créer ma carte » |
| `media/` | Vidéo d'intro et son image d'aperçu |

## Mettre en ligne

### Option A — Vercel (recommandé)
1. Créez un dépôt GitHub et déposez **le contenu** de ce dossier à la racine du dépôt.
2. Sur vercel.com : **Add New → Project → Import** le dépôt.
3. Framework : **Other**, aucune commande de build, dossier de sortie : `./`.
4. **Deploy**, puis ajoutez votre domaine (ex. `app.reperto.me`) dans *Settings → Domains*.

### Option B — GitHub Pages
1. Déposez le contenu du dossier à la racine du dépôt.
2. *Settings → Pages → Branch : main / (root) → Save*.
3. Le site est publié sur `https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`.

L'installation sur téléphone ne fonctionne qu'en **HTTPS** (Vercel et GitHub Pages le font automatiquement).

## Tester en local
```bash
cd karti-app
python3 -m http.server 8080
# puis ouvrez http://localhost:8080
```
N'ouvrez pas `index.html` en double-cliquant : le service worker et la vidéo ont besoin d'un serveur.

## Après chaque mise à jour
Dans `sw.js`, changez `const VERSION="karti-v1"` en `karti-v2`, `karti-v3`… pour que les téléphones récupèrent la nouvelle version.

## Ajouter un modèle illustré
1. Exportez l'image en **840 × 480 px** (JPG) et placez-la dans `designs/` (ex. `d50.jpg`).
2. Dans `index.html`, cherchez `const DESIGNS=[` et ajoutez une ligne :
```js
{id:"d50",nm:"Mon modèle",f:"d50",b:"d50",sec:["resto"],fg:"#fff",sub:"#ddd",ac:"#FFD25A",icfg:"#111",z:[6,20,44,60],a:"l",bz:[10,30,60,40],ba:"c"},
```
- `f` / `b` : image recto / verso · `sec` : secteurs recommandés (`"*"` = tous)
- `z` / `bz` : zone du texte en % `[x, y, largeur, hauteur]` · `a` / `ba` : alignement `l`, `c` ou `r`
- `fg` texte · `sub` texte secondaire · `ac` couleur d'accent · `icfg` couleur des icônes

## Ce qui est simulé dans ce prototype
- **Résultats de recherche** : les cartes de Bouira sont réelles, les autres sont générées pour la démo.
- **Lecture de carte par IA** : elle fonctionne dans Claude. Sur votre propre site, la carte est bien détectée, redressée et améliorée, mais la lecture du texte demande de brancher une API d'IA côté serveur (voir la fonction `aiRead` dans `index.html`).
- **Compte et paiement** : interface complète, aucune donnée n'est envoyée ni encaissée. Pour CIB / Edahabia, il faudra intégrer la passerelle SATIM.
- **Favoris, langue** : enregistrés dans le navigateur de l'utilisateur.
