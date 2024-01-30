import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DoubleCheckService } from './double-check.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-double-check',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgIf
  ],
  templateUrl: './double-check.component.html',
  styleUrl: './double-check.component.css',
  host: {'class' : 'fixed w-full flex flex-col item-center z-10'}
})
export class DoubleCheckComponent implements OnInit {
  deleteFile?: boolean;

  constructor(private doubleCheckService: DoubleCheckService) {
  }

  ngOnInit(): void {
    this.doubleCheckService.getDelete().subscribe(
      deleteReq => {
        this.deleteFile = deleteReq;
      }
    )
  }

  confirmDelete() {
    // Delete the File
    this.doubleCheckService.confirmDelete(true);
    this.deleteFile = undefined;
  }

  declineDelete() {
    this.doubleCheckService.confirmDelete(false);
    this.deleteFile = undefined;
  }
}
