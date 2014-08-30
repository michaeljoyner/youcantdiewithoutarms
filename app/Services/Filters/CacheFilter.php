<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 8/30/2014
 * Time: 5:57 PM
 */
use Illuminate\Routing\Route;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
class CacheFilter {

    public function fetch(Route $route, Request $request)
    {
        $key = $this->makeCacheKey($request->url());

        if(Cache::has($key)) return Cache::get($key);
    }

    public function put(Route $route, Request $request, $response)
    {
        $key = $this->makeCacheKey($request->url());

        if(!Cache::has($key)) Cache::put($key, $response->getContent(), 2);
    }

    protected function makeCacheKey($url)
    {
        return 'route_'.Str::slug($url);
    }
} 