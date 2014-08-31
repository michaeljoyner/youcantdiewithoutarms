var app = app || {};

app.game = {
    newgame: function() {
        app.game.gameUI.clearBoard();
        app.game.model.reset();
        app.game.startgame();
    },

    startgame: function() {
        app.game.model.theword = app.game.model.wordlist[Math.floor(Math.random()*app.game.model.wordlist.length)];
        app.game.gameUI.drawBlanks(app.game.model.theword.length);
        app.game.gameUI.showBoard();
        if(app.environment.isTouchScreen) {
            app.game.gameUI.showKeyBoard();
        } else {
            app.game.controller.listen();
        }
        app.game.wordFetcher.makeDefinitionRequest(app.game.model.theword);
    }
};