import { Component } from '@angular/core';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'nga-manage-people',
  templateUrl: './manage-people.html',
})

export class ManagePeopleComponent {
  cardViewVisibilty = true;
  peoplelist: any = [{
    Name: 'User1',
    Email: 'user1@mail.com',
    Contact: '123456789',
    Points: '1000'
  },
  {
    Name: 'User2',
    Email: 'user2@mail.com',
    Contact: '123456789',
    Points: '2000'
  },
  {
    Name: 'User3',
    Email: 'user3@mail.com',
    Contact: '123456789',
    Points: '3000'
  },
  {
    Name: 'User4',
    Email: 'user4@mail.com',
    Contact: '123456789',
    Points: '3000'
  },
  {
    Name: 'User5',
    Email: 'user5@mail.com',
    Contact: '123456789',
    Points: '3000'
  },
  {
    Name: 'User6',
    Email: 'user6@mail.com',
    Contact: '123456789',
    Points: '3000'
  },
  {
    Name: 'User7',
    Email: 'user7@mail.com',
    Contact: '123456789',
    Points: '3000'
  },
  {
    Name: 'User8',
    Email: 'user8@mail.com',
    Contact: '123456789',
    Points: '3000'
  },
  {
    Name: 'User9',
    Email: 'user9@mail.com',
    Contact: '123456789',
    Points: '3000'
  }];
  constructor() {
  }

switchView(){
if(this.cardViewVisibilty == true){
  this.cardViewVisibilty = false;
}
else{
   this.cardViewVisibilty = true;
}
}

}
