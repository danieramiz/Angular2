import {Injectable } from '@angular/core';

import { Product } from './app.component';

@Injectable()

export class ListService {

	//Nombre de la BD
    static DATABASE_NAME = 'shoppingListDB';
    //Versión de la Base da datos
    static DATABASE_VERSION = 2;
    //Nombre del Store o Tabla de items
    static ITEMS_TABLE = 'items';
    //Objeto de IndexedDB  
    db;


     initIndexedDB(){
        //Obtenemos una referencia del servicio  
        var self = this;
        //Verificamos si el Browser en el que se ejecuta la aplicacion soporta IndexedDB
        if (!window.indexedDB) {
            //En caso de que no soporte lo notificamos con alert al usuario
            window.alert("Su navegador no soporta una versión estable de indexedDB.");
            return;
        } else {
            //En caso de que el Browser si soporte IndexedBD creamos/instaciamos nuestra BD 
            //con el método open pasandole el nombre y la versión de la misma
            var request = window.indexedDB.open(ListService.DATABASE_NAME, ListService.DATABASE_VERSION);
            //Definimos un callback del evemto onupgradeneeded para saber cuando esta lista 
            //la BD para craer el o los Store necesarios     
            request.onupgradeneeded = function(event) {
                self.db = request.result;
                if(self.db != null) {
                    //Llamamos al método para crear el o los Stores
                    self.createItemsStore();
                }
            };
            //Definimos un callback del evento onerror para saber si ha ocurrido algun error y 
            //notificarlo al usario con un alert
            request.onerror = function(event) {
              window.alert("onError" + request.error);
            };
            //Definimos un callback del evento onsuccess para saber que hemos instanciado la BD correctamente 
            request.onsuccess = function(event) {
                self.db = request.result;
                 //Llamamos la método para leer todos los items (Productos y Cantidades) que tenemos almacenados
                self.loadAllItems();
            };
        }
    }



	//Array de Items que se han de mostrar en pantalla 
  	items: Object[] = [];

  	constructor() {
  		//Inicializamos IndexedDB
  		this.initIndexedDB();
  	}

  	getItems(): Promise<Product[]> {
  		return Promise.resolve(this.items);
  	}

   	newProduct: Product = {
	  	productName: "",
	  	cantidad: 0
  	} 


   	//Método para aregar items a la lista de items activos
    //Este método devuelve una Promises con lo cual podemos manejar de 
    //ser necesario peticiones asincronas
    addProduct(newProduct: Product): Promise<Product[]> {      
        
        let newProd: Product = new Product();  //Creamos un nueva instancia del Product
        newProd.productName = newProduct.productName;  //Agregamos al nuevo producto, el nombre y la cantidad informada por el usuario
        newProd.cantidad = newProduct.cantidad;        
        this.items.push(newProd);  //Agregamos en nuevo producto a la lista
        return Promise.resolve(this.items); //resolvemos la Promise retornando los items activo incluyendo el item agreagdo
    }



}