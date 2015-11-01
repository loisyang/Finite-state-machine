/**
 * @constructor
 * @param {props} An object containing properties for the actor
 */
function Actor(props) {
  this.parent = null; //Set in the game.addActor method
  //TODO add additional properties for each eactor
  this.height = props.height;
  this.width = props.width;
  this.x = props.x;
  this.y = props.y;
  this.img = props.img;
};

/**
 * Sets the FSM for the particular actor. 
 * @param {Object} FSM object as detailed in the instructions
 */
Actor.prototype.setFSM = function(fsm) {
  this.states = fsm.states;
  this.currentState = fsm.states[0];
}

/**
 * Recieves an event from dispatch and transitions the FSM appropriately
 * @param {Event} The event object recieved, which includes certain information depending on the event type
 * @return {boolean} True if the event was consumed by the actor, false if it was not consumed
 */
Actor.prototype.deliverEvent = function(event) {
  //TODO
  // console.log(event.type);
  var delivered = false;
  var availableTransitions = this.currentState.transitions;
  // console.log("availableTransitions");
  // console.log(this);
  // console.log(this.currentState);
  // console.log(this.currentState.transitions);
  for (var i in availableTransitions) {
    var transition = availableTransitions[i];
    // console.log("testing matchEvent");
    // console.log(matchEvent(event,transition));
    if  (matchEvent(event, transition)) {
      delivered = true;
      // console.log(this);
      // console.log(this.currentState);
      // console.log(transition);
      // console.log("matched transition in actor:"+ this +" with currentState" + this.currentState + "is " + transition);
      this.makeTransition(event, transition);
      return delivered;
    }
  }
  return delivered;
}

/**
 * Transitions the FMS for a particular transition and event
 * @param {Event} event object recieved, which includes certain information depending on the event type
 */
Actor.prototype.makeTransition = function(event, transition) {
  //TODO
  var actions = transition.actions;
  for (var actionIndex in actions) {
    var action = actions[actionIndex];
    var params = action.params;
    var func = action.func;
    func(event,params, this);
  }
  //reset current state
  for (var i in this.states) {
    var stateObj = this.states[i];
    if (stateObj.name === transition.endState){
      this.currentState = stateObj;
    }
  }
  this.parent.onDraw();

}

/**
 * Draws the actor on the canvas based on its parameters
 * @param {Context} The HTML5 canvas context object to be drawn on. 
 */
Actor.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
}

/**
 * Matches a particular event with the appropriate transition
 * @param {Event} event to match
 * @param {Object} transition to match
 * @return {boolean} True if the transition and even match, false otherwise
 */ 
var matchEvent = function(event, transition) {
  //TODO
  // console.log("what is transition.predicate");
  var predicate = transition.predicate;
  // console.log(typeof(predicate));
  // if ((transition.predicate === null) || (transition.predicate === true)){
    if (event.type === transition.event){
      if (event.type === "message"){
        return transition.message === event.message;
      } else if (event.type === "buttonpress"){
        // console.log(event.target.id);
        return transition.target === event.target.id;
      } else{
        return true;
      }
    } 
  // }
  return false;
}
