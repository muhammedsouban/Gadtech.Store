$('.category-slider').slick({
    infinite: true,
    slidesToShow: 12,
    slidesToScroll: 1,
    arrow: false,
    responsive: [{
            breakpoint: 1735,
            settings: {
                slidesToShow: 11,
            }
        },
        {
            breakpoint: 1650,
            settings: {
                slidesToShow: 10,
            }
        },
        {
            breakpoint: 1525,
            settings: {
                slidesToShow: 9,
            }
        },
        {
            breakpoint: 1410,
            settings: {
                slidesToShow: 8,
            }
        },
        {
            breakpoint: 1290,
            settings: {
                slidesToShow: 7,
            }
        },
        {
            breakpoint: 1185,
            settings: {
                slidesToShow: 6,
            }
        },
        {
            breakpoint: 1075,
            settings: {
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 7,
            }
        },
        {
            breakpoint: 880,
            settings: {
                slidesToShow: 6,
            }
        },
        {
            breakpoint: 795,
            settings: {
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 490,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 2,
            }
        },
    ]
});