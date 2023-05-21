import { db } from "../database/database.connection.js";

export async function getUserData(req, res) {
    const user = res.locals.user;

    try {
        const userData = await db.query(`
        SELECT users.id, users.name, COALESCE(SUM(urls."visitCount"), 0) AS "visitCount",
        CASE
            WHEN COUNT(urls.id) > 0
            THEN json_agg(json_build_object(
                'id', urls.id, 
                'shortUrl', urls."shortUrl", 
                'url', urls.url, 
                'visitCount', urls."visitCount"))
            ELSE NULL
        END AS "shortenedUrls"
        FROM users
        LEFT JOIN urls ON urls."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id;
        `, [user.id]);

        res.status(200).send(userData.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function getRanking(req, res) {
    try {
        const ranking = await db.query(`
        SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON urls."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;`);

        res.status(200).send(ranking.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
