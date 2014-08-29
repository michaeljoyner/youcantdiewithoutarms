var app = app || {};

app.appUI = {
    showStartPrompt: function() {
        $(app.elems.startPrompt).velocity('fadeIn');
    },

    hideStartPrompt: function() {
        $(app.elems.startPrompt).velocity('fadeOut');
    },

    clearLoading: function() {
        $(app.elems.loader).velocity('fadeOut');
    },

    clearWelcome: function() {
        $(app.elems.welcome).velocity('transition.perspectiveLeftOut', {display: "none"});
        if(app.elems.welcome.parentNode) {
            var t = setTimeout(function() {
                app.elems.welcome.parentNode.removeChild(app.elems.welcome);
            }, 2000);
        }
    },

    updateWins: function() {
        app.elems.winCount.innerHTML = app.model.wins;
        $(app.elems.winCount).velocity({scaleX: 2, scaleY: 2}).velocity("reverse");
    },

    updateLosses: function() {
        app.elems.lossCount.innerHTML = app.model.losses;
        $(app.elems.lossCount).velocity({scaleX: 2, scaleY: 2}).velocity("reverse");
    }
};