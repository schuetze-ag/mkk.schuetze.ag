# mkk.schuetze.ag

Dies ist die Landingpage der Schütze AG für den Main-Kinzig-Kreis.

## Installation

Du benötigst eine Installation von [git](https://git-scm.com/).

Installiere Hugo:

- Lade dir das [neueste Release](https://github.com/gohugoio/hugo/releases) für dein Betriebssystem herunter.
- Entpacke das Archiv und sorge dafür, dass `hugo` in deinem Pfad ist.

Klone dieses Repository:

```bash
git clone https://github.com/schuetze-ag/mkk.schuetze.ag.git
```

## Entwickeln

Starte den Hugo-Server:

```bash
hugo server -D
```

Du kannst die Seite jetzt unter http://localhost:1313/ ansehen. Änderungen an der Seite werden automatisch im Browser angezeigt.

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
