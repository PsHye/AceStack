var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var gameAspectRatio = 800 / 600; // Use your desired game aspect ratio

var gameWidth, gameHeight;

if (screenWidth / screenHeight < gameAspectRatio) {
  // The screen is narrower, adjust the width
  gameWidth = screenWidth;
  gameHeight = screenWidth / gameAspectRatio;
} else {
  // The screen is wider, adjust the height
  gameHeight = screenHeight;
  gameWidth = screenHeight * gameAspectRatio;
}

var config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload: preload,
    create: create,
  },
};

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

//100 x 145

const suits = ["hearts", "diamond", "clubs", "spades"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const deck = [];

function createDeck() {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(new Card(suits[i], ranks[j]));
    }
  }
  return deck;
}

function getDeck() {
  var newDeck = createDeck();
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

const game = new Phaser.Game(config);

function preload() {
  this.load.image(
    "background",
    "assets/background/nightbackgroundwithmoon.png"
  );

  this.deck = getDeck();

  this.deck.forEach((card) => {
    const cardKey = `${card.rank}-${card.suit}`;
    var path = "assets/pixelCards/cards";
    const imagePath = `${path}/${cardKey}.png`;
    this.load.image(cardKey, imagePath);
  });
}

function create() {
  this.bg = this.add.image(config.width / 2, config.height / 2, "background");
  this.bg.setDisplaySize(config.width, config.height);
  this.cardsGroup = this.add.group();

  const cardWidth = 100;
  const cardHeight = 145;
  const startX = config.width -  100; // X coordinate for the first card (adjusted for right alignment)
  const startY = 100; // Y coordinate for the first card
  const overlap = 10;
  const verticalOverlap = 1; // Amount of vertical overlap between cards

  

  let previousCard;


  this.deck.forEach((card, index) => {
    const x = startX + (index % 1) * cardWidth; // Adjust the positioning as per your desired layout
    const y = startY + index * verticalOverlap; // Adjust the overlap value to control the height of the stack


    const cardKey = `${card.rank}-${card.suit}`;
    const cardSprite = this.add.sprite(x, y, cardKey);
    cardSprite.setInteractive();
    this.input.setDraggable(cardSprite);

    this.input.on("dragstart", (pointer, gameObject) => {
      gameObject.setDepth(1);
    });

    cardSprite.on('pointerdown', (pointer) => {
      this.children.bringToTop(cardSprite);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (pointer, gameObject) => {});
    this.cardsGroup.add(cardSprite);
    previousCard = cardSprite;
  });
   
}

function onCardClick(card) {
  console.log("Clicked card:", card.frame);
}

function update() {
  
}
