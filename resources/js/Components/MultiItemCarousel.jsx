import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MultiItemCarousel = ({ listing }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false

    };
    // console.log("Food from carousel: ", listing);

    const onClickHandler = (itemId) => {
        // Implement your navigation logic here
        console.log('Clicked item id:', itemId);
    };


    return (

        <>
            <div key={listing.id} onClick={() => onClickHandler(listing.id)}>
            {/* Pass restaurant.id as parameter */}
            {/* <div> */}
                <div className='flex flex-col justify-center items-center'>
                    <img className='w-[10rem] h-[10rem] object-cover rounded-full' src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
                    <span className='py-3 font-semibold text-xl text-gray-600'>{listing.name}</span>
                    {/* <span className='py-3 font-semibold text-xl text-gray-600'>hello</span> */}

                </div>
            </div>
        </>



        // <Slider>
        //     {topMeels.map((item) => (
        //         <CarouselItem image={item.image} name={item.name} />
        //     ))}
        // </Slider>

    );
};



export default MultiItemCarousel;
