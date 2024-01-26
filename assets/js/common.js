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
