"use strict";
/**
 * Importamos el modulo Component de la librería
 * @angular/core
*/
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
//Importamos el servicio ListService del fichero app.service.ts
var app_service_1 = require("./app.service");
/**
 * Definimos el componente haciendo uso del decorator @Component
 * y los siguientes parámetros:
 * selector = define el nombre del selector CSS usado por un elemento
 *            HTML que representa al componente
 * template = define la plantilla HTML que renderiza el contenido en pantalla
*/
var AppComponent = /** @class */ (function () {
    //Usamos los parámetros del constructor del componente para
    // instanciar el o los servicios, en este caso inyectamos e
    // instanciamos el servicio ListService, para poder hacer uso del mismo
    //en cualquier otro método de este componente
    function AppComponent(listService) {
        this.listService = listService;
        this.title = 'Mi Shopping List';
        //Declaramos el Array de Items que se mostrará en pantalla de tipo Product
        this.items = [];
        this.newProduct = {
            productName: "",
            cantidad: 0
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        //ngOnInit es un método que se ejecuta cuando el componente
        //esta completamente instanciado
        var _this = this;
        //Usamos el método getItems() del ListService para obtener los items activos
        this.listService.getItems().then(function (items) { return _this.items = items; });
    };
    AppComponent.prototype.addProduct = function () {
        var _this = this;
        //Verificamos si el usuario ha introducido un nombre de producto y una cantidad
        if (this.newProduct.productName === "" || this.newProduct.cantidad === 0) {
            return;
        }
        //Usamos el método addProduct del Servcio ListService para almacenar el producto
        this.listService.addProduct(this.newProduct).then(function (items) {
            //Al resolverse la Promise actualizamos la propiedad items del componente
            //con el parámetro items que nos devuelve la Promise resuelta en el método
            //addProduct del Servcio ListService
            _this.items = items;
            //Blanquemaos los imputs
            _this.newProduct.cantidad = 0;
            _this.newProduct.productName = "";
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'mi-app',
            templateUrl: 'app/app.template.html',
            //template: '<h1>Este es mi primer componente Angular 2</h1>'
            providers: [app_service_1.ListService]
        })
        /**
         * Declaramos el AppComponent bajo la clase AppComponent
         * y lo exportamos para que sea accesible
         */
        ,
        __metadata("design:paramtypes", [app_service_1.ListService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map