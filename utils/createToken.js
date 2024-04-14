import jwt from "jsonwebtoken";
/**
 * create a jsonwebtoken with the user id
 * @param id user id
 * @returns the newly created token
 */
export const createJwtToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 24 * 60 * 60,
    });
};
