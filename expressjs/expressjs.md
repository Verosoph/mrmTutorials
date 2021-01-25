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

```javascript
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

### Mit Ausgabe das der Server gestartet ist und dem port angegeben während der Entwicklung
```javascript
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
```javascript
const path = require('path');
```

Wir ersetzten in der index.js:
```javascript
    res.send('Hello World');
```
durch:

```javascript
    res.sendFile(path.join(__dirname, 'public', 'start.html'));
```
Nun müsste man jedes File einzeln als route angeben, damit man sich genau das sparen kann gib es in express static folders, sodas man eine Directory static setzen kann und alle darin enthaltenen files kann man in der url angeben und sie werden geladen.

Wir ersetzen in der index.js
```javascript
//Create the endpoints/route handlers
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'start.html'));
});
```
durch:
```javascript
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
```
Damit erreiche ich die Seite start.html entweder einfach über den "homepage"-pfad also "/" oder wenn ein weiteres File im Verzeichnis /public liegt dann über den kompletten Dateinamen also /start.html

Zum Testen kann man eine zweites File anlegen about.html und versuchen dies über die url zu erreichen.

Auch ist es so möglich, so css files oder script files für die Seite zu hinterlegen und diese ganz normal im Kopf der html Seite einzubinden.

## Very Simple Rest API - alle members zurückgeben

Es soll zunächst ein einfaches array als Json zurüchgegben werden wen man den endpoint aufruft.
dazu wird statisch mal ein array erzeugt in der index.js
```javascript
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
```javascript
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
```javascript
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
```javascript
const members = require('./Members);
```

## Eine einfache Middleware-Funktion erstellen
Das ist im Grunde nichts anderes als eine Funktion die ausgeführt wird, wenn die app aufgerufen wird bzw. wenn ein Endpoint der api angesprochen wird. Damit lässt sich so gut wie alles machen. (der vergleich hinkt arg, aber ähnlich wie ein Constructor beim instanzieren eine Klasse)

Es wir also eine Funktion in der index.js (oder in einem File und man bindet es ein, wie oben) erstellt:
```javascript
const logger = (req, res, next) => {
    console.log('Hello);
    next();
}
```
Und diese lässt sich dann als Middleware nutzen:
```javascript
app.use(logger);
```
Führt man jetzt ein get request auf der url aus, erscheint ein "Hello" in der Konsole.

Man könnte sicher hier über die logger Funktion z.B. die aufgerufene url ausgeben lassen:
```javascript
console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
```
ACHTUNG dabei ist das Hochkomma ein solches: " ` " (sind Backticks)

Nun könnte man sich noch Datum und Zeit anzeigen lassen, dazu kann man das Module "moment" nutzen
Dies kann über:
```
npm install moment
```
installiert werden.

In die index.js eingebunden:
```javascript
const moment = require('moment');
```
Und verwendet werden:
```javascript
console.log(`${moment().format()}`);
```
Nun wird bei Abfrage der Url zusätzlich noch Datum und Zeit angezeigt.
Mann könnte nun mit Hilfe vom fs-module das Ganze in ein File schreiben und hätte so schon einen simplen logger der jeden call der api loggt.

Der Schöneheit halber packen wir diese Middelware nun noch in ein eigenes Verzeichnis und File.
* Verzeichnis und File erstellen
* code der Funktion ins neu File packen
* module.exports = ... (zum exportien)
* in index wieder einbinden mit const ... = require ('./verzeichnis/filename)


## Very Simple Rest API Part 2 - einen member zurückgeben
Statt alle members in dem members Model zurückzugeben kann man natütlich einzeln members abfragen.
```javascript
// Get Singel Member
app.get('/api/members/:id', (req, res) => {
    res.send(req.params.id);
});
```
Mit req.params lassen sich alle Parameter ansprechen die man der Url mitgibt. Bei einem aufruf von "http://localhost:5000/api/members/43" wird also 43 zurückgegeben.
Dies kann man nun nutzem um nach den Daten in dem Membersobjekt zu suchen indem man folgendes ändert:
```javascript
// Get Singel Member
app.get('/api/members/:id', (req, res) => {
    res.json(members.filter(members => members.id === parseInt(req.params.id)));
});
```
Die Filterfunktion auf dem member array sucht nach dem übergebenen parameter req.params.id, und gibt diese als json zurück. Dabei castet parseInt den wert in ein int weil es in der url als string übergeben wird und im Membersobjekt als int enthalten ist, sonst würde das === nicht funktionieren. 

Ist die ID nicht vorhanden, wird nix zurückgegeben, das kann man ändern in dem man eine message zurück gibt, wenn keine ID gefunden wurde.
Wir erweitern :
```javascript
// Get Singel Member
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));        
    } else {
        res.status(400).json ({msg: `No member with the id of ${req.params.id}`});    
    }
});
```
Found ist ein bool und .some eine Funktion auf dem Membersobjekt die einfach true ode false zurückgibt wenn die angegeben id exisitert.
Mit res.status kann ein Errorcode (also 400 = bad request) zurückgegben werden mit einer Message als json. Hier wieder in Backticks um die id in der Message mitzuliefern.

## Code aufräumen - routes auslagern
Um Ordnung in den code zu bringen lassen sich die routes auslagern.  
Es wird ein neues Verzeichnis "routes/api" erstellt und darin das file members.js welche die endpoints für die api enthalten soll.  
Nun verschiebt man: 
```javascript
// Get Singel Member
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));        
    } else {
        res.status(400).json ({msg: `No member with the id of ${req.params.id}`});    
    }
});

// simple RestApi
app.get('/api/members',  (req, res) => {
    res.json(members);
})
```
aus index.js in das neue File.

Ebenso:
```javascript
const members = require('./Members');
```
wobei man hier drauf achten muss, das Members jetzt gefunden wird, denn der ausgangspunkt der neuen members.js ist ein anderer, also muss man den Pfad anpassen.

Außerdem nutzen wir express, was eingefügt werden muss:
```javascript
const express = require('express');
```
Und wir nutzen router:
```javascript
const router = express.Router();
```
Wir nutzen nun router anstatt app was man ändern muss:
```javascript
// Get Singel Member
router.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));        
    } else {
        res.status(400).json ({msg: `No member with the id of ${req.params.id}`});    
    }
});

// simple RestApi
router.get('/api/members',  (req, res) => {
    res.json(members);
})
```
Nun noch exportieren:
```javascript
module.exports = router;
```
Um das nun nutzen zu können wir die route nun noch in der index.js bekannt gemacht:
```javascript
app.use('/api/members', require('./routes/api/members'));
```
Es wird also hier erst die route angeben und dann auf das file verwiesen was er bei aufruf dieser route verwenden soll.
Deshalb kann man nun auch in der routes/api/members.js die routes weglassen, das schaut dann so aus:
```javascript
// Get Singel Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));        
    } else {
        res.status(400).json ({msg: `No member with the id of ${req.params.id}`});    
    }
});

// simple RestApi
router.get('/',  (req, res) => {
    res.json(members);
})
```
## Einen neuen Eintrag hinzufügen
Wann immer man etwas an eine api schicken will nutzen man normalerweise "post".
Hier der code für die "routes/api/members.js"
```javascript
router.post('/', (req, res) => {
    res.send(req.body)
});
```
Zunächst eine einfach Arrowfuction die das zurückgibt was wir senden.  
Öffnet man nun postman:
* erstellt einen neun tab als post request
* an die adresse http://localhost:5000/api/members
* setzt nun unter headers:  

| key        | value           |
|------------|-------          |
|Content-Type| application/json|

* und unter body den type "raw"
* so kann man dort ein json-Objekt eintragen was man senden möchte
* wie nehmen hier name und email:
```
{
    "name": "Harald Kannnix",
    "email": "harald@gmail.com",
}
```
Und schickt man das ab, passiert ... nix !!!
Wir send zurück mit res.send ein req.body und dazu braucht man einen Bodyparser der als Modul in express vorhanden ist, den man aber noch nutzen muss.  
In der index.js fügen wir nun eine neue Middleware ein.
```Javascript
app.use(express.json)));
```
Nun sollte man ein response sehen.  
Was nun aber in unserer Arrowfunction passieren soll ist, dass ein neues Member-Objekt erstellt wird und dieses an das bestehende Members Array angehängt wird.  
Also in etwa so:
```javascript
router.post('/', (req, res) => {
    const newMember = {
        "id" : " ... ",
        "name": "Harald Kannnix",
        "email": "harald@gmail.com",
        "status": "activ"
    }
})
```
Damit die ID automatisch generiert wird ( wie es die datenbanken normal selbständig tun) kann man sich hier des Paketes "uuid" behelfen, was eine random id generiert.
```
npm install uuid
```
Hinzufügen in die routes/api/members.js
```javascript
const uuid = require('uuid');
```
Dies kann man dann für die id verwenden, für name und email nutze wir was gesendet wird und zugriff darauf gibt es über req.body.name bzw. req.body.email
```javascript
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'activ'
    }
})
```
Nun fangen wir noch den Fehler ab das email und name auch gesendet werden und hängen dann das ganze mit .push an das array dran. Und geben das komplette Membersarray zurück zur Kontrolle.
```javascript
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'activ'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    members.push(NewMember);
    res.json(members);
})
```
Fettes **ACHTUNG !!!** an dieser Stelle !
Sollte es zu Fehlern kommen wie "name undefined" oder sollte er überhaut Teile des Codes nicht finden, dann kann es daran liegen wann und wo in der index.js Middleware etc geladen wird. Da sollte man auf die Reihenfolge achten!

## Ein Objekt ändern

```javascript
//Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                
                res.json({msg:'Member updated', member});
            }
        });
    } else {
        res.status(400).json ({msg: `No member with the id of ${req.params.id}`});    
    }
});
```
Nun macht man in Postman ein Put request wie beim Member anglegen, gibt dabei aber die Id an, die geupdatet werden soll.

## Ein Objekt löschen

```javascript
//Delete Member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({
            msg:'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
            });
    } else {
        res.status(400).json ({msg: `No member with the id of ${req.params.id}`});    
    }
});
```
Hier langt dann ein einfacher delete request mit Angabe der id: localhost:5000/api/members/1 , um den member zu löschen.
Hier wird filter benutzt um die ID zu suchen. Wie bei Suchen einzelner Einträge.

## express-handlebars

Dies ist ein Paket zum rendern von Webseiten:

- https://www.npmjs.com/package/express-handlebars
- https://github.com/ericf/express-handlebars
- https://www.youtube.com/watch?v=L72fhGm1tfE&ab_channel=TraversyMedia (ab min 58)


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

* Node.js With Passport Authentication | Full Project
    * https://www.youtube.com/watch?v=6FOq4cUdH8k&t=0s&ab_channel=TraversyMedia
* Node.js Crash Course
    *   https://www.youtube.com/watch?v=fBNz5xF-Kx4&t=0s&ab_channel=TraversyMedia
