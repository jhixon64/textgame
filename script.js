const view = document.getElementById('gameOutput');
const input = document.getElementById('userInput');
let archive = ''; // variable to store past console text
var inMenu = false;
var startUp = true;

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
		if(startUp) {
			switch(inputString) {
				case 'guide':
					show('a quick guide');
					break;
				case 'continue':
					startUp = false;
					show('message describing what to do first');
					break;
			}
		}
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
			//room controls
			switch(inputString) {
				case 'm':
				case 'menu':
					show(msg.menu.main);
					inMenu = true;
					break;
				case 'n':
				case 'north':
					//move player function maybe
					show('moved north(not really)');
					break;
				case 's':
				case 'south':
					//move player function maybe
					show('moved south (not really)');
					break;
				case 'e':
				case 'east':
					//move player function maybe
					show('moved east (not really)');
					break;
				case 'w':
				case 'west':
					//move player function maybe
					show('moved west (not really)');
					break;
				case 'x':
				case 'examine':
					//examine function
					show('What would you like to examine?');
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
        out: 'Welcome to the best game ever! Do you know how to play? If not type "guide" to display a guide\n' +
			'otherwise type "continue" so that we can begin!',
        no: 'Too bad, the adventure is upon us!',
        yes: 'Excellent! Let us begin.',
		guide: 'This is a text based adventure game, that means the way to interact with the game\n' +
				'is by typing commands. Once you type "continue" you can type "menu" and then "controls"\n' +
				'to get a list of commands.',
    },
	menu: {
		main: 'This is the main menu:\nControls: show controls\nExit: exit the menu and continue playing',
		controls: 'Controls are:\n"north", "south", "east", "west":\nMoves player in that direction (not working yet)\n' + 
		'Menu:\nDisplays the menu\nExamine/x:\nExamines whatever you specify',
		exiting: 'Exiting...',
	},
    scene1: {
        out1: 'You wake up to find yourself in a place with no things. What do you wish you had right now?',
        out2: 'Well, you are in luck! Suddenly, a * has appeared before you.',
    },
	cart: {
		out: 'You wake up sitting in the back of a horse drawn cart headed down a clunky cobblestone road.\n' +
			'The air is cold and wet, you notice all you are wearing is rags\n' +
			'There are three men in the cart with you. One is a blonde haired sturdy built nord.\n' +
			'The second man is an imperial, much thinner and is looking down.' +
			'The third is\'nt facing you so you cant make out the details of his face. He appears to be gagged\n' +
			'The nord looks like he wants to talk to you.',
		ralof1: 'Ralof: Hey, you. You\'re finally awake. You were trying to cross the border,\n' +
				'right? Walked right into that Imperial ambush, same as us, and that\n' +
				'thief over there.\n' +
				'You look over and see that the imperial has raised his head. He looks angry\n' +
				'Lokir: Damn you Stormcloaks. Skyrim was fine until you came along. Empire was\n' +
				'nice and lazy. If they hadn\'t been looking for you, I could\'ve stolen\n' +
				'that horse and been half way to Hammerfell.\n' +
				'He looks at you\n' +
				'Lokir: You there. You and me -- we shouldn\'t be here. It\'s these\n' +
				'Stormcloaks the Empire wants.\n' +
				'Ralof: We\'re all brothers and sisters in binds now, thief.\n' +
				'Imperial Soldier: Shut up back there!\n' +
				'Lokir looks at the gagged man\n' +
				'Lokir: And what\'s wrong with him?\n' +
				'Ralof: Watch your tongue! You\'re speaking to Ulfric Stormcloak,\n' +
				'the true High King.\n' +
				'Lokir: Ulfric? The Jarl of Windhelm? You\'re the leader of the rebellion. But if\n' +
				'they captured you... Oh gods, where are they taking us?\n' +
				'Ralof: I don\'t know where we\'re going, but Sovngarde awaits.\n' +
				'Lokir: No, this can\'t be happening. This isn\'t happening.\n' +
				'As you make your way to your destination, you enter the town of Helgen.\n' +
				'Its a small town up in the hills of Falkreath Hold',
	},

};

//my idea of a player object based upon what i already know and what i see above this
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
	},
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
