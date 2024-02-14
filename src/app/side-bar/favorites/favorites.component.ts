import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FolderFiles } from '../../dtos/userFolderFiles.dto';
import { FavoriteService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgFor, NgIf,
    CommonModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  providers: [FavoriteService]
})
export class FavoritesComponent implements OnInit {
  favFolder: FolderFiles = {
    folder : {
        "map" : {
        noteHead: "Try this,Take 2Get this working....",
        folder: "Default",
        favorite: true,
        date: {
          seconds: 500,
          nanoseconds: 500,
        },
      },
    } 
  }

  visibleFav: boolean = true;

  @Output() stateChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  showFav() {
    this.visibleFav = !this.visibleFav;
  }

  ngOnInit(): void {
    //Get the favs
    this.getFavFolders();
  }

  async getFavFolders() {
    (await this.favoriteService.getFavFiles()).subscribe(
      (response: FolderFiles) => {
        this.favFolder = response;
      }
    )
  }

  async navToFile(fileId: string, folder: string) {
    this.stateChange.emit(true);
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



  ReloadFav() {
    this.getFavFolders();
  }
}
