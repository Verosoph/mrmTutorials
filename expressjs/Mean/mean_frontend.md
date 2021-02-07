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
