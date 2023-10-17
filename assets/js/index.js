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
    setupFromInput(departureAirports, () => {});
});

/**
 * Set up the from modal
 * @param {*} departureAirports Array of departure airports
 * @param {*} onAirportsSelected Callback that is called when airports have been selected by the user
 */
function setupFromInput(departureAirports, onAirportsSelected) {
    // Use this index to assign IDs to the checkboxes
    let index = 0;

    // For each departure airport
    for (const airport of departureAirports) {
        // Clone the form check template
        const checkbox = $("#form-check-template").clone();

        // Make it unhidden and remove its ID
        checkbox.attr("id", null);
        checkbox.attr("hidden", false);

        // Construct an ID for the input
        const id = "departure-airport-" + ++index;

        // Set the value and text of the input and label,
        // and set the ID and for attribute of the input and label
        checkbox.find("input").val(airport).attr("id", id);
        checkbox.find("label").text(airport).attr("for", id);

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
 * Download the array of holiday packages
 * @returns Array of package objects
 */
async function getPackages() {
    try {
        // Get packages from JSON
        const response = await fetch("assets/packages.json");
        const packages = await response.json();

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
    return packages
        .flatMap(p => p.departureAirports)
        .filter(distinct)
        .sort();
}
