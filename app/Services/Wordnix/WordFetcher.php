<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 8/30/2014
 * Time: 11:56 AM
 */
use \GuzzleHttp\Client;

class WordFetcher {

    protected $client;
    private $base_url = "http://api.wordnik.com:80/v4/word.json/";
    private $post_url = "/definitions?limit=100&includeRelated=false&useCanonical=true&includeTags=false&api_key=";
    private $apikey;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->apikey = $_ENV['WORDNIX_API_KEY'];
    }

    public function fetchList()
    {
        $response = $this->client->get("http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=10&limit=80&api_key=" . $this->apikey)->json();
        $words = array_fetch($response, 'word');
        return $words;
    }

    public function getDefinition($word)
    {
        $response = $this->client->get($this->base_url . $word . $this->post_url . $this->apikey)->json();
        return $response;
    }

} 