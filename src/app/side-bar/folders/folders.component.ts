import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FoldersService } from './folders.service';
import { UserFolder } from '../../dtos/userFolders.dto';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [
    NgFor,
    NgIf, 
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [FoldersService],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.css'
})
export class FoldersComponent implements OnInit{
  folders: Array<string> = [];
  visibleFolder: boolean = true;
  activeFolder: string = "";
  newFolder: string = "";
  newFolderError: boolean = false;
  

  @Output() stateChange : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private folderService: FoldersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFolders();
  }

  async getFolders() {
    (await this.folderService.getFolders()).subscribe(
      (response: UserFolder) => {
        this.folders = response.names; 
      },
      (error) => {
        console.error('Error');
      }
    );
  }

  showFolder() {
    this.visibleFolder = !this.visibleFolder;
    //this.activeFolder = "";
  }

  navigateToFolder(folderName: string): void {
    this.stateChange.emit(true);
    this.router.navigate(['/home/folder', folderName]);
    this.activeFolder = folderName;
  }

  toggleOff(){
    this.activeFolder = "";
  }

  async createFolder(){
    //
    // Create Folder
    //

    if (this.newFolder == "Default" || this.newFolder == "favorites" || this.folders.includes(this.newFolder)) {
      // Error
      // Throw Alert
      this.newFolderError = true;
      console.log("Er");
      return;
    }

    (await this.folderService.createFolders(this.newFolder)).subscribe(
      (response: boolean) => {
        this.ReloadFolders();
      }
    );
    
    this.clearNewFol();
  }

  clearNewFol(){
    this.newFolder = "";
    this.newFolderError = false;
  }


  ReloadFolders() {
    this.getFolders();
  }

}
