const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gravity = 0.5;
const horizontalAcceleration = 1;
const horiTermninalVelocity = 15;
const jumpLimit = 3;
const verticalAcceleration = 15;
const vertTerminalVelocity = 20
const downAcceleration = 1;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'grey';
ctx.fillRect(0, 0, canvas.width, canvas.height);

    // horizontal acceleration = 15
    // horizontal deceleration = 1
    // jumpLimit = 3
    // vertical acceleration = 15
    // vertical terminal velocity = 20
    // downForce = 1

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = imageSrc;
    }

    draw() {
        ctx.drawImage(imageSrc, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}

class Player {
    constructor(position, height, width) {
        this.position = position;
        this.width = width;
        this.height = height
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.jumpsLeft = 3;
        this.reachedVertTerminal = false;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // i beg you in the name of all you hold dear, get rid of these hardcoded vals

    moveX() {
        if (keys.l.pressed) {
            if (player1.velocity.x <= horiTermninalVelocity) {
                player1.velocity.x += horizontalAcceleration;
            }
        }
        else if (keys.h.pressed) {
            if (player1.velocity.x >= -horiTermninalVelocity) {
                player1.velocity.x -= horizontalAcceleration;
            }
        }
        else if (player1.velocity.x > 0) player1.velocity.x -= horizontalAcceleration;
        else if (player1.velocity.x < 0) player1.velocity.x += horizontalAcceleration;
        else player1.velocity.x = 0;
    }

    moveY() {
        this.position.x += this.velocity.x;
        if (this.position.y + this.velocity.y + this.height >= canvas.height) {
            this.velocity.y = 0;
            this.jumpsLeft = jumpLimit;
        } else {
            this.position.y += this.velocity.y;
            this.velocity.y += gravity;
        }
        if (keys.k.pressed && this.jumpsLeft > 0 && !this.reachedVertTerminal) {
            player1.velocity.y = 0;
            player1.velocity.y -= verticalAcceleration;
            this.reachedVertTerminal = true;
            console.log(player1.velocity.y);
        } else if (keys.j.pressed) {
            if (player1.velocity.y < vertTerminalVelocity)
            player1.velocity.y += downAcceleration;
        }
    }

    update() {
        this.draw();
        this.moveX();
        this.moveY();
    }
}

// const background = new Sprite({
//     position: {
//         x: 0,
//         y: 0,
//     },
//     imageSrc: "",
// })
const player1 = new Player({ x: 200, y: 20 }, 20, 20);

function loop() {
    window.requestAnimationFrame(loop);
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.save()
    // background.update();
    // ctx.restore();
    player1.update();
}

const keys = {
    l: { pressed: false },
    h: { pressed: false },
    k: { pressed: false },
    j: { pressed: false }
}

loop();

window.addEventListener('resize', resizeCanvas);
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'l':
            keys.l.pressed = true;
            break;
        case 'h':
            keys.h.pressed = true;
            break;
        case 'k':
            keys.k.pressed = true;
            break
        case 'j':
            keys.j.pressed = true;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'l':
            keys.l.pressed = false;
            break;
        case 'h':
            keys.h.pressed = false;
            break;
        case 'k':
            keys.k.pressed = false;
            player1.reachedVertTerminal = false;
            player1.jumpsLeft--;
        case 'j':
            keys.j.pressed = false;
    }
})

