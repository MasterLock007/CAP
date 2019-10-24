# Xoli 

## IMPORTANTE
Recomiendo usar **GitHub Desktop** para clonar el proyecto y puedan hacer sus commit, push, pull, etc. debido a su facilidad de uso.
- No realizar commits ni push a menos que tu código este funcionando al 100% (Si falla la aplicación se sabra quien realizo un push con fallos).
- No modificar código que no pertenezca a tu módulo a menos que ese equipo te haya dado permiso.
- Al relizar un commit, escribe que cambio hiciste, incluso por mas pequeño que parezca.
- Si no estas añadido como colaborador a este Repo. mandame tu usuario de **GitHub** al grupo de Facebook (**Mision Mauro x2**), mencionandome como **Cesar LP Ramirez**.
- Si tienes dudas de como usar esta herramienta de **GitHub** no dudes en preguntar.
- Hacer Pull antes de que hagas cualquier cambio, para tener la ultima version de la aplicación.
- Se recomienda hacer Pull antes de hacer un Push.
- Quitar imports que no uses, para que no aparezcan en los Warnings.
- Añadir color al NavBar, como primary.
 ```bash
 <ion-navbar  color="primary" ></ion-navbar>
 ```
##prb de fercho :) 2 3
## Instalar Xoli
Como instalar: **Xoli**.
Una vez descargado el Repositorio desde GitHub Desktop

Abrir un terminal desde la ruta raiz de la app **Xoli**  donde la clonarón ejecutar el siguiente comando:
```bash
 npm install
 ```
 Una vez que haya terminado, correr el siguiente comando:
 ```bash
 ionic serve
 ```
 Para esta última actualizacion y si no les corre, intenten:
 ```bash 
  npm install --save @ionic-native/camera@4.7.0
  ```
```bash 
ionic cordova platform add browser
  ```

Y ya sea que lo corran con el siguiente comando al finalizar lo anterior:

```bash 
 ionic cordova run browser
   ```
   
 o el típico 
 ```bash
 npm install
 ```

 
 
 ## Cuenta Firebase
- Usuario: [appxoli@gmail.com](mailto:appxoli@gmail.com) - Password: xoliappp 

##  Errores comúnes

 - Si da error de Typescript, referente a que no encuentra el modulo **RXJS** o no encuentra el módulo **AngularFire**, o parecidos, hacer lo siguiente:
 Abrir tu **CLI** en la raíz del proyecto, y colocar el siguiente comando:
  ```bash
 npm i
 ```


