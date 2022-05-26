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

  console.log(response.data);

  const userName = response.data.email
    .replace(/[\W_]+/g, " ")
    .replace(/\s/g, "");

  const userData = {
    token: response.data.idToken,
    userName: userName,
    refreshToken: response.data.refreshToken,
  };

  return userData;
}

async function reauthenticate(userData: {
  token: string;
  userName: string;
  refreshToken: string;
}) {
  const url = `https://securetoken.googleapis.com/v1/token?key=${api_key}`;

  const response = await axios.post(
    url,
    `grant_type=refresh_token&refresh_token=${userData.refreshToken}`
  );

  console.log(response.data);

  userData = {
    token: response.data.idToken,
    userName: userData.userName,
    refreshToken: response.data.refreshToken,
  };

  return userData;
}

export function createUser(email: string, password: string) {
  return authenticate("signUp", email, password);
}

export function login(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}

export function refreshToken(userData: {
  token: string;
  userName: string;
  refreshToken: string;
}) {
  return reauthenticate(userData);
}
