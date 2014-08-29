var app = app || {};

app.controller = {
    listen: function() {
        app.appUI.showStartPrompt();
        if(app.environment.isTouchScreen) {
            app.elems.body.addEventListener('click', app.startGame, false);
        } else {
            app.elems.body.addEventListener('keypress', app.startGame, false);
        }
    },

    stopListening: function() {
        app.appUI.hideStartPrompt();
        if(app.environment.isTouchScreen) {
            app.elems.body.removeEventListener('click', app.startGame, false);
        } else {
            app.elems.body.removeEventListener('keypress', app.startGame, false);
        }
    }
};