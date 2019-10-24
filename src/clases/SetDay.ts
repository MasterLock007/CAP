export class SetDay{

  getDay(){
    var hi="hola";
      var today=new Date();

      switch (today.getDay()) {
        case 0:
          hi='domingo';
        break;
        case 1:
          hi='lunes';
        break;

        case 2:
          hi='martes';
        break;

        case 3:
          hi='miercoles';
        break;

        case 4:
          hi='jueves';
        break;
        case 5:
          hi='viernes';
        break;
        case 6:
          hi='sabado';
        break;

        default:
          break;
      }
      return hi;


  }

}
