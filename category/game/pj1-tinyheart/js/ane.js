var aneObj = function()
{
		//start point control point end point
		this.rootX = [];
		this.headX = [];
		this.headY = [];
		this.alpha = 0;
		this.amp = [];
		this.num = canWidth / 16;
}
// aneObj.prototype.num = canWidth / 16;
aneObj.prototype.init = function()
{
		for (var i = 0; i < this.num; i++)
	    {
			this.rootX[i] = i * 15.7 + Math.random() * 20;//[0,1)
			this.headX[i] = this.rootX[i];
			this.headY[i] = canHeight - 250 +Math.random() * 50;
			this.amp[i] = Math.random() * 50 + 35;
		}

}
aneObj.prototype.draw = function()		
{		
		this.alpha += deltaTime * 0.0008;
		var l = Math.sin(this.alpha);//[-1,1]
		ctx2.save();
		ctx2.globalAlpha = 0.6;
		ctx2.strokeStyle = "#3b154e";
		ctx2.lineWidth = 20;
		ctx2.lineCap = "round";
		for(var i =0; i <this.num; i++)
		{
				//beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, LineCap, globalAlpha
				ctx2.beginPath();
				ctx2.moveTo(this.rootX[i], canHeight);
				this.headX[i] = this.rootX[i] + l * this.amp[i] ;
				ctx2.quadraticCurveTo(this.rootX[i], canHeight - 100, this.headX[i] , this.headY[i]) ;
				ctx2.stroke();

		}
		ctx2.restore();

}