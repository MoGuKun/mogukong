var dustObj = function()
{
		this.x = [];
		this.y = [];
		this.NO = [];
		this.amp = [];

		this.alpha ;
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function()
{
		for(var i = 0; i < this.num; i++)
		{
				this.x[i] = Math.random() * canWidth;
				this.y[i] = Math.random() * canHeight;
				this.NO[i] = Math.floor(Math.random() *7 );
				this.amp[i] = Math.random() * 25 + 25;
		}
		this.alpha = 0;
}
dustObj.prototype.draw = function()
{
		this.alpha += deltaTime * 0.0008;
		
		var l = Math.sin(this.alpha);
		for(var i = 0; i < this.num; i++)
		{		
				var NO = this.NO[i];
				ctx1.drawImage(dustPic[NO], this.x[i] + l * this.amp[i], this.y[i]);
		}
}