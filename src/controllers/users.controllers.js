import { db } from "../database/database.connection.js";

export async function signup(req, res) {
    const { name, email, password } = req.body;

    try {
        const emailVerification = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (emailVerification.rowCount) return res.status(409).send("Email already registered");

        await db.query(`
        INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3);`, [name, email, password]);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}