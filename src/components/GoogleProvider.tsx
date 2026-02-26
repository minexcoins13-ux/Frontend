"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
    // Hardcoding the client ID directly to avoid Next.js .env loading issues on the client
    const clientId = "578386307045-ti35g9n4mnhcr20ak4hh257567efqduq.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
}
