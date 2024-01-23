import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Inject } from '@nestjs/common';
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
  

  @Output() stateChange : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    @Inject() private folderService: FoldersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFolders();
    //this.folders = ["Default", "Hell"];
  }

  async getFolders() {
    (await this.folderService.getFolders()).subscribe(
      (response: UserFolder) => {
        this.folders = response.names;      },
      (error) => {
        console.error('Error');
      }
    );
  }

  showFolder() {
    this.visibleFolder = !this.visibleFolder;
    this.activeFolder = "";
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
    (await this.folderService.createFolders(this.newFolder)).subscribe(
      (response: boolean) => {
        this.getFolders();
      }
    );
    
    this.clearNewFol();
  }

  clearNewFol(){
    this.newFolder = "";
  }


}
