import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function urlShorten(req, res) {
    const user = res.locals.user;
    const { url } = req.body;

    try {
        const shortUrl = nanoid(9);
        const urlInfo = await db.query(`
        INSERT INTO urls ("userId", url, "shortUrl")
        VALUES ($1, $2, $3)
        RETURNING id;`, [user.id, url, shortUrl]);

        res.status(201).send({ id: urlInfo.rows[0].id, shortUrl })
    } catch (err) {
        res.status(500).send(err.message);
    }
};
