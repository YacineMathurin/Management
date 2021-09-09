# UPD 7 September 2021

# Introduction

This branch called main. This is protected branch. Settings can be changed by admin [here](https://www.qenvilab.space/laurent/client_softrobot/-/settings/repository).

Please before working in repo, make a branch, implement and test your feature, after request to merge into main.

# Getting Started

Récupèrer le code source sur avec la commande suivante, if you have your SSH key registered on qenvilab.space :

```
git clone git@www.qenvilab.space:Laurent/client_softrobot.git
```

Installer le projet avec les commandes suivantes (use cmd, nodejscmd or Powershell, NOT git-bash) :

```
npm install
```

(celle ci est déja installé dans cette version) npm link ./third-party/react-filter-box

**ATTENTION: Dans l'etat actuelle le projet:**

added 2282 packages from 2582 contributors and audited 2288 packages in 56.33s
found 82 moderate severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details

Démarrer le projet en local avec la commande suivante :
```
npm start
```

Application desormais disponible en locale:
```
http://localhost:3000/apps
```
verifiez, si le backend fonctionne pour autorisation et utilisation du logicielle.


# Deployment

Pour compiler le projet pour un déploiement utiliser la commande suivante :
```
debian@vps-7aa42d99 ~/client_softrobot (main) $ npm run-script build

> Qenvi_Robotics@1.0.0 build
> react-scripts build

Creating an optimized production build...

```

Le résultat de la compilation se trouve dans le dossier build du projet.

Deplacer le contenu du dossier build sur le serveur HTTP **(Apache par exemple).

Example:

```
debian@vps-7aa42d99 /var/www/html $ ls
apps  index.nginx-debian.html  old  qdb
debian@vps-7aa42d99 /var/www/html $ cd apps/
debian@vps-7aa42d99 /var/www/html/apps $ ls
asset-manifest.json  datalogs.csv  DTF_MANUEL.pdf  favicon.ico  icon.png  images  index.html  logo.png  manifest.json  robots.txt  static
debian@vps-7aa42d99 /var/www/html/apps $ 
```

# PS.
Before deployment [read instructions](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Deployment).

# qenvi.space:3000

```
debian@vps-7aa42d99:~/client_softrobot$ npm install

added 2034 packages, and audited 2289 packages in 35s

11 packages are looking for funding
  run `npm fund` for details

11 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
npm notice
npm notice New minor version of npm available! 7.6.3 -> 7.20.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v7.20.0
npm notice Run npm install -g npm@7.20.0 to update!
npm notice

```

