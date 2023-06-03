const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded()) //parser used for parsing the body of the form request. Req.body would be undefined without it

app.get("/api/send_post", (req, res, next) => {
  // 1) we can make difference between app.get and app.post, app.use is for any request
  // 2) the more specific middleware has to be first, otherwise it will never be reached
  res.send(
    '<form method="POST" action="/api/recieve_post"><input type="text" name="title"></input><button type="submit">submit</button></form>  '
  )
})

app.use("/api/recieve_post", (req, res, next) => {
  const body = req.body
  res.redirect("/api/send_post")
  console.log("Přišlo to super! ", body)
})

app.get("/", (req, res, next) => {
  res.send(
    "<form action='/api/send_post'><button type='submit'>Send post</button></form>"
  )
})

app.listen(3000)
