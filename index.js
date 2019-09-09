
// (function () {
// 	// 准备资源 A
	// const context = document.getElementById('content').getContext('2d');
	// const heroImg = new Image();

// 	// 画图 B
// 	heroImg.onload = function () {
// 		var imgPos = {
// 			x: 0,
// 			y: 0,
// 			width: 32,
// 			height: 32
// 		};

// 		var rect = {
// 			x: 0,
// 			y: 0,
// 			width: 40,
// 			height: 40
// 		};

// 		context
// 			.drawImage(
// 				heroImg,
// 				imgPos.x,
// 				imgPos.y,
// 				imgPos.width,
// 				imgPos.height,
// 				rect.x,
// 				rect.y,
// 				rect.width,
// 				rect.height
// 			);
// 	};

// 	heroImg.src = './hero.png';
// })();

//封装过的代码
/*
 author： 准备资源
*/
(function() {

	//prepare
	function prepare() {

		const imgTask = (img, src) =>  {
			return new Promise(function(resolve,reject)  {
				img.onload =  resolve;
				img.onerror = reject;
				img.src = src;
			})
		}
		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg')
		])

		return {
			/*
			 * @param {Function} [callback]  -当准备好了之后要调用的回调函数
			 */
			getResource(callback) {
				allresourceTask.then(function() {
					callback && callback(context, heroImg, allSpriteImg)
				})
		
			}
		}
	}

	//draw
	function drawHero(context, heroImg,allSpriteImg){
		var draw = function() {
			this.context
			.drawImage(
				this.img,
				this.imgPos.x,
				this.imgPos.y,
				this.imgPos.width,
				this.imgPos.height,
				this.rect.x + 50,
				this.rect.y,
				this.rect.width,
				this.rect.height
			)
		}
		var hreo = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect:{
				x: 0,
				y: 0,
				width: 45,
				height: 45,
			},
			draw:draw
		}

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 859,
				y: 529,
				width: 32,
				height: 32
			},

			rect:{
				x: 100,
				y: 100,
				width: 45,
				height: 45,
			},
			draw:draw
		}

		hreo.draw();
		monster.draw();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function(context, heroImg,allSpriteImg) {
		drawHero(context, heroImg,allSpriteImg)
	});

})()
