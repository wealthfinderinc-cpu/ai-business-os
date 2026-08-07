export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/customers/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/inventory/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};