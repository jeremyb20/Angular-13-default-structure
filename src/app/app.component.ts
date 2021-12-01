import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { NotificationService } from './services/notification.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: String;
  sidebarExpanded = true;
  user:any;
  checkinterent: any;
  status: OnlineStatusType; //Enum provided by ngx-online-status
  onlineStatusCheck: any = OnlineStatusType;

  constructor(private router: Router, private _notificationService: NotificationService, private onlineStatusService: OnlineStatusService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: any) => {
      this.user = event.url;
    });

    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // Retrieve Online status Type
      this.status = status;
      if(this.status == 0 ){
        this._notificationService.warning('Error de conexión', 'Lo sentimos, se ha perdido la conexión', 6000);
      }else{
        this._notificationService.success('Hola', 'Se ha establecido la conexión', 6000);
      }
    });
  }

 

  ngOnInit(){
    
  }
}
