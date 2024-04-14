import { Router } from "express";
// import rateLimiter from "express-rate-limit";
import { checkoutCtrl, logInCtrl, logOutCtrl, signUpCtrl, userInfoCtrl, } from "../controllers/controllers.js";
import { logInValidation, signUpValidation, } from "../middlewares/schemaValidation.js";
// import { authVerification } from "../middlewares/authMiddleware.js";
const route = Router({});
/*const rateLimiterOptions = {
    windowMs: 2 * 60 * 1000,
    max: 10,
    message: "Too many requests created from this IP, retry later",
    standardHeaders: true,
    legacyHeaders: true,
};*/
route.get("/", (_, res) => res.send({ data: "🍕🍕🍕" }));
route.get("/logout", logOutCtrl);
route.get("/user-info/:user_id", userInfoCtrl);
route.post("/signup", signUpValidation, signUpCtrl);
route.post("/login", logInValidation, logInCtrl);
route.post("/checkout/:user_id",
//checkoutValidation,
checkoutCtrl);
export { route };
