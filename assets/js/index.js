let _selectedAirports = [];
let _selectedDestinations = [];

// On document ready
$(async function () {
    // Download package data
    const packages = await getPackages();

    // Unhide the search form and hide the loading spinner once packages are loaded
    $("#search-form").attr("hidden", false);
    $(".spinner-container").removeClass("d-flex").addClass("d-none");

    // Get list of all departure airports
    const departureAirports = getAllDepartureAirports(packages);

    // Setup functionality for the user to input departure airports
    setupFromInput(departureAirports, onAirportsSelected);

    // Get list of all destinations organized by country
    const destinations = getAllDestinations(packages);

    // Setup functionality for the user to input destinations
    setupToInput(destinations, onDestinationsSelected);

    // Setup leaving input
    setupLeavingInput();

    // Setup popular destinations links
    setupPopularDestinations(packages);

    // On search form submitted
    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        // Find all packages that match the search terms
        const packageIds = packages.map(p => p.id);

        

        // Go to the search page
        location.href = `packages.html?id=${packageIds.join(',')}`;
    });
});

/**
 * Set up the from modal and the input box
 * @param {*} departureAirports Array of departure airports
 * @param {*} onAirportsSelected Callback that is called when airports have been selected by the user
 */
function setupFromInput(departureAirports, onAirportsSelected) {
    // Use this index to assign IDs to the checkboxes
    let index = 0;

    // For each departure airport
    for (const airport of departureAirports) {
        // Construct an ID for the input
        const id = "departure-airport-" + ++index;

        // Clone the form check template
        const checkbox = cloneFormCheckTemplate(id, airport, airport);

        // Attach it to the from modal form
        $("#from-modal-form").append(checkbox);

        // Add an option for this airport to the from input datalist
        const option = $(`<option val="${airport}">${airport}</option>`);
        $("#from-datalist").append(option);
    }

    // When the from modal is being closed
    $("#from-modal").on("hide.bs.modal", function () {
        // Get array of selected airport values
        const selectedAirports = $("#from-modal-form input:checked")
            .map(function () {
                return $(this).val();
            })
            .get();

        // Set the from input to display this list of airports
        $("#from").val(selectedAirports.join(", "));

        // Callback with selected airports
        onAirportsSelected(selectedAirports);
    });

    // Ensure only valid choices are made from the free text input
    $("#from").on("change", function () {
        // Get the value of the text input
        const selectedAirport = $(this).val();

        // Set the from modal's selections to match the free text input
        $("#from-modal-form input").each(function () {
            $(this).prop("checked", $(this).val() === selectedAirport);
        });

        // If selected airport is not in departure airports...
        if (!departureAirports.includes(selectedAirport)) {
            // ...empty the input
            $("#from").val("");

            // Callback with empty array of selected airports
            onAirportsSelected([]);
        } else {
            // ...callback with selected airports
            onAirportsSelected([selectedAirport]);
        }
    });
}

/**
 * Set up the to modal and the input box
 * @param {*} destinations Array of destinations
 * @param {*} onDestinationsSelected Callback that is called when destinations have been selected by the user
 */
function setupToInput(destinations, onDestinationsSelected) {
    /**
     * Set's the "select all" checkbox in the choose destinations modal to true or false
     * depending on whether all destinations are selected or not
     */
    function setSelectAllCheck() {
        const allChecked = $(".destination input:not(:checked)").length === 0;
        $("#to-form-select-all-input").prop("checked", allChecked);
    }

    let index = 0;
    let firstLetter;

    // For each destination
    for (const destination of destinations) {
        // If the first letter of this destination's city is different to the last one
        if (firstLetter !== destination.city[0]) {
            // Store the first letter of this destination's city
            firstLetter = destination.city[0];

            // Create a header for this first letter
            const header = $(`<h3>${firstLetter.toUpperCase()}</h3>`);
            $("#to-form-a-z-list-pane").append(header);
        }

        // Create an ID for the destination template
        const id = "destination-" + ++index;

        // Get a string for this location
        const locationString = formatLocationString(destination);

        // Add a checkbox for this destination to the to form
        const checkbox = cloneFormCheckTemplate(id, locationString, locationString);
        checkbox.addClass("destination");
        $("#to-form-a-z-list-pane").append(checkbox);

        // Add an option for this destination to the to input data list
        const option = $(`<option val="${locationString}">${locationString}</option>`);
        $("#to-datalist").append(option);
    }

    // When the select all input is clicked, update the checked property of all check boxes
    $("#to-form-select-all-input").on("click", function () {
        $(".destination input").prop("checked", $(this).prop("checked"));
    });

    // When the clear all button is clicked, update the checked property of all check boxes
    $("#to-form-clear-all").on("click", function () {
        $(".destination input").prop("checked", false);
        $("#to-form-select-all-input").prop("checked", false);
    });

    // When a destination checkbox is clicked
    $(".destination input").on("click", function () {
        // Update the state of the select all checkbox
        setSelectAllCheck();
    });

    // When the to modal is being closed
    $("#to-modal").on("hide.bs.modal", function () {
        // Get array of selected destination values
        const selectedDestinations = $("#to-form-a-z-list-pane input:checked")
            .map(function () {
                return $(this).val();
            })
            .get();

        // Set the to input to display this list of destinations
        $("#to").val(selectedDestinations.join(", "));

        // Callback with selected destinations
        onDestinationsSelected(selectedDestinations);
    });

    // Ensure only valid choices are made to the free text input
    $("#to").on("change", function () {
        // Get the value of the text input
        const selectedDestination = $(this).val();

        // Set the to modal's selections to match the free text input
        $("#to-form-a-z-list-pane input").each(function () {
            $(this).prop("checked", $(this).val() === selectedDestination);
        });

        setSelectAllCheck();

        // If selected destination is not in destinations...
        if (!destinations.some(d => selectedDestination === formatLocationString(d))) {
            // ...empty the input
            $("#to").val("");

            // Callback with empty array of selected destinations
            onDestinationsSelected([]);
        } else {
            // ...else callback with selected destinations
            onDestinationsSelected([selectedDestination]);
        }
    });
}

function setupLeavingInput() {
    $("#leaving").attr("min", new Date().toISOString().slice(0, 10));
}

/**
 * Format a location object into a string
 * @param {string} location.city Location's city
 * @param {string} location.country Location's country
 * @returns Formatted location string
 */
function formatLocationString(location) {
    return `${location.city} (${location.country})`;
}

/**
 * Create a clone of the form check template
 * @param {string} id ID of the checkbox input
 * @param {*} value Value of the checkbox input
 * @param {*} text Text of the checkbox label
 * @returns Checkbox element
 */
function cloneFormCheckTemplate(id, value, text) {
    // Clone the form check template
    const checkbox = $("#form-check-template").clone();

    // Make it unhidden and remove its ID
    checkbox.attr("id", null);
    checkbox.attr("hidden", false);

    // Set the value and text of the input and label,
    // and set the ID and for attribute of the input and label
    checkbox.find("input").val(value).attr("id", id);
    checkbox.find("label").text(text).attr("for", id);

    return checkbox;
}

/**
 * Filter callback to remove duplicates from an array
 */
function distinct(value, index, array) {
    return array.indexOf(value) === index;
}

/**
 * Get a sorted, unique list of all departure airports in all packages
 * @param {*} packages Array of packages
 * @returns Array of strings
 */
function getAllDepartureAirports(packages) {
    const airports = packages
        .flatMap(p => p.flights.departing.departure.airport)
        .filter(distinct)
        .sort();

    console.log("Departure airports", airports);

    return airports;
}

/**
 * Get a list of all cities that have a package organized by country
 * @param {*} packages Array of packages
 * @returns List of objects containing country name and list of cities in that country
 */
function getAllDestinations(packages) {
    const destinations = packages
        .map(p => p.location)
        .filter((value, index, locations) =>
            locations.findIndex(l => l.city === value.city && l.country === value.country) === index)
        .sort((a, b) => a.city.localeCompare(b.city));

    console.log("Destinations", destinations);

    return destinations;
}

/**
 * Called when the user has chosen a set of departure airports
 * @param {string[]} selectedAirports User's selected departure airports
 */
function onAirportsSelected(selectedAirports) {
    // Log the user's selection
    console.log("Selected airports", selectedAirports);

    _selectedAirports = selectedAirports;
}

/**
 * Called when the user has selected a set of destinations
 * @param {string[]} selectedDestinations User's selected destinations
 */
function onDestinationsSelected(selectedDestinations) {
    // Log the user's selection
    console.log("Selected destinations", selectedDestinations);

    _selectedDestinations = selectedDestinations;
}

/**
 * Set popular destination links to the packages page
 * @param {*} packages List of packages
 */
function setupPopularDestinations(packages) {
    $("#popular-destinations a").each(function () {
        const city = $(this).data("city");
        const country = $(this).data("country");

        const ids = packages
            .filter(p => p.location.city === city && p.location.country === country)
            .map(p => p.id);

        if (location)
            $(this).attr("href", `packages.html?id=${ids.join(',')}`);
    });
}
