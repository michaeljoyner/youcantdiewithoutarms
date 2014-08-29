<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Hangman</title>
	<link rel="stylesheet" href="{{ asset('css/main.css') }}"/>
	<style>

	</style>
</head>
<body>
<div class="container">
    <header class="page-header">
        <h1 class="header-title"><span class="blue">you</span><span class="grey">can't</span><span class="blue">die</span><span class="grey">without</span><span class="blue">arms</span></h1>
        <div class="stats">
            <span>WINS: </span><span id="win-count">0</span>
            <span>LOSSES: </span><span id="loss-count">0</span>
        </div>
    </header>
    <div class="welcome-message"><p>"When you play a game of hangman, you win or you die."</p></div>
    <div id="wordbox"></div>
    <div class="failures"></div>
    <div class="notifications"></div>
    <div id="game-loader">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
    </div>
    <div class="keyboard">
        <div class="keyrow">
            <div id="kk_a" class="key">a</div>
            <div id="kk_b" class="key">b</div>
            <div id="kk_c" class="key">c</div>
            <div id="kk_d" class="key">d</div>
            <div id="kk_e" class="key">e</div>
            <div id="kk_f" class="key">f</div>
            <div id="kk_g" class="key">g</div>
        </div>
        <div class="keyrow">
            <div id="kk_h" class="key">h</div>
            <div id="kk_i" class="key">i</div>
            <div id="kk_j" class="key">j</div>
            <div id="kk_k" class="key">k</div>
            <div id="kk_l" class="key">l</div>
            <div id="kk_m" class="key">m</div>
        </div>
        <div class="keyrow">
            <div id="kk_n" class="key">n</div>
            <div id="kk_o" class="key">o</div>
            <div id="kk_p" class="key">p</div>
            <div id="kk_q" class="key">q</div>
            <div id="kk_r" class="key">r</div>
            <div id="kk_s" class="key">s</div>
            <div id="kk_t" class="key">t</div>
        </div>
        <div class="keyrow">
            <div id="kk_u" class="key">u</div>
            <div id="kk_v" class="key">v</div>
            <div id="kk_w" class="key">w</div>
            <div id="kk_x" class="key">x</div>
            <div id="kk_y" class="key">y</div>
            <div id="kk_z" class="key">z</div>
        </div>
    </div>
    <div id="start-prompt"><p>Press any key to start new game</p></div>
</div>
<script src="{{ asset('vendor/jquery.min.js') }}"></script>
<script src="{{ asset('vendor/jquery.velocity.min.js') }}"></script>
<script src="{{ asset('vendor/velocity.ui.min.js') }}"></script>
<script src="{{ asset('js/main.js')  }}"></script>
<script>
app.init();
</script>
</body>
</html>
