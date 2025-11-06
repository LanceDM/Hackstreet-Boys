/**
 * UserSession - Manages the current user session
 * Stores user data in localStorage for persistence across page refreshes
 */
class UserSession {
  static STORAGE_KEY = 'current_user';

  /**
   * Set the current user session
   * @param {Object} userData 
   */
  static setUser(userData) {
    try {
      const filtered = {
        id: userData?.id ?? null,
        username: userData?.username ?? null,
        role: userData?.role ?? null,
        full_name: userData?.full_name ?? null,
      };
      const userDataString = JSON.stringify(filtered);
      localStorage.setItem(this.STORAGE_KEY, userDataString);
      return true;
    } catch (error) {
      console.error('Error saving user session:', error);
      return false;
    }
  }

  /**
   * Get the current user session
   * @returns {Object|null} Current user object or null if no session
   */
  static getUser() {
    try {
      const userDataString = localStorage.getItem(this.STORAGE_KEY);
      if (!userDataString) return null;
      return JSON.parse(userDataString);
    } catch (error) {
      console.error('Error reading user session:', error);
      return null;
    }
  }

  /**
   * Get the current username
   * @returns {string|null} Current username or null
   */
  static getUsername() {
    const user = this.getUser();
    return user ? user.username : null;
  }

  /**
   * Get the current user ID
   * @returns {number|string|null} Current user ID or null
   */
  static getUserId() {
    const user = this.getUser();
    return user ? (user.id || user.username) : null;
  }

  /**
   * Check if a user is currently logged in
   * @returns {boolean} True if user session exists
   */
  static isLoggedIn() {
    return this.getUser() !== null;
  }

  /**
   * Clear the current user session (logout)
   */
  static clearUser() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing user session:', error);
      return false;
    }
  }

  /**
   * Update specific fields in the current user session
   * @param {Object} updates - Fields to update
   */
  static updateUser(updates) {
    const currentUser = this.getUser();
    if (!currentUser) return false;
    
    const updatedUser = { ...currentUser, ...updates };
    return this.setUser(updatedUser);
  }
}

export default UserSession;