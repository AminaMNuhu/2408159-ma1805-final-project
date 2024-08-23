// Get the canvas element and its 2D rendering context (css styling)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variable to track the time between frames
let lastTime = 0;

// Main game loop function
function gameLoop(timestamp) {
    // Calculate the time difference between frames
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Update the game state
    update(deltaTime);
    // Rendering the game objects onto the cavnvas 
    render();

    // Request the next frame to keep the loop going
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

//loading image for player's sprite 
const playerImage = new Image(); //storing the image
playerImage.src = 'fish.png'; //image source 

// Defining the Player class to manage player properties and behaviors
class Player {
    constructor(x, y, width, height) {
        // Initialising the player's position and size
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // Initialising the velocity and speed
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        // Gravity and jump strength settings
        this.gravity = 0.5;
        this.jumpStrength = 10;
        // Variable to track if the player is on the ground
        this.grounded = false;
    }

    // Method to update the player's position based on input and physics
    update(deltaTime, keys) {
        // Horizontal movement
        if (keys.right) {
            this.velocityX = this.speed;
        } else if (keys.left) {
            this.velocityX = -this.speed;
        } else {
            this.velocityX = 0;
        }

        // Vertical movement due to gravity
        if (!this.grounded) {
            this.velocityY += this.gravity;
        } else {
            this.velocityY = 0;
        }

        // Handling jump input
        if (keys.up && this.grounded) {
            this.velocityY = -this.jumpStrength;
            this.grounded = false;
        }

        // Updating position with the calculated velocity
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Simple collision detection with the ground (bottom of canvas)
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.grounded = true;
        } else {
            this.grounded = false;
        }
    }

    // Method for rendering the player's image/sprite
    render(ctx) {
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }
}

// Create a new player instance with a starting position and size
const player = new Player(50, canvas.height - 150, 50, 50);

// Object to track the state of keyboard keys
const keys = {
    left: false,
    right: false,
    up: false,
};

// Event listener for keydown (when a key is pressed)
window.addEventListener('keydown', function(e) {
    // Update key states based on which arrow key is pressed
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'ArrowUp') keys.up = true;
});

// Event listener for keyup (when a key is released)
window.addEventListener('keyup', function(e) {
    // Update key states based on which arrow key is released
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'ArrowUp') keys.up = false;
});

// Define the size of each tile in the tilemap
const tileSize = 50;

// assigning numbers to store/load images for differnt types of tiles
const tileImages = {
    1: new Image(),
    2: new Image(),
    3: new Image(),
    4: new Image()
};

tileImages[1].src = 'sand.png'; // ocean floor sand tiles
tileImages[2].src = 'stonebricks.png'; // stone brick platform tiles 
tileImages[3].src = 'seaweed.png'; // seaweed tiles 
tileImages[4].src = 'coral.png'; // coral tiles 

// Function to render the tilemap onto the canvas
function renderTilemap(ctx) {
    for (let row = 0; row < tileMap.length; row++) {
        for (let col = 0; col < tileMap[row].length; col++) {
            const tile = tileMap[row][col];
        
            // Rendering assigned image for sand block tiles 
            if (tileImages[tile]){
                ctx.drawImage(tileImages[tile], col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
    }
    
// Ensuring all images are loaded before rendering the tilemap
let imagesLoaded = 0;
const totalImages = Object.keys(tileImages).length;

function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        // Once all images are loaded, render the tilemap
        renderTilemap(ctx);
    }
}

// Setting up event listeners for when each image finishes loading
for (let key in tileImages) {
    tileImages[key].onload = checkAllImagesLoaded;
}

// Defining tilemap to display array of tile images above (0 is just empty space/background)
const tileMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
];

//COLLISION MAP in accordance to tilemap above (current placeholder for upcoming collision map for game's prototype version)
const CollisionMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
];

// Function to check and handle collisions between the player and the tilemap
function checkCollision(player) {
    for (let row = 0; row < tileMap.length; row++) {
        for (let col = 0; col < tileMap[row].length; col++) {
            if (tileMap[row][col] === 2) {
                // Calculate the position of the current tile
                const tileX = col * tileSize;
                const tileY = row * tileSize;

                // Check if the player intersects with the tile
                if (
                    player.x < tileX + tileSize &&
                    player.x + player.width > tileX &&
                    player.y < tileY + tileSize &&
                    player.y + player.height > tileY
                ) {
                    // If collision is detected, adjust the player's position and mark as grounded
                    player.y = tileY - player.height;
                    player.grounded = true;
                }
            }
        }
    }
}

// Main update function to update game logic each frame
function update(deltaTime) {
    // Update the player's position and state
    player.update(deltaTime, keys);
    // Check for collisions between the player and the tilemap
    checkCollision(player);
}

// Main render function to draw everything on the canvas each frame
function render() {
    // Clear the canvas for the new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Render the tilemap
    renderTilemap(ctx);
    // Render the player
    player.render(ctx);
}

