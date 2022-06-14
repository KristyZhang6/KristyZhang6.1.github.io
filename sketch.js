

let dataServer;
let pubKey = "pub-c-94f4267e-61b9-4488-8801-21af560067b7";
let subKey = "sub-c-3d7b9ed7-e056-4196-ab14-c5efa136004f";
let secretKey = "sec-c-ZDI3YmU0MjctMmNlYy00OWI2LWFkOTYtNjQ5ODM0ZDQ0ZDIx";

let occupancy = 0; 


let channelName = "presenceTest";

  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Kristy",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });
    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    // listen for messages coming through the subcription feed on this specific channel. 
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() {
  background(50,50,100);
  textSize(80);
  textAlign(CENTER);
  fill(100,150,100);
  

 if (occupancy > 0) {

  text("There are " +  occupancy + " people online", windowWidth/2, windowHeight/2);

 } else {

  text("Still waiting for someone...", windowWidth/2, windowHeight/2);

 }
 
}
 

function mousePressed() {

  sendTheMessage();
}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      test: "test"
    },
  });
}

function readIncoming(inMessage) {
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

  /* connnectionInfo.action == "join"*/
  /* connnectionInfo.action == "leave"*/

}