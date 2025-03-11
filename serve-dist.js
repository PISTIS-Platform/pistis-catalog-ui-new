import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const port = 3000
const staticDir = 'dist'
const __dirname = dirname(fileURLToPath(import.meta.url))

const server = createServer(async (req, res) => {
  try {
    let filePath = req.url === '/' ? '/index.html' : req.url
    filePath = join(__dirname, staticDir, filePath)
    const fileExt = extname(filePath)

    const contentType
      = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      }[fileExt] || 'application/octet-stream'

    const data = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  }
  catch (err) {
    console.error(err)
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
    }
    else {
      res.writeHead(500, { 'Content-Type': 'text/html' })
      res.end('<h1>500 Internal Server Error</h1>')
    }
  }
})

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`)
})
