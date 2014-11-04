var app = app || {};

app.game = app.game || {};

app.game.model = {
    theword: null,

    wordlist: [],
    wordDefinitions: [],

    failureDefinitions: [{
        word: "failure",
        partOfSpeech: "noun",
        text: "A complete inability to succeed in any conceivable task.",
        attribution: "from the Lessor Dictionary for Losers&copy;"
    },
        {
            word: "failure",
            partOfSpeech: "noun",
            text: "A success virgin.",
            attribution: "from the Lessor Dictionary for Losers&copy;"
        }],

    numberOfLettersGuessed: 0,
    numberOfBadGuesses: 0,
    totalGuesses: 0,
    goodguesses: [],

    badguesses: [],

    taunts: ["You should be on the cover of Failure Magazine",
    "Darwin would be fascinated by you",
    "If failure was money, you'd be Donald trump",
    "When do you plan on reading your first book?",
    "Failure doesn't count as a hobby",
    "Do you still say the rhyme when you tie your shoelaces?",
    "You have very childlike features. Most of all your brain."],

    reset: function() {
        app.game.model.theword = null;
        app.game.model.numberOfLettersGuessed = 0;
        app.game.model.numberOfBadGuesses = 0;
        app.game.model.totalGuesses = 0;
        app.game.model.goodguesses = [];
        app.game.model.badguesses = [];
    },

    alreadyGuessed: function(guess) {
        if((app.game.model.goodguesses.indexOf(guess) != -1) || (app.game.model.badguesses.indexOf(guess) != -1)) {
            return true;
        }
        return false;
    },

    wordHasLetter: function(guess) {
        return app.game.model.theword.indexOf(guess) != -1;
    },

    positionsOfLetter: function(letter) {
        var positions = [];
        var pos = app.game.model.theword.indexOf(letter);
        while(pos != -1) {
            positions.push(pos);
            pos = app.game.model.theword.indexOf(letter, pos + 1);
        }
        if(positions.length === 0) {
            return false;
        }
        return positions;
    },

    occurancesOfLetterInWord: function(letter) {
        var count = 0;
        var pos = app.game.model.theword.indexOf(letter);
        while(pos != -1) {
            count++;
            pos = app.game.model.theword.indexOf(letter, pos + 1);
        }
        return count;
    },

    removeWord: function(word) {
       app.game.model.wordlist.splice(app.game.model.wordlist.indexOf(word), 1);
        if(app.game.model.wordlist.length < 2) {
            app.game.wordFetcher.makeListRequest();
        }
    }
};