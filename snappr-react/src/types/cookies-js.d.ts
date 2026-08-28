declare module 'cookies-js' {
  interface CookieOptions {
    path?: string;
    domain?: string;
    expires?: number | string | Date;
    secure?: boolean;
  }

  interface Cookies {
    get(key: string): string | undefined;
    set(key: string, value: string, options?: CookieOptions): Cookies;
    expire(key: string, options?: CookieOptions): Cookies;
  }

  const cookies: Cookies;
  export default cookies;
}
