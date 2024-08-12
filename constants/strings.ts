
export const passwordPattern = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])(?!.*\s)[A-Za-z\d!@#$%^&]{8,16}|.{64})$/;
export const passwordDesc = "Password must include at least one uppercase letter, one lowercase letter, one number, one special character (!@#$%^&), no spaces, and be 8-16 characters long";
export const phonePattern = /^\d{10}$/;
