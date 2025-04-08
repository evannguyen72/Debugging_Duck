import { NextRequest, NextResponse } from "next/server";


const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;

console.log('Restricted route hit: $(pathname)');
console.log("Can't go back here!");
    return NextResponse.redirect(new URL("/", request.url));

}

export const config = {
    matcher: [
        "/create-item",
        "/update-item/:path*"
    ] 
};

export default middleware;

