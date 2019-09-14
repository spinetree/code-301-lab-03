'use strict';

let allHorns = [];
const keywords = [];
let dataFile = './data/page-1.json';

// This is an object constructor that 
// Accepts "horn" as a parameter 
// Stores the created instance in the 'allHorns' array
function Horn(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;

    allHorns.push(this);
};

// This is a a prototype method that
// Uses jQuery to get the script template
// Uses Handlebars to compile the script
// Returns the populated template 
Horn.prototype.toHtml = function () {
    let template = $('#section-template').html();
    let templateRender = Handlebars.compile(template);
    return templateRender(this);
}

// This is a prototype method that
// Appends the populated template onto the 'main' element as a child 
Horn.prototype.render = function () {
    $('main').append(this.toHtml());
}


// This a function that
// Takes an array as a parameter 
// Gets the value of from the selected option value of the element with id="sort"
// If the value of the #sort is 'alpha, then it sorts the images alphabetically using the sort method
// Else, it sorts the images by the number of horns
const sortHorns = (arr) => {
    let selected = $('#sort').val();
    if (selected === 'alpha') {
        arr.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        return arr;
    } 
    else {
        arr.sort(function (a, b) {
            return a.horns - b.horns;
        });
        return arr;
    }
};

// This is a function that
// Takes an array as a parameter 
// Uses the forEach method to find any non matching values to the horn.keyword from the 'heywords' array
// If there is no match, pushes out the keyword to the 'keywords' array
const getKeywords = (arr) => {
    arr.forEach(horn => {
        if (!keywords.includes(horn.keyword)) {
            keywords.push(horn.keyword);
        }
    })
}

// This is a function that
// Uses the forEach method to create option elements with values in the 'keywords' array
// It also addes class='horn' to the each option
// Appends the created option onto the element with id='keyword'
const fillSelect = () => {
    keywords.forEach(keyword => {
        const $newOption = $('<option></option>');
        $newOption.text(keyword);
        $newOption.attr('class', 'horn');
        $newOption.attr('value', keyword);
        $('#keyword').append($newOption);
    })
}

// This is a function that contains
// An event listener for any changes to the element with id='keyword'
// On change, it assigns the targeted value to the variable 'selected'
// If the 'selected' does not match 'default', 
const handleFilter = () => {
    $('#keyword').on('change', function () {
        let selected = $(this).val();

        if (selected !== 'defalut') {
            $('section').hide();
            $(`section.${selected}`).fadeIn();
        }
    })
}


// This is a Ajax calls to get data from page-1.json
// Uses Horn object constructor to create object instances
// Uses render prototype to display images as the instances are created
const loadHorns = (parameter) => {
    $.get(parameter, data => {
        data.forEach(horn => {
            new Horn(horn);
        });
        sortHorns(allHorns);
        allHorns.forEach(sortedHorn => {
            sortedHorn.render();
        });
        getKeywords(allHorns);
        fillSelect();
        handleFilter();
    });

};

// Initiates the iitial load of data from the first JSON file
loadHorns(dataFile);

// It is an event listner that 
// On click, it empties option elemenet with the class horn and section element with the class horn
// Empties out allHorns
// Updates the dataFile path
// Invokes the loadHorn function with new dataFile value
$('button').click(function () {
    let detatchedOptions = $('option.horn').detach();
    let detatchedSections = $('section.horn').detach();

    allHorns = [];

    dataFile = this.value;
    loadHorns(dataFile);
})

// It is an event listner that 
// On change, it empties option elemenet with the class horn and section element with the class horn
// Initiates the sortHorns function with 'allHorns' array
// Redners the images and initiates getKeywords, fillSelect and handleFillter functions
$('#sort').on('change', function () {
    let detatchedOptions = $('option.horn').detach();
    let detatchedSections = $('section.horn').detach();
    
    sortHorns(allHorns);

    allHorns.forEach(sortedHorn => {
        sortedHorn.render();
    });

    getKeywords(allHorns);
    fillSelect();
    handleFilter();
})
