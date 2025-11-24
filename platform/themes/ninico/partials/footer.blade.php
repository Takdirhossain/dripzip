@php
$footerColor = Theme::get('footerColor');
@endphp

<footer>
    <div
        class="footer-area pt-65"
        style="
            background-color: {{ Theme::get('footerBackgroundColor') ?: theme_option('footer_background_color', '#F8F8F8') }};
            --footer-text-color: {{ Theme::get('footerTextColor') ?: theme_option('footer_text_color', '#000000') }};
            --footer-text-muted-color: {{ Theme::get('footerTextMutedColor') ?: theme_option('footer_text_muted_color', '#686666') }};
            --footer-border-color: {{ Theme::get('footerBorderColor') ?: theme_option('footer_border_color', '#E0E0E0') }};
        ">
        <div class="container">
            <div class="main-footer pb-15 mb-30">
                <div class="row d-flex justify-content-between">
                    <div class="col-12 col-lg-4">
                        <div class="">

                            <div class="footer-widget__links" style="padding-right: 50px;">
                                <a href="{{ BaseHelper::getHomepageUrl() }}">
                                    {!! Theme::getLogoImage([], 'logo', 35) !!}
                                </a>
                                <ul class="mt-10 ">
                                    <li>
                                        <a href="">We create premium customizable denim jackets where every design is flexible — you choose the artwork, text, colors, and style, and we bring your imagination to life. </a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-12 col-lg-2" style="padding-left: 50px;">
                      <h2 style="color:black; font-size: 22px; font-weight: bold;" >Social</h2>
                      <ul>
                        <li><a href="https://www.facebook.com/profile.php?id=61578609329182" target="_blank">Facebook</a></li>
                        <li><a href="https://www.instagram.com/dripzip.drops" target="_blank">Instagram</a></li>
                        <li><a href="https://www.tiktok.com/@dripzipdrops" target="_blank">Tiktok</a></li>
                      </ul>
                    </div>
                    <div class="col-12 col-lg-2" style="padding-left: 50px;">
                      <h2 style="color:black; font-size: 22px; font-weight: bold;" >Terms and Conditions</h2>
                      <ul>
                       <li><a href="/about">About</a></li>
                       <li><a href="/contact">Contact</a></li>
                       <li><a href="/terms">Terms and Conditions</a></li>
                      </ul>
                    </div> -->

                    <div class="col-12 col-lg-4 d-flex justify-content-end" style="padding-left: 50px;">
                        <img style="width: 200px; height: 200px;" src="{{ asset('storage/hero/qrcode.png') }}"
                            alt="Hero Banner"
                            class="fashionHero-image">

                    </div>
                </div>
            </div>
            <div class="footer-cta pb-20">
                <div class="row justify-content-between align-items-center">
                    {!! dynamic_sidebar('footer_middle_sidebar') !!}
                </div>
            </div>
        </div>
        <div class="footer-copyright" style="background-color: {{ Theme::get('footerBottomBackgroundColor') ?: theme_option('footer_bottom_background_color', '#ededed') }}">
            <div class="container">
                <div class="row">
                    {!! dynamic_sidebar('footer_bottom_sidebar') !!}
                </div>
            </div>
        </div>
    </div>
</footer>