/*
 * dostuff.js
 * Nichols, Gohel, GS, 14 May 2018
 * Adapted from Jeff Ondich, 27 April 2016 (Updated, 4 May 2018)
 *
 * A little bit of Javascript showing one small example of AJAX
 * within the "books and authors" sample for Carleton CS257,
 * Spring Term 2017.
 *
 * This example uses a very simple-minded approach to Javascript
 * program structure, which suffers from the problem of
 * "global namespace pollution". We'll talk more about this after
 * you get a feel for some Javascript basics.
 */

// IMPORTANT CONFIGURATION INFORMATION
// The contents of getBaseURL below reflects our assumption that
// the web application (books_website.py) and the API (books_api.py)
// will be running on the same host but on different ports.
//
// But if you take a look at the contents of getBaseURL, you may
// ask: where does the value of api_port come from? The answer is
// a little bit convoluted. (1) The command-line syntax of
// books_website.py includes an argument for the API port;
// and (2) the index.html Flask/Jinja2 template includes a tiny
// bit of Javascript that declares api_port and assigns that
// command-line API port argument to api_port. This happens
// before books.js is loaded, so the functions in books.js (like
// getBaseURL) can access api_port as needed.

identities_descrip = [{"race_codes": "TOTAL", "descrip": "Total"}, {"race_codes": "MT", "descrip":
 "Total Male"}, {"race_codes": "FT", "descrip": "Total Female"}, {"race_codes": "WHT", "descrip": "Total White"}, {"race_codes": "WHM", "descrip": "Total White Male"}, {"race_codes": "WHF", "descrip": "Total White Female"},
 {"race_codes": "BLKT", "descrip": "Total Black"}, {"race_codes": "BLKM", "descrip": "Total Black Male"}, {"race_codes": "BLKF", "descrip": "Total Black Female"}, {"race_codes": "HISPT", "descrip": "Total Hispanic"}, {"race_codes": "HISPM",
 "descrip": "Total Hispanic Male"}, {"race_codes": "HISPF", "descrip": "Total Hispanic Female"}, {"race_codes": "ASIANT", "descrip": "Total Asian"}, {"race_codes": "ASIANM", "descrip": "Total Asian Male"}, {"race_codes": "ASIANF", "descrip": "Total Asian Female"},
 {"race_codes": "AIANT", "descrip": "Total American Indian or Alaskan Native"}, {"race_codes": "AIANM", "descrip": "Male American Indian or Alaskan Native"}, {"race_codes": "AIANF", "descrip": "Female American Indian or Alaskan Native"}, {"race_codes": "nhopiT", "descrip": "Total Native Hawaiian or Pacific Islander"}, {"race_codes": "NHOPIM",
  "descrip": "Male Native Hawaiian or Pacific Islander"}, {"race_codes": "NHOPIF", "descrip": "Female Native Hawaiian or Pacific Islander"}, {"race_codes": "tomrT", "descrip": "Total Two or more Races"}, {"race_codes": "TOMRM", "descrip": "Male Two or more Races"}, {"race_codes": "TOMRF", "descrip": "Female Two or more Races"}]

initialize();

function initialize() {
    var element = document.getElementById('byIndustry');
    if (element) {
        element.onclick = onByIndustryButtonClicked;
    }
    var element = document.getElementById('byRace');
    if (element) {
        element.onclick = onByIdentityButtonClicked;
    }
}

function getBaseURL() {
    console.log("tacotacotaco")
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
    return baseURL;
}

if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function onByIndustryButtonClicked() {
    document.getElementById("industry_table_div").style.display = "block";
    document.getElementById("identity_table_div").style.display = "none";
    document.getElementById("specific_id_table_div").style.display = "none";
    document.getElementById("race_distribution_div").style.display = "none";
    console.log("hello")

    var url = getBaseURL() + '/industries/';

    // // Send the request to the Books API /authors/ endpoint
    // fetch(url, {method: 'get'})
    //
    // // When the results come back, transform them from JSON string into
    // // a Javascript object (in this case, a list of author dictionaries).
    //     .then(response => response.json();)

    fetch(url, {method: 'get'})

    // When the results come back, transform them from JSON string into
    // a Javascript object (in this case, a list of author dictionaries).
        .then((response) => response.json())

    // Once you have your list of author dictionaries, use it to build
    // an HTML table displaying the author names and lifespan.
.then(function(industry_list) {
        // Build the table body.
        var tableBody = '';
        for (var k = 0; k < industry_list.length; k++) {
            // idArray = []
            id = industry_list[k]['industryID']
            tableBody += '<tr class='+id+'>';

            //tableBody += '<td><a class ='+id+' onclick="getIdentity(this)">'
            // idArray.push(id);
            tableBody += '<tr>';

            tableBody += '<td><a class = '+id+' onclick="getIdentity(this)">'
                //"<a href='identity'>"
                + industry_list[k]['industry'] + ', '
                + industry_list[k]['industryID'] +
                '</a></a></td>';


            tableBody += '</td>';
            tableBody += '</tr>';
        }

        // Put the table body we just built inside the table that's already on the page.
        var resultsTableElement = document.getElementById('industry_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    // Log the error if anything went wrong during the fetch.
        .catch(function(error) {
            console.log(error);
        });
}

function onByIdentityButtonClicked() {
    document.getElementById("industry_table_div").style.display = "none";
    document.getElementById("identity_table_div").style.display = "block";
    document.getElementById("specific_id_table_div").style.display = "none";
    document.getElementById("race_distribution_div").style.display = "none";
    console.log("helloagain")

    var url = getBaseURL() + '/identities/';

    // // Send the request to the Books API /authors/ endpoint
    // fetch(url, {method: 'get'})
    //
    // // When the results come back, transform them from JSON string into
    // // a Javascript object (in this case, a list of author dictionaries).
    //     .then(response => response.json();)

    fetch(url, {method: 'get'})

    // When the results come back, transform them from JSON string into
    // a Javascript object (in this case, a list of author dictionaries).
        .then((response) => response.json())

    // Once you have your list of author dictionaries, use it to build
    // an HTML table displaying the author names and lifespan.
.then(function (identity_list) {
        // Build the table body.
        var tableBody = '';
        for (var k = 0; k < identity_list.length; k++) {
          id = identity_list[k]['race_codes']
          tableBody += '<tr class='+id+'>';

          //tableBody += '<td><a class ='+id+' onclick="getIndustry(this)">'
          // idArray.push(id);
          tableBody += '<tr>';

          tableBody += '<td><a class = '+id+' onclick="getIndustry(this)">'
              //"<a href='identity'>"
              + identity_list[k]['race'] + ', '
            //  + identity_list[k]['race_codes'] +
              '</a></a></td>';


          tableBody += '</td>';
          tableBody += '</tr>';
        }

        // Put the table body we just built inside the table that's already on the page.
        var resultsTableElement = document.getElementById('identity_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

        .catch(function(error) {
            console.log(error);
        });
}

function getIdentity(industryID) {

    document.getElementById("industry_table_div").style.display = "none";
    document.getElementById("identity_table_div").style.display = "none";
    document.getElementById("specific_id_table_div").style.display = "block";
    document.getElementById("race_distribution_div").style.display = "none";

    // Very similar pattern to onAuthorsButtonClicked, so I'm not
    // repeating those comments here. Read through this code
    // and see if it makes sense to you.

    console.log(industryID.getAttribute("class"));


    var url = getBaseURL() + '/industries/' + industryID.getAttribute("class")

    fetch(url, {method: 'get'})

        .then((response) => response.json())

.then(function(identity_list) {
        var tableBody = '';
        for (var k = 0; k < Object.keys(identity_list).length; k++) {
            tableBody += '<tr>';
            tableBody += '<td>' + Object.keys(identity_list)[k] + '</td>';
            tableBody += '<td>' + identity_list[Object.keys(identity_list)[k]] + '</td>';

            if (identity_list[Object.keys(identity_list)[k]][-1]==='T'){
                tableBody += '</tr>';
            }

        }
        var resultsTableElement = document.getElementById('specific_id_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

        .catch(function(error) {
            console.log(error);
        });
}

function getIndustry(race_codes) {

    document.getElementById("industry_table_div").style.display = "none";
    document.getElementById("identity_table_div").style.display = "none";
    document.getElementById("specific_id_table_div").style.display = "none";
    document.getElementById("race_distribution_div").style.display = "block";
    // Very similar pattern to onAuthorsButtonClicked, so I'm not
    // repeating those comments here. Read through this code
    // and see if it makes sense to you.
    console.log(race_codes.getAttribute("class"));


    var url = getBaseURL() + '/identities/' + race_codes.getAttribute("class") + '10'

    fetch(url, {method: 'get'})

        .then((response) => response.json())

.then(function(industry_list) {
        var tableBody = '';
        for (var k = 0; k < Object.keys(industry_list).length; k++) {
            tableBody += '<tr>';
            tableBody += '<td>' + Object.keys(industry_list)[k] + '</td>';
            tableBody += '<td>' + industry_list[Object.keys(industry_list)[k]] + '</td>';
            tableBody += '</tr>';
        }
        var resultsTableElement = document.getElementById('race_distribution_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })


        .catch(function(error) {
            console.log(error);
        });
    document.getElementById("race_distribution_div").style.display = "block";
}

// Get the container element
var btnContainer = document.getElementsByClassName("btn-group")[0].childNodes

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 1; i < btnContainer.length; i+=2) {
    btnContainer[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}
