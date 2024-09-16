import type { NextAuthConfig } from 'next-auth';
import type { Session } from 'next-auth'; 

export const authConfig = {
  pages: {
    signIn: '/login', // Redirect unauthenticated users to the login page
  },
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: Session | null; // Explicitly type the 'auth' parameter
      request: { nextUrl: URL };
    }) {
      // Check if the user is logged in
      const isLoggedIn = !!auth?.user;
      
      // Determine if the user is on the dashboard
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        // Allow access if the user is logged in
        if (isLoggedIn) return true;
        // Redirect to the login page if the user is not authenticated
        return false;
      } else if (isLoggedIn) {
        // Redirect logged-in users to the dashboard if they're not already there
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      // For any other cases, allow access (e.g., to public pages)
      return true;
    },
  },
  providers: [], // Add providers when necessary, currently an empty array
} satisfies NextAuthConfig;
