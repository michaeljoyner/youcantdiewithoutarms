var app = app || {};

app.game = app.game || {};

app.game.controller = {
    listen: function() {
        if(app.environment.isTouchScreen) {
            var keys = document.querySelectorAll(".key");
            var i = 0, l = keys.length;
            for(i;i<l;i++) {
                keys[i].addEventListener('click', app.game.controller.handleKeyPress, false);
            }
        } else {
            var body = document.querySelector("body");
            body.addEventListener('keypress', app.game.controller.handleKeyPress, false);
        }
    },

    stopListening: function() {
        if(app.environment.isTouchScreen) {
            var keys = document.querySelectorAll(".key");
            var i = 0, l = keys.length;
            for(i;i<l;i++) {
                keys[i].removeEventListener('click', app.game.controller.handleKeyPress, false);
            }
        } else {
            var body = document.querySelector("body");
            body.removeEventListener('keypress', app.game.controller.handleKeyPress, false);
        }
    },

    handleKeyPress: function(ev) {
        ev.stopPropagation();
        var key;
        if(ev.type === "keypress") {
            key = String.fromCharCode(ev.charCode ||ev.keyCode);
            var re = /[a-zA-Z]/;
            if(! re.test(key)) {
                console.log('failed');
                return;
            }
        } else if(ev.type === "click") {
            var id = ev.target.id;
            key = id.substring(3);
        }
        app.game.logic.handleGuess(key.toLowerCase());
    }
};