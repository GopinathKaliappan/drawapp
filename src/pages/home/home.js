var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import 'fabric';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, menuCtrl, imagePicker) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.imagePicker = imagePicker;
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
    HomePage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    HomePage.prototype.closeMenu = function () {
        this.menuCtrl.close();
    };
    HomePage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    HomePage.prototype.undoCanvas = function () {
        if (this.canvas._objects.length > 0) {
            this.h.push(this.canvas._objects.pop());
            this.canvas.renderAll();
        }
    };
    HomePage.prototype.redoCanvas = function () {
        if (this.h.length > 0) {
            this.isRedoing = true;
            this.canvas.add(this.h.pop());
        }
    };
    HomePage.prototype.ngOnInit = function () {
        this.initCanvas();
    };
    HomePage.prototype.initCanvas = function () {
        this.canvas = new fabric.Canvas('canvas');
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setHeight(window.innerHeight - 180);
        this.setCanvasBackground('https://www.how-to-draw-funny-cartoons.com/images/baby-drawing-001.jpg');
        this.toggleDrawing(true);
    };
    HomePage.prototype.setCanvasBackground = function (imagePath) {
        var _this = this;
        var ctx = this.canvas.getContext("2d");
        this.canvas.isDrawingMode = 1;
        this.canvas.freeDrawingBrush.color = "purple";
        this.canvas.freeDrawingBrush.width = 10;
        this.canvas.freeDrawingCursor = 'url(https://i.stack.imgur.com/fp7eL.png) 4 64, auto';
        this.canvas.freeDrawingCursor.__onMouseWheel(e) = 'url(https://i.stack.imgur.com/fp7eL.png) 4 64, auto';
        this.canvas.hoverCursor = 'url(https://i.stack.imgur.com/fp7eL.png) 4 64, auto';
        this.canvas.moveCursor = 'url(https://i.stack.imgur.com/fp7eL.png) 4 64, auto';
        fabric.Image.fromURL(imagePath, function (img) {
            _this.scaleAndPositionImage(img);
        });
        this.canvas.freeDrawingBrush.color = this.brushColors[0];
        this.canvas.on('path:created', function (opt) {
            // opt.path.globalCompositeOperation = 'lighter';
            _this.canvas.renderAll(_this.canvas);
        });
        this.canvas.on('event:dragenter', function (opt) {
            // console.log(this.canvas.getBoundingClientRect());
            opt.pointer.x += 10;
            opt.pointer.y += 10;
            // opt.path.globalCompositeOperation = 'lighter';
            _this.canvas.renderAll(_this.canvas);
        });
        this.canvas.on({
            'touch:gesture': function (e) {
                var text = document.createTextNode(' Gesture ');
                console.log(e);
            },
            'touch:drag': function (e) {
                var text = document.createTextNode(' Dragging ');
                console.log(e);
            },
            'touch:orientation': function (e) {
                var text = document.createTextNode(' Orientation ');
                console.log(e);
            },
            'touch:shake': function (e) {
                var text = document.createTextNode(' Shaking ');
                console.log(e);
            },
            'touch:longpress': function (e) {
                var text = document.createTextNode(' Longpress ');
                console.log(e);
            }
        });
        this.canvas.renderAll();
    };
    HomePage.prototype.toggleDrawing = function (isDrawingMode) {
        this.canvas.set({
            isDrawingMode: isDrawingMode
        });
    };
    HomePage.prototype.onMouseMove = function (e) {
        console.log(e);
    };
    HomePage.prototype.changePenSize = function () {
        this.canvas.freeDrawingBrush.width = this.brushValue;
    };
    HomePage.prototype.changePenColor = function (color) {
        this.canvas.freeDrawingBrush.color = color;
    };
    HomePage.prototype.clearCanvas = function () {
        this.canvas.clear();
        this.setCanvasBackground('https://i.pinimg.com/736x/ef/03/a1/ef03a1c695251ea7a7431267023528e3--portrait-sketches-pencil-portrait.jpg');
    };
    HomePage.prototype.scaleAndPositionImage = function (bgImage) {
        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;
        var canvasAspect = canvasWidth / canvasHeight;
        var imgAspect = bgImage.width / bgImage.height;
        var left, top, scaleFactor;
        if (canvasAspect >= imgAspect) {
            scaleFactor = canvasWidth / bgImage.width;
            left = 0;
            top = -((bgImage.height * scaleFactor) - canvasHeight) / 2;
        }
        else {
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
        this.canvas.renderAll();
    };
    HomePage.prototype.pickImage = function () {
        var options = {
            maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                alert('Image URI: ' + results[i]);
            }
        }, function (err) { });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            MenuController,
            ImagePicker])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map