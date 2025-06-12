import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { name = 'World' } = req.query
    res.setHeader('Cache-Control', 's-maxage=600');
    return res.json({
        message: `Hello ${name}!`,
    })
}