// Provides the state machine descriptions and creates a new game

//First, load in all of our images
var loadCounter = 0;
var totalImg = 0;

var icon = new Image();
totalImg++;
icon.onload = function() {
  loadCounter++;
}
icon.src = 'icon.png';

var icon_black = new Image();
totalImg++;
icon_black.onload = function() {
  loadCounter++;
}
icon_black.src = 'icon_black.png';

var crosshair = new Image();
totalImg++;
crosshair.onload = function() {
  loadCounter++;
}
crosshair.src = 'crosshair.png';

var icon_red = new Image();
totalImg++;
icon_red.onload = function() {
  loadCounter++;
}
icon_red.src = 'icon_red.png';

var heart = new Image();
totalImg++;
heart.onload = function() {
  loadCounter++;
}
heart.src = 'heart.png';

//Create our actors and their FSMs
var actor1 = new Actor({
  height: 50,
  width: 50,
  x: 20,
  y: 20,
  img: icon_black,
}); 
var actor2 = new Actor({
  height: 50,
  width: 50,
  x: 80,
  y: 20,
  img: icon,
}); 
var actor3 = new Actor({
  height: 50,
  width: 50,
  x: 200,
  y: 20,
  img: icon,
}); 
var actor4 = new Actor({
  height: 50,
  width: 50,
  x: 20,
  y: 20,
  img: crosshair,
}); 

actor1.setFSM({ 
  states: [ 
  { 
    name: "start", 
    transitions: [ 
      { 
        event: "message",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: heart
          }
        }],
        message: '$INIT$',
        endState: "start"
      }, { 
        event: "buttonpress",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: icon_black
          }
        }],
        endState: "start",
        target: 'button0'
      },{ 
        event: "mousedown",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: icon
          }
        }],
        endState: "start"
      },{ 
        event: "mouseup",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: icon_red
          }
        }],
        endState: "start",
      },{ 
        event: "mousemove",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: crosshair
          }
        }],
        endState: "start"
      },{
      event: "buttonpress",  
        actions: [{
          func: Actions.runAnim,
          params: {
            movingActor: actor1,
            targetActor: actor2,
            duration: 5000,
            passOverMessage: "passover",
            endMessage: "ChangeToHeart"
          }
        }],
        endState: "start",
        target: 'button1'          
      }, { 
        event: "animstart",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: icon_red
          }
        }], 
        endState: "start"
      },{ 
        event: "animmove",  
        actions: [{
          func: Actions.followEventPosition
        }],
        endState: "start"
      },{ 
        event: "animend",  
        actions: [{
          func: Actions.followEventPosition
        },{
          func: Actions.changeImg,
          params: {
            img: crosshair
          }
        }],
        endState: "start"
      }
    ] 
  }] 
});

actor2.setFSM({ 
  states: [ 
  { 
    name: "start", 
    transitions: [ 
      { 
        event: "mousedown",  
        actions: [{
          func: Actions.getDragFocus  
        },{
          func: Actions.changeImg,
          params: {
            img: icon_red
          }
        }],
        endState: "start"
      },{ 
        event: "dragmove",  
        actions: [{
          func: Actions.followEventPosition  
        }],
        endState: "start"
      },{ 
        event: "dragend",  
        actions: [{
          func: Actions.dropDragFocus  
        },{
          func: Actions.changeImg,
          params: {
            img: icon
          }
        }],
        endState: "start"
      },{ 
        event: "message",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: heart
          }
        }],
        endState: "start",
        message: "ChangeToHeart"
      }
    ] 
  }] 
});

actor3.setFSM({ 
  states: [ 
  { 
    name: "start", 
    transitions: [ 
      { 
        event: "message",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: heart
          }
        }],
        endState: "start",
        message: 'passover'
      }
    ] 
  }] 
});

actor4.setFSM({ 
  states: [ 
  { 
    name: "state0", 
    transitions: [ 
      { 
        event: "buttonpress",
        predicate: function(event, params, actor) { return event.shiftKey },
        actions: [{
          func: Actions.moveTo,
          params: {
            targetAbsoluteX: 50,
            targetAbsoluteY: 100
          }
        }],
        endState: "state1",
        target: 'button0'
      }
    ]
  },{
    name: "state1",
    transitions: [
      { 
        event: "buttonpress",
        predicate: function(event, actor) { return event.shiftKey },
        actions: [{
          func: Actions.moveInc,
          params: {
            targetOffsetX: 20,
            targetOffsetY: 30
          }
        }],
        endState: "state2",
        target: 'button0'
      }
    ]
  },{
    name: "state2",
    transitions: [
      { 
        event: "buttonpress",
        predicate: function(event, actor) { return event.shiftKey },
        actions: [{
          func: Actions.moveTo,
          params: {
            targetAbsoluteX: 10,
            targetAbsoluteY: 150
          }
        }],
        endState: "state0",
        target: 'button0'
      }
    ]
  }] 
});


//When the DOM has loaded, actually setup our game
window.onload = function() { 
  var game = new Game(document.getElementById("game"));
  game.addActor(actor1);
  game.addActor(actor2);
  game.addActor(actor3);
  game.addActor(actor4);
  
  document.getElementById("button0").addEventListener("click", function(event) {
    event = _.clone(event);
    event.type = "buttonpress";
    game.dispatchToAll(event);
  });
  
  document.getElementById("button1").addEventListener("click", function(event) {
    event = _.clone(event);
    event.type = "buttonpress";
    game.dispatchToAll(event);
  });
  
  //Wait for all of the imaages to load in before we start the game
  var runGame = function() {
    if (loadCounter >= totalImg)
      game.run();
    else
      setTimeout(function() { runGame() }, 200);
  }
  runGame();
};



