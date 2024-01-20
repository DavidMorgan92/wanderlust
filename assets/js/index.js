/** Reference to the error modal */
let errorModal;

// On document ready
$(async function () {
    // Set up the error modal
    setupErrorModal();

    // Download package data
    const packages = await getPackages();

    // Unhide the search form and hide the loading spinner once packages are loaded
    $("#search-form").attr("hidden", false);
    $("#spinner-container").removeClass("d-flex").addClass("d-none");

    // Get list of all departure airports
    const departureAirports = getAllDepartureAirports(packages);

    // Setup functionality for the user to input departure airports
    setupFromInput(departureAirports, () => { });

    // Get list of all destinations organized by country
    const destinations = getAllDestinations(packages);

    // Setup functionality for the user to input destinations
    setupToInput(destinations, () => { });
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

        // If selected airport is not in departure airports...
        if (!departureAirports.includes(selectedAirport)) {
            // ...empty the input
            $("#from").val("");
        } else {
            // ...else callback with selected airports
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
    let index = 0;
    let firstLetter;

    for (const destination of destinations) {
        if (firstLetter !== destination.city[0]) {
            firstLetter = destination.city[0];

            const header = $(`<h3>${firstLetter.toUpperCase()}</h3>`);

            $("#to-form-a-z-list-pane").append(header);
        }

        const id = "destination-" + ++index;

        const locationString = formatLocationString(destination);
        const checkbox = cloneFormCheckTemplate(id, locationString, locationString);

        checkbox.addClass("destination");
        $("#to-form-a-z-list-pane").append(checkbox);

        const option = $(`<option val="${locationString}">${locationString}</option>`);
        $("#to-datalist").append(option);
    }

    $("#to-form-select-all-input").on("click", function () {
        $(".destination input").prop("checked", $(this).prop("checked"));
    });

    $("#to-form-clear-all").on("click", function () {
        $(".destination input").prop("checked", false);
        $("#to-form-select-all-input").prop("checked", false);
    });

    $(".destination input").on("click", function () {
        const allChecked = $(".destination input:not(:checked)").length === 0;
        $("#to-form-select-all-input").prop("checked", allChecked);
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

        // If selected destination is not in destinations...
        if (!destinations.some(d => selectedDestination === formatLocationString(d))) {
            // ...empty the input
            $("#to").val("");
        } else {
            // ...else callback with selected destinations
            onDestinationsSelected([selectedDestination]);
        }
    });
}

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
 * Download the array of holiday packages
 * @returns Array of package objects
 */
async function getPackages() {
    try {
        // Get packages from JSON
        const response = await fetch("https://api.jsonbin.io/v3/b/65abd7ec266cfc3fde7ccd45", {
            headers: {
                // Public access key for packages JSON
                "X-Access-Key": "$2a$10$7Mb4NP9X/xmb8E9GI4h.j.wtSi9lOoKfijHJJHSRdUxLbbaAEshUC"
            }
        });

        const json = await response.json();
        const packages = json.record;

        // Log data that was loaded
        console.log("Downloaded packages", packages);

        // Return the loaded data
        return packages;
    }
    catch (error) {
        // Show error modal on error
        showErrorModal(error);

        // Return an empty array
        return [];
    }
}

/**
 * Initialize the error modal
 */
function setupErrorModal() {
    // Store reference to error modal
    errorModal = new bootstrap.Modal("#error-modal");

    // Setup error modal refresh button to refresh the page
    $("#error-modal-refresh-button").on("click", function () {
        location.reload();
    });
}

/**
 * Show the error modal with a given message
 * @param {string} error.message The message to show in the dialog box
 */
function showErrorModal(error) {
    $("#error-modal-message").text(error.message);
    errorModal.show();
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
        .flatMap(p => p.departureAirports)
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
