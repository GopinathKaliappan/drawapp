import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import 'fabric';
declare const fabric: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})

export class HomePage {

  canvas;	
  fabric;
  brushSizes;
  brushValue;
  brushColors;
  isRedoing;
  h;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

  	this.setCanvasBackground = this.setCanvasBackground.bind(this);	
  	this.toggleDrawing = this.toggleDrawing.bind(this);	
    this.changePenSize = this.changePenSize.bind(this);  
    this.changePenColor = this.changePenColor.bind(this);  
    this.undoCanvas = this.undoCanvas.bind(this);  
    this.redoCanvas = this.redoCanvas.bind(this);  
  	this.clearCanvas = this.clearCanvas.bind(this);	

  	
    this.brushSizes = [1,2,3,4,5,6,7,8,9,10];
  	
    this.brushColors = [
      'green',
      'yellow',
      'orange',
      'black',
      'pink',
      'blue',
      'brown',
      'lime',
      'white',
      'grey'
    ];

    this.brushValue = 30;
    this.isRedoing = false;
    this.h = [];

  }
  openMenu() {

    this.menuCtrl.open();

  }

  closeMenu() {

    this.menuCtrl.close();

  }

  toggleMenu() {

    this.menuCtrl.toggle();

  }

  undoCanvas(){

    if(this.canvas._objects.length>0){
     this.h.push(this.canvas._objects.pop());
     this.canvas.renderAll();
    }

  }
  redoCanvas(){
    
    if(this.h.length>0){
      this.isRedoing = true;
      this.canvas.add(this.h.pop());
    }

  }

  ngOnInit() {

  	  this.canvas = new fabric.Canvas('canvas');
  		this.canvas.setWidth(window.innerWidth);  	
  		this.canvas.setHeight(window.innerHeight - 120);  	
   		this.setCanvasBackground('http://fabricjs.com/assets/honey_im_subtle.png');	

  }



  setCanvasBackground(imagePath) {

  	fabric.Image.fromURL(imagePath, (img) => {
	   img.set({
	   		width: this.canvas.width, 
	   		height: this.canvas.height, 
	   		originX: 'left', 
	   		originY: 'top'
	   	});
		  this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
  			scaleX: this.canvas.width,
  			scaleY: this.canvas.height 
  		});
      this.canvas.isDrawingMode = true;
	  })

  	this.canvas.on('object:added',() => {

      if(!this.isRedoing){
        this.h = [];
      }
      this.isRedoing = false;
    });

  }

  toggleDrawing(isDrawingMode) {

  	this.canvas.set({
  		isDrawingMode: isDrawingMode	
  	})

  }
  
  changePenSize() {

    this.canvas.freeDrawingBrush.width = this.brushValue;

  }
  changePenColor(color) {    

  	this.canvas.freeDrawingBrush.color = color;

  }

  clearCanvas() {

    this.canvas.clear();
    this.isRedoing = false;
    this.h = [];
    this.setCanvasBackground('http://fabricjs.com/assets/honey_im_subtle.png');
    
  }
}