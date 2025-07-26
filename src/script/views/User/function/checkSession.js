import { supabase } from '../../../utils/supabaseClient';

/**
 * Checks if a user is logged in.
 * - On login/signup pages: If logged in, redirect to dashboard.
 * - On protected pages (like dashboard): If not logged in, redirect to login.
 * Pass `redirectIfLoggedIn` as true on login/signup pages.
 * Usage:
 *   // On login/signup:
 *   if (!(await checkSession(true))) return;
 *   // On dashboard/protected:
 *   if (!(await checkSession())) return;
 */
export async function checkSession(redirectIfLoggedIn = false) {
  const { data: { session } } = await supabase.auth.getSession();

  // If user is logged in and we're on login/signup, redirect to dashboard
  if (redirectIfLoggedIn && session && session.user) {
    window.location.href = "/user/dashboard";
    return false;
  }

  // If user is NOT logged in and we're on a protected page, redirect to login
  if (!redirectIfLoggedIn && (!session || !session.user)) {
    window.location.href = "/user/login";
    return false;
  }

  // Fetch user profile if logged in
  if (session && session.user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    if (profileError || !profile) {
      window.location.href = "/user/login";
      return false;
    }
    session.profile = profile;
  }

  return true;
}