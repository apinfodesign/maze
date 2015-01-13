var gamelib = require("jsi-gamelib");
var gameMapIn = require("./gamemap.json")
console.log(gameMapIn.rooms);

var currentRoom;  // arbitrary starting room for user
var newCurrentRoom;

// set up user interface
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// bring in jsi-gamelib via gamelib above
// log the map in gamelib
function outputMaze(){
console.log("");
console.log(gamelib.map(require(process.argv[2])));
};

console.log("Welcome to the maze.");

// rl.question("Enter a direction (< ^ - >) ", function(answer) {
//    console.log("You entered: ", answer);
//    rl.close();
// });

/////////////////////////////////////////////
//  giveUserCurrentStatus()
//    evaluateCurrentPositionForAlerts()
//      askUserNextMove()
//        checkMovepossible ()
//           denyOrUpdate ()
//				1 askUserNextMove()
//				2 giveUserCurrentPosition()
/////////////////////////////////////////////

giveUserCurrentStatus("B");  //assign start status here

function giveUserCurrentStatus(arg){
	var currentRoom = arg;    
//	console.log(gamelib.map(require(process.argv[2])));
	outputMaze();

 	console.log("You are in room: " + currentRoom);

	evaluateCurrentPositionForAlerts(currentRoom);   //seems to work!
};	

function evaluateCurrentPositionForAlerts(arg){
	 currentRoom = arg;
     for (i=0; i< gameMapIn.rooms.length; i++){
        	if  ((gameMapIn.rooms[i].treasure === true) && (gameMapIn.rooms[i].name === currentRoom))
        		{ 
         		console.log("YOU FOUND THE TREASURE!  O ! M ! G ! YOU WIN! ");   
        		};
			};
	//console.log("evaluating current position for alerts");
	askUserNextMove(currentRoom);
};

function askUserNextMove(argCurrentRoom){
    rl.question("Which direction to move next? ( N S E W ) ", function(argNextMove) {
   console.log("You chose direction: ", argNextMove + " from currentRoom: "+argCurrentRoom );
   //rl.close();
 
   checkMovePossible(argNextMove, argCurrentRoom);
	});
};

function checkMovePossible(arg1, arg2){
	//take current location and figure out if requested move possible
	//console.log("here we check if current request is possible.... ")
	answer = arg1;
	currentRoom = arg2;
	//console.log("entering function <checkMovePossible> answer we are checking is "+ answer);
	//console.log("currentRoom is " + currentRoom +"  and newCurrentRoom" + newCurrentRoom);
	switch(answer) 
	{
    case "N":
    	//console.log("you chose N");
        for (i=0; i< gameMapIn.rooms.length; i++){
        	if  ( (gameMapIn.rooms[i].name === currentRoom) && (gameMapIn.rooms[i].north !== null) )
        		{ 
         		var newCurrentRoom = gameMapIn.rooms[i].north;  
  			      	giveUserCurrentStatus(newCurrentRoom);     		
       		} 
        	else{
        		//console.log(answer + " is not a doable direction");
         		};
			};
 			console.log("No NORTH move was possible");
    		giveUserCurrentStatus(currentRoom);     		
        break;

    case "S":
    	//console.log("you chose S");
        for (i=0; i< gameMapIn.rooms.length; i++){
        	if  ( (gameMapIn.rooms[i].name === currentRoom) && (gameMapIn.rooms[i].south !== null) )
        		{ 
        			var newCurrentRoom = gameMapIn.rooms[i].south;        	
        			giveUserCurrentStatus(newCurrentRoom);
        			}
			else{
        		//console.log(answer + " is not a doable direction");
         	};  
			}; //END FOR LOOP
 			console.log("No SOUTH move was possible");
    		giveUserCurrentStatus(currentRoom);     		
       break;

    case "E":
    	//console.log("you chose E");
        for (i=0; i< gameMapIn.rooms.length; i++){
        	if  ( (gameMapIn.rooms[i].name === currentRoom) && (gameMapIn.rooms[i].east !== null) )
        		{ var newCurrentRoom = gameMapIn.rooms[i].east;         		
				giveUserCurrentStatus(newCurrentRoom);
        		}  
			else{
        		//console.log(answer + " is not a doable direction");
         	};
			}; //END FOR LOOP
 			console.log("No EAST move was possible");
    		giveUserCurrentStatus(currentRoom);     		

       break;

    case "W":
    	//console.log("you chose W");
        for (i=0; i< gameMapIn.rooms.length; i++){
        	if  ( (gameMapIn.rooms[i].name === currentRoom) && (gameMapIn.rooms[i].west !== null) )
        		{ var newCurrentRoom = gameMapIn.rooms[i].west; 
        		giveUserCurrentStatus(newCurrentRoom);
	      		}
			else{ //console.log(answer + " is not a doable direction"); 
			};
			
			}; //END FOR LOOP

 			console.log("No WEST move was possible.");
    		giveUserCurrentStatus(currentRoom);     		
    	
         break;

    default:
		//console.log(" Sorry, you must chose N E S or W.")
        //console.log( "You have hit default and this is your current room:  "+ currentRoom);
        denyOrUpdate();
 	}
//	console.log("currentRoom is: "+ currentRoom + "    newCurrentRoom is " + newCurrentRoom );
	
};

function denyOrUpdate(){
   console.log(" Sorry, you must chose N E S or W.")
    giveUserCurrentStatus(currentRoom);

 
};



