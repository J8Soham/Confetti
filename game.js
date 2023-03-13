let eventHandler = {
    amount: 80,
    dotsArray: [],
    dot: function () {
      return {
        x: canvas.width/2,
        y: canvas.height/2,
        augX: Math.random() * 20 - 10,
        augY: Math.random() * 20 - 10,
      };
    },
  };

const canvas = document.getElementById("pop");
const ctx = canvas.getContext("2d");


setCanvasSize();
function setCanvasSize() {
	WIDTH = document.documentElement.clientWidth,
    HEIGHT = document.documentElement.clientHeight;                      

	canvas.setAttribute("width", WIDTH);
	canvas.setAttribute("height", HEIGHT);
}

  
 async function kaBoom() {
    for (i = 0; i < eventHandler.amount; i++) {
      eventHandler.dotsArray[i] = eventHandler.dot();
    }
  
    let allDotsOffScreen = false;
    while (eventHandler.dotsArray.length > 0 && !allDotsOffScreen) {
      allDotsOffScreen = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (i = 0; i < eventHandler.dotsArray.length; i++) {
        if (eventHandler.dotsArray[i].x >= canvas.width || eventHandler.dotsArray[i].x <= 0 || eventHandler.dotsArray[i].y >= canvas.height || eventHandler.dotsArray[i].y <= 0) {
            eventHandler.dotsArray.splice(i, 1);
        } 
        else {
            eventHandler.dotsArray[i].x += eventHandler.dotsArray[i].augX;
            eventHandler.dotsArray[i].y += eventHandler.dotsArray[i].augY;
            draw(eventHandler.dotsArray[i].x, eventHandler.dotsArray[i].y);
            allDotsOffScreen = false;
        }
      }
      await new Promise(resolve => setTimeout(resolve, 20)); 
    }
  }
  
  function draw(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }  