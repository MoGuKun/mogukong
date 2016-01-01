var momObj = function()
{
		this.x = 0;
		this.y = 0;
		this.angle;

		this.bigTailCount = 0;
		this.bigTailTimer = 0;

		this.bigEyeTimer = 0;
		this.bigEyeCount = 0;
		this.bigEyeInterval = 300;

		this.bigBodyCount = 0;

		// this.bigEye = new Image();
		// this.bigBody = new Image();
		// this.bigTail = new Image();
}
momObj.prototype.init = function()
{
		this.x = canWidth * 0.5;
		this.y = canHeight * 0.5;
		this.angle = 0;
		// this.bigEye.src = "./src/bigEye0.png";
		// this.bigBody.src = "./src/bigSwim0.png";
		// this.bigTail.src = "./src/bigTail0.png";
}
momObj.prototype.draw = function()
{
		//lerp x,y
		this.x = lerpDistance(mx, this.x, 0.98);
		this.y = lerpDistance(my, this.y, 0.98);

		//delta angle 
		var deltaX = mx - this.x;
		var deltaY = my - this.y;
		var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI, PI
		this.angle = lerpAngle(beta, this.angle, 0.6);

		//baby tail count
		this.bigTailTimer += deltaTime;
		if(this.bigTailTimer > 50)
		{
				this.bigTailCount = (this.bigTailCount + 1) % 8;
				this.bigTailTimer %= 50;
		}
		//baby eye count
		this.bigEyeTimer += deltaTime;
		if(this.bigEyeTimer > this.bigEyeInterval)
		{
				this.bigEyeCount =  (this.bigEyeCount + 1) % 2;
				this.bigEyeTimer %= this.bigEyeInterval;

				if(this.bigEyeCount == 0)
				{
						this.bigEyeInterval = Math.random() * 1500 + 2000;//[,)
				}
				else
				{
						this.bigEyeInterval = 200;
				}
		}

		ctx1.save();
		ctx1.translate(this.x, this.y);
		ctx1.rotate(this.angle);

		var bigBodyCount = this.bigBodyCount;
		if(data.double == 2)
		{
				ctx1.drawImage(bigBodyBlue[bigBodyCount], -bigBodyBlue[bigBodyCount].width * 0.5, -bigBodyBlue[bigBodyCount].height * 0.5);
		}
		else
		{
				ctx1.drawImage(bigBodyOra[bigBodyCount], -bigBodyOra[bigBodyCount].width * 0.5, -bigBodyOra[bigBodyCount].height * 0.5);
		}

		var bigTailCount = this.bigTailCount;
		ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width * 0.5 +29, -bigTail[bigTailCount].height * 0.5);

		var bigEyeCount = this.bigEyeCount;
		ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width * 0.5, -bigEye[bigEyeCount].height * 0.5);
		ctx1.restore();
}