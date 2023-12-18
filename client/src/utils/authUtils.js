export const initialAuthData = () => {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
};

export const isEmailValid = (email) => {
  if (email.length > 6 && email.includes(".") && email.includes("@"))
    return true;
  return false;
};

export const isPasswordValid = (password) => {
  if (password.length >= 8) return true;
  return false;
};

export const getUsername = (email) => {
  return email.split("@")[0];
};
