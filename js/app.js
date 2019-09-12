'use strict';

console.log('working');

const allHorns = [];

// const testHorn =   {
//     "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
//     "title": "UniWhal",
//     "description": "A unicorn and a narwhal nuzzling their horns",
//     "keyword": "narwhal",
//     "horns": 1
//   };

// Constructor function

function Horn(horn) {
    
    this.image_url = horn.image_url; 
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;

    allHorns.push(this);
};


// AJAX

$.get('/data/page-1.json', data => {

    data.forEach(horn => {
        let tempHorn = new Horn(horn);
        tempHorn.render();
        // console.log(tempHorn);
    });
    // console.log(allHorns);
});


// Render function

Horn.prototype.render = function() {

    const myTemplate = $('#photo-template').html();
    const $newSection = $('<section></section>');
    $newSection.html(myTemplate);
    
    $newSection.find('h2').text(this.title);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('p').text(this.description);
    
    // console.log($newSection);
    $('main').append($newSection);
};