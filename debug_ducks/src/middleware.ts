import {NextRequest, NextResponse } from "next/server";
const middleware = (request: NextRequest) => {
    const {pathname} = request.nextUrl;

    console.log('Restricted route hit: ${pathname}');
    console.log("Can't go here!");
    return NextResponse.redirect(new URL("/", request.url));

}

export const config = {
    matcher: [
        "/create-item",
        "/show-item/:path*",
        "/update-item/:path*"
    ]
};

export default middleware;