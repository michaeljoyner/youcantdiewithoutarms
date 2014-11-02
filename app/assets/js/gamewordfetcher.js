var app = app || {};

app.game = app.game || {};

app.game.wordFetcher = {
    method: "GET",

    listUrl: "/api/wordlist",

    defBaseUrl: "/api/definition/",


    makeListRequest: function () {
        var rq = new XMLHttpRequest();
        rq.open(app.game.wordFetcher.method, app.game.wordFetcher.listUrl, false);
        rq.onload = function (ev) {
            if (ev.target.status == 200) {
                app.game.wordFetcher.processListResults(ev.target.response);
            } else {
                console.log("Error fetching words from server");
            }
        };
        rq.send();
    },

    processListResults: function (response) {
        var wordarray = JSON.parse(response);
        var i = 0, l = wordarray.length;
        for (i; i < l; i++) {
            var word = wordarray[i];
            var regex = /^[a-zA-Z]+$/;
            if (regex.test(word)) {
                app.game.model.wordlist.push(word.toLowerCase());
            }
        }
        if (!app.environment.started) {
            alert('starting..');
            app.start();
        }
    },

    makeDefinitionRequest: function (word) {
        var rq = new XMLHttpRequest();
        rq.open(app.game.wordFetcher.method, app.game.wordFetcher.defBaseUrl + word, false);
        rq.onload = function (ev) {
            if (ev.target.status == 200) {
                app.game.wordFetcher.processDefinition(ev.target.response);
            }
        };
        rq.send();
    },

    processDefinition: function (response) {
        var defarray = JSON.parse(response);
        var i = 0, l = defarray.length;
        app.game.model.wordDefinitions = [];
        for (i; i < l && i < 2; i++) {
            var definition = {
                word: defarray[i].word,
                partOfSpeech: defarray[i].partOfSpeech,
                text: defarray[i].text,
                attribution: defarray[i].attributionText
            };
            app.game.model.wordDefinitions.push(definition);
        }
    }
};