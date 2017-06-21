import { Component } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-add-activity',
  templateUrl: './add-activity.html',
})

export class AddActivityComponent {
  
  msgs: Message[] = [];

  constructor() {
  }

  showInfo() {
        this.msgs = [];
        this.msgs.push( { severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' } );
    }

}
