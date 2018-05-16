function onByIndustryButtonClicked() {
    console.log("hello")

    function myFunction() {
        var y = document.getElementById("identity_table_div");
        if (y.style.display === "block"){
            y.style.display = "none"
        }

        var x = document.getElementById("industry_table_div");
        if (x.style.display === "none") {
            x.style.display = "block";
        }

    }

    myFunction()

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
            idArray = []
            id = industry_list[k]['industryID']
            idArray.push(id);
            tableBody += '<tr>';

            tableBody += '<td><a onclick="getIdentity(idArray.get(k))">'
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
