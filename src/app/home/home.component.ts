import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DashComponent } from '../dash/dash.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { HomeService } from './home.service';
import { AlertInterface } from '../alert/alert.interface';
import { DoubleCheckComponent } from '../double-check/double-check.component';
import { DoubleCheckService } from '../double-check/double-check.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SideBarComponent,
    DashComponent,
    AlertComponent,
    DoubleCheckComponent,
  ],
  providers: [HomeService, AlertService, DoubleCheckService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {'class' : 'w-full'}
})
export class HomeComponent implements OnInit {
  @ViewChild(SideBarComponent) private sideBar!: SideBarComponent;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService,
    private doubleCheckService: DoubleCheckService
  ) {}

  ngOnInit(): void {
    this.homeService.getCompAlert().subscribe(
      alert => {
        this.alertService.setAlert(alert);
        this.sideBar.ReloadSideBar();
      }
    );
    // Delete File
    this.homeService.getDeleteDCheck().subscribe(
      deleteReq => {
        this.doubleCheckService.setDelete(deleteReq);
      }
    );
    this.doubleCheckService.getDeleteConf().subscribe(
      deleteCon => {
        this.homeService.deleteConfirmation(deleteCon);
      }
    );

    // Delete Account
    this.homeService.getDeleteAccountReq().subscribe(
      accDelReq => {
        this.doubleCheckService.setAccDelete(accDelReq);
      }
    );
    this.doubleCheckService.getAccountDelConf().subscribe(
      deleteAccCon => {
        this.homeService.deleteAccConfirmation(deleteAccCon);
      }
    );

  }


}
