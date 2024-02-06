$(async function () {
    // Download package data
    const packages = await getPackages();

    // Hide the loading spinner once packages are loaded
    $(".spinner-container").removeClass("d-flex").addClass("d-none");

    // Parse the ID url param
    const params = new URLSearchParams(document.location.search);
    const searchIds = params.get("id")?.split(',')?.map(Number) ?? [];

    console.log("ID param", searchIds);

    // Filter packages into ones included in the search parameters
    const results = searchIds
        ? packages.filter(p => searchIds.includes(p.id))
        : [];

    console.log("Results packages", results);

    // Unhide the no-results-content and do nothing more if there are no results
    if (results.length === 0) {
        $("#no-results-content").attr("hidden", false);
        return;
    }

    // If there are results, clone a template for each one
    for (const result of results) {
        const templateClone = clonePackageTemplate(result);
        setMoreInfoButtonLink(templateClone, result.id, params.get("id"));
    }

    // Show results
    $("#results").attr("hidden", false);
});

/**
 * Clone the package template and populate it with data from the given package
 * @param {*} package The package data with which to populate the elements
 * @returns A cloned package template
 */
function clonePackageTemplate(package) {
    const template = $("#search-result-template").clone();
    template.removeAttr("id hidden");
    $("#results").append(template);

    // Setup title
    template.find(".search-result-title").text(package.hotel.name);

    // Setup location link
    template.find(".location-link").attr("href", `https://www.google.com/maps/search/?api=1&query=${package.location.lat}%2C${package.location.lng}&query_place_id=${package.location.placeId}`);
    template.find(".location-link").append(`<span>${package.location.city}, ${package.location.country}</span>`);

    // Setup image gallery
    template.find(".gallery").attr("src", `assets/images/hotels/${package.hotel.images[0]}`);
    template.find(".gallery").data("selected-index", 0);

    template.find(".previous-image-button").on("click", function () {
        const selectedIndex = template.find(".gallery").data("selected-index");
        const newIndex = selectedIndex - 1 < 0 ? package.hotel.images.length - 1 : selectedIndex - 1;
        template.find(".gallery").attr("src", `assets/images/hotels/${package.hotel.images[newIndex]}`);
        template.find(".gallery").data("selected-index", newIndex);
    });

    template.find(".next-image-button").on("click", function () {
        const selectedIndex = template.find(".gallery").data("selected-index");
        const newIndex = selectedIndex + 1 >= package.hotel.images.length ? 0 : selectedIndex + 1;
        template.find(".gallery").attr("src", `assets/images/hotels/${package.hotel.images[newIndex]}`);
        template.find(".gallery").data("selected-index", newIndex);
    });

    // Setup tabs
    const [holidayTab, hotelTab, flightsTab] = template.find(".nav-tabs .nav-link");
    const [holidayTabPane, hotelTabPane, flightsTabPane] = template.find(".tab-pane");

    const holidayTabId = `package-${package.id}-holiday-tab`;
    const hotelTabId = `package-${package.id}-hotel-tab`;
    const flightsTabId = `package-${package.id}-flights-tab`;

    $(holidayTab).attr("data-bs-target", `#${holidayTabId}`);
    $(hotelTab).attr("data-bs-target", `#${hotelTabId}`);
    $(flightsTab).attr("data-bs-target", `#${flightsTabId}`);

    $(holidayTabPane).attr("id", holidayTabId);
    $(hotelTabPane).attr("id", hotelTabId);
    $(flightsTabPane).attr("id", flightsTabId);

    // Setup holiday tab pane
    template.find(".bag-allowance").text(package.bagAllowance);
    template.find(".hand-bag-allowance").text(package.handBagAllowance);

    template.find(".atol-protected").attr("hidden", !package.atolProtected);

    // Setup hotel tab pane
    for (const feature of package.hotel.features)
        $(hotelTabPane).append(`<span>${feature}</span><br>`);

    // Setup flights tab pane
    const timeOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    template.find(".departing-flight-departure-airport").text(package.flights.departing.departure.airport);
    template.find(".departing-flight-arrival-airport").text(package.flights.departing.arrival.airport);
    template.find(".departing-flight-departure-time").text(new Date(package.flights.departing.departure.time).toLocaleDateString("en-GB", timeOptions));
    template.find(".departing-flight-arrival-time").text(new Date(package.flights.departing.arrival.time).toLocaleDateString("en-GB", timeOptions));

    template.find(".returning-flight-departure-airport").text(package.flights.returning.departure.airport);
    template.find(".returning-flight-arrival-airport").text(package.flights.returning.arrival.airport);
    template.find(".returning-flight-departure-time").text(new Date(package.flights.returning.departure.time).toLocaleDateString("en-GB", timeOptions));
    template.find(".returning-flight-arrival-time").text(new Date(package.flights.returning.arrival.time).toLocaleDateString("en-GB", timeOptions));

    // Set the price
    template.find(".price").text(package.price);

    return template;
}

/**
 * Set the href of the "more info" link button in a cloned package template element
 * @param {*} packageTemplateClone The cloned package template element
 * @param {number} packageId The ID of the package that this cloned template represents
 * @param {number[]} searchIds IDs that were provided to this page as search results
 */
function setMoreInfoButtonLink(packageTemplateClone, packageId, searchIds) {
    const href = `package.html?id=${packageId}&searchIds=${searchIds}`;
    $(packageTemplateClone).find(".more-info-button").attr("href", href);
}
