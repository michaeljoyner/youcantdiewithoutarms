var app = app || {};

app.model = {
    wins: 0,
    losses: 0,

    incrementWins: function() {
        app.model.wins++;
        app.appUI.updateWins();
        app.model.saveModel();
    },

    incrementLosses: function() {
        app.model.losses++;
        app.appUI.updateLosses();
        app.model.saveModel();
    },

    initializeStats: function() {
        if(!(window.localStorage && localStorage.getItem('youcantwin'))) {
            return;
        }
        var stats = JSON.parse(window.localStorage.getItem('youcantwin'));
        app.model.wins = stats.wins;
        app.model.losses = stats.losses;
        app.appUI.updateWins();
        app.appUI.updateLosses();
    },

    saveModel: function() {
        var stats = {
            wins: app.model.wins,
            losses: app.model.losses
        };
        window.localStorage.setItem('youcantwin', JSON.stringify(stats));
    }
};