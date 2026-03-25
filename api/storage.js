import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    try {
        // GET DATA
        if (req.method === 'GET') {
            const key = req.query.key;
            const value = await kv.get(key);
            return res.status(200).json({ success: true, value: value || {} });
        }

        // SAVE DATA
        if (req.method === 'POST') {
            const { key, value } = req.body;

            if (!key) {
                return res.status(400).json({ success: false, error: 'Missing key' });
            }

            await kv.set(key, value);
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });

    } catch (err) {
        console.error("KV ERROR:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
