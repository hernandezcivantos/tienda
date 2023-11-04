<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', '') }}</title>

    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="author" content="Civantos">
    <meta name="description" content="">

    <!-- Font Imports -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital@0;1&display=swap"
        rel="stylesheet">

    <!-- Core Style -->
    <link rel="stylesheet" href="{{asset('style.css')}}">

    <!-- Font Icons -->
    <link rel="stylesheet" href="{{asset('css/font-icons.css')}}">

    <!-- Specific CSS -->
    @yield('css')

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{asset('css/civantos.css')}}">

    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body class="stretched">
<div id="wrapper">
    @include('layouts.header')
    @include('layouts.breadcrumb')
    @yield('content')
    @include('layouts.footer')
</div>
<!-- Go To Top
============================================= -->
<div id="gotoTop" class="uil uil-angle-up"></div>

<!-- JavaScripts
============================================= -->
<script src="{{asset('js/plugins.min.js') }}"></script>
<script src="{{asset('js/functions.bundle.js') }}"></script>

@yield('js')

</body>
</html>
