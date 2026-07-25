*Draft starter post — replace this note and personalize the details below before publishing.*

WanderStays is a full-stack travel listing platform — think a small-scale Airbnb clone — where users can explore, list, and review unique stays. The features that get demoed are search, filtering, and reviews. The features that actually make an app trustworthy are quieter: authentication, image handling, and validation.

## Authentication that doesn't get in the way

I used Passport.js for JWT-based authentication, with role-based access control so that only the right users can edit or delete a listing. The goal was to make auth feel invisible when it's working — no dead-end redirects, no confusing session drops — while still being strict about who can touch what.

## Images, without owning the storage problem

Every listing needs photos, and self-hosting user-uploaded images is a problem I didn't want to solve from scratch. Cloudinary handled image uploads and storage, which meant I could focus on the parts of the app that were actually specific to WanderStays instead of reinventing file storage.

## Validation as a first-class feature

Joi validation sits in front of the API layer, checking incoming data before it ever reaches MongoDB. It's not a glamorous feature, but it's the difference between an app that degrades gracefully and one that silently fills its database with malformed listings.

## The backend underneath it all

The whole thing runs on Node.js and Express, with Mongoose over MongoDB, and RESTful APIs designed to support concurrent sessions without performance dropping off — including a review and rating system with live updates and category-based search/filtering.

## Try it

WanderStays is live at [wanderstays-flxl.onrender.com](https://wanderstays-flxl.onrender.com/listings) if you want to poke around — feedback and bug reports are always welcome.
