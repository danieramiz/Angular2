"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**Como la aplicación Angular es Web importamos el módulo platformBrowserDynamic */
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
/**Importamos el modulo que define a nuestra aplicación */
var app_module_1 = require("./app.module");
/**Instanciamos el modulo platformBrowserDynamic*/
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
/**Iniciamos la aplicación haciendo uso del método bootstrapModule del modulo platformBrowserDynamic*/
platform.bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map