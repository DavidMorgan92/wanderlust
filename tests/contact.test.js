/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const { onContactFormSubmit } = require("../assets/js/contact");

beforeEach(() => {
    const contents = fs.readFileSync("contact.html", "utf-8");
    document.open();
    document.write(contents);
    document.close();
});

describe("Contact form submit", () => {
    let event;

    beforeEach(() => {
        global.emailjs = {
            init: jest.fn(),
            sendForm: jest.fn(() => Promise.resolve())
        };

        event = {
            preventDefault: jest.fn()
        };
    });

    it("Prevents default form action", async () => {
        await onContactFormSubmit(event);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it("Invokes emailjs.submit once with correct parameters", async () => {
        await onContactFormSubmit(event);
        expect(global.emailjs.sendForm).toHaveBeenCalledTimes(1);
        expect(global.emailjs.sendForm).toHaveBeenCalledWith("wanderlust", "template_9dhd7zl", "#contact-form");
    });

    it("Shows success alert on success", async () => {
        await onContactFormSubmit(event);
        expect($(".alert-success").attr("hidden")).toBe(undefined);
    });

    it("Shows danger alert on failure", async () => {
        global.emailjs.sendForm = jest.fn(() => Promise.reject());

        await onContactFormSubmit(event);
        expect($(".alert-danger").attr("hidden")).toBe(undefined);
    });
});
