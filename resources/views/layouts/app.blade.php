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

    <!-- Toast -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

    <!-- Plugins/Components CSS -->
    <link rel="stylesheet" href="{{asset('css/components/ion.rangeslider.css')}}">

    <!-- Plugins/Components CSS -->
    <link rel="stylesheet" href="{{asset('css/components/bs-filestyle.css')}}">

    <!-- Plugins/Components CSS -->
    <link rel="stylesheet" href="{{asset('css/components/bs-datatable.css')}}">

    <!-- Plugins/Components CSS -->
    <link rel="stylesheet" href="{{asset('css/components/bs-switches.css')}}"><!-- Bootstrap Switch CSS -->
    <link rel="stylesheet" href="{{asset('css/components/radio-checkbox.css')}}"><!-- Radio Checkbox Plugin -->

    <!-- Specific CSS -->
    @yield('css')

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{asset('css/civantos.css')}}">

    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body class="stretched side-panel-right side-push-panel">
@if(Auth()->user() && Auth()->user()->isAdmin())
    @include('layouts.side')
@endif
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
<!-- Toast -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script src="{{asset('js/components/rangeslider.min.js')}}"></script>
<script src="{{asset('js/components/bs-filestyle.js')}}"></script>
<script src="{{asset('js/components/bs-datatable.js')}}"></script>
<script src="{{asset('js/components/bs-switches.js')}}"></script>

<script>

    let table = new DataTable('.datatableTable', {
        pageLength: 9999999999,
        bLengthChange: false,
        paging: false,
        bInfo: false,
        language: {
            url: '{{asset('js/sp.json')}}'
        }
    });

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
            loader.addClass('hiding');
        }
    }

    /**
     * Generate a toast to display message
     * @param msg Messago to display
     * @param duration time in milsecs
     * @param success 0/1 if error/success
     */
    function toastMessage(msg, duration, success) {

        let bg = "linear-gradient(to right, #00b09b, #96c93d)";

        if (!success) {
            bg = "linear-gradient(to right, #FC7E63, #b20a2c)";
        }

        Toastify({
            text: msg,
            duration: duration,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: bg
            }
        }).showToast();
    }

    /**
     * Transform a string into a friendly url, being careful with special characters
     * @param value
     * @returns {string}
     */
    function friendlyUrl(value) {
        if (value === undefined) {
            return '';
        }

        const replacements = {
            'á': 'a',
            'é': 'e',
            'í': 'i',
            'ó': 'o',
            'ú': 'u',
            'ü': 'u',
            'ñ': 'n'
        };

        value = value.replace(/[áéíóúüñ]/g, function (match) {
            return replacements[match];
        });

        value = value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

        return value;
    }

    function regenerateCategoryMenu() {
        $.ajax({
            type: 'POST',
            url: '{!! route('category.menu') !!}',
            cache: false,
            success: function (response) {
                $('#categoryMenu').html('');
                response.forEach((element)=> {
                    $('#categoryMenu').append(
                    `<li class="menu-item" style="">
                        <a class="menu-link"
                           href="{{url('/category')}}${element.route}">
                            <div>${element.name}</div>
                        </a>
                    </li>`);
                })
            },
            error: function (error) {
                toastMessage(error.message, 5000, 0);
            },
            complete: function (e) {
                hideLoader();
            }
        });
    }

    regenerateCategoryMenu();

</script>

@yield('js')
@yield('modals')
</body>
</html>
