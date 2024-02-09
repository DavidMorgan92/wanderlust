# Testing

## Table of Contents

- [Automated testing](#automated-testing)
- [Manual testing](#manual-testing)
  - [Home](#home)
  - [Package List](#package-list)
  - [Package Details](#package-details)

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

#### Search results are sorted by price high to low by default

#### Search results can be sorted by high to low

#### Image gallery scrolling works

#### Holiday data is loaded correctly

#### Hotel data is loaded correctly

#### Flights data is loaded correctly

#### Price data is loaded correctly

#### More info link works

#### Package List Contact Us link works

#### Package List Content Attribution modal works

#### Package List Breadcrumb link to home page works

<br>

[↑ Back to top](#testing)

### Package Details

#### Image gallery works on small screens

#### Image gallery works on medium screens

#### Image gallery works on large screens

#### Book now link works

#### Hotel name, location, blurb and price are loaded correctly

#### Facilities data is loaded correctly

#### Rooms data is loaded correctly

#### Location data is loaded correctly

#### Package Details Contact Us link works

#### Package Details Content Attribution modal works

#### Nearby restaurants links work

#### Nearby attractions links works

#### Package Details Breadcrumb link to home page works

#### Package Details Breadcrumb link to package list page works

<br>

[↑ Back to top](#testing)
