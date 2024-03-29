import { Component, ViewChild, OnInit } from '@angular/core';
import { BottomCompComponent } from './bottom-comp/bottom-comp.component';
import { FoldersComponent } from './folders/folders.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    BottomCompComponent,
    FoldersComponent,
    FavoritesComponent,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})

export class SideBarComponent implements OnInit {
  dashActive : boolean = true;
  textn : string = "text-act";
  @ViewChild(BottomCompComponent) private bottomComp!: BottomCompComponent
  @ViewChild(FoldersComponent) private foldersComp!: FoldersComponent
  @ViewChild(FavoritesComponent) private favoriteComp!: FavoritesComponent

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {    
  }

  toggleDash() {
    this.UpdateSideBar(true);
    this.dashActive = true;
    this.router.navigate(['/home']);
  }

  UpdateSideBar(isChanged : boolean) {
    this.dashActive = false;
    this.bottomComp.toggleOff();
    this.foldersComp.toggleOff();
  }


  ReloadSideBar() {
    this.favoriteComp.ReloadFav();
    this.foldersComp.ReloadFolders();
  }
}
