const view = document.getElementById('gameOutput');
const input = document.getElementById('userInput');
let archive = ''; // variable to store past console text
var inputString;
var inMenu = false;
var startUp = true;
var deaths = 0;
var room = 1; //maybe use this to keep track of what room im in, so that i can easily make a formula or something
var userName = 'Bob';
var hopefullyUndefined;
var maybeUndefined = undefined;

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
		inputString = input.value.toLowerCase();
        
        // here we should output something according to the game logic
		
		//if inputted a valid command
		if (isValid(rms[room].msg[inputString])) {
			show(rms[room].msg[inputString]);
			rms[room]['inputString'];
		} else {
			show('Input was invalid, try again.');
		}
		/* 
		show(hopefullyUndefined + ' undefined?');
		
		show(maybeUndefined + ' undefined!');
		
		show(undefined + ' undefined.');
		 */
		/*
		if(isYes(input.value)) {
			show(msg[0].opt.yes);
		} else {
			show(msg[0].opt.no);
		}
		*/
		
		
		/*
		if(player.stats.health == 0) {
			healthOut();
		}
		*/
		//TODO: make a switch that has all common options for every room
		//		somehow make it modular, meaning some options can change depending on the room
		/*
		if(!startUp) {
			if(inMenu) {
				//menu controls
				switch(inputString) {
					case 'c':
					case 'controls':
						show(msg[1].opt.controls);
						break;
					case 'e':
					case 'exit':
					default:
						show(msg[1].opt.exiting);
						inMenu = false;
						break;
				}
			} else {
				//room controls
				switch(inputString) {
					case 'm':
					case 'menu':
						show(msg[1].opt.main);
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
						examine();
						break;
					case 'talk':
						show(msg[3].opt.ralof1);
						break;
					default:
						show('Invalid command!');
						break;
				}
			}
		}
		
		if(startUp) {
			switch(inputString) {
				case 'guide':
					show(msg[0].opt.guide);
					break;
				case 'begin':
					startUp = false;
					msg[0][inputString](); // equivalent to msg[0].begin();
					break;
				default:
					show('Invalid command!');
			}
		}
		//show('recieved enter');
		*/
		
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

function isValid(userInput) {
	return !(userInput == undefined);
}

//my idea with these two functions is to pass in what the user inputted and use that to know what message to display
function examine() {
	//show(msg);
}

function interact(userInput) {
	show(rms[room].msg[userInput]);
}

//this method might be the solution because i can use the room number to change what output to give for the same commands
/*
function input(input, room) {
	switch(input) {
		case 'x':
		case 'examine':
		//what i want to do is just say something like show(msg.(room number).examine); so i dont have to assign
		//each room a number manually. that would save a lot of work
			switch(room) {
				case 0:
					show(msg.cart.examine);
					break;
				case 1:
					show(msg.ridingIntoHelgen.examine);
					break;
				case 2:
					show(msg.endOfTheLine.examine);
					break;
			}//examine room switch
	}
}
*/

// This might come in handy for quickly evaluating yes or no questions
function isYes(inputText) {
    return inputText.toLowerCase() == 'y' || inputText.toLowerCase() == 'yes';
}

function showViewport() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('viewport').style.display = 'block';
    document.getElementById('mapTab').classList.remove('activeTab');
    document.getElementById('viewportTab').classList.add('activeTab');
}

function showMap() {
    document.getElementById('viewport').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    document.getElementById('mapTab').classList.add('activeTab');
    document.getElementById('viewportTab').classList.remove('activeTab');
}

function showStats() {
    document.getElementById('combat').style.display = 'none';
    document.getElementById('stats').style.display = 'block';
    document.getElementById('combatTab').classList.remove('activeTab');
    document.getElementById('statsTab').classList.add('activeTab');
}

function showSkills() {
    document.getElementById('stats').style.display = 'none';
    document.getElementById('combat').style.display = 'block';
    document.getElementById('combatTab').classList.add('activeTab');
    document.getElementById('statsTab').classList.remove('activeTab');
}

function updateStatsDisplay() {
	
	for (var stat in player.stats) {
		document.getElementById(stat).innerHTML = player.stats[stat]; // must use [brackets] with variables
		document.getElementById(stat + 'Bar').style.width = player.stats[stat] + '%';
		document.getElementById(stat + 'BarDown').style.width = 100-player.stats[stat] + '%';
	}
	
	for (var combatSkill in player.skills.combat) {
		document.getElementById(combatSkill).innerHTML = player.skills.combat[combatSkill];
		document.getElementById(combatSkill + 'Bar').style.width = player.skills.combat[combatSkill] + '%';
		document.getElementById(combatSkill + 'BarDown').style.width = 100-player.skills.combat[combatSkill] + '%';
	}

}

//call this when the player dies
/*
function healthOut() {
	var valid = false;
	deaths++;
	show('You died! Better luck next time!\nRestart from last save? y/n');
	while(!valid) {
		switch(userInput) {
			case 'y':
			case 'yes':
				show('Loading save...');
				//load save
				valid = true;
				break;
			case 'n':
			case 'no':
				show('Ok just quit out of the window or something gosh');
				//maybe save the game
				valid = true;
				break;
			default:
				show('Invalid input');
	}
}
*/

function bestGameEver() {
    document.getElementById('userInput').focus();
	updateStatsDisplay();
    show(rms[1].msg.out);
}


const rms = [
	{
		name: 'Menu',
		img: 'menu.png',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {
			main: 'This is the main menu:\nControls: show controls\nExit: exit the menu and continue playing',
			controls: 'Controls are:\n"north", "south", "east", "west":\nMoves player in that direction (not working yet)\n' + 
			'"menu":\nDisplays the menu\n"examine"/"x":\nExamines whatever you specify',
			exiting: 'Exiting...',
			cheat: 'Enabling cheats',
		},
	},
	{ 
		name: 'Welcome',
		img: 'welcome.png',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {
			out: 'Welcome to the best game ever! Do you know how to play?\n' +
				'If not type "guide" to display a guide, otherwise type "begin" so that we can begin!',
			no: 'Too bad, the adventure is upon us!',
			yes: 'Excellent! Let us begin.',
			guide: 'This is a text based adventure game, that means the way to interact with the game\n' +
					'is by typing commands. Once you type "begin" you can type "menu" and then\n' +
					'"controls" to get a list of commands.',
			begin: '',
		},
		begin() {
			console.log('Begin function has been called');
			room++;
			show(rms[room].msg.out);
		},
	},
	/*
	{ // 1
		name: 'Menu',
		img: 'menu.png',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		opt: {
			main: 'This is the main menu:\nControls: show controls\nExit: exit the menu and continue playing',
			controls: 'Controls are:\n"north", "south", "east", "west":\nMoves player in that direction (not working yet)\n' + 
			'"menu":\nDisplays the menu\n"examine"/"x":\nExamines whatever you specify',
			exiting: 'Exiting...',
			cheat: 'Enabling cheats',
		},
	},
	{ // 2
		name: 'Scene 1',
		img: '',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {
			out1: 'You wake up to find yourself in a place with no things. What do you wish you had right now?',
			out2: 'Well, you are in luck! Suddenly, a * has appeared before you.',
		},
	},
	*/
	{ // 3
		name: 'Cart',
		img: '',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {
			out:'You wake up sitting in the back of a horse drawn cart headed down a clunky cobblestone road.\n' +
				'The air is cold and wet, you notice all you are wearing is rags\n' +
				'There are three men in the cart with you. One is a blonde haired sturdy built nord.\n' +
				'The second man is an imperial, much thinner and is looking down.\n' +
				'The third is\'nt facing you so you cant make out the details of his face.\n' +
				'He appears to be gagged.\n' +
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
					'Ralof: Watch your tongue! You\'re speaking to Ulfric Stormcloak, ' +
					'the true High King.\n' +
					'Lokir: Ulfric? The Jarl of Windhelm? You\'re the leader of the rebellion. But if\n' +
					'they captured you... Oh gods, where are they taking us?\n' +
					'Ralof: I don\'t know where we\'re going, but Sovngarde awaits.\n' +
					'Lokir: No, this can\'t be happening. This isn\'t happening.\n' +
					'As you make your way to your destination, you enter the town of Helgen.\n' +
					'Its a small town up in the hills of Falkreath Hold',
			examine:'You can see a town approaching in the distance.\n' +
					'If you wait for a few minutes then you\'ll soon be carted inside the walls',
			wait:	'Waiting...',
		},
		talk() {
			show(rms[room].msg.ralof1);
		},
	},
	{ // 4
		name: 'Riding Into Helgen',
		img: '',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {		
			out:	'You have finally made it to Helgen. The townspeople look on in silence as you\n' +
					'and the other prisoners are carted to the town center',
			examine:'Surrounding you are several Imperial soldiers armed with swords, bows, and magic.\n' +
					'Making a run for it does not seem like a good option currently.' +
					'Looks like all you can do now is wait for the end of the line.',
			run:	'You jump out of the cart and run past a few guards; however, before you make it\n' +
					'5 steps further an arrow takes you out and you go down without any fight.',
			wait:	'Waiting...',
		},
	},
	{ // 5
		name: 'End of the Line',
		img: '',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {
			out:	'Lokir: Wait... why are we stopping?\n' +
				'Ralof: Why do you think? End of the line.\n' +
				'Your cart stops in the town square where you see several things.\n' +
				'An imperial legate stands next to a large man in a dark hood carrying a large axe.\n' +
				'Soldier: Step out of the cart prisoners. Your final destination awaits.\n' +
				'The soldier starts to read off the names of the prisoners and filing them into lines' +
				'in front of the legate.\n' +
				'Soldier: Ralof of Riverwood, Lokir of Rorikstead...\n' +
				'Lokir: No! You cant do this! Im innocent! Im not a rebel!\n' +
				'Lokir makes a run for it, pushing past a few soldiers standing guard. He makes it about ' +
				'halfway out of the square before getting hit by an arrow and going down with a large thud.\n' +
				'Legate Rikke: Anyone else feel like running?\n' +
				'Silence.\n' +
				'The soldier then looks at you.\n' +
				'Soldier: Wait... Who are you? What is your name?\n' +
				'Enter your name:',
			execution:	'Soldier: Well, ' + userName + ', walk over there with the others\n' +
						'In the distance, a sound unheard for thousands of years emerges from the mountains.\n' +
						'Nobody seems to take much notice. The sound faintly echos off.\n' +
						'You walk over and watch as each prisoner is slowly called up, eliminated, and tossed to the side.\n' +
						'Next: ' + userName + '!\n' +
						'You walk up, they force you down into a kneeling position with your head positioned on the block. ' +
						'The man raises his axe and prepares to slam it down.\n' +
						'Suddenly a ferocious roar pushes everyone to the ground.\n' +
						'Dragon!\n' +
						'The sky begins to rain fire and lightning. Prisoners and guards alike scatter in all directions.',
			examine:'You look up to see several prisoners run into a tower. There does not seem to be any other ways to go.' +
					' Do you run towards them?',
			other:	'You try to move in a different direction, but are stopped by large pieces of the buildings collapsing' +
					' around you. You take damage from the environment. The way to the tower is still open.',
			toTower:'You run to the tower, dodging fire and stone as it flies around you.',
		}
	},
	{ // 6
		name: 'Tower',
		img: '',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {			
			out:'You make it into the tower safely. You are surrounded by the other prisoners, including Ralof and Ulfric.\n' +
				'Ralof: ' + userName + ' you made it safely! We were just deciding what to do. Jarl Ulfric needs to get' +
				'out of here.\n' +
				'Ulfric: There is a passage under this keep. If we make a run for the other side of town...\n' +
				'Crash! You hear screaming and a deafening roar from above.\n' +
				'Ralof: Gods! Its found us!',
			examine:'You look around the room, theres not much to hide under or behind. Looks like running is ' +
					'once again the only option.',
			run:'You start running towards the door but then a huge boulder falls down from outside, blocking ' +
				'the exit. You look around and see some stairs. Looks like the only way out is upstairs where ' +
				'the beast is. Only way to go is up.',
			up:	'You bolt up the stairs, ready to fight or sneak around whatever you find with your bound hands.',
			back:	'The room is exactly how you left it. Door still blocked and nothing to use.',
			examine2:	'There doesn\'t seem to be anything useful around. The only way out is upstairs.',
		}
	},
	{ // 7
		name: 'Tower Up',
		img: '',
		dir: {
			n: false,
			s: false,
			e: false,
			w: false,
		},
		msg: {
			
			out:'Once you reach the next floor there is nothing but a few dead bodies and rubble scattered ' +
				'across the room. You hear shouting and screams from the large hole that must have been created' +
				' just recently.\n' +
				'Ralof: Theres nowhere to go! What do we do now?',
			examine:'The room is trashed with no time to look for anything useful. There are no ways out of the' +
					' room other than back down... or out the hole by jumping? There is a building right next ' +
					'to the tower with a soft looking hay covered roof.',
			jump:	'You jump out the hole and onto the roof. The roof suddenly crashes in and you fall through.',
		}
	}
	//building
];

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
