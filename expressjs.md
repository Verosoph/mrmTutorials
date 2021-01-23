# Express.js

## Quelle
- Express Crash Course
    - https://github.com/bradtraversy/express_crash_course
    - https://www.youtube.com/watch?v=L72fhGm1tfE&ab_channel=TraversyMedia

## Dokumentation

http://expressjs.com/de/

## Start
Erstellen eines package.json Files
```
npm init -y
```
Nun sollte man als erstes den Namen des Projektes in der package.json ändern damit es später keine Schwierigkeiten gibt. Wenn der name des Projektes "express" ist kann es sein, dass es beim installieren von express Probleme gibt.

express installieren
```
npm install express
```
Erstellen des initialen files app.js oder index.js oder wie auch immer.


## Basic Server Syntax

```
//include module
const express = require('express')

//init express
const app = express();

//create the endpoints/route handlers
app.get('/', function (req, res) {
    res.send('Hello World');
});


//listen on a port
app.listen(5000);
```

### Mit Ausgabe das der Server gestartet ist und dem port angegben während der Entwicklung
```
// Listen on a port (more beautiful)
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server started on port ${PORT}));
```

## Nodemon 
wird installiert um Server nicht nach jedem change neu starten zu müssen
```
npm install -D nodemon
```
-D bedeutet das Paket wird als DevDependency installiert, ist also nur während der Entwicklung notwendig

## scripts in package.json
Im teil scripts in der package.json kann man festlegen was wie bei serverstart aufgerufen werden soll.
Ursprunglich schaut das so aus:

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
Folgende Änderung bewirkt, dass "start" den app.js oder indexs.js den server ohne nodemon started (prodctive application) und "dev", dass er mit nodemon im Entwicklermodus gestartet wird.
```
  "scripts": {
      "start": "node app.js",
      "dev": "nodemon app.js" 
  },
```
Gestarted wird der Server dann mit:
```
npm run dev
```
## Routing
Es wird ein Verzeichnis /public erstellt und die darin enthaltene start.html soll als Startpage angezeigt werden.
Wir laden das module 'path' (die ist ein node.js module) in die index.js, welches das laden von Pfaden ermöglicht:
```
const path = require('path');
```

Wir ersetzten in der index.js:
```
    res.send('Hello World');
```
durch:

```
    res.sendFile(path.join(__dirname, 'public', 'start.html'));
```
Nun müsste man jedes File einzeln als route angeben, damit man sich genau das sparen kann gib es in express static folders, sodas man eine Directory static setzen kann und alle darin enthaltenen files kann man in der url angeben und sie werden geladen.

Wir ersetzen inder index.js
```
//Create the endpoints/route handlers
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'start.html'));
});
```
durch:
```
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
```
Damit erreiche ich die Seite start.html entweder einfach über den "homepage"-pfad also "/" oder wenn ein weiteres File im Verzeichnis /public liegt dann über den kompletten Dateinamen also /start.html

Zum Testen kann man eine zweites File anlegen about.html und versuchen dies über die url zu erreichen.

Auch ist es so möglich, so css files oder script files für die Seite zu hinterlegen und diese ganz normal im Kopf der html Seite einzubinden.

## Very Simple Rest API

Es soll zunächst ein einfaches array als Json zurüchgegben werden wen man den endpoint aufruft.
dazu wird statisch mal ein array erzeugt in der index.js
```
//array of members
const members = [
    {
        id: 1,
        name; 'John Doe',
        email: 'john@gmail.com',
        status: 'active' 
    },
    {
        id: 2,
        name; 'Hans Peter',
        email: 'hans@gmail.com',
        status: 'active' 
    },
    {
        id: 3,
        name; 'Fritz Summer',
        email: 'fritz@gmail.com',
        status: 'inactive' 
    }
]


```
Nun erstellt man ein route in index.js
```
app.get('/api/members', (req, res) {
    res.json(members);
})
```
* app.get - wir erwarten ein get request an dem endpoint
* res.json - gibt das array im json format zurück

## Code in file auslagern
Der Übersicht halber lassen sich Teile des codes jederzeit auslagern. 
Als Beispiel wird das Members-Array ausgelagert in ein eingenes File mit dem Namem Members.js (groß, weil es ein Model ist).
Man erstellt das File, packt das Array rein und exportiert es:
```
//array of members
const members = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        status: 'active' 
    },
    {
        id: 2,
        name: 'Hans Peter',
        email: 'hans@gmail.com',
        status: 'active' 
    },
    {
        id: 3,
        name: 'Fritz Summer',
        email: 'fritz@gmail.com',
        status: 'inactive' 
    }
];

module.exports = members;
```
Nun kann man es wieder in die index.js importieren
```
const members = require('./Memebers);
```

## Eine einfache Middleware-Funktion erstellen
Das ist im Grunde nichts anderes als eine Funktion die ausgeführt wird, wenn die app aufgerufen wird bzw. wenn ein Endpoint der api angesprochen wird. Damit lässt sich so gut wie alles machen. (der vergleich hinkt arg, aber ähnlich wie ein Constructor beim instanzieren eine Klasse)

Es wir also eine Funktion in der index.js (oder in einem File und man bindet es ein, wie oben) erstellt:
```
const logger = (req, res, next) => {
    console.log('Hello);
    next();
}
```
Und diese lässt sich dann als Middleware nutzen:
```
app.use(logger);
```





## Hilfreiche Links

- Creating REST API in Node.js with Express and MySQL
    - https://time2hack.com/creating-rest-api-in-node-js-with-express-and-mysql/
- Node.js MySQL tutorial: a step-by-step getting started guide with Express js REST API
    - https://geshan.com.np/blog/2020/11/nodejs-mysql-tutorial/
- Node.js Rest APIs example with Express, Sequelize & MySQL
    - https://bezkoder.com/node-js-express-sequelize-mysql/
- Angular 8 + Node.js Express + MySQL example: Build CRUD Application
    - https://bezkoder.com/angular-node-express-mysql/
- Build Node.js Rest APIs with Express & MySQL
    - https://bezkoder.com/node-js-rest-api-express-mysql/
- Typescript Rest API with Express.js, MySQL and TypeORM
    - https://medium.com/@shijin_nath/typescript-rest-api-with-express-js-mysql-and-typeorm-8331cea78b0c
- How To Build Rest API With NodeJS, Express, and MySQL
    - https://dev.to/juliest88/how-to-build-rest-api-with-nodejs-express-and-mysql-31jk
- Building Simple REST API with Express.js and MySQL
    - https://dev.to/nurofsun/building-simple-rest-api-with-express-js-and-mysql-140p


## Tutorials

* Express JS Crash Course
    * https://www.youtube.com/watch?v=L72fhGm1tfE&ab_channel=TraversyMedia

