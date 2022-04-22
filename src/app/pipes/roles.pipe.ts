import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  transform(value: String): String {
    switch (value) {
      case 'ADMIN_ROLE':
        return 'administrador';
      case 'EMPLEADOR_ROLE':
        return 'empleador';
      case 'EMPLEADO_ROLE':
        return 'empleado';

       /*  case 'PROFESIONAL_ROLE':
        return 'empleado'; */

        case 'CAPACITATE_ROLE':
          return 'capacitarse';

      default:
       return '';
    }
  }
}
