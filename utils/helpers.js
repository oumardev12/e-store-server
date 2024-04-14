import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
/**
 * utility function for hashing a password with scrypt
 * @param password user password
 * @returns the hashed password
 */
const hashPassword = (password) => {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(password, salt, 64).toString("hex");
    const hash = `${salt}:${hashedPassword}`;
    return hash;
};
/**
 * verify if the two password are the same
 * @param hash the hashed password
 * @param password the password to compare to
 * @returns true if macth or false
 */
const verifyPassword = (hash, password) => {
    const [salt, hashedPassword] = hash.split(":");
    const hashedBuffer = scryptSync(password, salt, 64);
    const hashedPasswordBuffer = Buffer.from(hashedPassword, "hex");
    const match = timingSafeEqual(hashedBuffer, hashedPasswordBuffer);
    return match;
};
export { hashPassword, verifyPassword };
