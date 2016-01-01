//判断大fish和果实距离
function momFruitsCollision()
{
		if(!data.gameOver)
		{
				for(var i=0; i < fruit.num; i++)
				{		
						if(fruit.alive[i])
						{
								//calculate Length
								var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
								if(l < 900)
								{
										if(fruit.fruitType[i] == "colours")
										{		
												
													clearGreen();
										}
										if(fruit.fruitType[i] == "green")
										{
												data.gameOver = true;
										}
										//fruit eaten
										fruit.dead(i);
										data.fruitNum++;
										mom.bigBodyCount++;
										if(mom.bigBodyCount > 7)
										{
												mom.bigBodyCount = 7;
										}
										if(fruit.fruitType[i] == "blue")
										{
												data.double = 2;
										}
										wave.born(fruit.x[i], fruit.y[i]);
								}

						}
				}
		}

}

//mom baby collision 
function momBabyCollision()
{
		if(data.fruitNum > 0 && !data.gameOver)
		{
				var l =calLength2(mom.x, mom.y, baby.x, baby.y);
				if(l < 800)
				{		
						
						//baby recover
						baby.babyBodyCount = 0;
						
						
						mom.bigBodyCount = 0;
						//update score
						data.addScore();

						halo.born(baby.x, baby.y);

				}
		}
		
}
function clearGreen()//清除绿色 -彩色果实功能
{
		for(var j = 0; j < fruit.num; j++)
		{
				if(fruit.fruitType[j] == "green")
				{
						fruit.dead(j);
																
						
				}	
				
														
		}
}