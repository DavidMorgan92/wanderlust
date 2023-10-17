let errorModal;

// On document ready
$(async function () {
    // Set up the error modal
    setupErrorModal();

    // Download package data
    const packages = await getPackages();

    // Populate the from modal with departure airports
    populateFromModal(packages);
});

/**
 * Populate the from modal with departure airports
 * @param {*} packages Array of packages
 */
async function populateFromModal(packages) {
    // Construct a list of non-duplicated departure airports for all available packages, sorted alphabetically
    const departureAirports = packages
        .flatMap(p => p.departureAirports)
        .filter(distinct)
        .sort();

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
    }
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
