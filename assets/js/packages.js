$(async function () {
    // Download package data
    const packages = await getPackages();

    // Hide the loading spinner once packages are loaded
    $("#spinner-container").removeClass("d-flex").addClass("d-none");

    // Parse the ID url param
    const params = new URLSearchParams(document.location.search);
    const searchIds = params.get("id").split(',').map(Number);

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
    for (const result of results)
        clonePackageTemplate(result);

    // Show results
    $("#results").attr("hidden", false);
});

function clonePackageTemplate(package) {
    const template = $("#search-result-template").clone();
    template.removeAttr("id hidden");
    $("#results").append(template);

    template.find(".search-result-title").text(package.hotel.name)

    const holidayTabId = `package-${package.id}-holiday-tab`;
    const hotelTabId = `package-${package.id}-hotel-tab`;
    const flightsTabId = `package-${package.id}-flights-tab`;

    const tabPanes = template.find(".tab-pane");
    $(tabPanes[0]).attr("id", holidayTabId);
    $(tabPanes[1]).attr("id", hotelTabId);
    $(tabPanes[2]).attr("id", flightsTabId);

    const tabs = template.find(".nav-tabs .nav-link");
    $(tabs[0]).attr("data-bs-target", `#${holidayTabId}`);
    $(tabs[1]).attr("data-bs-target", `#${hotelTabId}`);
    $(tabs[2]).attr("data-bs-target", `#${flightsTabId}`);

    for (const feature of package.hotel.features)
        $(tabPanes[1]).append(`<span>${feature}</span><br>`);
}
