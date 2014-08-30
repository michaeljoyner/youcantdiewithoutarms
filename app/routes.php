<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});


Route::get('api/wordlist', 'ApiController@getWordList')->before('cache.fetch')->after('cache.put');
Route::get('api/definition/{word}', 'ApiController@getDefinition')->before('cache.fetch')->after('cache.put');
