# TTInteractive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Linting

Run `npm run lint`

## Prettier

Run `npm run prettier`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Building and running the app

### Front-End

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Other related commands are available as defined in the `scripts` object in `package.json`.

### Back-End

Run `node app` for a backend server. The server serves the Angular app and static asset files, and provides API endpoints for the frontend.

The server runs on port `3003` by default.

## Configuration

### Express Server Configuration

The Express/Node.js server is configured using a JSON file `server/configuration/environments/NODE_ENV.json` for general server config and a JSON file `server/configuration/programs/programs.NODE_ENV.json` for program(s) config.

_NOTE:_ All paths in the environment, admin and program configuration files are relative to the `server` directory.

##### Reference

"isProductionServer": false,
"port": 3003,

"authSecret": "11112222aaaassss33334444ddddffff55556666gggghhhh7777",
"sessionDomain": "localhost",
"sessionStore": "null",
"sessionKeys": {
"userInfo": "userInfo"
},

"logFilePath": "../logs/ro.log",
"verbose": true

| Key                | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isProductionServer | Boolean | Used in app setup to determine whether the app is running in production or not. Set this to `true` in environments where you want to simulate a production environment, like `integration` or `uat`. (Default: `true` when `NODE_ENV === 'production'` or `NODE_ENV === 'prod'`, and `false` otherwise)                                                                                                                                                                                     |
| logFilePath        | String  | Path to write rewardops-sdk-node logs. (Relative to `server`.)                                                                                                                                                                                                                                                                                                                                                                                                                              |
| port               | Number  | Server port number.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| sessionDomain      | String  | Domain/hostname in which the session cookie will be valid. (Used in the `Set-Cookie` header.)<br><br>If this sessionDomain is not valid for the domain(s) on which you are running your app (and/or admin app), users will not be able to log in.<br><br>**NOTE:** This is used in admin impersonation. Impersonation relies on the cookie being valid in both the admin and catalog hostnames. (E.g., a cookie for "example.com" will work for "admin.example.com" and "app.example.com".) |
| sessionStore       | String  | The type of session storage to use. Possible values are `"redis"` or `null`. (Optional. If value is not `"redis"`, defaults to in-memory storage. For non-development environments, use Redis.)                                                                                                                                                                                                                                                                                             |
| verbose            | Boolean | Whether or not rewardops-sdk-node logs should be verbose.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| sessionKeys        | Object  | stores all session keys                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Program config

Add an array of program config objects in `server/configuration/programs/programs.NODE_ENV.json` for each of the program apps you wish to serve, where `NODE_ENV` is the value of the environment variable `NODE_ENV`. (Default: `"development"`.)

If you only have one program/app, this can be an array of one object.

##### Reference

| Key                      | Type   | Description                                                                                                                           |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| traffictech              | Object | An object containing Traffic Tech-specific configuration values, such as API endpoints.                                               |
| traffictech.apiRootUrl   | String | Root URL of the Traffic Tech API instance to use.                                                                                     |
| traffictech.apiEndpoints | Object | Paths to various Traffic Tech API endpoints. See the sample config file for a full list of values.                                    |
| hostName                 | String | Hostname of the app. Used to configure a virtual host to direct traffic to that hostName to the correct Angular app `dist` directory. |

## Server architecture

- `server/index.js` is the main entry point for the server.
- `server/application.js` initializes the application (including initializing the program engines and admin engine) and exports the Express app.
- The program/admin router instances, passport instances, and other program- and admin-specific data are the responsibility of program and admin engines.

  The engine files are in the `server/engines` directory.

  Each program has its own engine. For program-specific routes (i.e., the API and view routes), the relevant program engine is attached to the request object as `req.engine`. This is how a route handler knows which program's app the request is from.

- `server/configuration/index.js` processes and exports the app-level config, as well as the program and admin configs.
- `server/session.js` exports the session object.
- Routes are declared in the `server/routes` directory.
- (Most) route handlers delegate to controller methods. Controllers are defined in the `server/controllers` directory.

## Workflow

### Code scaffolding

Run `ng generate component component-name` to generate a new Angular component. You can also use `ng generate directive/pipe/service/class`.

### Linting TypeScript

Running `ng lint` will run the `lint` npm script by default, which uses tslint. You can modify these scripts in `package.json` to run the tools of your choice

## Internationalization

WIP.

#### Mark text with the i18n attribute

Place the `i18n` on every element tag whose fixed text should be translated. For example:

`<h1 i18n="<optional meaning>|<optional description>">Hello i18n!</h1>`

#### To add Internationalization to attributes use i18n-x tags

Where `x` is the name of the attribute. For example:

`<img [src]="logo" i18n-title title="logo" />`

#### How-to:

To achieve Internationalization with Angular, we need to add the `i18n` tag to all the texts which require translation. And then you build a translation source file (messages.xlf) which has `source` and `target` tags for each entry with the `i18n` tag. The `source` tags are the english/default text and we populate the `target` tags with the translated text. Here is a sample `message.xlf` file:

```
<trans-unit id="af2ccf4b5dba59616e92cf1531505af02da8f6d2" datatype="html">
  <source>Hello i18n!</source>
  <target>¡Hola i18n!</target>
  <note priority="1" from="description">Provided description</note>
  <note priority="1" from="meaning">Provided meaning</note>
</trans-unit>
```

Steps to do Internationalization:

- Mark text with the `i18n` attribute
- Create a translation source file with the ng-x18n tools
- Fill in the target values in the source file (separate file for each language)
- Merge the completed translation file into the app

For more information on how to handle singular/plural translations, gender based translations and building the `message.xlf` for each language, refer to [Angular Internationalization](https://angular.io/guide/i18n)

## Angular Style Guide

We use the official Angular style guide for this application: [Official Angular Style Guide](https://angular.io/guide/styleguide)

## CI / CD

TBD
