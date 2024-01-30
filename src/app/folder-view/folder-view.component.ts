import { Component, OnInit } from '@angular/core';
import { Inject } from '@nestjs/common';
import { ActivatedRoute } from '@angular/router';
import { UserFolder } from '../dtos/userFolders.dto';
import { FolderFiles } from '../dtos/userFolderFiles.dto';
import { UserFile } from '../dtos/userFile.dto';
import { NgFor, CommonModule } from '@angular/common';
import { FolderViewService } from './folder-view.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { AlertEnum } from '../alert/alert.enum';

@Component({
    selector: 'app-folder-view',
    standalone: true,
    imports: [NgFor,
    FontAwesomeModule,
    CommonModule,
    ],
    providers: [FolderViewService],
    templateUrl: './folder-view.component.html',
    styleUrl: './folder-view.component.css'
})
export class FolderViewComponent implements OnInit {
  folderName: string = "";
  fileToBeDeleted: string = "";
  fileToBeDelFav: boolean = false;
  alertType: AlertEnum = AlertEnum.success;
  sourceOfDeleteReq: boolean = false;

  fileFolder: FolderFiles = {
    folder : {
        "map" : {
        noteHead: "Loading ...",
        folder: "Loading ..",
        favorite: false,
        date: {
          seconds: 500,
          nanoseconds: 500,
        },
      }
    }
  }

  constructor(private route: ActivatedRoute,
    @Inject() private folderViewService: FolderViewService,
    private homeService: HomeService,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.folderName = params['folderName'];
      this.fetchFiles();
    });
    this.homeService.getDeleteCon().subscribe(
      (resp) => {
        if (resp) {
          this.deleteConfirmed();
        }
        this.fileToBeDeleted = "";
        this.sourceOfDeleteReq = false;
      }
    )
  }

  async fetchFiles() {
    (await this.folderViewService.getFolderFiles(this.folderName)).subscribe(
      (response: FolderFiles) => {
        this.fileFolder = response;
      },
      (error) => {
        console.log('Error');
      }
    );
  }

  async createFile() {
    (await this.folderViewService.createFolder(this.folderName)).subscribe(
      response => {
        this.navToFile(response.fileId, this.folderName);
      } 
    );
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

  showOptions($event: Event) {
    $event.stopPropagation();
  }

  askDeleteConfirmation($event: Event, fileId: string, isFav: boolean) {
    $event.stopPropagation();
    this.homeService.setDeleteDCheck(true);
    this.fileToBeDeleted = fileId;
    this.fileToBeDelFav = isFav;

    this.sourceOfDeleteReq = true;
  }

  async deleteConfirmed() {
    if (this.fileToBeDeleted == ""){
      return;
    }

    //console.log("FolderView" + "/" + this.fileToBeDeleted + "/" + this.sourceOfDeleteReq);

    if (!this.sourceOfDeleteReq) {
      return;
    }

    //console.log("FolderView" + "/" + this.fileToBeDeleted);


    this.sourceOfDeleteReq = false;

    (await this.folderViewService.deleteFile(
      this.folderName,
      this.fileToBeDeleted,
      this.fileToBeDelFav
    )).subscribe(
      
      (resp) => {
        if (resp) {
          this.homeService.setCompAlert({
            type: AlertEnum.success,
            text: "File Deleted"
          });
          this.fetchFiles();
          return;
        }
        
        this.homeService.setCompAlert({
          type: AlertEnum.fail,
          text: "Failed, Try Again"
        });
      }
      
    )
  }
}
