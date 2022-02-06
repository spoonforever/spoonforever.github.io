'use strict';

const dataProvider = new CommonDataProvider();
dataProvider.downloadClothesItemsData(initIndexPage);

function initIndexPage(itemsCollection) {
    const clothesShowcase = new ClothesShowcase(itemsCollection);

    clothesShowcase.fillTopSellsContainer();
    clothesShowcase.fillClothesContainer();

    $('.top-sells-item-slider-container').slick({
        infinite: true,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000,
        responsive: [{
                breakpoint: 1350,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    const purchaseBag = new PurchaseBag(itemsCollection);
    purchaseBag.setIndexPageEvents();
}