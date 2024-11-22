import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/ProductSlider.css"

export function ProductSlideShow({ photoURL }) {
    const settings = {    
        dots: photoURL.length > 1,
        infinite: photoURL.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: photoURL.length > 1,
        autoplaySpeed: 2000,
        cssEase: "linear",
      };

    return (
        <div className="image-slider w-[300px] sm:w-[360px] m-auto text-center">
            <Slider {...settings} >
                {photoURL.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index}`} className="max-w-100% h-auto m-auto" />
                    </div>
                ))}
            </Slider>
        </div>
    )
}