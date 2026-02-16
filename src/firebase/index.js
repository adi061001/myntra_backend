import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

// read service account
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./firebaseServiceKey.json", import.meta.url))
);

// initialize firebase admin
initializeApp({
  credential: cert(serviceAccount),
});

// export auth instance
export const auth = getAuth();
