export { default } from "next-auth/middleware"

export const config = { matcher: ["/testbar", "/user/:path*"] }