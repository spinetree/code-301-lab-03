'use strict';

const allHorns = [];
const keywords = [];

// An object constructor accepting "horn" as a parameter 
// Stores the created instance in the 'allHorns' array
function Horn(horn) {
    this.image_url = horn.image_url; 
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;

    allHorns.push(this);
};

// A prototype that gets html content of #photo-template
// It creates section element as a jQuery variable
// It populates html content with an object instance property values
// Lastly, it appends the new section content to the main element
Horn.prototype.render = function() {    
    const myTemplate = $('#photo-template').html();
    const $newSection = $('<section></section>');
    $newSection.html(myTemplate);

    $newSection.attr('class', this.keyword);
    $newSection.find('h2').text(this.title);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('p').text(this.description);
    
    $('main').append($newSection);
};


const fillSelect = () => {
    keywords.forEach(keyword => {
        const $newOption = $('<option></option>');
        $newOption.text(keyword);
        $newOption.attr('value', keyword);
        $('select').append($newOption);
    })
}

const getKeywords = (arr) => {
    arr.forEach(horn => {
        if(!keywords.includes(horn.keyword)){
            keywords.push(horn.keyword);
        }
    })
}               

const handleFilter = () => {
    $('select').on('change', function() {
      let selected = $(this).val();

      if(selected !== 'defalut'){
        $('section').hide();
        $(`section.${selected}`).fadeIn();
      }
    })
  }

// Ajax calls to get data from page-1.json
// Uses Horn object constructor to create object instances
// Uses render prototype to display images as the instances are created
$.get('/data/page-1.json', data => {
    data.forEach(horn => {
        let tempHorn = new Horn(horn);
        tempHorn.render();
    });
    getKeywords(allHorns);
    fillSelect();
    handleFilter();
});