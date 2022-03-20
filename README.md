# Rader V3T (Vue - Vuetify - Vite - TypeScript) Template

## Front End Requirements

* [Node.js](https://nodejs.org/en/).


## Frontend development

* Enter the project directory, install the NPM packages and start the live server using the `npm` scripts:

```bash
cd /project/path/
npm i
```
## Firebase Authentication

* [Firebase Authentication](https://firebase.google.com/docs/auth/web/manage-users)

* Set local environment variables for firebase config in `.env` file in the root directory of the project:

```bash
FIREBASE_APIKEY=some-api-key
FIREBASE_AUTH_DOMAIN=some-auth-domain
FIREBASE_PROJECTID=some-project-id
FIREBASE_STORAGE_BUCKET=some-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=some-sender-id
FIREBASE_APPID=some-app-id
```

* Once variables are set, run the following command to start the server:

```bash
npm run dev
```

Then open your browser at http://localhost:3000/
