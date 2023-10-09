import { Component } from '@angular/core';
import { PersonModel } from 'src/app/model/person.model';
import { UserModel } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/administration/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  id_almacen: number = 20;
  person: PersonModel = {
    id_persona: 0,
    ci_ruc: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
  };
  users: UserModel[] = [];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsersByIdStore();
   }

  public getAllUsersByIdStore() {
    this.usersService.getAllUsersByIdStore(this.id_almacen).subscribe(
      (user: any) => {
        this.users = user;
      }
    );
  }
}
