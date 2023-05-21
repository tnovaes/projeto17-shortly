import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
    const { name, email, password } = req.body;

    try {
        const emailVerification = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (emailVerification.rowCount) return res.status(409).send("Email already registered");

        const hash = bcrypt.hashSync(password, 10);

        await db.query(`
        INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3);`, [name, email, hash]);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (!user.rowCount || !bcrypt.compareSync(password, user.rows[0].password)) return res.status(401).send("Incorrect email/password");

        const data = { email: email }
        const key = process.env.JWT_SECRET || "jwt_public_key";

        const token = jwt.sign(data, key);

        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};