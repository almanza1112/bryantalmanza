import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAZcr-xc8fft4MZze4mq43K-5G40rdHg1s",
  authDomain: "bryantalmanza-portfolio.firebaseapp.com",
  projectId: "bryantalmanza-portfolio",
  storageBucket: "bryantalmanza-portfolio.firebasestorage.app",
  messagingSenderId: "368350908256",
  appId: "1:368350908256:web:9fa13c404a325b5ee4d805",
  measurementId: "G-NH4CJCZNWG",
};

let analytics = null;

// Keep development sessions and jsdom tests out of production analytics.
if (process.env.NODE_ENV === "production") {
  try {
    isSupported()
      .then((supported) => {
        if (!supported) return;

        const app = initializeApp(firebaseConfig);
        analytics = getAnalytics(app);
      })
      .catch(() => {
        // Analytics must never affect page behavior.
      });
  } catch {
    // Analytics must never affect page behavior.
  }
}

export function track(eventName, params) {
  if (!analytics) return;

  try {
    logEvent(analytics, eventName, params);
  } catch {
    // Analytics must never affect page behavior.
  }
}
