import { Component, OnInit } from '@angular/core';
import { Inject } from '@nestjs/common';
import { ActivatedRoute } from '@angular/router';
import { FileViewService } from './file-view.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule} from '@angular/forms';
import { UserFileReceived } from '../dtos/userFileReceived.dto';

@Component({
  selector: 'app-file-view',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [FileViewService],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.css',
  host: {'class' : 'flex h-dvh'}
})
export class FileViewComponent implements OnInit {
  folderName: string = "";
  fileId: string = "";
  currFile = new File([""], "this.txt");
  currText: string = "";


  constructor(private route: ActivatedRoute,
    private fileViewService: FileViewService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.folderName = params['folderName'];
      this.fileId = params['file'];
      this.loadFile();
    });
  }

  async loadFile() {
    var text = await new Response(this.currFile).text();
    (await this.fileViewService.getFile(this.folderName, this.fileId)).subscribe(
      response => {
        this.currText = String.fromCharCode.apply(null, response.data);
      } 
    )   
    this.currText = text;
  }

  async saveFile() {
    (await this.fileViewService.upFile(
      this.folderName,
      this.fileId,
      this.currText
    )).subscribe(
      response => {
        console.log(response);
      } 
    );
  }

}


