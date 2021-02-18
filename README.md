# Dodo Swap
MERN Animal Crossing New Horizons Catalogue Party App
- demo account: wilbur@dodo.com (wilburtest)

## About
Dodo Swap is a community platform to connect members for the purpose of organizing cataloguing parties in Animal Crossing New Horizons created by [Sharon Lee](https://github.com/essleeung) and [Royce Ubando](https://github.com/royce-u). For the uninitiated, collecting all items in a series can be tricky and arduous task. With a catalogue party, one can invite other members to their island and collectively catalogue (pick up and drop items, so they can be ordered later in Nook's Cranny). The application is deployed [here](http://dodo-swap.herokuapp.com/).

#### Technologies
This app was built with Typescript, MongoDB, Express, React and Node and utilizes JSON web tokens to authenticate users. Styling was done using React Semantic UI. The server side is deployed [here](http://dodoswap-server3.herokuapp.com/).

---

## Development Approach

#### User Profile
As avid ACNH enthusiasts, we designed the the app with ourselves in mind and delved into the functionalities we hoped to see for an efficient and friendly user experience. Key features we were looking for: 

- Ability to see all items in the ACNH universe. *We specifically filtered out items that could not be catalogued to minimize confusion for users (Saharah, DIY crafting and Mom items).*
- Add items to your wishlist and inventory, so other members have an idea what to bring to your island.
- Create events on your island, limiting the number of visitors and providing additional information about entry criteria if members desire.
- Ability to see all events and join the ones you are interested in. 
- Ability to restrict visitors from joining if maximum visitors have been reached.

#### Design Approach
For the planning of this app, we relied on whiteboarding of the data schema, wireframing through Balsmiq and tracking features through Trello on a kanban board. This allowed us to test out user flow ahead of time and implement a site that is easy to navigate and use. The data schema was also designed for scalability and future features in mind.

**Image 1. Wireframe of site**

![Wireframe](screenshots/wireframe.png)

**Image 2. Initial data schema**

![Data model](https://raw.githubusercontent.com/essleeung/dodo-swap/master/screenshots/Data%20Model.png)

**Image 3. User profile**

![User Profile](screenshots/user_profile.png)

**Image 4. Add event**
![Add Events](screenshots/add_event.png)

#### Routes
Server side
| Method | Path | Purpose |
|--------|------|---------|
| POST | /auth/login | User authentication and login |
| POST | /auth/signup | User account creation |
| GET | /catalogue| Returns all items in ACNH catalogue |
| GET | /catalogue/:id| Returns a single item from the catalogue. *Front end page coming soon.* |
| GET | /user| Returns user profile |
| GET | /user/events| Returns user's registered events |
| GET | /user/inventory | Returns items in user's inventory |
| GET | /user/wishlist | Returns items in user's wishlist |
| GET | /user/edit | Returns user details to be editted and pre-populated |
| PUT | /user | Edits user details including events and profile info |
| PUT | /user/wishlist | Edits user's wishlist |
| PUT | /user/inventory | Edits user's inventory |
| GET | /user/:id | Get a specific user's details. *Front end page coming soon.* |
| GET | /event | Returns all events created |
| GET | /event/:id | Returns a specifc event, host and attendee details. |
| POST | /event | Creates a new event. |
| PUT | /event  | Updates event details when participants join or information is editted. | 
| GET | * | Catch all page for server errors. |


Client side
| Path | Purpose |
|------|---------|
|/| home page |
| /user | user landing page - includes events, wishlist and inventory, as well as user profile edit |
| /catalogue | catalogue of all items |
| /event | event index |
| /event/new | add new events form |
| /event/:id | shows specific event details |


#### Future features

- Comment section on events
- Ability to add friends
- Ability to specify items you would like attendees to bring for catalogue parties
- Rating system after each event to encourage respectful visitor etiquette
- Messaging feature


----
## Shoutouts

Special thanks to the [ACNH API](http://acnhapi.com/) team for putting together such great resources. We were able to leverage the [Google sheets](https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit#gid=1672309167) of all the items to seed our database.

We hope you enjoy this app and can gather all the items you are looking for!
![Creators](screenshots/screenshot_creators.jpg)


