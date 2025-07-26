import { getAdminSession } from "../../../utils/auth.js";

export const checkAuthSession = () => {
  const session = getAdminSession();
  
  if (!session || !session.user || session.user.role !== 'admin') {
    localStorage.removeItem('swiftedge_admin_session');
    window.location.href = '/admin-login';
    return null;
  }

  return session;
};

export const logout = () => {
  localStorage.removeItem('swiftedge_admin_session');
  window.location.href = '/admin-login';
};