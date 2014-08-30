<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 8/30/2014
 * Time: 12:06 PM
 */
class ApiController extends BaseController {

    protected $fetcher;

    public function __construct(WordFetcher $fetcher)
    {
        $this->fetcher = $fetcher;
    }

    public function getWordList()
    {
        return Response::json($this->fetcher->fetchList());
    }

    public function getDefinition($word){
        $data = $this->fetcher->getDefinition($word);

        return Response::make($data);
    }
} 