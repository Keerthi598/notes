import { Component, ViewChild, OnInit } from '@angular/core';
import { BottomCompComponent } from './bottom-comp/bottom-comp.component';
import { FoldersComponent } from './folders/folders.component';
import { Inject } from '@nestjs/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    BottomCompComponent,
    FoldersComponent,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})

export class SideBarComponent implements OnInit {
  dashActive : boolean = true;
  textn : string = "text-act";
  @ViewChild(BottomCompComponent) private bottomComp!: BottomCompComponent
  @ViewChild(FoldersComponent) private foldersComp!: FoldersComponent

  toggleDash() {
    this.UpdateSideBar(true);
    this.dashActive = true;
  }

  UpdateSideBar(isChanged : boolean) {
    this.dashActive = false;
    this.bottomComp.toggleOff();
    this.foldersComp.toggleOff();
  }

  ngOnInit(): void {    
  }
}
