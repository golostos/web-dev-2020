const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 3000

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    // response.end(JSON.stringify(parsedUrl, null, 2))
    let filename = parsedUrl.pathname.slice(1)
    filename = filename ? `client/${filename}` : 'client/index.html'
    // response.end(filename)
    const fileStream = fs.createReadStream(filename)
    fileStream.on('open', () => {
        response.setHeader('Content-Type', getMimeType(filename))
        fileStream.pipe(response)
    }).on('error', error => {
        console.error(error)
        response.statusCode = 404
        response.end('Resource missing')
    })

})

function getMimeType(filename) {
    const exts = {
        js: 'application/javascript',
        css: 'text/css',
        html: 'text/html',
        json: 'application/json'
    }
    const ext = filename.match(/.*\.(.*)$/)[1]
    return exts[ext] || 'text/plain'
}

server.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})