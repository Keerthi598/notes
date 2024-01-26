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


@Component({
    selector: 'app-folder-view',
    standalone: true,
    imports: [NgFor,
    FontAwesomeModule,
    CommonModule],
    providers: [FolderViewService],
    templateUrl: './folder-view.component.html',
    styleUrl: './folder-view.component.css'
})
export class FolderViewComponent implements OnInit {
  folderName: string = "";
  // fileFolder: FolderFiles = {
  //   folder: Map{
  //     "this.txt" : {
  //       "noteHead" : "Lorem ipsum is placeholder text commonly used in the graphic...",
  //       "folder" : "Default",
  //       "date" : {
  //         "seconds" : 100,
  //         "nanoseconds" : 1000,
  //       },
  //     }
  //   }
  // };
  // fileFolder: FolderFiles = {
  //   folder: Map<string, File> = {};
  // }


  fileFolder: FolderFiles = {
    folder : {
        "map" : {
        noteHead: "DummyNote",
        folder: "DummyFolder",
        date: {
          seconds: 500,
          nanoseconds: 500,
        },
      }
    }
  }

  constructor(private route: ActivatedRoute,
    @Inject() private folderViewService: FolderViewService ,
    private router: Router) {}

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
}
