# Express.js

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
// init express
const app = express();

//Create the endpoints/route handlers
app.get('/', function (req, res) {
    res.send('Hello World');
});

// Listen on a port
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
## Dokumentation

http://expressjs.com/de/

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

