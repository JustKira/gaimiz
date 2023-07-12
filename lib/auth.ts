import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { client_auth } from "@/lib/firebase";

export async function signInWithGoogle(callback: () => void) {
  const googleProvider = new GoogleAuthProvider();
  return await signInWithPopup(client_auth, googleProvider).then(() => {
    callback();
  });
}

export async function signOut(callback: () => void) {
  return await client_auth.signOut().then(() => {
    callback();
  });
}
