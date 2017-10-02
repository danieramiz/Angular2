"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Con la sentencia import, importamos el NgModule del @angular/core
el cual contiene  los componemtes funcionales necesarios para una
aplicación Angular y también importamos BrowserModule del @angular/platform-browser
el cual es necesario si nuestra aplicación se ejecuta en un Browser.
 */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
/**Importamos el modulo FormsModule */
var forms_1 = require("@angular/forms");
/*
Haciendo uso de la anotación @NgModule declaramos un módulo y en el parámetro array
"imports"" inyectamos los módulos de los cuales depende nuestra app, en este caso el modulo
BrowserModule y FormsModule
 */
var AppModule = /** @class */ (function () {
    /*Definimos la clase AppModule y la exportamos para que sea accesible*/
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent]
        })
        /*Definimos la clase AppModule y la exportamos para que sea accesible*/
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map