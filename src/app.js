import Character from './character/Character.tsx';
import ForestLocation from './location/forest/ForestLocation.tsx';
import MountainsLocation from './location/mountains/MountainsLocation.tsx';
import Map from './menues/map/Map.tsx'
import KeyListener from './settings/keys/KeyListener.tsx'
import Inventory from './character/inventory/Inventory.tsx'
import InventoryItem from './character/inventory/inventoryItem/InventoryItem.tsx'
import Quest from './quest/Quest.tsx'
const notificationSound = require('./quest/notification.mp3')
import questJson from './quest/quests/quest.1984.js'
require('./main.css')

//initialization files
require('./index.html');
require('./phaser.min.js');

var mountainsLocation;
var forestLocation;
var map;
var keyListener;
var game;
var FontFaceObserver = require('fontfaceobserver');
new FontFaceObserver('InventoryLine').load()
var font = new FontFaceObserver('FantasyFont')
font.load().then(function () {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render });


game.globalState = {
    interface: {
        activeText: ''
    },
    location: null,
    character: null,
    Phaser: Phaser,
    interactiveItem: null,
    inventory: null,
    quests: {},
    container: null
};
});

function preload() {
    game.load.audio('quest.notification.sound', notificationSound);
    game.globalState.character = new Character(game)
    map = new Map(game)
    game.globalState.inventory = new Inventory(game, [
        new InventoryItem(game, 'book', require('./content/books/book.js')),
        new InventoryItem(game, 'armor', { speed: -100, weight: 10 }),
        new InventoryItem(game, 'boots', { speed: 200 })
    ]);
   	//game.globalState.mountainsLocation = new MountainsLocation(game)
   	game.globalState.forestLocation = new ForestLocation(game)
    game.globalState.mountainsLocation = new MountainsLocation(game)
   	game.globalState.location = game.globalState.forestLocation
}

function create() {
    game.globalState.quests[questJson.name] = new Quest(game, questJson);
	keyListener = new KeyListener(game, Phaser);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 1920, game.world.height);
	map.create(Phaser);
    game.globalState.location.load(Phaser)  
}

function update() {
    game.globalState.location.update(game.globalState.character)
    map.update();
    keyListener.run();
}

function render() {}

