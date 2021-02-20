# AngularCrypt

This is a demo how teach Angular some crypto tricks with X.509 certificates on application layer.

## Status

**pre Alpha** It does nothing more than creating und showing private key and CSR in browser for now.

## Version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

# Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files and will create some text fields with a random string, a private key and a PKCS#10 certificate request.

# Angular Development Process

This POC will not interfere typical Angular development process.

## What is different or new?

`./src/app/lib` contains crypto workhorse, everything else is Angular specific stuff.

`crypt.service.ts` is interface to crypto tools from ./lib and provides an Angular service to app.

## Requirements

add **"allowJs": true** to tsconfig.json 

## Know Issues

asn1js needs CommonJS, which **may** yield into minification trouble. See https://angular.io/guide/build#configuring-commonjs-dependencies for further information.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
