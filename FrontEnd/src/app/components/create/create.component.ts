import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: File;
  public save_project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', 2019, '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    if (this.filesToUpload) {
      //Subir imagen
      this._uploadService.makeFileRequest(Global.url , [], this.filesToUpload, 'image')
        .then((result: any) => {
          if(result && result.Location){
            this.project.image = result.Location;
            this._projectService.saveProject(this.project).subscribe(
              response => {
                if (response.project) {
                  this.save_project = response.project;
                  form.reset();
                  this.status = 'success';
                } else {
                  this.status = 'failed';
                }
              },
              error => {
                this.status = 'failed';
                console.log(<any>error);
              }
            );
        }
        });
    } else {
      this.status = 'failed';
    }
  }

  fileChangeEvent(fileInput: any) {
    console.log('file change event');
    console.log(fileInput);
    this.filesToUpload = <File>fileInput.target.files;
  }

}
