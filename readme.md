# GymPass-style App

This document outlines the functional requirements, business rules, and non-functional requirements for a GymPass-style application, which aims to connect users with nearby gyms and facilitate check-ins.

## Functional Requirements (RFs)

- Users must be able to register.
- Users must be able to authenticate.
- Users should be able to obtain the profile of a logged-in user.
- Users should be able to obtain the number of check-ins they have made.
- Users should be able to view their check-in history.
- Users must be able to search for nearby gyms (up to 10km).
- Users must be able to search for gyms by name.
- Users must be able to check into a gym.
- User check-ins must be verifiable.
- Gyms must be registerable.

## Business Rules (RNs)

- Users cannot register with a duplicate email.
- Users cannot check in more than once on the same day.
- Users cannot check in if they are not within 100m of the gym.
- Check-ins must be validated within 20 minutes of being created.
- Only administrators can validate check-ins.
- Only administrators can register a gym.

## Non-Functional Requirements (RNFs)

- User passwords must be encrypted.
- Application data must be persisted in a PostgreSQL database.
- All lists of data must be paginated, with 20 items per page.
- Users must be identified by a JWT (JSON Web Token).

---