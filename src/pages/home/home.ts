import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';


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
  randomColors;
  hintText;
  imageUri;
  shouldErase;

  constructor (
  
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    public imagePicker: ImagePicker
  
  ) {

  	this.setCanvasBackground = this.setCanvasBackground.bind(this);	
  	this.toggleDrawing = this.toggleDrawing.bind(this);	
    this.changePenSize = this.changePenSize.bind(this);  
    this.changePenColor = this.changePenColor.bind(this);  
    this.undoCanvas = this.undoCanvas.bind(this);  
    this.redoCanvas = this.redoCanvas.bind(this);  
    this.scaleAndPositionImage = this.scaleAndPositionImage.bind(this);  
    this.clearCanvas = this.clearCanvas.bind(this);  
    this.initCanvas = this.initCanvas.bind(this);  
    this.hintText = 'Change brush Size & Color';
    this.pickImage = this.pickImage.bind(this);
    this.toggleEraser = this.toggleEraser.bind(this);

    this.shouldErase = false;
    this.imageUri = ''; 
  	this.brushColors = [
  
      'rgb(0,0,0, 0.5)',
      'rgb(0,0,128, 0.5)',
      'rgb(0,0,255, 0.5)',
      'rgb(0,128,0, 0.5)',
      'rgb(0,128,128, 0.5)',
      'rgb(0,255,0, 0.5)',
      'rgb(128,0,0, 0.5)',      
      'rgb(128,0,128, 0.5)',
      'rgb(128,128,0, 0.5)',
      'rgb(128,128,128, 0.5)',
      'rgb(192,192,192, 0.5)',
      'rgb(255,0,0, 0.5)',
      'rgb(255,0,255, 0.5)',
      'rgb(255,255,0, 0.5)',
      'rgb(255,255,255, 0.5)'
   
    ];

    this.brushSizes = [
  
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
  
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

      this.initCanvas();

 
  }

  initCanvas() {
      
      this.canvas = new fabric.Canvas('canvas');
      this.canvas.setWidth(window.innerWidth);    
      this.canvas.setHeight(window.innerHeight - 180);

      this.setCanvasBackground('https://www.how-to-draw-funny-cartoons.com/images/baby-drawing-001.jpg');  
      this.toggleDrawing(true);
  }

  setCanvasBackground(imagePath) {
        var ctx = this.canvas.getContext("2d");

      this.canvas.isDrawingMode= 1;
      this.canvas.freeDrawingBrush.color = "purple";
      this.canvas.freeDrawingBrush.width = 10;
      this.canvas.freeDrawingCursor = 'url(https://i.stack.imgur.com/fp7eL.png) 4 64, auto';
      // this.canvas.hoverCursor =  'url(https://i.stack.imgur.com/fp7eL.png) 4 64, auto';
      fabric.Image.fromURL(imagePath, (img)=>  {
         this.scaleAndPositionImage(img);
      });
      this.canvas.freeDrawingBrush.color = this.brushColors[0];    
      this.canvas.renderAll();
      this.canvas.on('path:created', (opt) => {
        //opt.path.inverted = true;
        // opt.path.globalCompositeOperation = 'source-atop';
        // this.canvas.renderAll(this.canvas);
        // console.log(this.canvas.getObjects());
      });

  }

  toggleDrawing(isDrawingMode) {

  	this.canvas.set({
  		isDrawingMode: isDrawingMode	
  	})

  }

  onMouseMove(e) {
      console.log(e);
  }
  
  changePenSize() {

    this.canvas.freeDrawingBrush.width = this.brushValue;

  }
  changePenColor(color) {    

  	this.canvas.freeDrawingBrush.color = color;

  }

  clearCanvas() {

    this.canvas.clear();   
    this.setCanvasBackground('https://i.pinimg.com/736x/ef/03/a1/ef03a1c695251ea7a7431267023528e3--portrait-sketches-pencil-portrait.jpg'); 
  
  }
  toggleEraser() {
    //this.canvas.path.globalCompositeOperation = 'lighter';
    //this.canvas.globalCompositeOperation = 'multiply';
    //this.canvas.renderAll.bind(this.canvas);
  }
  scaleAndPositionImage(bgImage) {
       
      // setCanvasZoom = () =>  {
      //       let Cwidth = this.canvas.width * canvasScale;
      //       let Cheight = this.canvas.width * canvasScale;

      //       canvas.setWidth(canvasWidth);
      //       canvas.setHeight(canvasHeight);
      //   }
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        var canvasAspect = canvasWidth / canvasHeight;
        var imgAspect = bgImage.width / bgImage.height;
        var left, top, scaleFactor;

        if (canvasAspect >= imgAspect) {
              
            scaleFactor = canvasWidth / bgImage.width;
            left = 0;
            top = -((bgImage.height * scaleFactor) - canvasHeight) / 2;
        
        } else {
        
            scaleFactor = canvasHeight / bgImage.height;
            top = 0;
            left = -((bgImage.width * scaleFactor) - canvasWidth) / 2;

        }

        this.canvas.setBackgroundImage(bgImage, this.canvas.renderAll.bind(this.canvas), {

            top: top,
            left: left,
            originX: 'left',
            originY: 'top',
            scaleX: scaleFactor,
            scaleY: scaleFactor

        });
       
        this.canvas.renderAll(this.canvas);

      }

      pickImage() {
        const options = {
          maximumImagesCount: 1,
          width: this.canvas.width,
          height: this.canvas.height
        };

        this.imagePicker.getPictures(options).then((results) => {
          this.imageUri = results[0]; 
          alert(results[0])
          this.setCanvasBackground(results[0]);
          var canvas = document.getElementById("canvas-container"),
          ctx = this.canvas.getContext("2d");

          this.canvas.width = window.innerWidth;
          this.canvas.height = window.innerHeight;


          var background = new Image();
          background.src = "http://i.imgur.com/yf6d9SX.jpg";

          background.onload = ()=>{
              ctx.drawImage(background,0,0);  
              this.canvas.renderAll(this.canvas); 0
          }

        }, (err) => { });
      }
}
