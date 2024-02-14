import { Component, OnInit } from '@angular/core';
import { DashService } from './dash.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { DashFiles, DashFile} from '../dtos/dashFiles.dto';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [
    NgFor, NgIf,
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css',
  providers: [DashService],
  host: {'class' : 'w-full'},
})
export class DashComponent implements OnInit {
  dashF: DashFiles = {
    dashFiles: []
  }


  constructor(
    private router: Router,
    private dashService: DashService
  ) {}

  ngOnInit(): void {
    this.getDash();
  }

  async getDash() {
    (await this.dashService.getDashFiles()).subscribe(
      response => {
        this.dashF = response;
      },
      error => {
        //Need to do alert error ;_;
      }
    )
  }

  async navToFile(fileId: string, folder: string) {
    fileId = fileId.slice(0, -4);
    this.router.navigate(['/home/folder' + '/' + folder, fileId]);
  }

  convertToDate(seconds: number, nanoseconds: number) {
    const ts = (seconds + nanoseconds/1000000000) * 1000;
    return new Date(ts).toDateString();
  }

  convertToTime(seconds: number, nanoseconds: number) {
    const ts = (seconds + nanoseconds/1000000000) * 1000;
    return new Date(ts).toLocaleTimeString();
  }

}
