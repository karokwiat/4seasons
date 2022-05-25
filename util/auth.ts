import axios from "axios";
import { API_KEY } from "../env/Firebase";

const api_key: string = API_KEY;

async function authenticate(mode: string, email: string, password: string) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${api_key}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const userName = response.data.email
    .replace(/[\W_]+/g, " ")
    .replace(/\s/g, "");

  const userData = {
    token: response.data.idToken,
    userName: userName,
  };

  return userData;
}

export function createUser(email: string, password: string) {
  return authenticate("signUp", email, password);
}

export function login(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}
