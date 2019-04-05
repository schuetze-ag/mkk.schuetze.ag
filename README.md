# mkk.schuetze.ag

Dies ist die Landingpage der Schütze AG für den Main-Kinzig-Kreis.

## Installation

Du benötigst:

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/)

Klone dieses Repository:

```bash
git clone https://github.com/schuetze-ag/mkk.schuetze.ag.git
cd mkk.schuetze.ag
npm install
```

## Entwickeln

Starte den Entwicklungs-Server:

```bash
npm start
```

Du kannst die Seite jetzt unter http://localhost:3000/ ansehen. Änderungen an der Seite werden automatisch im Browser angezeigt.

## Bauen

```bash
rm -rf public
npm run build
npm run serve
```

Du kannst die fertig gebaute Seite unter http://localhost:5000/ ansehen.

## Deployment

Committe deine Änderungen:

```bash
git add .
git commit -m 'Beschreibe deine Änderungen'
git push origin master
```

Deploye deine Änderungen:

```bash
./deploy.sh
```

## Docker

Du kannst ein Docker-Image bauen:

```bash
./docker.sh
docker run --name mkk.schuetze.ag -p 5000:80 mkk-schuetze-ag
```

Die Seite läuft dann unter http://localhost:5000/.
