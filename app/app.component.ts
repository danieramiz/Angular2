/**
 * Importamos el modulo Component de la librería
 * @angular/core
*/

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


//Importamos el servicio ListService del fichero app.service.ts
import { ListService } from './app.service';

import { Product } from './Product';

/**
 * Definimos el componente haciendo uso del decorator @Component
 * y los siguientes parámetros:
 * selector = define el nombre del selector CSS usado por un elemento
 *            HTML que representa al componente
 * template = define la plantilla HTML que renderiza el contenido en pantalla
*/
@Component({
	selector: 'mi-app',
	templateUrl: 'app/app.template.html',
	//template: '<h1>Este es mi primer componente Angular 2</h1>'
	providers: [ListService]
})

/**
 * Declaramos el AppComponent bajo la clase AppComponent
 * y lo exportamos para que sea accesible
 */
export class AppComponent implements OnInit{

	title = 'Mi Shopping List';


	//Declaramos el Array de Items que se mostrará en pantalla de tipo Product
  	items: Product[] = [];

  	//Usamos los parámetros del constructor del componente para
  	// instanciar el o los servicios, en este caso inyectamos e
  	// instanciamos el servicio ListService, para poder hacer uso del mismo
  	//en cualquier otro método de este componente
  	constructor(private listService: ListService) {

  }


  	ngOnInit(): void {
    //ngOnInit es un método que se ejecuta cuando el componente
    //esta completamente instanciado
 
	//Usamos el método getItems() del ListService para obtener los items activos
    this.listService.getItems().then(items => this.items = items);

  }

   addProduct():void {
    //Verificamos si el usuario ha introducido un nombre de producto y una cantidad
    if (this.newProduct.productName === "" || this.newProduct.cantidad === 0){
      return;
    }

    //Usamos el método addProduct del Servcio ListService para almacenar el producto
    this.listService.addProduct(this.newProduct).then(items => {
      //Al resolverse la Promise actualizamos la propiedad items del componente
      //con el parámetro items que nos devuelve la Promise resuelta en el método
      //addProduct del Servcio ListService
      this.items = items
      //Blanquemaos los imputs
      this.newProduct.cantidad = 0;
      this.newProduct.productName = "";
    });
  }

  newProduct: Product = {
  	productName: "",
  	cantidad: 0
  }




}
