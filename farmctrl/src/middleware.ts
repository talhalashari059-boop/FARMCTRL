
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        if (path.startsWith("/owner") && token?.role !== "OWNER") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        if (path.startsWith("/management") && token?.role !== "MANAGEMENT" && token?.role !== "OWNER") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        if (path.startsWith("/labour") && token?.role !== "LABOUR") {
            return NextResponse.redirect(new URL("/", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    }
)

export const config = {
    matcher: ["/owner/:path*", "/management/:path*", "/labour/:path*"],
}
