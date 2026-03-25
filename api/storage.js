import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const key = req.query.key;
            const value = await kv.get(key);
            res.status(200).json({ success: true, value: value || {} });
        } 
        
        else if (req.method === 'POST') {
            const { key, value } = req.body;

            if (!key) {
                return res.status(400).json({ success: false, error: 'No key provided' });
            }

            await kv.set(key, value);
            res.status(200).json({ success: true });
        } 
        
        else {
            res.status(405).json({ success: false, error: 'Method not allowed' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}
