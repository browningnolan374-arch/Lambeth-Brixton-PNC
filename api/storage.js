let database = {
    users: {}
};

export default async function handler(req, res) {
    try {
        // GET
        if (req.method === 'GET') {
            const key = req.query.key;
            return res.status(200).json({
                success: true,
                value: database[key] || {}
            });
        }

        // POST
        if (req.method === 'POST') {
            const { key, value } = req.body;

            if (!key) {
                return res.status(400).json({
                    success: false,
                    error: "Missing key"
                });
            }

            database[key] = value;

            return res.status(200).json({
                success: true
            });
        }

        res.status(405).json({ success: false });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}
