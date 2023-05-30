const http = require("http")
const fs = require("fs")

function serverHandler(req, res) {
  const { url, method } = req
  if (url === "/") {
    res.setHeader("Content-Type", "text/html")
    res.write(`
      <html>
        <title>Write in something</title>
        <form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>
      </html>
    `)
    return res.end()
  }

  if (url === "/message" && req.method === "POST") {
    const body = []
    res.setHeader("Location", "/") //sending us back to home page
    req.on("data", (chunk) => {
      body.push(chunk)
    })
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString()
      const message = parseBody.split("=")[1]
      console.log(message)
      //with writeFileSYNC, the following code will stop until the file is created
      fs.writeFile("message.txt", message, (err) => {
        res.writeHead(302)
        return res.end("Request succesfuly made...")
      })
    })
  }
}

const server = http.createServer(serverHandler)

server.listen(3000, () => {
  console.log("Server is running on port 3000")
})
