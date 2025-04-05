import { remember } from '../../memoryService';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { tag, content } = req.body;
  if (!tag || !content) return res.status(400).json({ error: 'Missing tag or content' });

  try {
    await remember(tag, content);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Memory remember error:', err);
    res.status(500).json({ error: 'Failed to remember' });
  }
}
