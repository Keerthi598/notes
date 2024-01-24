import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-view',
  standalone: true,
  imports: [],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.css',
  host: {'class' : 'flex h-dvh'}
})
export class FileViewComponent implements OnInit {
  folderName: string = "";
  fileId: string = "";
  currFile = new File(["It's me Hi\nI'm the problem it's me ;_;"], "this.txt");
  currText: string = "";


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.folderName = params['folderName'];
      this.fileId = params['file'];
      this.loadFile();
    });
  }

  async loadFile() {
    var text = await new Response(this.currFile).text();

    this.currText = text;
  }

}
