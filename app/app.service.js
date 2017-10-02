"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var ListService = /** @class */ (function () {
    function ListService() {
        //Array de Items que se han de mostrar en pantalla 
        this.items = [];
        this.newProduct = {
            productName: "",
            cantidad: 0
        };
    }
    ListService.prototype.getItems = function () {
        return Promise.resolve(this.items);
    };
    //Método para aregar items a la lista de items activos
    //Este método devuelve una Promises con lo cual podemos manejar de 
    //ser necesario peticiones asincronas
    ListService.prototype.addProduct = function (newProduct) {
        var newProd = new app_component_1.Product(); //Creamos un nueva instancia del Product
        newProd.productName = newProduct.productName; //Agregamos al nuevo producto, el nombre y la cantidad informada por el usuario
        newProd.cantidad = newProduct.cantidad;
        this.items.push(newProd); //Agregamos en nuevo producto a la lista
        return Promise.resolve(this.items); //resolvemos la Promise retornando los items activo incluyendo el item agreagdo
    };
    ListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
//# sourceMappingURL=app.service.js.map