const { createServer } = require("http");

const httpServer = createServer((req, res) => {

})


httpServer.listen(5000, (err, server) => {
  console.log(`Server} is listening on port 5000`)
})