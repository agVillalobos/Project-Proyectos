import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider: number;
  public anchuraToSlider: number;
  public captions: boolean;
  public autor: any;
  
  @ViewChild('textos') textos;

  constructor() {
    this.captions = true;
  }

  ngOnInit() {
    var opcionClasica =document.querySelector('#texto').innerHTML;
    // console.log(this.textos.nativeElement.innerHTML);
  }

  cargarSlider() {

    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider() {
    this.anchuraToSlider = null;
  }

  getAutor(event) {
    // console.log(event);
    this.autor = event;
  }
}
