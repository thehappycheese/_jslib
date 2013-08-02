


function nAudio(url){
	this.num = 3;
	this.elem = [];
	this.curr = 0;
	for(var i=0; i<this.num;i++){
		this.elem.push(new Audio(url));
	}
	this.play = (function(){
		//this.elem[this.curr].currentTime = 0;
		this.elem[this.curr].play();
		this.curr++;
		if(this.curr>=this.elem.length){
			this.curr=0;
		}
	}).bind(this);
	
	this.setVolume = (function(vol){
		for(var i = 0; i<this.elem.length; i++){
			this.elem[i].volume = vol;
		}
	}).bind(this);
	
}
function naAudio(arr){
	this.urls = arr;
	this.nauds = []
	for(var i = 0; i< this.urls.length; i++){
		this.nauds.push(new nAudio(this.urls[i]))
	}
	
	this.play = (function(){
		this.nauds[Math.floor(Math.random()*this.nauds.length)].play();
	}).bind(this);
	
	this.setVolume = (function(vol){
		for(var i = 0; i<this.nauds.length; i++){
			this.nauds[i].setVolume(vol);
		}
	}).bind(this);
}