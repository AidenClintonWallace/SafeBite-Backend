// Holds the logged-in user for the current app session.
// Cleared when the app fully closes, which matches how login works right now.
let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const getCurrentUser = () => currentUser;