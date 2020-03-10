import Furry from './furry';
import Coin from './coin';

export default class Game {
  constructor() {
    this.board = $('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
  }

  convertCoordinatesToIndex(x, y) {
    return this.index = x + (y * 10);
  }

  showFurry() {
    this.hideVisibleFurry();

    $(this.board[this.convertCoordinatesToIndex(this.furry.x, this.furry.y)]).addClass('furry');
  }

  hideVisibleFurry() {
    $(this.board).removeClass('furry');
  }

  showCoin() {
    $(this.board[this.convertCoordinatesToIndex(this.coin.x, this.coin.y)]).addClass('coin');
  }

  moveFurry() {
    if ( this.furry.direction === 'right' ) {
      this.furry.x++;
    }
    else if ( this.furry.direction === 'left' ) {
      this.furry.x--;
    }
    else if ( this.furry.direction === 'down' ) {
      this.furry.y++;
    }
    else {
      this.furry.y--;
    }

    this.showFurry();
    this.checkCoinCollision();
    this.gameOver();
  }

  turnFurry(e) {
    switch (e.which) {
      case 37:
        this.furry.direction = 'left';
        break;
      case 38:
        this.furry.direction = 'up';
        break;
      case 39:
        this.furry.direction = 'right';
        break;
      case 40:
        this.furry.direction = 'down';
        break;
    }
  }

  checkCoinCollision() {
    const isTheSamePosition = (this.furry.x == this.coin.x && this.furry.y == this.coin.y) ? true : false;
    if (isTheSamePosition) {
      $(this.board[this.convertCoordinatesToIndex(this.coin.x, this.coin.y)]).removeClass('coin');
      this.score++;
      $('#score strong').text(this.score);

      this.coin = new Coin();
      this.showCoin();
    }
  }

  gameOver() {
    if (
      this.furry.x < 0 ||
      this.furry.x > 9 ||
      this.furry.y < 0 ||
      this.furry.y > 9
    ) {
      clearInterval(this.idSetInterval);
      this.hideVisibleFurry();

      $('#score').remove();
      $('#board').remove();
      $('#over').removeClass('invisible');
      $('#over').html(`
        <p>
          <span>GAME OVER</span>
          Your score: ${this.score}
        </p>
      `);
    }
  }
  
  startGame() {
    return this.idSetInterval = setInterval(() => this.moveFurry(), 250);
  }
}