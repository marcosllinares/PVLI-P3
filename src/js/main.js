'use strict';

var playScene = require('./play_scene');
var gameOver = require('./gameover_scene');
var menuScene = require('./menu_scene');
//  The Google WebFont Loader will look for this object, so
// it before loading the script.


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
    //this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";



    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y 'images/rush_spritesheet.json'
      //como descriptor de la animación.

    this.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'images/simples_pimples.png');
    this.load.atlas('rush', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    this.load.onLoadComplete.add(this.loadComplete,this);
      //TODO 2.2a Escuchar el evento onLoadComplete con el método loadComplete que el state 'play'

  },
  loadStart: function () {
    this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },
  loadComplete: function() {
    this.ready = true;
    console.log("Game Assets Loaded!");
  },
     //TODO 2.2b function loadComplete()
    update: function(){
        this._loadingBar
    },

};
var wfconfig = {

  active: function() {
      console.log("font loaded");
      init();
  },
  google: {
      families: ['Sniglet']
  }

};

//TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
//TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().
window.init = function(){
  //DONE1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
  //DONE 1.3 iniciar el state 'boot'.
  //Metodo init, que será llamado una vez la fuente se haya cargado.
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot', BootScene);
  game.state.add('menu', menuScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', playScene);
  game.state.add('gameOver', gameOver);
  //Comenzamos con el estado boot
  game.state.start('boot');

}
window.onload = function () {
  //En el onload se cargará la Google Font
  //TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
  //TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().
  WebFont.load(wfconfig);
};