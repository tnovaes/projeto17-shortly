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
        RETURNING id;`,
            [user.id, url, shortUrl]);

        const body = {
            id: urlInfo.rows[0].id,
            shortUrl
        }

        res.status(201).send(body);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function getUrl(req, res) {
    const { id } = req.params;

    try {
        const url = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1;`, [id]);
        if (!url.rowCount) return res.sendStatus(404);

        res.status(200).send(url.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function visitUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const visitUrl = await db.query(`
        UPDATE urls 
        SET "visitCount" = "visitCount"+1 
        WHERE "shortUrl"=$1 
        RETURNING url;`,
            [shortUrl]);

        if(!visitUrl.rowCount) return res.sendStatus(404);

        res.redirect(visitUrl.rows[0].url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
