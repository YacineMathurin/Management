# Introduction

This branch called main. This is protected branch. Settings can be changed by admin [here](https://www.qenvilab.space/laurent/client_softrobot/-/settings/repository).

Please before working in repo, make a branch, implement and test your feature, after request to merge into main.

# Getting Started

Récupèrer le code source sur avec la commande suivante, if you have your SSH key registered on qenvilab.space :

```
git clone git@www.qenvilab.space:Laurent/client_softrobot.git
```

Installer le projet avec les commandes suivante (use cmd, nodejscmd or Powershell) :

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
npm run-script build
```

Le résultat de la compilation se trouve dans le dossier build du projet.
** Uploader le contenu du dossier build sur le serveur HTTP **(Apache par exemple).

# PS.
Before deployment [read instructions](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Deployment).
