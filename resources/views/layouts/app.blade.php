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
<div id="loaderDiv" class="loading-container hiding">
    <div class="col-lg-3 col-md-4 col-6 loading" style="height:12.5rem;">
        <div class="css3-spinner" style="--cnvs-loader-color:var(--cnvs-themecolor);">
            <div class="css3-spinner-bounce1"></div>
            <div class="css3-spinner-bounce2"></div>
            <div class="css3-spinner-bounce3"></div>
        </div>
    </div>
</div>
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
<script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"></script>

<script>

    const loader = $('#loaderDiv');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function displayLoader() {
        if (loader.hasClass("hiding")) {
            loader.removeClass('hiding');
        }
    }

    function hideLoader() {
        if (!loader.hasClass("hiding")) {
            loader.removeClass('hiding');
        }
    }
</script>

@yield('js')
</body>
</html>
