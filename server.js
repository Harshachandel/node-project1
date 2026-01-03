const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 5000

const app = http.createServer((req, res) => {

    // ✅ IMAGE FIX (jpg + webp)
    if (req.url.startsWith('/images/')) {
        const filePath = path.join(__dirname, req.url)
        const ext = path.extname(filePath)

        let contentType = 'image/jpeg'
        if (ext === '.webp') contentType = 'image/webp'

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404)
                res.end('Image not found')
                return
            }
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data)
        }) 
        return
    }

    // ✅ PAGE FIX
    // let fileName = 'home.html'

    // if (req.url === '/about') fileName = 'about.html'
    // if (req.url === '/services') fileName = 'services.html'
    // if (req.url === '/course') fileName = 'course.html'
    // if (req.url === '/policy') fileName = 'policy.html'

    switch(req.url){
        case "/":
            fileName = "home.html"
            break;
        case "/about":
            fileName = 'about.html'
            break;
        case "/services":
            fileName = 'services.html'
            break;
        case "/course":
            fileName = 'course.html'
            break;
        case "/policy":
            fileName = 'policy.html'
            break;
        default:
            fileName = 'pageNotFound.html'
            break;

    }


    fs.readFile(fileName, 'utf-8', (err, content) => {
        if (err) {
            res.writeHead(500)
            res.end('Server Error')
            return
        }

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
    })
})

app.listen(PORT, () => {
    console.log(`Server Connected http://localhost:${PORT}`)
})
