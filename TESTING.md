# Testing

## Table of Contents

- [Automated testing](#automated-testing)
- [Manual testing](#manual-testing)
  - [Home](#home)
  - [Package List](#package-list)
  - [Package Details](#package-details)
  - [Contact Us](#contact-us)

## Automated testing

The project makes use of automated testing by using Jest. Run `npm test` to run the tests.

Test run results:

![Test Run Results](documentation/images/jest-results.JPG)

## Manual testing

### Home

#### Form requires all values to be entered to submit

<details>
<summary>From required</summary>

![From required](documentation/testing/home/form-requires-all-values-to-be-entered-to-submit/from-required.JPG)

</details>

<details>
<summary>To required</summary>

![To required](documentation/testing/home/form-requires-all-values-to-be-entered-to-submit/to-required.JPG)

</details>

<details>
<summary>Leaving required</summary>

![Leaving required](documentation/testing/home/form-requires-all-values-to-be-entered-to-submit/leaving-required.JPG)

</details>

<details>
<summary>Nights required</summary>

![Nights required](documentation/testing/home/form-requires-all-values-to-be-entered-to-submit/nights-required.JPG)

</details>

<details>
<summary>Guests required</summary>

![Guests required](documentation/testing/home/form-requires-all-values-to-be-entered-to-submit/guests-required.JPG)

</details>

#### Leaving date can't be in the past

<details>
<summary>Leaving date can't be in the past (test performed on 09/02/2024)</summary>

![Leaving date can't be in the past](documentation/testing/home/leaving-date-cant-be-in-the-past/leaving-cant-be-in-the-past.JPG)

</details>

#### From input only accepts valid values

<details>
<summary>Before (invalid value entered)</summary>

![Before](documentation/testing/home/from-input-only-accepts-valid-values/before.jpg)

</details>

<details>
<summary>After (from input has lost focus)</summary>

![After](documentation/testing/home/from-input-only-accepts-valid-values/after.jpg)

</details>

#### To input only accepts valid values

<details>
<summary>Before (invalid value entered)</summary>

![Before](documentation/testing/home/to-input-only-accepts-valid-values/before.jpg)

</details>

<details>
<summary>After (to input has lost focus)</summary>

![After](documentation/testing/home/to-input-only-accepts-valid-values/after.jpg)

</details>

#### Nights input must be greater than or equal to 1

<details>
<summary>Nights input must be greater than or equal to 1</summary>

![Nights input must be greater than or equal to 1](documentation/testing/home/nights-input-must-be-greater-than-or-equal-to-1/nights-input-must-be-greater-than-or-equal-to-1.JPG)

</details>

#### Guests input must be greater than or equal to 1

<details>
<summary>Guests input must be greater than or equal to 1</summary>

![Guests input must be greater than or equal to 1](documentation/testing/home/guests-input-must-be-greater-than-or-equal-to-1/guests-input-must-be-greater-than-or-equal-to-1.JPG)

</details>

#### London popular destinations link works

<details>
<summary>Before (invalid value entered)</summary>

![Before](documentation/testing/home/london-popular-destinations-link-works/before.jpg)

</details>

<details>
<summary>After (to input has lost focus)</summary>

![After](documentation/testing/home/london-popular-destinations-link-works/after.jpg)

</details>

#### Malaga popular destinations link works

#### Paris popular destinations link works

#### Orlando popular destinations link works

#### Rio de Janeiro popular destinations link works

#### Tokyo popular destinations link works

#### Home Contact Us link works

#### Home Content Attribution modal works

<br>

[↑ Back to top](#testing)

### Package List

#### Search results are sorted by price low to high by default

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-list/search-results-are-sorted-by-price-low-to-high-by-default/evidence.jpg)

</details>

#### Search results can be sorted by price high to low

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-list/search-results-can-be-sorted-by-price-high-to-low/evidence.jpg)

</details>

#### Image gallery scrolling works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-list/image-gallery-scrolling-works/before.jpg)

</details>

<details>
<summary>After (left button clicked)</summary>

![After (left button clicked)](documentation/testing/package-list/image-gallery-scrolling-works/after-left.jpg)

</details>

<details>
<summary>After (right button clicked)</summary>

![After (right button clicked)](documentation/testing/package-list/image-gallery-scrolling-works/after-right.jpg)

</details>

#### Holiday data is loaded correctly

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-list/holiday-data-is-loaded-correctly/evidence.jpg)

</details>

Defect: The number of rooms is not correctly loaded based on the number of guests stated in the search form.

Defect: The number of nights and the leaving date of the holiday is not correctly loaded.

This functionality has not been implemented yet due to time constraints.

#### Hotel data is loaded correctly

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-list/hotel-data-is-loaded-correctly/evidence.jpg)

</details>

#### Flights data is loaded correctly

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-list/flights-data-is-loaded-correctly/evidence.jpg)

</details>

#### Price data is loaded correctly

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-list/price-data-is-loaded-correctly/evidence.jpg)

</details>

#### More info link works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-list/more-info-link-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-list/more-info-link-works/after.jpg)

</details>

#### Package List Contact Us link works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-list/package-list-contact-us-link-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-list/package-list-contact-us-link-works/after.jpg)

</details>

#### Package List Content Attribution modal works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-list/package-list-content-attribution-modal-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-list/package-list-content-attribution-modal-works/after.jpg)

</details>

#### Package List Breadcrumb link to home page works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-list/package-list-breadcrumb-link-to-home-page-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-list/package-list-breadcrumb-link-to-home-page-works/after.jpg)

</details>

<br>

[↑ Back to top](#testing)

### Package Details

#### Image gallery works on small screens

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/image-gallery-works-on-small-screens/before.jpg)

</details>

<details>
<summary>After (left button clicked)</summary>

![After (left button clicked)](documentation/testing/package-details/image-gallery-works-on-small-screens/after-left.jpg)

</details>

<details>
<summary>After (right button clicked)</summary>

![After (right button clicked)](documentation/testing/package-details/image-gallery-works-on-small-screens/after-right.jpg)

</details>

#### Image gallery works on medium screens

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/image-gallery-works-on-medium-screens/before.jpg)

</details>

<details>
<summary>After (thumbnail clicked)</summary>

![After (thumbnail clicked)](documentation/testing/package-details/image-gallery-works-on-medium-screens/after-thumbnail-click.jpg)

</details>

<details>
<summary>After (scroll right button clicked)</summary>

![After (scroll right button clicked)](documentation/testing/package-details/image-gallery-works-on-medium-screens/after-scroll-right.jpg)

</details>

<details>
<summary>After (scroll left button clicked)</summary>

![After (scroll left button clicked)](documentation/testing/package-details/image-gallery-works-on-medium-screens/after-scroll-left.jpg)

Defect: The thumbnails do not scroll to the left by 100px as designed. Instead the thumbnails jump to the scroll position of zero.

</details>

#### Image gallery works on large screens

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/image-gallery-works-on-large-screens/before.jpg)

</details>

<details>
<summary>After (thumbnail clicked)</summary>

![After (thumbnail clicked)](documentation/testing/package-details/image-gallery-works-on-large-screens/after-thumbnail-click.jpg)

</details>

#### Book now link works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/book-now-link-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-details/book-now-link-works/after.jpg)

</details>

#### Hotel name, location, blurb and price are loaded correctly

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-details/hotel-name-location-blurb-and-price-are-loaded-correctly/evidence.jpg)

</details>

#### Facilities data is loaded correctly

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-details/facilities-data-is-loaded-correctly/evidence.jpg)

</details>

#### Rooms data is loaded correctly

<details>
<summary>Evidence</summary>

![Evidence](documentation/testing/package-details/rooms-data-is-loaded-correctly/evidence.jpg)

</details>

#### Location data is loaded correctly

<details>
<summary>Location</summary>

![Evidence](documentation/testing/package-details/location-data-is-loaded-correctly/evidence.jpg)

</details>

#### Package Details Contact Us link works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/package-details-contact-us-link-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-details/package-details-contact-us-link-works/after.jpg)

</details>

#### Package Details Content Attribution modal works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/package-details-content-attribution-modal-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-details/package-details-content-attribution-modal-works/after.jpg)

</details>

#### Nearby restaurants links work

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/nearby-restaurants-links-work/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-details/nearby-restaurants-links-work/after.jpg)

</details>

#### Nearby attractions links work

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/nearby-attractions-links-work/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-details/nearby-attractions-links-work/after.jpg)

</details>

#### Package Details Breadcrumb link to home page works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/package-details-breadcrumb-link-to-home-page-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-details/package-details-breadcrumb-link-to-home-page-works/after.jpg)

</details>

#### Package Details Breadcrumb link to package list page works

<details>
<summary>Before</summary>

![Before](documentation/testing/package-details/package-details-breadcrumb-link-to-package-list-page-works/before.jpg)

</details>

<details>
<summary>After</summary>

![After](documentation/testing/package-details/package-details-breadcrumb-link-to-package-list-page-works/after.jpg)

</details>

<br>

[↑ Back to top](#testing)

### Contact Us

#### Name input is required

#### Email input is required

#### Email input requires valid email input

#### Message input is required

#### Contact Us Content Attribution modal works

#### Contact Us Breadcrumb link to home page works

#### Email message successfully sends
