import Game from './game';

const game = new Game();
game.showFurry();
game.showCoin();

$('#play').on('click', e => {
  $(e.target).attr('disabled', true);
  game.startGame();
  $(document).on('keydown', e => game.turnFurry(e));
});
$('#pause').on('click', e => {
  clearInterval(game.idSetInterval);
  $(e.target).prev().attr('disabled', false);
});