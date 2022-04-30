/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("%c Service worker has been registered.", "color: blue;");
    },
    cached() {
      console.log(
        "%c Content has been cached for offline use.",
        "color: green;"
      );
    },
    updatefound() {
      console.log("%c New content is downloading.", "color: lightblue;");
    },
    updated() {
      console.log(
        "%c New content is available; please refresh.",
        "color: pink;"
      );
    },
    offline() {
      console.log(
        "%c No internet connection found. App is running in offline mode.",
        "color: teal; background: white;"
      );
    },
    error(error) {
      console.error(
        "%c Error during service worker registration: " + error,
        "color: red;"
      );
    },
  });
}
