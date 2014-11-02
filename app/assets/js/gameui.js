var app = app || {};

app.game = app.game || {};

app.game.gameUI = {
    anchors: {
        wordholder: document.querySelector('#wordbox'),
        failbox: document.querySelector('.failures'),
        notices: document.querySelector('.notifications')
    },

    showKeyBoard: function() {
        $('.keyboard').velocity("fadeIn", {display: "block", delay: 1000});
        setTimeout(app.game.controller.listen, 2000);
    },

    drawBlanks: function(length) {
        var list, li, i = 0;
        var l = length ? length : app.game.model.theword.length;
        list = document.createElement('ul');
        list.className = 'letter-list';
        for(i;i<l;i++) {
            li = document.createElement('li');
            li.id = 'letter' + i;
            list.appendChild(li);
        }
        app.game.gameUI.anchors.wordholder.appendChild(list);
    },

    showBoard: function() {
        $(".key").css("background-color", '');
        $('.letter-list li').velocity("transition.slideUpIn", {stagger: 100, display: "inline-block"});
    },

    clearBoard: function() {
        $(app.game.gameUI.anchors.wordholder).empty();
        $(app.game.gameUI.anchors.failbox).empty();
        $(app.game.gameUI.anchors.notices).empty();
    },

    showLetter: function(letter, positions) {
        var i = 0, l = positions.length;
        if(!positions) {
            return;
        }
        for(i;i<l;i++) {
            var blank = document.querySelector("#letter"+positions[i]);
            blank.innerHTML = letter;
        }
        if(app.environment.isTouchScreen) {
            var k = document.querySelector("#kk_"+letter);
            k.style.backgroundColor = "#4288CE";
        }
    },

    showBadGuess: function(letter) {
        if(app.environment.isTouchScreen) {
            var k = document.querySelector("#kk_"+letter);
            k.style.backgroundColor = "#990000";
        } else {
            var sp = document.createElement('span');
            sp.className = 'bad-guess';
            sp.innerHTML = letter;
            app.game.gameUI.anchors.failbox.appendChild(sp);
        }
    },

    calloutPreviousGuess: function(guess) {
        if(app.environment.isTouchScreen) {
            $("#kk_"+guess).velocity({scaleX: 2, scaleY: 2}).velocity("reverse");
        }
        $(".letter-list li").each(function() {
            if(this.innerHTML.toLowerCase() === guess) {
                $(this).velocity({scaleX: 2, scaleY: 2, color: "#2488CE"}).velocity("reverse");
            }
        });
        $(".bad-guess").each(function() {
            if(this.innerHTML.toLowerCase() === guess) {
                $(this).velocity({scaleX: 2, scaleY: 2, color: "#FF0000"}).velocity("reverse");
            }
        });
    },

    makeDefinitions: function(definition) {
        var cont = document.createElement('div');
        var word = document.createElement('span');
        var partOfSpeech = document.createElement('span');
        var textbody = document.createElement('p');
        var attr = document.createElement('p');
        var header = document.createElement('div');
        var footer = document.createElement('div');
        cont.setAttribute('class', 'definition-box');
        word.setAttribute('class', 'definition-word');
        partOfSpeech.setAttribute('class', 'definition-part-of-speech');
        textbody.setAttribute('class', 'definition-text');
        attr.setAttribute('class', 'definition-attribution');
        header.setAttribute('class', 'definition-header');
        footer.setAttribute('class', 'definition-footer');
        word.innerHTML = definition.word;
        partOfSpeech.innerHTML = "(" + definition.partOfSpeech + ")";
        textbody.innerHTML = definition.text;
        attr.innerHTML = definition.attribution;
        header.appendChild(word);
        header.appendChild(partOfSpeech);
        cont.appendChild(header);
        cont.appendChild(textbody);
        footer.appendChild(attr);
        cont.appendChild(footer);
        app.game.gameUI.anchors.notices.appendChild(cont);
    },

    showWin: function() {
        var i = 0, l = app.game.model.wordDefinitions.length;
        app.game.controller.stopListening();
        for(i;i<l;i++) {
            app.game.gameUI.makeDefinitions(app.game.model.wordDefinitions[i]);
        }
        $('.definition-box').velocity("transition.slideUpIn", {stagger: 100});
        app.controller.listen();
    },

    showLoss: function() {
        var i = 0, l = app.game.model.failureDefinitions.length;
        app.game.controller.stopListening();
        app.game.gameUI.dropLetters();
        app.game.gameUI.removeBadGuesses();
        //for(i;i<l;i++) {
        //    app.game.gameUI.makeDefinitions(app.game.model.failureDefinitions[i]);
        //}
        app.game.gameUI.makeTaunt(app.game.model.taunts[Math.floor(Math.random()*app.game.model.taunts.length)]);
        app.game.gameUI.showTaunt();
        $('.definition-box').velocity("transition.slideUpIn", {stagger: 100});
        app.controller.listen();
    },

    makeTaunt: function(taunt) {
        var span = document.createElement('span');
        span.className = "taunt";
        span.innerHTML = '"' + taunt + '"';
        app.game.gameUI.anchors.notices.appendChild(span);
    },

    showTaunt: function() {
      $('.taunt').velocity("transition.swoopIn", {display: "block"});
    },

    dropLetters: function() {
        var tran, del;
        $('.letter-list li').each(function() {
            tran = 400 + Math.floor(Math.random()*200);
            del = Math.floor(Math.random()*500);
            $(this).velocity({translateY: tran, opacity: 0}, {delay: del});
        });
    },

    removeBadGuesses: function() {
        $(".bad-guess").velocity('transition.slideDownOut');
    },

    endGame: function() {
        //clear keyboard
        if(app.environment.isTouchScreen) {
            $('.keyboard').velocity("fadeOut", {display: "none"});
        }
    }
};