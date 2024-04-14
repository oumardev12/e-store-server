import { hashPassword } from "./helpers.js";
/**
 * search the user by his name
 * @param username username
 * @returns the user if true or throw an error
 */
const userAlreadyExist = async (username) => {
    const user = await new Promise((res) => {
        res("hello");
    });
    return user;
};
/**
 * serach the user by his id
 * @param id user id
 * @returns the user if exist or throw an error
 */
const findById = async (id) => {
    const user = await new Promise((res) => {
        res("hello");
    });
    return user;
};
/**
 * register the user in the app
 * @param username username
 * @param password password
 * @returns the user if success or throw
 */
const signup = async (username, password) => {
    const hash = hashPassword(password);
    const user = await new Promise((res) => {
        res("hello");
    });
    return user;
};
/**
 * fecth single user infos!
 * @param id user id
 * @returns the user if success or throw
 */
const fetchSingleUser = async (id) => {
    const res = await new Promise((res) => {
        res("hello");
    });
    return res;
};
/**
 * delete the user from the database!
 * @param id user id
 * @returns the user if success or throw
 */
const deleteAccount = async (id) => {
    const res = await new Promise((res) => {
        res("hello");
    });
    return res;
};
export { signup, userAlreadyExist, findById, fetchSingleUser, deleteAccount };
