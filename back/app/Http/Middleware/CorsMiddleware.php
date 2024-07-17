<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $allowedDomains = [
            'https://dash.alimaprojetos.com',
            'https://api.alimaprojetos.com'
        ];

        $origin = $request->header('Origin');

        foreach ($allowedDomains as $allowedDomain) {
            if ($this->isSubdomainOf($origin, $allowedDomain)) {
                return $next($request)
                    ->header('Access-Control-Allow-Origin', $origin)
                    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
            }
        }

        return $next($request);
    }

    private function isSubdomainOf($origin, $domain)
    {
        $originHost = parse_url($origin, PHP_URL_HOST);
        $domainHost = parse_url($domain, PHP_URL_HOST);

        return $originHost !== false && $domainHost !== false && ends_with($originHost, '.' . $domainHost);
    }
}
