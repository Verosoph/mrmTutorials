# MEAN
## Quelle
 - https://www.youtube.com/watch?v=uONz0lEWft0&list=RDCMUC29ju8bIPH5as8OGnQzwJyA&start_radio=1&t=38&ab_channel=TraversyMedia
 


## Environment
Installieren der Angular CLI
```
npm install -g angular-cli
```

Angular installieren 
```
ng new angular-src
```

im angular-cli.json file gibt es eine option "outDir" diese gibt an wohin der fertige build geschrieben wird (für das deployment) wenn 
```
ng build
```
ausgeführt wird. 

Nun kann man den Entwicklungsserver im verzeichnis /angular-src starten mit
```
ng serve
```
___
## Angular

Die Applikation ist aus Components zusamengesetzt. diese kann man manuell erstelle oder für die Angular CLI. 

Zunächst wird ein Verzeichnis components erstellt in /src/app/ .  
Dann wechselt man in das Verzeichnis /src/app/components.
Nun kann man einen neuen Component erstellen mit:
```
ng g component NameDesComponents
```
Dabei wird ein Verzeichnis erstellt mit dem Namen des Components und es werden alle icludes in der /src/app/app.module.ts automatisch erstellt. Als Beispiel wird hier ein Component "navbar" erstellt

```
ng g component navbar
```

In /src/app/components/navbar/navbar.component.ts findet man den Selector 'app-navbar'. Diesen kann man verweden um den Inhalt aus navbar.component.html anzeigen zu lassen.

in /src/app/app.component.html kann man diesen Selector verwenden und der Inhalt aus navbar.component.html wird verwendet.
```html
<app-navbar></app-navbar>
``` 

Um das Beispiel weiter verfolgen zu können werden nun Components für:
* login
* register
* home
* dashboard
* profile


erstellt.

### Add Bootstrap

Aufgerufen beim Serverstart wird die /src/index.html, diese soll zunächst angepasst werden.  
Es soll bootswatch verwendet werden, eine form von Bootstrap.
(https://bootswatch.com)

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mean Auth app</title>
  <link rel="stylesheet" href="https://bootswatch.com/3/spacelab/bootstrap.min.css">
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>
```

### Routing

Zunächst muss das Router Module eingebunden werden.  
In /src/app/app.modules.ts:

```js
import { RouterModule, Routes} from '@angular/router';
```

Außerdem muss es im selben File in die imports eingetragen werden:

```js
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
```
Dabei ist appRoutes ein Object was weiter oben im File erstellt werden muss,  dieses enthält dann die einzelten routes.

```js
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
]
```
Hier enthält die erste route nix, denn sie ist die Homeroute.

Nun kann man einen router-outlet in der /src/app/app.component.html erstellen.

```html
<app-navbar></app-navbar>
<div class=container>
    <router-outlet></router-outlet>
</div>
```

### Navbar erstellen

* https://getbootstrap.com/
* Get started
* Examples
* Irgendwas aussuchen
* Strg+U zeit den Sourcecode der Seite und man kann Copy+Paste
* das fügt man dann in die /src/app/components/navbar/navbar.component.html ein
* oder man schreibt eine eigene Navbar

```html
 <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
      </ul>
    </div>
  </div>
</nav>
```

Statt der href="" links wird hier [routerLink]="['/']" verwendet für in dem Fall das zu HomeComponent

```html
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">MeanAuth</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
      <ul class="nav navbar-nav">
        <li><a [routerLink]="['/']">Home <span class="sr-only">(current)</span></a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a [routerLink]="['/login']">Login</a></li>
        <li><a [routerLink]="['/register']">Register</a></li>
      </ul>
    </div>
  </div>
</nav>
```
### Homepage 

Die src/app/components/home/home.component.ts schaut wie folgt aus:
```html
<div class="jumbotron text-center">
  <h1>
    MEAN Authtentication App
  </h1>
  <p>Welcome</p>
  <div>
    <a class="btn btn-primary" [routerLink] = "['/register']">Register</a>
    <a class="btn btn-primary" [routerLink] = "['/Login']">Login</a>
  </div>
</div>
```
### Register

Hier geht es darum den User zu registerien um die Daten später an die api schicken zu können. Zunächst ersellt man Variablen die dem user Model entsprechen in src/app/components/register/register.component.ts.

```js
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor() { }

  ngOnInit() {
  }

}
```
Dann erstellt man das html in src/app/components/register/register.component.html .
```html
<div>
  <h2 class="page-header">Register</h2>
  <form (submit)="onRegisterSubmit()" >
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" [(ngModel)]="name" name="name" class="form-control" id="name" placeholder="Enter Name">
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" [(ngModel)]="username" name="username" class="form-control" id="username" placeholder="Enter Username">
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" [(ngModel)]="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" [(ngModel)]="password" name="password" class="form-control" id="password" placeholder=" Enter Password">
    </div>
    <input type="submit" class="btn btn-primary" value="Submit">
  </form>
  </div>
```
Die Form hat 4 Felder und einen submit-Button.
Mit ngModel erhält man zugriff auf die Daten in den Felder.
Im from tag oben steht ein event:
```html
  <form (submit)="onRegisterSubmit()" >
``` 
Dies wird ausgelöst beim Pressen des submit-Buttons. Dies ist eine Funktion die in src/app/components/register/register.component.ts aufgerufen wird.

Man könnte nun in die Funktion ein this.name schreiben, dies würde die variable name ausgeben welche an das Feld Name in der Form gebunden ist.

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor() { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log(this.name);
  }
}
```
Gibt man einen Wert in der Form für namen ein und clickt submit, wird dieser Wert in der Console erscheinen.

Erstellen wir nun ein Objekt aus den aus der form gewonnenen Daten um dies dann verarbeiten zu können, in der Funktion onRegisterSubmit() .

```js
  onRegisterSubmit(){
    const user = {
      name : this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    }
  }
```
### Validation

Diese erhaltenen Daten sollten Validiert werden, dazu lässt sich ein Service erstellen.

Dazu erstellt man ein neues Verzeichnis src/app/services
In dem Verzeichnis lässt sich dann mit der Angular-CLI der service automatisch erstellen.
```
ng g service validate
```
Dies muss dann von hand in die src/app/app.module.ts eingetragen werden.
```js
import { ValidateService } from  './services/validate.service';
```
Außerdem in die providers im selben File.

```js
  providers: [ValidateService],
```

Nun erstellt man ein validateRegister() Funktion in src/app/services/validate.service.ts .
```js
  validateRegister(user){
    if(user.name == undefined || 
      user.email == undefined ||
      user.username == undefined ||
      user.password == undefined 
    ) {
      return false
    } else {
      return true
    }
  }
```
Die Funktion bekommt als Parameter das user Objekt.
Und das wird untersucht,  ob alle geforderten werte enthalten sind. 

Man kann außerdem die email auf das richtige format checken in einer extra Funktion validateEmail() .
```js
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
```
Diese Funktion bekommt die emailadress als parameter und 
untersucht mit hilfe eines regex die Richtigkeit.
(test ist eine js funktion )

Nun wird der validateService in die src/app/component/register/register.component.ts integriert um sie darin verwenden zu können.

```js
import { ValidateService } from '../../services/validate.service';
```
Dieser muss außerdem im contrutor eingetragen werden um in verwenden zu können.

```js
  constructor(
    private validateService: ValidateService, 
  ) { }
```
Nun kann man in die onRegisterSubmit() Funktion die Validierung verwenden.

```js
// Require Fields
if(!this.validateService.validateRegister(user)){
    console.log('please fill in all fields');
    return false;
}

// validate Email
if(!this.validateService.validateEmail(user.email)){
    console.log('please fill in a valid email adress');
    return false;
}
```
Dies könnte man jetzt testweise ausprobieren. Ist aber noch nicht besonders schon. Buzzword: Flash Messages

### Flash Messages

* https://www.npmjs.com/package/angular2-flash-messages (möglichereise schon nicht mehr up to date)

Im angular-src Verzeichnis muss man dies nachinstallieren:

```
npm install angular2-flash-messages --save
```
Das neue module muss dann in das src/app/app.module.ts File geschrieben werden.
```js
import { FlashMessagesModule } from 'angular2-flash-messages';
```
Außerdem in die imports im selben File
```js
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
```
Und man braucht wieder ein outlet wie beim router in der src/app/app.component.html

```html
<app-navbar></app-navbar>
<div class=container>
    <flash-messages></flash-messages>
    <router-outlet></router-outlet>
</div>
```

### -> zurück zur Validierung

Nun wird das Flash-Messages Module in die src/app/components/register/register.component.ts eingebunden und in den contructor geschrieben.
```js
import { FlashMessagesService } from 'angular2-flash-messages';
```

```js
  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
  ) { }
```

Nun lässt sich jederzeit mit this.flashMessage der service verwenden. 

Dies machen wir dann gleich auch in onRegisterSubmit() :
```js
    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
```
Hierbei kann man in ein css Klasse mitgeben für die Farbe und ein Timeout in Millisekunden wann die Message wieder verschwinden soll.

### Auth Service & User Registration

Als erstes generieren wir einen neuen Service auth in src/app/services

```
ng  g service auth
```
Der auth Service wird wieder in src/app/app.module.ts eingebunden:
```js
import { AuthService } from  './services/auth.service';
```
und
```js
  providers: [ValidateService, AuthService],
```
Die src/app/services/auth.service.ts passen wir folgendermaßen an:

```js
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {
    }

    registerUser(user) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:8000/users/register', user, {headers: headers})
        .map(res => res.json());
    }
}
```
* Es wird ein http und header Module eingebunden
* Klassenproperties werden erstellt für token und user
* man schreibt das http ind den constuctor
* es wird eine registerUser Funktion erstellt
    * eine header Objkt werd erstellt
    * diese bekommt engehängt was wir übertragen wollen (wie in Postman)
    * es wird ein Post request mit dem api endpoint, dem userObjekt und dem Header zurückgegben und das .map ist ein Observable was das json bei erfolg zurückgibt.

Nun zurück zu src/app/components/register/register.component.ts:  
Auth Service einbinden:


```js
import { AuthService } from '../../services/auth.service';
```
im constructor bekannt machen:
```js
  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
  ) { }
```
```js
// Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
    }
```

wegen des redirects müssen wir noch router einbinden.

```js
import { Router } from '@angular/router';
```
und im contructor
```js
  constructor(
    private validateService: ValidateService, 
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) { }
```


___

## Errors

* node_modules/@types/node/index.d.ts (20,1): Invalid 'reference' directive syntax.

    * Had the same issue. Open the file ../node_modules/@types/node/index.d.ts and remove the third slash in
```
/// <reference lib="es2015" />
```    

```
// Reference required types from the default lib:
// <reference lib="es2015" />

// Base definitions for all NodeJS modules that are not specific to any version of TypeScript:
/// <reference path="base.d.ts" />

// TypeScript 3.2-specific augmentations:
```
