# Memory Lane

## App Name:
Memory Lane

## Group 7
## Members
| Name | Surname | Student Number | Role (s) |
| --- | --- | --- | --- |
| Shashin | Gounden | u21458686 | Project Manager/Tester |
| Arno | Jooste | u21457451 | Front-end Developer/Design/UI Engineer |
| Reuben | Jooste | u21457060 | UI Engineer/Integration Tester |
| Armand | Krynauw | u04868286 | API Engineer/Services Engineer/Tester |
| Luca | Loubster | u20439963 | API Engineer/Deployment |
| Mbofho Mamatsharaga | u18045881 | Business Analyst |
| Bandisa | Masilela | u19018182 | API Engineer/Services Engineer |
| Keabetswe | Mothapo | u21543462 | Business Analyst/Data Engineer Helper |
| Andile | Ngwenya | u20612894 | Data Engineer |
| Alistair | Ross | u21489549 | DevOps/Integration Helper |
| Kaitlyn | Sookdhew  | u21483974 | Tester/Integration Helper |
| Christof | Steyn | u17021074 | Devops/Deployment |
| Tyrone | Sutherland-Macleod | u21578878 | Design/Tester |

The following items are required to run this project:

- Node 16: Used for the app, api and cli (Tip: use NVM)
- Java: used by the Firebase emulators (Make sure that JAVA_HOME is set. Tip: use JENV)
- You need to create a firebase project (See: https://console.firebase.google.com - You will need to config for your firebase project in the .env files, .firestorerc)
- Firebase CLI (See: https://firebase.google.com/docs/cli)

## Get Started

1. Fork the repo

Go to: https://github.com/COS-301/miniproject-2023/fork

2. Clone your fork

```sh
git clone git@github.com:<ACCOUNT>/<PROJECT NAME>.git <PROJECT LOCAL NAME>
```

3. Install dependencies

```sh
cd path/to/project
yarn
```

4. Add Firebase configurations

See files:

- .firebaserc
- .env
- .env.pod

and find and replace "<REPLACE_ME>"

5. Run the stack:

Run these commands in separate terminals:

```sh
yarn start:api:dev
yarn start:emulators
yarn start:app:dev
```

6. CLI:

If you want to run the cli for admin, scripts, migrations etc.

```sh
yarn build:cli:prod
GOOGLE_APPLICATION_CREDENTIALS=.keys/<REPLACE ME WITH SERVICE ACCOUNT KEY.json> FIRESTORE_EMULATOR_HOST=localhost:5003 node dist/apps/cli/main.js <REPLACE ME WITH COMMAND>
```

## Emulators:

Once the emulators are up, please go to http://localhost:5001 to see the Emulator UI

## Notes!!:

- When creating your Firebase authentication, hosting, storage, functions. Make sure to use the same location throughout. (MAKE SURE TO SET "Default GCP resource location" in Project Settings in Firebase Console. If you do not do this, the app will not work)
- The app is built to be a PWA. (See: So if you deploy it to prod, you can install the app on iOS by adding to home screen or using Android by installing through Chrome)
