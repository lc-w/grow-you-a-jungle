//Grow You a Jungle by LCW
// Creation and Computation - Experiment 3
//reads Y value from the orientation sensor
//draws it as 3 dials
//uses JSON as the language for sending the data
//requires p5.serialcontrol to be running
//run orientationtTop5.ino sketch on arduino

var serial;       //variable to hold the serial port object

var serialPortName = "/dev/cu.usbmodem1411";  //FOR mac it will be something like "/dev/cu.usbmodemXXXX"
                              //Look at P5 Serial to see the available ports

//var xAngle;                   //these variables hold the incoming orientation values
var yAngle;      
//var zAngle;
var jungleVid;
var vid;
function setup() {
  createCanvas(0, 0);
  jungleVid = createVideo("assets/grow-you-a-jungle.mp4");
  jungleVid.loop()
}

function preload () {
  video = createVideo("assets/grow-you-a-jungle.mp4")
}

function setup() 
{
  
  createCanvas(1023,1023);
  angleMode(DEGREES);
  //Setting up the serial port
  serial = new p5.SerialPort();     //create the serial port object
  serial.open(serialPortName); //open the serialport. determined 
  serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback
  serial.on('data',dataReceived);   //when data is received execute the dataReceived function

  // specify multiple formats for different browsers
  fingers = createVideo(['assets/grow-you-a-jungle.mp4',
                         'assets/fingers.webm']);
  button = createButton('play');
  button.mousePressed(toggleVid); // attach button listener
}

function draw() {
  background(map(yAngle,0,365,0,255));
  stroke(0);
  strokeWeight(2);
  
////this draws the dials with the orientation sensor values

  push();
  translate(width/2,height/2);
  fill(255);
  ellipse(0,0,200,200);
  textSize(30);
  textAlign(CENTER,CENTER);
  fill(0);
  text('Y',0,0);
  text(''+yAngle,0,130);
  rotate(-yAngle);
  line(0,0,100,0);
  fill(0);
  ellipse(100,0,10,10);
  pop();

 
}


function dataReceived()   //this function is called every time data is received
{
  
    var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    console.log(rawData);                       //uncomment this line to see the incoming string in the console     
    if(rawData.length>1)                          //check that there is something in the string
    {                                               
      xAngle = JSON.parse(rawData).oX;            //the name of parameter must match the one created in Arduino
      xAngle = (xAngle<0) ? xAngle+365 : xAngle;  //check to see if the value is below 0 if so add 365 to keep all the values positive

      yAngle = JSON.parse(rawData).oY;            //the name of parameter must match the one created in Arduino
      yAngle = (yAngle<0) ? yAngle+365 : yAngle;  //check to see if the value is below 0 if so add 365 to keep all the values positive 
      
      zAngle = JSON.parse(rawData).oZ;            //the name of parameter must match the one created in Arduino
      zAngle = (zAngle<0) ? zAngle+365 : zAngle;  //check to see if the value is below 0 if so add 365 to keep all the values positive  
    }
}

function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}


