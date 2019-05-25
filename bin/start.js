const server = require('../server')

server.app.listen(server.port, () => {
  console.log("====================")
  console.log('Server is Running!!!')
  console.log("====================")
})