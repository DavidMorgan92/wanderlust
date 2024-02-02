$(async function () {
    // Download package data
    const packages = await getPackages();

    // Parse the ID url param
    const params = new URLSearchParams(document.location.search);
    const packageId = params.get("id");
    const package = packages.find(p => p.id === Number(packageId));

    console.log("Package loaded", package);

    // Remove all loading spinners
    $(".spinner-container").remove();

    // Show error if package not found

    // Set the URL for the breadcrumb
    $("#package-list-link").attr("href", "packages.html?id=" + params.get("searchIds"));

    // Set page title and location
    $("#title").text(package.hotel.name);
    $("#title").parent().removeClass("placeholder");
    $("#location").text(`${package.location.city}, ${package.location.country}`);
    $("#location").parent().removeClass("placeholder");

    // Load the facilities tab
    loadFacilities(package);

    // Load the location tab
    loadLocation(package);
});

/**
 * Load the facilities tab from the given package data
 */
function loadFacilities(package) {
    // Show the wifi available element if wifi is available
    if (package.hotel.facilities.wifi)
        $("#wifi-available").prop("hidden", false);

    // Create a card for each facility card in the package
    for (const card of package.hotel.facilities.cards) {
        // Clone the facilities card template, unhide it and append it to he facilities tab pane
        const cardTemplate = $("#facilities-card-template").clone();
        $(cardTemplate).prop("hidden", false);
        $(cardTemplate).removeAttr("id");
        $("#facilities-tab").append(cardTemplate);

        // Set the facilities card title
        $(cardTemplate).find(".card-header .card-title").text(card.title);

        // For each info section for this card
        for (const info of card.info) {
            // Get the body of the card template
            const cardBody = $(cardTemplate).find(".card-body");

            // If the info contains a title clone a title template and add it to the card body
            if (info.title) {
                const titleTemplate = $("#facilities-card-title-template").clone();
                $(titleTemplate).prop("hidden", false);
                $(cardTemplate).removeAttr("id");
                $(titleTemplate).text(info.title);
                $(cardBody).append(titleTemplate);
            }

            // If the info contains text clone a text template and add it to the card body
            if (info.text) {
                const textTemplate = $("#facilities-card-text-template").clone();
                $(textTemplate).prop("hidden", false);
                $(cardTemplate).removeAttr("id");
                $(textTemplate).text(info.text);
                $(cardBody).append(textTemplate);
            }
        }
    }

    // Set up toggle action for header buttons in facilities cards
    $("#facilities-tab").on("click", "button", function () {
        $(this).closest(".card").find(".card-body").slideToggle();
        $(this).toggleClass("rotate-icon-180");
    });
}

/**
 * Load the location tab from the given package data
 */
function loadLocation(package) {

}
