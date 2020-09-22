const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 3000
const db = require('./db.json')

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    // response.end(JSON.stringify(parsedUrl, null, 2))
    if (request.method === 'GET' && !parsedUrl.pathname.startsWith('/api')) {
        staticServer(request, response, parsedUrl)
    }
    if (parsedUrl.pathname.startsWith('/api')) {
        if (request.method === 'GET') {
            if (parsedUrl.pathname === '/api/tasks') {
                let tasksResponse
                if (parsedUrl.query.id) {
                    if (db[parsedUrl.query.id]) tasksResponse = db[parsedUrl.query.id]
                    else tasksResponse = { error: 'Wrong ID' }
                } else tasksResponse = db
                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify(tasksResponse, null, 2))
            } 
        }
        if (request.method === 'POST') {
            if (parsedUrl.pathname === '/api/tasks') {
                createNewTask(request, response, parsedUrl)
            }
        }
    }
})

function createNewTask(request, response, parsedUrl) {
    let data = ''
    request.on('data', chunk => {
        data += chunk.toString()
    })
    request.on('end', () => {
        response.setHeader('Content-Type', 'application/json')
        db.push(JSON.parse(data))
        fs.writeFile('./server/db.json', JSON.stringify(db, null, 2), () => {
            response.end(JSON.stringify({status: "Successful"}))
        })
    })
}

function staticServer(request, response, parsedUrl) {
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
}

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