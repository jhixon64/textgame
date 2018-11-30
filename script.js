const view = document.getElementById('gameOutput');
const input = document.getElementById('userInput');
let archive = ''; // variable to store past console text
var inMenu = false;

function checkKeyUp(e) {
    const evt = e.keyCode || e.charCode;
    if (evt == 13) // User presses Enter
        onEnter();
    else
        updateView();
}

// This prevents the arrow keys, Home, or End keys from affecting the input
function checkKeyDown(e) {
    const evt = e.keyCode || e.charCode;
    if ((evt <= 40 && evt >= 37) || evt == 36 || evt == 35)
        event.preventDefault();
}

function onEnter() {
    if (input.value != '') {
        archive += input.value + '\n\n'; // Add input text to the archive
        
        // here we should output something according to the game logic
		/*
		if(isYes(input.value)) {
			show(msg.welcome.yes);
		} else {
			show(msg.welcome.no);
		}
		*/
		var inputString = input.value.toLowerCase();
		/*
		switch(inputString) {
			case 'y':
			case 'yes':
				show(msg.welcome.yes);
				break;
			default:
				show(msg.welcome.no);
				break;
		};
		*/
		//test
		//TODO: make a switch that has all common options for every room
		//		somehow make it modular, meaning some options can change depending on the room
		if(inMenu) {
			switch(inputString) {
				case 'c':
				case 'controls':
					show(msg.menu.controls);
					break;
				case 'e':
				case 'exit':
				default:
					show(msg.menu.exiting);
					inMenu = false;
					break;
			}
		} else {
			switch(inputString) {
				case 'm':
				case 'menu':
					show(msg.menu.main);
					inMenu = true;
					break;
			}
		}
		//show('recieved enter');
		
		
        
        input.value = ''; // clear the input box
        updateView();        
    }
}

// This updates the console after each keystroke.
function updateView() {
    view.value = archive + input.value + '|';
    view.scrollTop = view.scrollHeight;
}


// This is a quick function to show something to the user
function show(output) {
    archive += output + '\n\n';
    updateView();
}


// This might come in handy for quickly evaluating yes or no questions
function isYes(inputText) {
    return inputText.toLowerCase() == 'y' || inputText.toLowerCase() == 'yes';
}


function bestGameEver() {
    document.getElementById('userInput').focus();
    show(msg.welcome.out);
}


// You could store messages in a JS object like this, or just an array.
// I like objects because of their flexible structure.
const msg = {
    welcome: {
        out: 'Welcome to the best game ever! Are you ready to play?',
        no: 'Too bad, the adventure is upon us!',
        yes: 'Excellent! Let us begin.',
    },
	menu: {
		main: 'This is the main menu:\nControls: show controls\nExit: exit the menu and continue playing',
		controls: 'Controls are:\nyour keyboard ya dingus',
		exiting: 'Exiting...'
	},
    scene1: {
        out1: 'You wake up to find yourself in a place with no things. What do you wish you had right now?',
        out2: 'Well, you are in luck! Suddenly, a * has appeared before you.'
    }
};

//my idea of a player object based upon what i already know and what i see above this
//breaks the program
/*
const player = {
	skills: {
		combat: {
			archery: 15,
			block: 15,
			heavyArmor: 15,
			oneHanded: 15,
			smithing: 15,
			twoHanded: 15
		},
		stealth: {
			alchemy: 15,
			lightArmor: 15,
			lockpicking: 15,
			pickpocket: 15,
			sneak: 15,
			speech: 15
		},
		magic: {
			alteration: 15,
			conjuration: 15,
			destruction: 15,
			enchanting: 15,
			illusion: 15,
			restoration: 15
		}
	}, // I added a comma here, which may have been the issue -Bradley
	stats: {
		health: 100,
		stamina: 100,
		magicka: 100,
		attack: 1,
		defense: 0
	},
	equipment: {
		head: '',
		torso: '',
		hands: '',
		feet: '',
		left: '',
		right: ''
	},
	enchantments: {
		head: '',
		torso: '',
		hands: '',
		feet: '',
		left: '',
		right: ''
	}
};
*/