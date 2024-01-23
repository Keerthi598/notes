import { Component, OnInit } from '@angular/core';
import { Inject } from '@nestjs/common';
import { ActivatedRoute } from '@angular/router';
import { UserFolder } from '../dtos/userFolders.dto';
import { FolderFiles } from '../dtos/userFolderFiles.dto';
import { UserFile } from '../dtos/userFile.dto';
import { NgFor } from '@angular/common';
import { FolderViewService } from './folder-view.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
    selector: 'app-folder-view',
    standalone: true,
    imports: [NgFor,
    FontAwesomeModule],
    providers: [FolderViewService],
    templateUrl: './folder-view.component.html',
    styleUrl: './folder-view.component.css'
})
export class FolderViewComponent implements OnInit {
  folderName: string = "";
  // fileFolder: FolderFiles = {
  //   folder: [
  //     {
  //       "noteHead" : "Lorem ipsum is placeholder text commonly used in the graphic...",
  //       "folder" : "Default",
  //       "date" : {
  //         "seconds" : 100,
  //         "nanoseconds" : 1000,
  //       },
  //       "fileId" : "random.txt"
  //     }
  //   ]
  // };
  fileFolder: FolderFiles = {
    folder: []
  };

  constructor(private route: ActivatedRoute,
    @Inject() private folderViewService: FolderViewService ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.folderName = params['folderName'];
      this.fetchFiles();
    });
  }

  async fetchFiles() {
    (await this.folderViewService.getFolderFiles(this.folderName)).subscribe(
      (response: FolderFiles) => {
        this.fileFolder = response;
      },
      (error) => {
        console.error('Error');
      }
    );
  }

  async createFile() {
    (await this.folderViewService.createFolder(this.folderName)).subscribe(
      response => {
        console.log(response);
      } 
    );
  }
}
