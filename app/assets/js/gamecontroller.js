var app = app || {};

app.game = app.game || {};

app.game.controller = {
    listen: function() {
        if(app.environment.isTouchScreen) {
            var keyboard = document.querySelector('.keyboard');
            while(!keyboard) {
                keyboard = document.querySelector('.keyboard');
            }
            keyboard.addEventListener('touchstart', app.game.controller.handleKeyPress, false);
        } else {
            var body = document.querySelector("body");
            body.addEventListener('keypress', app.game.controller.handleKeyPress, false);
        }
    },

    stopListening: function() {
        if(app.environment.isTouchScreen) {
            var keyboard = document.querySelector('.keyboard');
            keyboard.removeEventListener('touchstart', app.game.controller.handleKeyPress, false);
        } else {
            var body = document.querySelector("body");
            body.removeEventListener('keypress', app.game.controller.handleKeyPress, false);
        }
    },

    handleKeyPress: function(ev) {
        ev.stopPropagation();
        var key;
        if(ev.type === "keypress") {
            key = String.fromCharCode(ev.charCode || ev.keyCode);
            var re = /[a-zA-Z]/;
            if(! re.test(key)) {
                console.log('failed');
                return;
            }
        } else if(ev.type === "touchstart") {
            var id = ev.target.id;
            key = id.substring(3);
            if(key == "") {
                console.log("misspress");
                return;
            }
        }
        app.game.logic.handleGuess(key.toLowerCase());
    }
};