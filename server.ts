import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Routes
  app.get('/api/docs', async (req, res) => {
    try {
      const docsDir = path.join(__dirname, 'docs');
      const files = await fs.readdir(docsDir);
      const mdFiles = files.filter(f => f.endsWith('.md'));
      
      const docs = await Promise.all(mdFiles.map(async (filename) => {
        const filePath = path.join(docsDir, filename);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract title (first H1) and first paragraph
        const lines = content.split('\n');
        const titleLine = lines.find(l => l.startsWith('# '));
        const title = titleLine ? titleLine.replace('# ', '').trim() : filename;
        
        // Find first non-empty paragraph after the title
        const firstPara = lines.find(l => l.trim() !== '' && !l.startsWith('#') && !l.startsWith('!'));
        
        return {
          id: filename.replace('.md', ''),
          filename,
          title,
          excerpt: firstPara ? firstPara.trim() : 'Read more...',
          fullContent: content
        };
      }));

      res.json(docs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to read docs' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
