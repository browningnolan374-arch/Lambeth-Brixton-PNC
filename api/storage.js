// api/storage.js
import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
    try {
        if(req.method === 'GET'){
            const key = req.query.key;
            const value = await get(key);
            res.status(200).json({ success:true, value:value || {} });
        } else if(req.method === 'POST'){
            const { key, value } = await req.json();
            await set(key, value);
            res.status(200).json({ success:true });
        } else {
            res.status(405).json({ success:false, error:'Method not allowed' });
        }
    } catch (err) {
        res.status(500).json({ success:false, error:err.message });
    }
}
