const publicKey = "UafpwJjcuUvnRA4-m";
const serviceId = "wanderlust";
const templateId = "template_9dhd7zl";

$(function () {
    // Init emailJS
    emailjs.init(publicKey);

    // Respond to contact form submit events
    $("#contact-form").on("submit", onContactFormSubmit);
});

async function onContactFormSubmit(event) {
    // Prevent page reload
    event.preventDefault();

    try {
        // Send email
        await emailjs.sendForm(serviceId, templateId, "#contact-form");

        console.log("Successfully sent email");

        // Show success alert and hide error alert
        $(".alert-success").attr("hidden", false);
        $(".alert-danger").attr("hidden", true);
    } catch (error) {
        console.log("Failed to send email", error);

        // Show error alert and hide success alert
        $(".alert-success").attr("hidden", true);
        $(".alert-danger").attr("hidden", false);
    }
}

if (typeof module === "object") {
    module.exports = { onContactFormSubmit };
}
