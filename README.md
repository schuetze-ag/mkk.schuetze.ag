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

## Deployment auf Stage

```bash
./stage.sh
```

Die Seite läuft unter http://docker-host1:6009/

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

## Scripts

Alle SVGs optimieren und dabei die verwendeten CSS-Klassen inlinen:

```bash
npx svgo -f static -r --enable inlineStyles --config '{ "plugins": [ { "inlineStyles": { "onlyMatchedOnce": false } }] }'
```

Kopiere Benefits-SVGs (danach optimieren, s.o.)

```bash
mv static/benefits/Schuetze\ Benefits_1.svg static/benefits/work-life-balance.svg
mv static/benefits/Schuetze\ Benefits_2.svg static/benefits/weiterbildung.svg
mv static/benefits/Schuetze\ Benefits_3.svg static/benefits/jobrad.svg
mv static/benefits/Schuetze\ Benefits_4.svg static/benefits/flexible-arbeitszeiten.svg
mv static/benefits/Schuetze\ Benefits_5.svg static/benefits/gestaltungsmoeglichkeiten.svg
mv static/benefits/Schuetze\ Benefits_6.svg static/benefits/vertrauenskultur.svg
mv static/benefits/Schuetze\ Benefits_7.svg static/benefits/sabbatical.svg
mv static/benefits/Schuetze\ Benefits_8.svg static/benefits/mitarbeiterevents.svg
mv static/benefits/Schuetze\ Benefits_9.svg static/benefits/fitnessstudio.svg
mv static/benefits/Schuetze\ Benefits_10.svg static/benefits/eigenstaendige-projekte.svg
mv static/benefits/Schuetze\ Benefits_11.svg static/benefits/transparenz.svg
mv static/benefits/Schuetze\ Benefits_12.svg static/benefits/elternzeit.svg

npx svgo -f static/benefits -r --enable inlineStyles --config '{ "plugins": [ { "inlineStyles": { "onlyMatchedOnce": false } }] }'
```
