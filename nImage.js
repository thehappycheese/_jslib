


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
	this.img.onload = (function (e) {
		var nimg = this.upscale(this.img, 3);
		this.canvas.width = nimg.width;
		this.canvas.height = nimg.height;
		this.ctx.drawImage(nimg, 0, 0);
		delete this.img;
		
		this.dx = this.canvas.width/this.columns;
		this.dy = this.canvas.height/this.rows;
		this.frames = this.rows * this.columns;
	}).bind(this);
	
	this.upscale = (function (img, n) {
		var small = document.createElement("canvas");
		small.width = img.width;
		small.height = img.height;
		var sctx = small.getContext("2d");
		sctx.drawImage(img, 0, 0);
		var dat = sctx.getImageData(0, 0, small.width, small.height);
		var ldat = sctx.createImageData(small.width * n,small.height * n)
		var xx, yy, aa, bb;
		for (xx = 0; xx < ldat.width; xx++) {
			for (yy = 0; yy < ldat.height; yy++) {
				aa = xx * 4 + yy * 4 * ldat.width;
				bb = Math.floor(xx * 4 / n) + Math.floor(yy * 4 * ldat.width/n/n);
				ldat.data[aa]     = dat.data[bb];
				ldat.data[aa + 1] = dat.data[bb + 1];
				ldat.data[aa + 2] = dat.data[bb + 2];
				ldat.data[aa + 3] = dat.data[bb + 3];
			}
		}
		small.width *= n;
		small.height *= n;
		sctx.putImageData(ldat, 0, 0);
		return small;
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
	
	
	this.img.src = url;
}