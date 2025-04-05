import { clear } from '../../memoryService';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const { tag } = req.body;
  if (!tag) return res.status(400).json({ error: 'Missing tag' });

  try {
    await clear(tag);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Memory clear error:', err);
    res.status(500).json({ error: 'Failed to clear memory' });
  }
}
