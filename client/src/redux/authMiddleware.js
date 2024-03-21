// authMiddleware.js
const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "user/signInSuccess") {
    const { token } = action.payload;
    localStorage.setItem("accessToken", token); // Save the token to local storage
  }

  if (action.type === "user/signOut") {
    localStorage.removeItem("accessToken"); // Remove the token from local storage upon sign-out
  }

  return next(action);
};

export default authMiddleware;
