// Centralized token storage utility
// Supports "Remember me" by switching between localStorage (persistent) and sessionStorage (session-only)

const TOKEN_KEY = 'taskorax_token';
const REFRESH_KEY = 'taskorax_refresh_token';
const STORAGE_TYPE_KEY = 'taskorax_storage_type'; // always in localStorage to remember the choice

/**
 * Get the active storage engine (localStorage or sessionStorage)
 */
const getStorage = () => {
  const type = localStorage.getItem(STORAGE_TYPE_KEY);
  return type === 'session' ? sessionStorage : localStorage;
};

/**
 * Save tokens to the appropriate storage
 * @param {string} token - JWT access token
 * @param {string} refreshToken - JWT refresh token
 * @param {boolean} rememberMe - if true, use localStorage; otherwise sessionStorage
 */
export const saveTokens = (token, refreshToken, rememberMe = true) => {
  // Clear both storages first to avoid stale tokens
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_KEY);

  // Remember which storage type was chosen
  localStorage.setItem(STORAGE_TYPE_KEY, rememberMe ? 'local' : 'session');

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(REFRESH_KEY, refreshToken);
};

/**
 * Get the stored access token (checks both storages)
 */
export const getToken = () => {
  return getStorage().getItem(TOKEN_KEY);
};

/**
 * Get the stored refresh token (checks both storages)
 */
export const getRefreshToken = () => {
  return getStorage().getItem(REFRESH_KEY);
};

/**
 * Clear all tokens from both storages
 */
export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(STORAGE_TYPE_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
};
