// variables: A B
// axiom: A
// rules: (A -> AB), (B -> A)

var cnv; //canvas

var angle = 25;
var axiom = "F";
var sentence = axiom;
var len = 100;
var rules = [];

rules[0] = {
  a: "F",
  b: "FF[+F-F-F][--F+F+F]"
}

var sound;

function generate() {
  if (sound.isPlaying()) {
		sound.pause();
	} else {
		sound.play();
	}
	
  
  len *= 0.5;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
	found = true;
	nextSentence += rules[j].b;
	break;
      }
      if (!found) {
	nextSentence += current;
      }
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  translate(width / 2, height);
  stroke(255, 75);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "f") {
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function preload() {
	sound = loadSound("doorclose.mp3");
}

function setup() {
  cnv = createCanvas(400, 400);
  centerCanvas();
	
	sound.loop();
	
  background(51);
  angle = radians(angle);
  turtle();
  createP(axiom);
  var button = createButton("generate");
  button.mousePressed(generate);
}

function windowResized() {
	centerCanvas();
}
