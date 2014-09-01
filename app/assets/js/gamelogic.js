var app = app || {};

app.game = app.game || {};

app.game.logic = {
    handleGuess: function(guess) {
        if(app.game.model.alreadyGuessed(guess)) {
            app.game.gameUI.calloutPreviousGuess(guess);
            return;
        }
        app.game.model.totalGuesses += 1;
        if(app.game.model.wordHasLetter(guess)) {
            app.game.logic.goodGuess(guess);
        } else {
            app.game.logic.badGuess(guess);
        }
    },

    goodGuess: function(guess) {
        app.game.model.numberOfLettersGuessed += app.game.model.occurancesOfLetterInWord(guess);
        app.game.model.goodguesses.push(guess);
        app.game.gameUI.showLetter(guess, app.game.model.positionsOfLetter(guess));
        app.game.logic.checkgameState();
    },

    badGuess: function(guess) {
        app.game.model.numberOfBadGuesses += 1;
        app.game.model.badguesses.push(guess);
        app.game.gameUI.showBadGuess(guess);
        app.game.logic.checkgameState();
    },

    checkgameState: function() {
        if(app.game.model.numberOfLettersGuessed >= app.game.model.theword.length) {
            app.game.gameUI.endGame();
            app.model.incrementWins();
            app.game.gameUI.showWin();
            app.game.model.removeWord(app.game.model.theword);
        } else if(app.game.model.numberOfBadGuesses >= 6) {
            app.game.gameUI.endGame();
            app.model.incrementLosses();
            app.game.gameUI.showLoss();
        }
    }
};