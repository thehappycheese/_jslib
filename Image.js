


function nImage(url, acolumns, arows){
	"use strict";
	
	this.canvas = document.createElement("canvas");
	this.canvas.width = 100;
	this.canvas.height = 100;
	this.ctx = this.canvas.getContext("2d");
	
	this.columns = acolumns;
	this.rows = arows;
	this.dx = 1;
	this.dy = 1;
	
	
	this.play = false;
	this.frame = 0;
	this.frames = 8;
	this.fpf = 1;
	this.fpfcount = 0;
	
	
	this.img = document.createElement("img");
	this.img.src = url;
	
	this.img.onload = (function(e){
		this.canvas.width  = this.img.width;
		this.canvas.height = this.img.height;
		this.ctx.drawImage(this.img,0,0);
		delete this.img;
		
		this.dx = this.canvas.width/this.columns;
		this.dy = this.canvas.height/this.rows;
		this.frames = this.rows * this.columns;
	}).bind(this);
	
	this.update = (function(){
		if(this.play){
			this.fpfcount ++;
			if(this.fpfcount>this.fpf){
				this.frame++;
				if(this.frame>=this.frames){
					this.frame = 0;
				}
				this.fpfcount = 0;
			}
		}
	}).bind(this);
	
	this.drawCurrentFrameAt = (function(ctx,x,y,r){
		this.drawFrameAt(ctx,this.frame,x,y,r);
	}).bind(this);
	
	this.drawFrameAt = (function(ctx,f,x,y,r){
		ctx.save();
			ctx.translate(x,y);
			ctx.rotate(r);
			var xx = f%this.columns;
			var yy = Math.floor(f/this.columns);
			//ctx.drawImage(this.canvas,  xx*this.dx,yy*this.dy,this.dx,this.dy, -this.dx/2, -this.dy/2, this.dx, this.dy);
			ctx.drawImage(this.canvas,  xx*this.dx,yy*this.dy,this.dx,this.dy, 0, 0, this.dx, this.dy);
		ctx.restore();
	}).bind(this);

}