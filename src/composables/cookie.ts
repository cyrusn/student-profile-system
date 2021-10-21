import Cookies from "universal-cookie";

const cookies = new Cookies();

export const useCookies = (): Cookies => {
  return cookies;
};
