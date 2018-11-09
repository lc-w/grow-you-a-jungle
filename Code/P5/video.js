//Grow You a Jungle by LCW
// Creation and Computation - Experiment 3
//reads Y value from the orientation sensor
//uses JSON as the language for sending the data
//requires p5.serialcontrol to be running
//run orientationtTop5.ino sketch on arduino

var serial;       //variable to hold the serial port object
var serialPortName = "/dev/cu.usbmodem1411";  //FOR mac it will be something like "/dev/cu.usbmodemXXXX"
var yAngle;                   //this variable holds the incoming orientation values
var playing = false;
var junglevid;
var button;



function setup() {
  
        createCanvas(0,0);
        angleMode(DEGREES);
        //Setting up the serial port
        serial = new p5.SerialPort();     //create the serial port object
        serial.open(serialPortName); //open the serialport. determined 
        serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback
        serial.on('data',dataReceived);   //when data is received execute the dataReceived function

    // specify multiple formats for different browsers
  junglevid = createVideo(['assets/grow-you-a-jungle.mp4']);
  button = createButton('play');
  button.mousePressed(toggleVid); // attach button listener
}

function draw() {
  toggleVid(); 
}

// plays or pauses the video depending on current state
function toggleVid() {
  if (yAngle>90) {
    junglevid.pause();
  } else { (yAngle<25) 
    junglevid.loop();;
  }
  playing = !playing;
}


function dataReceived()   //this function is called every time data is received
{
  
    var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    console.log(rawData);                       //uncomment this line to see the incoming string in the console     
    if(rawData.length>1)                          //check that there is something in the string
    {                                               
      yAngle = JSON.parse(rawData).oY;            //the name of parameter must match the one created in Arduino
      yAngle = (yAngle<0) ? yAngle+365 : yAngle;  //check to see if the value is below 0 if so add 365 to keep all the values positive 
        
    }
}

function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}