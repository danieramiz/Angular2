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
var Product_1 = require("./Product");
var ListService = /** @class */ (function () {
    function ListService() {
        //Array de Items que se han de mostrar en pantalla
        this.items = [];
        this.newProduct = {
            productName: "",
            cantidad: 0
        };
        //Inicializamos IndexedDB
        this.initIndexedDB();
    }
    ListService.prototype.getItems = function () {
        return Promise.resolve(this.items);
    };
    ListService.prototype.initIndexedDB = function () {
        //Obtenemos una referencia del servicio
        var self = this;
        //Verificamos si el Browser en el que se ejecuta la aplicacion soporta IndexedDB
        if (!window.indexedDB) {
            //En caso de que no soporte lo notificamos con alert al usuario
            window.alert("Su navegador no soporta una versión estable de indexedDB.");
            return;
        }
        else {
            //En caso de que el Browser si soporte IndexedBD creamos/instaciamos nuestra BD
            //con el método open pasandole el nombre y la versión de la misma
            var request = window.indexedDB.open('shoppingListDB', 2);
            //Definimos un callback del evemto onupgradeneeded para saber cuando esta lista
            //la BD para craer el o los Store necesarios
            request.onupgradeneeded = function (event) {
                self.db = request.result;
                if (self.db != null) {
                    //Llamamos al método para crear el o los Stores
                    self.createItemsStore();
                }
            };
            //Definimos un callback del evento onerror para saber si ha ocurrido algun error y
            //notificarlo al usario con un alert
            request.onerror = function (event) {
                window.alert("onError" + request.error);
            };
            //Definimos un callback del evento onsuccess para saber que hemos instanciado la BD correctamente
            request.onsuccess = function (event) {
                self.db = request.result;
                //Llamamos la método para leer todos los items (Productos y Cantidades) que tenemos almacenados
                self.loadAllItems();
            };
        }
    };
    ListService.prototype.createItemsStore = function () {
        //Creamos el Items Store, el cual funciona como una tabla para almacenar
        //los datos de proudctos y acntidades
        var objectStore = this.db.createObjectStore('items', { autoIncrement: true });
        //Definimos un campo o indice para guardar los nombres de los produtos
        objectStore.createIndex("productName", "productName", { unique: true });
        //Definimos un campo o indice para guardar las cantidades de los produtos
        objectStore.createIndex("cantidad", "cantidad", { unique: false });
        //Implementamos un callback para el evento oncomplete con la finalidad de saber cuando
        //se ha logrado crear el Store
        objectStore.transaction.oncomplete = function (event) {
            //Aqui el store ya esta creado y listo para ser usado
        };
    };
    ListService.prototype.loadAllItems = function () {
        var self = this;
        //Obtenemos una referencia del Store items mediante una transaction al Store items de tipo readonly
        //ya que lo que buscamos es solo leer el contenido del mismo
        var itemObjectStore = self.db.transaction('items', "readonly").objectStore('items');
        //Con la referencia del Store item abrimos un cursor para iterar sobre cada uno de los obejto Product
        //que contiene el Store y lo agreamos a nuetro array de items
        itemObjectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                self.items.push(cursor.value);
                cursor.continue();
            }
            else {
                //Aquí ya hemos culminado de iterar sobre todos los Items guardado
            }
        };
    };
    ListService.prototype.addProductToDB = function (newProd) {
        var self = this;
        //Almacenamos los valores del nuevo producto y su cantidad en el Items Store
        //mediante un objeto transaction al Store items de tipo readwrite
        var itemObjectStore = this.db.transaction('items', "readwrite").objectStore('items');
        //Con el objeto del Items Store creamos una peticion de tipo inserción de datos usando el método add del objectStore
        var req = itemObjectStore.add(newProd);
        //Implementamos un callback para el evento onsuccess para saber cuando hemos agregado con éxito el nuevo objeto Product
        req.onsuccess = function (event) {
            //Aqui sabemos que se ha agregado con éxito
        };
        //Implementamos un callback para el evento onerror para saber si ha ocurrido algun error durante la inserción del objeto
        //y en caso tal lo notificamos al usaurio con un alert
        req.onerror = function (event) {
            window.alert("addProductToDB onError" + req.error);
        };
    };
    //Método para aregar items a la lista de items activos
    //Este método devuelve una Promises con lo cual podemos manejar de
    //ser necesario peticiones asincronas
    ListService.prototype.addProduct = function (newProduct) {
        var newProd = new Product_1.Product(); //Creamos un nueva instancia del Product
        newProd.productName = newProduct.productName; //Agregamos al nuevo producto, el nombre y la cantidad informada por el usuario
        newProd.cantidad = newProduct.cantidad;
        this.addProductToDB(newProd); //Agregamos el nuevo item (producto, cantidad) a la IndexedDB
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