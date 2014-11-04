var app={elems:{body:document.querySelector("html"),startPrompt:document.querySelector("#start-prompt"),loader:document.querySelector("#game-loader"),welcome:document.querySelector(".welcome-message"),winCount:document.querySelector("#win-count"),lossCount:document.querySelector("#loss-count")},environment:{isTouchScreen:!1,started:!1},init:function(){app.environment.isTouchScreen="ontouchstart"in window||window.navigator.msMaxTouchPoints,app.environment.isTouchScreen&&(app.elems.startPrompt.firstChild.innerHTML="tap screen to start new game"),app.game.wordFetcher.makeListRequest(),app.model.initializeStats()},startGame:function(){app.elems.welcome&&app.appUI.clearWelcome(),app.controller.stopListening(),app.game.newgame()},start:function(){app.environment.started=!0,app.appUI.clearLoading(),app.controller.listen()}},app=app||{};app.controller={listen:function(){app.appUI.showStartPrompt(),app.environment.isTouchScreen?app.elems.body.addEventListener("touchstart",app.startGame,!1):app.elems.body.addEventListener("keypress",app.startGame,!1)},stopListening:function(){app.appUI.hideStartPrompt(),app.environment.isTouchScreen?app.elems.body.removeEventListener("touchstart",app.startGame,!1):app.elems.body.removeEventListener("keypress",app.startGame,!1)}};var app=app||{};app.model={wins:0,losses:0,incrementWins:function(){app.model.wins++,app.appUI.updateWins(),app.model.saveModel()},incrementLosses:function(){app.model.losses++,app.appUI.updateLosses(),app.model.saveModel()},initializeStats:function(){if(window.localStorage&&localStorage.getItem("youcantwin")){var e=JSON.parse(window.localStorage.getItem("youcantwin"));app.model.wins=e.wins,app.model.losses=e.losses,app.appUI.updateWins(),app.appUI.updateLosses()}},saveModel:function(){var e={wins:app.model.wins,losses:app.model.losses};window.localStorage.setItem("youcantwin",JSON.stringify(e))}};var app=app||{};app.appUI={showStartPrompt:function(){$(app.elems.startPrompt).velocity("fadeIn")},hideStartPrompt:function(){$(app.elems.startPrompt).velocity("fadeOut")},clearLoading:function(){$(app.elems.loader).velocity("fadeOut")},clearWelcome:function(){if($(app.elems.welcome).velocity("transition.perspectiveLeftOut",{display:"none"}),app.elems.welcome.parentNode){setTimeout(function(){app.elems.welcome.parentNode.removeChild(app.elems.welcome)},2e3)}},updateWins:function(){app.elems.winCount.innerHTML=app.model.wins,$(app.elems.winCount).velocity({scaleX:2,scaleY:2}).velocity("reverse")},updateLosses:function(){app.elems.lossCount.innerHTML=app.model.losses,$(app.elems.lossCount).velocity({scaleX:2,scaleY:2}).velocity("reverse")}};var app=app||{};app.game={newgame:function(){app.game.gameUI.clearBoard(),app.game.model.reset(),app.game.startgame()},startgame:function(){app.game.model.theword=app.game.model.wordlist[Math.floor(Math.random()*app.game.model.wordlist.length)],app.game.gameUI.drawBlanks(app.game.model.theword.length),app.game.gameUI.showBoard(),app.environment.isTouchScreen?app.game.gameUI.showKeyBoard():app.game.controller.listen(),app.game.wordFetcher.makeDefinitionRequest(app.game.model.theword)}};var app=app||{};app.game=app.game||{},app.game.controller={listen:function(){if(app.environment.isTouchScreen){for(var e=document.querySelector(".keyboard");!e;)console.log("finding keyboard"),e=document.querySelector(".keyboard");e.addEventListener("touchstart",app.game.controller.handleKeyPress,!1),console.log("attached listener to "),console.log(e)}else{var a=document.querySelector("body");a.addEventListener("keypress",app.game.controller.handleKeyPress,!1)}},stopListening:function(){if(app.environment.isTouchScreen){var e=document.querySelector(".keyboard");e.removeEventListener("touchstart",app.game.controller.handleKeyPress,!1)}else{var a=document.querySelector("body");a.removeEventListener("keypress",app.game.controller.handleKeyPress,!1)}},handleKeyPress:function(e){e.stopPropagation();var a;if("keypress"===e.type){a=String.fromCharCode(e.charCode||e.keyCode);var t=/[a-zA-Z]/;if(!t.test(a))return console.log("failed"),void 0}else if("touchstart"===e.type){var o=e.target.id;if(a=o.substring(3),""==a)return console.log("misspress"),void 0}app.game.logic.handleGuess(a.toLowerCase())}};var app=app||{};app.game=app.game||{},app.game.logic={handleGuess:function(e){return app.game.model.alreadyGuessed(e)?(app.game.gameUI.calloutPreviousGuess(e),void 0):(app.game.model.totalGuesses+=1,app.game.model.wordHasLetter(e)?app.game.logic.goodGuess(e):app.game.logic.badGuess(e),void 0)},goodGuess:function(e){app.game.model.numberOfLettersGuessed+=app.game.model.occurancesOfLetterInWord(e),app.game.model.goodguesses.push(e),app.game.gameUI.showLetter(e,app.game.model.positionsOfLetter(e)),app.game.logic.checkgameState()},badGuess:function(e){app.game.model.numberOfBadGuesses+=1,app.game.model.badguesses.push(e),app.game.gameUI.showBadGuess(e),app.game.logic.checkgameState()},checkgameState:function(){app.game.model.numberOfLettersGuessed>=app.game.model.theword.length?(app.game.gameUI.endGame(),app.model.incrementWins(),app.game.gameUI.showWin(),app.game.model.removeWord(app.game.model.theword)):app.game.model.numberOfBadGuesses>=6&&(app.game.gameUI.endGame(),app.model.incrementLosses(),app.game.gameUI.showLoss())}};var app=app||{};app.game=app.game||{},app.game.model={theword:null,wordlist:[],wordDefinitions:[],failureDefinitions:[{word:"failure",partOfSpeech:"noun",text:"A complete inability to succeed in any conceivable task.",attribution:"from the Lessor Dictionary for Losers&copy;"},{word:"failure",partOfSpeech:"noun",text:"A success virgin.",attribution:"from the Lessor Dictionary for Losers&copy;"}],numberOfLettersGuessed:0,numberOfBadGuesses:0,totalGuesses:0,goodguesses:[],badguesses:[],taunts:["You should be on the cover of Failure Magazine","Darwin would be fascinated by you","If failure was money, you'd be Donald trump","When do you plan on reading your first book?","Failure doesn't count as a hobby","Do you still say the rhyme when you tie your shoelaces?","You have very childlike features. Most of all your brain."],reset:function(){app.game.model.theword=null,app.game.model.numberOfLettersGuessed=0,app.game.model.numberOfBadGuesses=0,app.game.model.totalGuesses=0,app.game.model.goodguesses=[],app.game.model.badguesses=[]},alreadyGuessed:function(e){return-1!=app.game.model.goodguesses.indexOf(e)||-1!=app.game.model.badguesses.indexOf(e)?!0:!1},wordHasLetter:function(e){return-1!=app.game.model.theword.indexOf(e)},positionsOfLetter:function(e){for(var a=[],t=app.game.model.theword.indexOf(e);-1!=t;)a.push(t),t=app.game.model.theword.indexOf(e,t+1);return 0===a.length?!1:a},occurancesOfLetterInWord:function(e){for(var a=0,t=app.game.model.theword.indexOf(e);-1!=t;)a++,t=app.game.model.theword.indexOf(e,t+1);return a},removeWord:function(e){app.game.model.wordlist.splice(app.game.model.wordlist.indexOf(e),1),app.game.model.wordlist.length<2&&app.game.wordFetcher.makeListRequest()}};var app=app||{};app.game=app.game||{},app.game.gameUI={anchors:{wordholder:document.querySelector("#wordbox"),failbox:document.querySelector(".failures"),notices:document.querySelector(".notifications")},showKeyBoard:function(){$(".keyboard").velocity("fadeIn",{display:"block",delay:1e3}),setTimeout(app.game.controller.listen,2e3)},drawBlanks:function(e){var a,t,o=0,n=e?e:app.game.model.theword.length;for(a=document.createElement("ul"),a.className="letter-list",o;n>o;o++)t=document.createElement("li"),t.id="letter"+o,a.appendChild(t);app.game.gameUI.anchors.wordholder.appendChild(a)},showBoard:function(){$(".key").css("background-color",""),$(".letter-list li").velocity("transition.slideUpIn",{stagger:100,display:"inline-block"})},clearBoard:function(){$(app.game.gameUI.anchors.wordholder).empty(),$(app.game.gameUI.anchors.failbox).empty(),$(app.game.gameUI.anchors.notices).empty()},showLetter:function(e,a){var t=0,o=a.length;if(a){for(t;o>t;t++){var n=document.querySelector("#letter"+a[t]);n.innerHTML=e}if(app.environment.isTouchScreen){var p=document.querySelector("#kk_"+e);p.style.backgroundColor="#4288CE"}}},showBadGuess:function(e){if(app.environment.isTouchScreen){var a=document.querySelector("#kk_"+e);a.style.backgroundColor="#990000"}else{var t=document.createElement("span");t.className="bad-guess",t.innerHTML=e,app.game.gameUI.anchors.failbox.appendChild(t)}},calloutPreviousGuess:function(e){app.environment.isTouchScreen&&$("#kk_"+e).velocity({scaleX:2,scaleY:2}).velocity("reverse"),$(".letter-list li").each(function(){this.innerHTML.toLowerCase()===e&&$(this).velocity({scaleX:2,scaleY:2,color:"#2488CE"}).velocity("reverse")}),$(".bad-guess").each(function(){this.innerHTML.toLowerCase()===e&&$(this).velocity({scaleX:2,scaleY:2,color:"#FF0000"}).velocity("reverse")})},makeDefinitions:function(e){var a=document.createElement("div"),t=document.createElement("span"),o=document.createElement("span"),n=document.createElement("p"),p=document.createElement("p"),s=document.createElement("div"),r=document.createElement("div");a.setAttribute("class","definition-box"),t.setAttribute("class","definition-word"),o.setAttribute("class","definition-part-of-speech"),n.setAttribute("class","definition-text"),p.setAttribute("class","definition-attribution"),s.setAttribute("class","definition-header"),r.setAttribute("class","definition-footer"),t.innerHTML=e.word,o.innerHTML="("+e.partOfSpeech+")",n.innerHTML=e.text,p.innerHTML=e.attribution,s.appendChild(t),s.appendChild(o),a.appendChild(s),a.appendChild(n),r.appendChild(p),a.appendChild(r),app.game.gameUI.anchors.notices.appendChild(a)},showWin:function(){var e=0,a=app.game.model.wordDefinitions.length;for(app.game.controller.stopListening(),e;a>e;e++)app.game.gameUI.makeDefinitions(app.game.model.wordDefinitions[e]);$(".definition-box").velocity("transition.slideUpIn",{stagger:100}),app.controller.listen()},showLoss:function(){app.game.model.failureDefinitions.length;app.game.controller.stopListening(),app.game.gameUI.dropLetters(),app.game.gameUI.removeBadGuesses(),app.game.gameUI.makeTaunt(app.game.model.taunts[Math.floor(Math.random()*app.game.model.taunts.length)]),app.game.gameUI.showTaunt(),$(".definition-box").velocity("transition.slideUpIn",{stagger:100}),app.controller.listen()},makeTaunt:function(e){var a=document.createElement("span");a.className="taunt",a.innerHTML='"'+e+'"',app.game.gameUI.anchors.notices.appendChild(a)},showTaunt:function(){$(".taunt").velocity("transition.swoopIn",{display:"block"})},dropLetters:function(){var e,a;$(".letter-list li").each(function(){e=400+Math.floor(200*Math.random()),a=Math.floor(500*Math.random()),$(this).velocity({translateY:e,opacity:0},{delay:a})})},removeBadGuesses:function(){$(".bad-guess").velocity("transition.slideDownOut")},endGame:function(){app.environment.isTouchScreen&&$(".keyboard").velocity("fadeOut",{display:"none"})}};var app=app||{};app.game=app.game||{},app.game.wordFetcher={method:"GET",listUrl:"/api/wordlist",defBaseUrl:"/api/definition/",makeListRequest:function(){var e=new XMLHttpRequest;e.open(app.game.wordFetcher.method,app.game.wordFetcher.listUrl,!1),e.onload=function(e){200==e.target.status?app.game.wordFetcher.processListResults(e.target.response):console.log("Error fetching words from server")},e.send()},processListResults:function(e){var a=JSON.parse(e),t=0,o=a.length;for(t;o>t;t++){var n=a[t],p=/^[a-zA-Z]+$/;p.test(n)&&app.game.model.wordlist.push(n.toLowerCase())}app.environment.started||app.start()},makeDefinitionRequest:function(e){var a=new XMLHttpRequest;a.open(app.game.wordFetcher.method,app.game.wordFetcher.defBaseUrl+e,!1),a.onload=function(e){200==e.target.status&&app.game.wordFetcher.processDefinition(e.target.response)},a.send()},processDefinition:function(e){var a=JSON.parse(e),t=0,o=a.length;for(app.game.model.wordDefinitions=[],t;o>t&&2>t;t++){var n={word:a[t].word,partOfSpeech:a[t].partOfSpeech,text:a[t].text,attribution:a[t].attributionText};app.game.model.wordDefinitions.push(n)}}};