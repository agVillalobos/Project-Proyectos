import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: File;
  public url: string;
  public save_project;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar proyecto";
    this.url = Global.url;

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id) {
    this._projectService.getProyect(id).subscribe(
      response => {
        console.log(response);
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit() {
    if (this.filesToUpload) {
      //Subir imagen
      this._uploadService.makeFileRequest(Global.url , [], this.filesToUpload, 'image')
        .then((result: any) => {
          if(result && result.Location){
            this.project.image = result.Location;
            this._projectService.updateProject(this.project).subscribe(
              response => {
                if (response.project) {
                  this.save_project = response.project;
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
      this._projectService.updateProject(this.project).subscribe(
        response => {
          if (response.project) {
            this.save_project = response.project;
            this.status = 'success';
          }else{
            this.status = 'failed';
          }
    });
  }
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files;
  }
}
