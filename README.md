# UPD 31 January 2022

# Note

The main branch is a protected branch. Settings can be changed by admin [here](https://www.qenvilab.space/laurent/client_softrobot/-/settings/repository).

Please before working on this project, create a new branch, implement and test your features, then request a merge into main.

# Usage

This is a fleet managemet system. For the current project we do manage bunch of robots in one or more warehouse. A system's admin draws in a representative image (slam) of a warehouse, a path for robots to perform a specified action (moving to some destinations mainly in a purpose of delivrying simple package of really heavy one), then affects the management of the robots to previously created and granted users.

# Pre-requirements

You should have had setup the backend handling authentification and autorization at this page: [Softrobot Access](https://www.qenvilab.space/yacine/softrobot_access)

You should have had setup the backend providing you data about robots at this page: [Client Softrobot Backend](https://www.qenvilab.space/laurent/client_softrobot_backend)

# Getting Started

Fetch the project by https or ssh, i.e. via https

```
git clone https://www.qenvilab.space/laurent/client_softrobot.git
```

Install the project's dependencies (use cmd, nodejscmd or Powershell, NOT git-bash) :

```
npm install
```

Then:

```
npm start
```

<!-- (celle ci est déja installé dans cette version) npm link ./third-party/react-filter-box -->

<!-- # Version developpemntale sur qenvi.space:3000

Démarrer le projet en local avec la commande suivante :

```
npm start
```

Application desormais disponible en locale:

```
http://qenvi.space:3000
```

verifiez, si le backend fonctionne pour autorisation et utilisation du logicielle. -->

### Deployment

<!-- For stagging and productioon state, this project has configuration allowing you to docker containerize it and link to a docker mongoDB container, the orchestration method then depends on you (swarm, kubbernets ...). -->

Once your changes are commitend and pushed, (as for now we don't have runners on gitlab) ssh connect to your server then:

Fetch the project by https or ssh, i.e. via https

```
git clone https://www.qenvilab.space/laurent/client_softrobot.git
```

Build the project

```
npm run-script build

```

Copy the built at the deployed nginx folder

```
sudo mv build/* /var/www/html/apps/
```

<!-- exactement à quoi cela ressemble pour l'état actuel (le 9 Septembre 2021):

```
debian@vps-7aa42d99 /var/www/html $ ls
apps  index.nginx-debian.html  old  qdb
debian@vps-7aa42d99 /var/www/html $ cd apps/
debian@vps-7aa42d99 /var/www/html/apps $ ls
asset-manifest.json  datalogs.csv  DTF_MANUEL.pdf  favicon.ico  icon.png  images  index.html  logo.png  manifest.json  robots.txt  static
debian@vps-7aa42d99 /var/www/html/apps $
```

Explications:

apps - application REACT statique
index.nginx-debian.html - page par default
old - dossier obsoletes à effacer
qdb - symbolic link to phpmyadmin -->

# PS.

Before deployment [read instructions](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Deployment).

<!-- # qenvi.space:3000

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

``` -->

# Server nginx

Aiguillage de l'nginx est le suivant:

```
server
{
        listen 80;
        root /var/www/html;
        index index.php index.html index.htm;

        server_name qenvi.space www.qenvi.space;

location =/dev/
{
  proxy_pass http://localhost:3000; #whatever port your app runs on
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection upgrade;
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

location =/
{
		return 301 http://$host$request_uri/apps;
}

location ^~ /qdb/
{
  try_files $uri $uri/ =404;

  location ~ \.php$
  {
  include snippets/fastcgi-php.conf;
  fastcgi_pass unix:/run/php/php7.4-fpm.sock;
  }
}
}

server
{
    listen 443;

    root /var/www/html;
    server_name qenvi.space www.qenvi.space;

    return 301  http://$host$request_uri;
}

```
