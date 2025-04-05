import { recall } from '../../memoryService';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: 'Missing tag' });

  try {
    const content = await recall(tag);
    if (!content) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ content });
  } catch (err) {
    console.error('Memory recall error:', err);
    res.status(500).json({ error: 'Failed to recall' });
  }
}
