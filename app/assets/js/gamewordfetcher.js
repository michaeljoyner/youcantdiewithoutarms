var app = app || {};

app.game = app.game || {};

app.game.wordFetcher = {
    method: "GET",

    listUrl: "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=10&limit=80&api_key=c2ca35d3549d444dc19070b434500acf5a8ac590460e952dd",

    defBaseUrl: "http://api.wordnik.com:80/v4/word.json/",

    defEndUrl: "/definitions?limit=100&includeRelated=false&useCanonical=true&includeTags=false&api_key=c2ca35d3549d444dc19070b434500acf5a8ac590460e952dd",

    makeListRequest: function() {
        var rq = new XMLHttpRequest();
        rq.open(app.game.wordFetcher.method, app.game.wordFetcher.listUrl, false);
        rq.onload = function(ev) {
            if(ev.target.status == 200) {
                app.game.wordFetcher.processListResults(ev.target.response);
            } else {
                console.log("Error fetching words");
            }
        };
        rq.send();
    },

    processListResults: function(response) {
        var wordarray = JSON.parse(response);
        var i = 0, l = wordarray.length;
        for(i;i<l;i++) {
            var word = wordarray[i].word;
            var regex = /^[a-zA-Z]+$/;
            if(regex.test(word)) {
                app.game.model.wordlist.push(word.toLowerCase());
            }
        }
        app.start();
    },

    makeDefinitionRequest: function(word) {
        var rq = new XMLHttpRequest();
        rq.open(app.game.wordFetcher.method, app.game.wordFetcher.defBaseUrl + word + app.game.wordFetcher.defEndUrl, false);
        rq.onload = function(ev) {
            if(ev.target.status == 200) {
                app.game.wordFetcher.processDefinition(ev.target.response);
            }
        };
        rq.send();
    },

    processDefinition: function(response) {
        var defarray = JSON.parse(response);
        var i = 0, l = defarray.length;
        app.game.model.wordDefinitions = [];
        for(i;i<l && i < 2;i++) {
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