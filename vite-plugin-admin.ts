import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const ALLOWED = new Set(['hero.ts', 'contact.ts', 'projects.ts', 'skills.ts', 'education.ts'])

export function adminPlugin(): Plugin {
  return {
    name: 'portfolio-admin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/admin/save', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const { filename, content } = JSON.parse(body) as { filename: string; content: string }

            if (!ALLOWED.has(filename)) {
              res.statusCode = 400
              res.end('Forbidden filename')
              return
            }

            const filepath = path.resolve(process.cwd(), 'src/data', filename)
            fs.writeFileSync(filepath, content, 'utf-8')

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch {
            res.statusCode = 500
            res.end('Server error')
          }
        })
      })
    },
  }
}
