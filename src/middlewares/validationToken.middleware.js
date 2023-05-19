import { db } from "../database/database.connection.js";
import jwt from "jsonwebtoken";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const tokenWithBearer = authorization?.split(" ");
    if (!tokenWithBearer || tokenWithBearer[0] !== "Bearer") return res.sendStatus(401);

    const token = tokenWithBearer[1];
    const key = process.env.JWT_SECRET || "jwt_public_key";

    try {
        const data = jwt.verify(token, key);
        const email = await db.query(`SELECT * FROM users WHERE email = $1;`, [data.email]);
        if (!email.rowCount) return res.sendStatus(401);

        res.locals.user = email.rows[0];

        next();
    }
    catch (err) {
        if (err.name === "JsonWebTokenError") return res.sendStatus(401);
        res.status(500).send(err.message);
    }
};