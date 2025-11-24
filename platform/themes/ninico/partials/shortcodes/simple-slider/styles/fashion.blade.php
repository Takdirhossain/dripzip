<div class="fashionHero-section">
    <img src="{{ asset('storage/hero/hero.png') }}" 
         alt="Hero Banner" 
         class="fashionHero-image">

    <div class="fashionHero-content">
        <h2 class="fashionHero-title">{{ $title ?? 'One Jacket , Endless Looks            ' }}</h2>
        <p style="color: white; font-size: 20px;">Bangladesh’s First Design Changeable Jacket .         </p>
      

        <div class="d-flex tpproduct-details__cart justify-content-center"><button>  <a href="{{ route('public.products') }}">Winter Collection 25/26</a></button></div>
    </div>
</div>

<style>
    .fashionHero-section {
        position: relative;
        width: 100%;
        height: 70vh;
        overflow: hidden;
    }

    .fashionHero-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(70%);
    }

    .fashionHero-content {
        position: absolute;
        bottom: 22%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: white;
    }

    .fashionHero-title {
        font-size: 42px;
        font-weight: 700;
        text-shadow: 0 3px 6px rgba(0,0,0,0.7);
    }

    .fashionHero-subtitle {
        font-size: 18px;
        margin-bottom: 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.6);
    }

    @media (max-width: 768px) {
        .fashionHero-section {
            height: 55vh;
        }
        .fashionHero-title {
            font-size: 26px;
        }
        .fashionHero-subtitle {
            font-size: 14px;
        }
        .fashionHero-content{
            width: 70vw;
        }
    }
</style>
