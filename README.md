# Wanderlust

## Table of Contents

- [UX](#ux)
  - [Strategy](#strategy)
    - [Business Goals](#business-goals)
    - [User Goals](#user-goals)
    - [User Demographic](#user-demographic)
    - [Competitor Research](#competitor-research)
    - [Prioritization Grid](#prioritization-grid)
  - [Scope](#scope)
  - [Structure](#structure)
  - [Skeleton](#skeleton)
  - [Surface](#surface)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Deployment](#deployment)

## UX

### Strategy

#### Business Goals

The purpose of the business, Wanderlust, is to provide customers with package holidays.

1. To advertise their package holiday products.
2. To allow customers to purchase them.

#### User Goals

1. To find a package holiday offered by Wanderlust.
2. To purchase a package holiday through the website.

#### User Demographic

The target users of this website are new or existing customers who enjoy travel and are looking for a destination for their next trip.

- Roles:
  - New users
  - Current users
- Demographic:
  - Age 20 - 40
  - UK residents
  - Affluent
- Pyschographic:
  - Adventurous

#### Competitor Research

The following competitor websites will be researched to consider their design choices when offering package holidays:

- Expedia
- TUI
- Jet2Holidays

##### Expedia

Expedia's design, under the "Packages" tab, features a prominent form at the top of the website that requires the user's desired departure and arrival destinations, leaving and returning dates, and number of rooms/guests. A prominent "Search" button initiates the search.

Below this is a list of popular holiday destinations that the user can tap to search holidays with one gesture.

The results are shown as a paged list of cards with a photo, title, rating and price.

Tapping on a result takes the user to a page where they can see more details about the hotel, including local amenities, attractions, and a Google Maps view of the area. From here they can choose a room and go on to book and pay.

##### TUI

TUI's design begins on a selected "Package Holidays" tab. Under this is a prominent form that require's the user's desired departure and arrival destinations, leaving date, desired nights and number of rooms/guests. A prominent "Search" button initiates the search.

Below this is a list of deals based on location, holiday type, or dates. Users can search a list of packages matching these criteria with one gesture.

The results are shown as a list of cards with a photo, title, link to reviews, price, and more details about the hotel and flights.

Tapping on a result takes the user to a page where they can see more details about the hotel, including amenities, attractions, and a Google Maps view of the area. From here they can choose the customize certain details, then go on to book and pay.

##### Jet2Holidays

Jet2Holidays's design features a prominent form at the top of the website that requires the user's desired departure and arrival destinations, leaving date, desired nights and number of rooms/guests. A prominent "Find my holiday" button initiates the search.

Below this is a list of popular holiday destinations that the user can tap to search holidays with one gesture.

The results are shown as a paged list of cards with a photo, title, rating, price and more details about the hotel and flights.

Tapping on a result takes the user to a page where they can see more details about the hotel, including local amenities, attractions, and a Google Maps view of the area. From here they can choose to go on to book and pay.

##### Competitor Research Evaluation

It is clear from looking at competitors' websites that they have a very similar design. This leads me to believe that by trial and error the have converged on a similar design, and that this is what users will expect when they are trying various websites to choose a holiday. Therefore it would be wise to imitate this design.

#### Prioritization Grid

<details open>
<summary><em>Click to expand grid image</em></summary>

![Prioritization grid](/documentation/images/prioritization-grid.png)

</details>

<br>

| Number | Opportunity/Problem                                                                   | Importance | Viability/Feasibility |
| ------ | ------------------------------------------------------------------------------------- | ---------- | --------------------- |
| 1      | Allow user to choose from one of a set of travel packages                             | 10         | 10                    |
| 2      | Provide a user interface that is similar to what is provided by competitors' websites | 8          | 10                    |
| 3      | Provide a user interface which is a display of a 3D spinning globe with city markers  | 4          | 4                     |
| 4      | Provide registration and login functions                                              | 6          | 2                     |
| 5      | Allow purchasing through the website                                                  | 8          | 4                     |
|        |                                                                                       | **36**     | **30**                |

##### 1. Allow user to choose from one of a set of travel packages

This problem has maximum importance because it is vital to fulfilling the users' and business's goals established above. It is highly feasible because at its most basic it is simply a matter of presenting fixed data.

##### 2. Provide a user interface that is similar to what is provided by competitors' websites

This problem has high importance because it has been established that our competitors' all have a similar user interface, and therefore users will be expecting this from other websites. There is an option to go with a radically different user interface, so this has been given high but not maximum importance. Feasibility is high because it will be relatively simple to implement thanks to UI frameworks like Bootstrap.

##### 3. Provide a user interface which is a display of a 3D spinning globe with city markers

This problem has a low importance because it will be a radical departure from a standard UI which may throw off a casual user. However, it could also be an interesting feature that will hook a new user. It's feasibility is low because it will require complicated CSS and/or JS to implement, and may have performance implications especially on mobile devices.

##### 4. Provide registration and login functions

This problem has been given medium importance because it is important, though not vital, to fulfill business goal #2 and user goal #2. The ability to have a user account associated with a website through which purchases are made is important to allow a user to track their purchases. Its feasibility is low because it will require careful security considerations, and perhaps an SSL certificate and a database back end.

##### 5. Allow purchasing through the website

This problem has been given high importance because it is vital to fulfil business goal #2 and user goal #2. It has been given low feasibility because it will require careful security considerations, and probably an SSL certificate.

##### Priority Evaluation

It is recommended that the first release should focus on delivering a minimum viable product (MVP) which aims to fulfil business goal #1 and user goal #1, with a view to fulfilling business goal #2 and user goal #2 in a later release. This is due to their need for careful consideration of their security implications. Therefore problems #4 and #5 will be relegated to future releases.

Problems #1 and #2 are vital to fulfilling business goal #1 and user goal #1 and have high feasibility so these will be the focus of the first release.

Problem #3 refers to a radically different UI from our competitors. It is recommended that this be implemented as an optional UI that can be toggle on or off in place of a traditional UI. This will be the lowest priority goal of the MVP, and will only be implemented after problems #1 and #2 have been satisfactorily solved, and with time permitting.

[↑ Back to top](#wanderlust)

### Scope

[↑ Back to top](#wanderlust)

### Structure

[↑ Back to top](#wanderlust)

### Skeleton

[↑ Back to top](#wanderlust)

### Surface

[↑ Back to top](#wanderlust)

#### Features

1. Connect to an API.
2. Display information about different cities that are potential holiday destinations.
3. Allow users to select/search a city and see a map with relevant attractions, accommodations and restaurants.
4. Provide results in a manner that is visually appealing and user friendly.

## Technologies Used

## Testing

## Deployment
