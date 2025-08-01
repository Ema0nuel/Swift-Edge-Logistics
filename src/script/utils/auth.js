import AdminLogo from '/src/images/avatar-default.png'
const SECRET_KEY = 'SwiftEdge_Admin_2025';

// Admin credentials (in production, this should be in a secure backend)
const ADMIN_CREDENTIALS = {
  email: 'admin@swiftedge.com',
  password: '12345EM@',
  profile: {
    id: 'admin-001',
    full_name: 'SwiftEdge Admin',
    role: 'admin',
    avatar_url: `${AdminLogo}`
  }
};

export const generateToken = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const verifyCredentials = (email, password) => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

export const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    const jsonString = atob(encryptedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

export const setAdminSession = () => {
  const token = generateToken();
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

  const sessionData = {
    token,
    user: ADMIN_CREDENTIALS.profile,
    expiresAt,
  };

  localStorage.setItem('swiftedge_admin_session', encryptData(sessionData));
  return token;
};

export const getAdminSession = () => {
  const encryptedSession = localStorage.getItem('swiftedge_admin_session');
  if (!encryptedSession) return null;

  const session = decryptData(encryptedSession);
  if (!session || Date.now() > session.expiresAt) {
    localStorage.removeItem('swiftedge_admin_session');
    return null;
  }

  return session;
};