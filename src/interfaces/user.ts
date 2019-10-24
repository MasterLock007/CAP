export interface User{
    email:string;

    //password es donde se almacena el password al momento de iniciar sesion
    contrasena:string;

    //new es donde se almacena el nuevo password
    new:string;

    //oldpassword es donde se compara el valor que recibe el input de contrasena actual
    oldpassword:string;
}