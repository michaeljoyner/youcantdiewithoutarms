var app = app || {};

app.model = {
    wins: 0,
    losses: 0,

    incrementWins: function() {
        app.model.wins++;
        app.appUI.updateWins();
    },

    incrementLosses: function() {
        app.model.losses++;
        app.appUI.updateLosses();
    }
};