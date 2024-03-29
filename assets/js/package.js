$(async function () {
    // Download package data
    const packages = await getPackages();

    // Parse the ID url param
    const params = new URLSearchParams(document.location.search);
    const packageId = params.get("id");
    const package = packages.find(p => p.id === Number(packageId));

    // Show error if package not found
    if (!package) {
        console.log("No package found for ID", packageId);
        showErrorModal({ message: "Failed to load holiday package." });
        
        return;
    }

    console.log("Package loaded", package);

    // Remove all loading spinners
    $(".spinner-container").remove();

    // Set the URL for the breadcrumb
    $("#package-list-link").attr("href", "packages.html?id=" + params.get("searchIds"));

    // Set page title and location
    $("#title").text(package.hotel.name);
    $("#title").parent().removeClass("placeholder");
    $("#location").text(`${package.location.city}, ${package.location.country}`);
    $("#location").parent().removeClass("placeholder");

    // Load the hotel blurb
    $("#blurb").text(package.hotel.blurb);

    // Load the holiday price
    $("#price").text(`£${package.price}`);

    // Load the overview tab
    loadOverview(package);

    // Load the facilities tab
    loadFacilities(package);

    // Load the rooms tab
    loadRooms(package);

    // Load the location tab
    await loadLocation(package);
});

/**
 * Load the overview tab from the given package data
 */
function loadOverview(package) {
    $("#image-gallery").prop("hidden", false);

    let selectedImageIndex = 0;

    $("#image-thumbnails").on("click", "img", function () {
        $("#large-image").attr("src", $(this).attr("src"));
        selectedImageIndex = $(this).data("index");
    });

    let i = 0;

    for (const image of package.hotel.images) {
        const thumbnail = $("<img/>");
        thumbnail.attr("src", `assets/images/hotels/${image}`);
        thumbnail.attr("data-index", i++);
        $("#image-thumbnails").append(thumbnail);
    }

    $("#image-thumbnails img")[0].click();

    $(".previous-image-button").on("click", function () {
        let newIndex = selectedImageIndex - 1;
        
        if (newIndex < 0)
            newIndex = i - 1;

        $(`#image-thumbnails img[data-index=${newIndex}]`).trigger("click");
    });

    $(".next-image-button").on("click", function () {
        let newIndex = selectedImageIndex + 1;
        
        if (newIndex >= i)
            newIndex = 0;

        $(`#image-thumbnails img[data-index=${newIndex}]`).trigger("click");
    });

    $(".previous-image-button-secondary").on("click", function () {
        $("#image-thumbnails").scrollLeft({
            scrollLeft: "-=100"
        });
    });

    $(".next-image-button-secondary").on("click", function () {
        $("#image-thumbnails").animate({
            scrollLeft: "+=100"
        });
    });
}

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

function loadRooms(package) {
    for (const room of package.hotel.rooms) {
        const roomTemplate = $("#room-card-template").clone();
        $(roomTemplate).prop("hidden", false);
        $(roomTemplate).removeAttr("id");
        $("#rooms-tab").append(roomTemplate);

        $(roomTemplate).find(".card-header .card-title").text(room.name);

        const sleepsP = $("<p></p>");
        $(sleepsP).text(`Sleeps min: ${room.sleeps.min}, max: ${room.sleeps.max}`);

        $(roomTemplate).append(sleepsP);
    }
}

/**
 * Load the location tab from the given package data
 */
async function loadLocation(package) {
    // Load the required libraries
    const libraryPromises = [
        google.maps.importLibrary("maps"),
        google.maps.importLibrary("marker"),
        google.maps.importLibrary("places")
    ];

    const [{ Map }, { Marker }, { PlacesService, PlacesServiceStatus }] = await Promise.all(libraryPromises);

    // Get the map HTML element
    const mapElement = $("#map");

    // Give the map a height so it is visible
    $(mapElement).css("height", "500px");

    // Construct the map with the HTML element and coordinates
    const map = new Map($(mapElement).get(0), {
        center: { lat: package.location.lat, lng: package.location.lng },
        zoom: 17
    });

    // Construct the places service
    const placesService = new PlacesService(map);

    // Request the hotel through the places service
    const hotelRequest = {
        location: map.getCenter(),
        radius: '500',
        query: package.hotel.name
    };

    placesService.textSearch(hotelRequest, (results, status) => {
        if (status !== PlacesServiceStatus.OK)
            return;

        // Add a marker for the hotel to the map
        new Marker({
            map,
            place: {
                placeId: results[0].place_id,
                location: results[0].geometry.location
            }
        });
    });

    // Restaurant request
    const restaurantRequest = {
        location: map.getCenter(),
        radius: '1000',
        query: 'restaurant'
    };

    placesService.textSearch(restaurantRequest, (results, status) => {
        if (status !== PlacesServiceStatus.OK)
            return;

        console.log("Nearby restaurants", results);

        for (const result of results) {
            const resultElement = $("<div></div>");
            const resultLink = $("<a></a>");
            $(resultLink).attr("href", `https://www.google.com/maps/search/?api=1&query=${result.geometry.location.lat()}%2C${result.geometry.location.lng()}&query_place_id=${result.place_id}`);
            $(resultLink).attr("target", "_blank");
            $(resultLink).text(result.name);
            $(resultLink).appendTo($(resultElement));
            $(resultElement).appendTo("#nearby-restaurants");
        }
    });

    // Restaurant request
    const attractionsRequest = {
        location: map.getCenter(),
        radius: '1000',
        query: 'attraction'
    };

    placesService.textSearch(attractionsRequest, (results, status) => {
        if (status !== PlacesServiceStatus.OK)
            return;

        console.log("Nearby attractions", results);

        for (const result of results) {
            const resultElement = $("<div></div>");
            const resultLink = $("<a></a>");
            $(resultLink).attr("href", `https://www.google.com/maps/search/?api=1&query=${result.geometry.location.lat()}%2C${result.geometry.location.lng()}&query_place_id=${result.place_id}`);
            $(resultLink).attr("target", "_blank");
            $(resultLink).text(result.name);
            $(resultLink).appendTo($(resultElement));
            $(resultElement).appendTo("#nearby-attractions");
        }
    });
}
