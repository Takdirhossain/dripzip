<div class="fashionHero-section">
    <img src="{{ asset('storage/hero/hero.jpg') }}" 
         alt="Hero Banner" 
         class="fashionHero-image">

    <div class="fashionHero-content fade-up">
        <h2 class="fashionHero-title">{{ $title ?? 'Walk Free. Walk Stylish.' }}</h2>
        <p style="color: white; font-size: 20px;">Step into comfort and style with our premium everyday sliders.</p>
      

        <div class="d-flex tpproduct-details__cart justify-content-center"><button>  <a href="{{ route('public.products') }}" class="d-flex gap-2 align-items-center ">Browse Trending Slider <img style="width: 20px; height: 20px;" src="{{ asset('storage/logo/arrowicon.webp') }}" alt=""> </a></button></div>
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
    .fade-up {
    opacity: 0;
    transform: translateY(40px);
    animation: fadeUp 1.2s ease-out forwards;
    width: 100%;
    position: absolute;
    margin-left: -48vw;
}

@keyframes fadeUp {
    0% {
        opacity: 0;
        transform: translateY(40px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
