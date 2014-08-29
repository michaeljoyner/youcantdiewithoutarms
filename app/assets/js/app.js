var app = {
    elems: {
        body: document.querySelector("html"),
        startPrompt: document.querySelector("#start-prompt"),
        loader: document.querySelector("#game-loader"),
        welcome: document.querySelector(".welcome-message"),
        winCount: document.querySelector("#win-count"),
        lossCount: document.querySelector("#loss-count")
    },

    environment: {
        isTouchScreen: false
    },

    init: function () {
        app.environment.isTouchScreen = 'ontouchstart' in window || 'onmsgesturechange' in window;
        if (app.environment.isTouchScreen) {
            app.elems.startPrompt.firstChild.innerHTML = "tap screen to start new game";
        }
        app.game.wordFetcher.makeListRequest();
    },

    startGame: function() {
        if(app.elems.welcome) {
            app.appUI.clearWelcome();
        }
        app.controller.stopListening();
        app.game.newgame();
    },

    start: function() {
        app.appUI.clearLoading();
        app.controller.listen();
    }
};