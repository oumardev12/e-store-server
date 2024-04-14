import { verify } from "jsonwebtoken";
const authVerification = (req, res, next) => {
    const jwt = req.cookies.jwt_session;
    try {
        const isVerified = verify(jwt, process.env.TOKEN_SECRET);
        if (!isVerified)
            throw new Error();
        next();
    }
    catch (error) {
        res.status(401).json({ errorMessage: "Not Authorized" });
    }
};
export { authVerification };
