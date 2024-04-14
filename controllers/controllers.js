import { createJwtToken, hashPassword, verifyPassword, } from "../utils/index.js";
import schemaModel from "../models/models.js";
const signUpCtrl = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hash = hashPassword(password);
        const user = await schemaModel.create({ username, password: hash });
        const token = createJwtToken(user.id);
        res
            .cookie("jwt_session", token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        })
            .status(201)
            .send({
            id: user.id,
            username: user.username,
            created_at: user.created_at,
        });
    }
    catch (error) {
        res.status(400).json({
            errorMessage: error.code === 11000 ? "user already exist" : error.message,
        });
    }
};
const logInCtrl = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await schemaModel.findOne({ username });
        if (!user || !verifyPassword(user.password, password))
            throw new Error("incorrect username or password");
        const token = createJwtToken(user.id);
        res
            .cookie("jwt_session", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
            .send({
            id: user.id,
            username: user.username,
            created_at: user.created_at,
        });
    }
    catch (error) {
        res.status(400).json({
            errorMessage: error.message,
        });
    }
};
const userInfoCtrl = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await schemaModel.findById(user_id);
        if (!user)
            throw new Error("user dosen't exist");
        res.send({
            id: user.id,
            username: user.username,
            purchases: user.purchases,
            created_at: user.created_at,
        });
    }
    catch (error) {
        res.status(400).json({
            errorMessage: error.message,
        });
    }
};
const logOutCtrl = (_, res) => {
    try {
        res.cookie("jwt_session", "", {
            maxAge: 0,
        });
        res.send({ success: true });
    }
    catch (error) {
        res.status(500).json({ errorMessage: "server errror: jwt_token" });
    }
};
const checkoutCtrl = async ({ body, params }, res) => {
    const { user_id } = params;
    console.log("user: ", user_id);
    const record = {
        data: body.data,
        products: body.products.map((p) => {
            return { product_id: p.id, quantity: p.quantity };
        }),
        purchase_at: Date.now(),
    };
    try {
        const user = await schemaModel.findById(user_id);
        if (!user)
            throw new Error("user dosen't exist");
        await user.updateOne({
            $addToSet: { purchases: [record] },
        });
        res.send({ message: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            errorMessage: error.message,
        });
    }
};
export { logOutCtrl, signUpCtrl, logInCtrl, userInfoCtrl, checkoutCtrl };
