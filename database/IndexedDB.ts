
export class IndexedDB{


  constructor() {

    }

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
           var request = window.indexedDB.open('shoppingListDB', 2);
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


   createItemsStore() {
  //Creamos el Items Store, el cual funciona como una tabla para almacenar
  //los datos de proudctos y acntidades
  var objectStore = this.db.createObjectStore('items', { autoIncrement : true });
  //Definimos un campo o indice para guardar los nombres de los produtos
  objectStore.createIndex("productName", "productName", { unique: true });
  //Definimos un campo o indice para guardar las cantidades de los produtos
  objectStore.createIndex("cantidad", "cantidad", { unique: false });
  //Implementamos un callback para el evento oncomplete con la finalidad de saber cuando
  //se ha logrado crear el Store
  objectStore.transaction.oncomplete = function(event) {
    //Aqui el store ya ha esta creado y listo para ser usado
  }
}

loadAllItems() {
    var self = this;
    //Obtenemos una referencia del Store items mediante una transaction al Store items de tipo readonly
    //ya que lo que buscamos es solo leer el contenido del mismo
    var itemObjectStore = self.db.transaction('items', "readonly").objectStore('items');
    //Con la referencia del Store item abrimos un cursor para iterar sobre cada uno de los obejto Product
    //que contiene el Store y lo agreamos a nuetro array de items
    itemObjectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
  //      self.items.push(cursor.value);
        cursor.continue();
      } else {
        //Aquí ya hemos culminado de iterar sobre todos los Items guardado
      }
    };
}

}
