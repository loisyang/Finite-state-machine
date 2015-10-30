// General actions for the actor's statemachine's. To be implimented

var Actions = (function () {
  return {
    /**
     * Causes the character to change its image to the parameterized bitmap. If the parameter is null, no image should be displayed.
     * @param {Object} params
     *   img: Image to change the actor ro
     */
    changeImg: function(event, params, actor) {
      //TODO
    },
    /**
     * Moves the character to exact x,y coordinates (no bounds checking)
     * @param {Object} params
     *   targetAbsoluteX: the x coordinate for the character to move to
     *   targetAbsoluteY: the y coordinate for the character to move to
     */
    moveTo: function(event, params, actor) {
      //TODO
    },
    /**
     * Moves the character by the increment specified by x and y, relative to its current position (no bounds checking)
     * @param {Object} params
     *   targetOffsetX: the x offset for the character to move
     *   targetOffsetY: the y offset for the character to move
     */
    moveInc: function(event, params, actor) {
      //TODO
    },
    /**
     * Move the character to the x, y coordinates of the corresponding event
     */
    followEventPosition: function(event, params, actor) {
      //TODO
    },
    /**
     *  Cause the character to begin the specified animation
     *  @params {Object} params
     *    movingActor: Actor obj that should animate
     *    targetActor: Actor obj that should animate
     *    endMessage String that specifies the message to deliver when the character reaches its destination 
     *    passOverMessage – String that specifies the message to deliver if the character passes over another character 
     *    duration – integer that specifies the duration for the animation to take
     */
    runAnim: function(event, params, actor) {
      //TODO
    },
    /**
     * Cause the character to be the focus of a drag event
     */    
    getDragFocus: function(event, params, actor) {
       //TODO
    },
    /**
     * Cause the character to release focus of the drag event
     */
    dropDragFocus: function(event, params, actor) {
      //TODO
    },
    /**
     * Send the specified message to the specified target character
     * @params {Object} params
     *    message: Message to send
     *    actor: Actor to send the message to
     */
    sendMessage: function(event, params, actor) {
       //TODO
    },
    /**
     * Write a debug message to the debug log with the tag “ssui”
     *  @params {Object} params
     *    message: Message to log in the console
     */
    debugMessage: function(event, params, actor) {
      //TODO
    }
  };
})();
 
 
