/**
 * @constructor
 * @param {props} An object containing properties for the actor
 */
function Actor(props) {
  this.parent = null; //Set in the game.addActor method
  //TODO add additional properties for each eactor
  var dflt = { 
      height: 0,
      width: 0,
      x: 0,
      y: 0,
      img: null
  };
  props = mergeWithDefault(props, dflt);

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
}

/**
 * Transitions the FMS for a particular transition and event
 * @param {Event} event object recieved, which includes certain information depending on the event type
 */
Actor.prototype.makeTransition = function(event, transition) {
  //TODO
}

/**
 * Draws the actor on the canvas based on its parameters
 * @param {Context} The HTML5 canvas context object to be drawn on. 
 */
Actor.prototype.draw = function(context) {
  //TODO
}

/**
 * Matches a particular event with the appropriate transition
 * @param {Event} event to match
 * @param {Object} transition to match
 * @return {boolean} True if the transition and even match, false otherwise
 */ 
var matchEvent = function(event, transition) {
  //TODO
}
