import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileViewService } from './file-view.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule} from '@angular/forms';
import { UserFileReceived } from '../dtos/userFileReceived.dto';
import { AlertEnum } from '../alert/alert.enum';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-file-view',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [
    FileViewService,
  ],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.css',
  host: {'class' : 'flex h-dvh'}
})
export class FileViewComponent implements OnInit {
  folderName: string = "";
  fileId: string = "";
  currFile = new File([""], "this.txt");
  currText: string = "";
  alertType: AlertEnum = AlertEnum.success;
  isFavorite: boolean = false;
  sourceOfDelete: boolean = false;

  @HostListener('window:keydown.control.s', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    this.saveFile();
  }

  constructor(private route: ActivatedRoute,
    private fileViewService: FileViewService,
    private homeService: HomeService,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.folderName = params['folderName'];
      this.fileId = params['file'];
      this.loadFile();
    });
    this.homeService.getDeleteCon().subscribe(
      (resp) => {
        if (resp) {
          this.deleteConfirmed();
        }
        this.sourceOfDelete = false;
      }
    )
  }

  async loadFile() {
    var text = await new Response(this.currFile).text();
    (await this.fileViewService.getFile(this.folderName, this.fileId)).subscribe(
      response => {
        this.currText = String.fromCharCode.apply(null, response.fileData.data);
        this.isFavorite = response.fileMetaData.favorite;
      } 
    )   
    this.currText = text;
  }

  async saveFile() {
    try {
      (await this.fileViewService.upFile(
        this.folderName,
        this.fileId,
        this.currText,
        this.isFavorite
      )).subscribe(
        response => {
          this.homeService.setCompAlert({
            type: AlertEnum.success,
            text: "File Saved"
          });
        } 
      );
    } catch {
      this.homeService.setCompAlert({
        type: AlertEnum.fail,
        text: "File Not Saved"
      });
    }
  }

  async favToggle() {
    this.isFavorite = !this.isFavorite;
    try {
      (await this.fileViewService.toggleFavOn(
        this.folderName,
        this.fileId,
        this.currText,
        this.isFavorite
      )).subscribe(
        response => {
          this.homeService.setCompAlert({
            type: AlertEnum.success,
            text: "Success"
          });
        } 
      );
    } catch {
      this.homeService.setCompAlert({
        type: AlertEnum.fail,
        text: "File Not Saved"
      });
    } 
  }


  reqDelete() {
    this.homeService.setDeleteDCheck(true);
    this.sourceOfDelete = true;
  }

  async deleteConfirmed() {
    //console.log("FileView: " + this.folderName + "/" + this.currFile + "/" + this.sourceOfDelete );
    if (!this.sourceOfDelete){
      return;
    }

    //console.log("FileView: " + this.folderName + "/" + this.currFile );

    this.sourceOfDelete = false;

    (await this.fileViewService.deleteFile(
      this.folderName,
      this.fileId + ".txt",
      this.isFavorite
    )).subscribe(

      (resp) => {
        if (resp) {
          this.homeService.setCompAlert({
            type: AlertEnum.success,
            text: "File Deleted"
          });
          this.router.navigate(['/home/folder', this.folderName]);
          return;
        }
        
        this.homeService.setCompAlert({
          type: AlertEnum.fail,
          text: "Failed, Try Again"
        });
      }
    )
  }


  navtoFolder() {
    this.router.navigate(['/home/folder', this.folderName]);
  }

}




