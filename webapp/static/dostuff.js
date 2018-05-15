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

identities_data = [{"race_codes": "TOTAL", "race": "TOTAL"}, {"race_codes": "MT", "race": "MALE"}, {"race_codes": "FT", "race": "FEMALE"}, {"race_codes": "WHT", "race": "WHITE"}, {"race_codes": "WHM", "race": "WHITE_MALE"}, {"race_codes": "WHF", "race": "WHITE_FEMALE"}, {"race_codes": "BLKT", "race": "BLACK"}, {"race_codes": "BLKM", "race": "BLACK_MALE"}, {"race_codes": "BLKF", "race": "BLACK_FEMALE"}, {"race_codes": "HISPT", "race": "HISPANIC"}, {"race_codes": "HISPM", "race": "HISPANIC_MALE"}, {"race_codes": "HISPF", "race": "HISPANIC_FEMALE"}, {"race_codes": "ASIANT", "race": "ASIAN"}, {"race_codes": "ASIANM", "race": "ASIAN_MALE"}, {"race_codes": "ASIANF", "race": "ASIAN_FEMALE"}, {"race_codes": "AIANT", "race": "INDIAN"}, {"race_codes": "AIANM", "race": "AM-INDIAN-ALK_MALE"}, {"race_codes": "AIANF", "race": "AM-INDIAN-ALK_FEMALE"}, {"race_codes": "nhopiT", "race": "Hawaiia"}, {"race_codes": "NHOPIM", "race": "Hawaiia_MALE"}, {"race_codes": "NHOPIF", "race": "Hawaiia_FEMALE"}, {"race_codes": "tomrT", "race": "Two Race"}, {"race_codes": "TOMRM", "race": "Two Races_MALE"}, {"race_codes": "TOMRF", "race": "Two Races_FEMALE"}, {"race_codes": "MinT", "race": "TOTAL (MINORITY)"}, {"race_codes": "MinF", "race": "MINORITY_FEMALE(MINORITY)"}, {"race_codes": "MinM", "race": "MINORITY_MALE(MINORITY)"}, {"race_codes": "WHMp", "race": "WHITE_MALE(PERCENT)"}, {"race_codes": "BLKMp", "race": "BLACK(PERCENT)"}, {"race_codes": "HISPMp", "race": "HISPANIC_MALE(PERCENT)"}, {"race_codes": "AIANMp", "race": "AM-INDIAN-ALK_MALE(PERCENT)"}, {"race_codes": "nhopiMp", "race": "Hawaiia_MALE(PERCENT)"}, {"race_codes": "asianMp", "race": "ASIAN_MALE(PERCENT)"}, {"race_codes": "tomrMp", "race": "Two Races_MALE(PERCENT)"}, {"race_codes": "MinMp", "race": "MID OFF AND MGRS (MINORITY)"}, {"race_codes": "WHfp", "race": "WHITE_FEMALE (PERCENT)"}, {"race_codes": "BLKfp", "race": "BLACK_FEMALE (PERCENT)"}, {"race_codes": "HISPfp", "race": "HISPANIC_FEMALE(PERCENT)"}, {"race_codes": "AIANfp", "race": "AM-INDIAN-ALK_FEMALE(PERCENT)"}, {"race_codes": "nhopifp", "race": "Hawaiia_FEMALE(PERCENT)"}, {"race_codes": "asianfp", "race": "ASIAN_FEMALE(PERCENT)"}, {"race_codes": "tomrfp", "race": "Two Races_FEMALE(PERCENT)"}, {"race_codes": "MinFp", "race": "MINORITY_FEMALE(MINORITY)(PERCENT)"}, {"race_codes": "WHtp", "race": "WHITE (PERCENT)"}, {"race_codes": "BLKtp", "race": "BLACK (PERCENT)"}, {"race_codes": "HISPtp", "race": "HISPANIC(PERCENT)"}, {"race_codes": "AIANtp", "race": "INDIAN(PERCENT)"}, {"race_codes": "nhopitp", "race": "Hawaiia(PERCENT)"}, {"race_codes": "asiantp", "race": "ASIAN(PERCENT)"}, {"race_codes": "tomrtp", "race": "Two Race(PERCENT)"}, {"race_codes": "MinTp", "race": "MINORITY_(MINORITY)(PERCENT)"}, {"race_codes": "MTp", "race": "MALE(PERCENT)"}, {"race_codes": "FTp", "race": "FEMALE(PERCENT)"}, {"race_codes": "PTOTAL", "race": "100 percent for total10"}]


initialize();

function initialize() {
    var element = document.getElementById('byIndustry');
    if (element) {
        element.onclick = onByIndustryButtonClicked;
    }
    var element = document.getElementById('byRace');
    if (element) {
        element.onclick = onByIdentityButtonClicked();
    }
}

function getBaseURL() {
    console.log("tacotacotaco")
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
    return baseURL;
}

function onByIndustryButtonClicked() {
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
            tableBody += '<tr>';

            tableBody += '<td><a onclick="getIdentity(' +  "')\"><a href='www.google.com'>"
                + industry_list[k]['industry'] + ', '
                + industry_list[k]['industryID'] + '</a></a></td>';

            tableBody += '</td>';
            tableBody += '</tr>';
        }

        // Put the table body we just built inside the table that's already on the page.
        var resultsTableElement = document.getElementById('results_table');
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
    console.log(getBaseURL())
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
        .then(function(identity_list) {
            // Build the table body.
            var tableBody = '';
            for (var k = 0; k < identity_list.length; k++) {
                tableBody += '<tr>';

                tableBody += '<td><a onclick="getIdentity(' +  "')\"><a href='www.google.com'>"
                    + identity_list[k]['identity'] + ', '
                    + identity_list[k]['identityID'] + '</a></a></td>';

                tableBody += '</td>';
                tableBody += '</tr>';
            }

            // Put the table body we just built inside the table that's already on the page.
            var resultsTableElement = document.getElementById('identity_table');
            if (resultsTableElement) {
                resultsTableElement.innerHTML = tableBody;
            }
        })

function getIdentity(identityID, identityName) {
    // Very similar pattern to onAuthorsButtonClicked, so I'm not
    // repeating those comments here. Read through this code
    // and see if it makes sense to you.
    var url = getBaseURL() + '/identities/' + identityID;

    fetch(url, {method: 'get'})

        .then((response) => response.json())

        .then(function(booksList) {
            var tableBody = '<tr><th>' + identityName + '</th></tr>';
            for (var k = 0; k < booksList.length; k++) {
                tableBody += '<tr>';
                tableBody += '<td>' + booksList[k]['title'] + '</td>';
                tableBody += '<td>' + booksList[k]['publication_year'] + '</td>';
                tableBody += '</tr>';
            }
            var resultsTableElement = document.getElementById('results_table');
            if (resultsTableElement) {
                resultsTableElement.innerHTML = tableBody;
            }
        })

        .catch(function(error) {
            console.log(error);
        });
}

// Get the container element
var btnContainer = document.getElementsByClassName("btn-group");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}