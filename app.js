const http = require("http")
const serverHandler = require("./routes")

const server = http.createServer(serverHandler)

server.listen(3000, () => {
  console.log("Server is running on port 3000")
})
