<!doctype html>
<html {!! Theme::htmlAttributes() !!}>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1" name="viewport"/>
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {!! BaseHelper::googleFonts(sprintf('https://fonts.googleapis.com/css2?family=%s:wght@400;500;600', urlencode($primaryFont = theme_option('primary_font', 'Jost')))) !!}

        <style>
            :root {
                --primary-color: {{ $primaryColor = theme_option('primary_color', '#d51243') }};
                --primary-color-rgb: {{ implode(',', BaseHelper::hexToRgb($primaryColor)) }};
                --primary-font: '{{ $primaryFont }}', sans-serif;
                --header-background-color: {{ theme_option('header_background_color', '#fff') }};
                --header-text-color: {{ theme_option('header_text_color', '#040404') }};
                --header-menu-text-color: {{ theme_option('header_menu_text_color', '#040404') }};
                --header-menu-text-hover-color: {{ theme_option('header_menu_text_hover_color', $primaryColor) }};
            }
        </style>
        <script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1408698244155318');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1408698244155318&ev=PageView&noscript=1"
/></noscript>

        {!! Theme::header() !!}
    </head>
    <body {!! Theme::bodyAttributes() !!}>
        {!! apply_filters(THEME_FRONT_BODY, null) !!}

        {!! Theme::partial('scroll-top') !!}

        @yield('content')

        @if(is_plugin_active('ecommerce') && theme_option('bottom_mobile_menu_enabled', 'yes') === 'yes')
            @include(Theme::getThemeNamespace('partials.navigation-bar'))
        @endif

        <script>
            'use strict';

            window.trans = {};
            window.siteConfig = {};
            @if (is_plugin_active('ecommerce'))
                window.currencies = @json(get_currencies_json());
                @if(EcommerceHelper::isCartEnabled())
                    siteConfig.ajaxCart = '{{ route('public.ajax.cart') }}';
                    siteConfig.cartUrl = '{{ route('public.cart') }}';
                @endif
            @endif
        </script>

        {!! Theme::footer() !!}
    </body>
</html>
