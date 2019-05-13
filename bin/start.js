const server = require('../server')

server.app.listen(server.port, () => {
  console.log('Server is Running!!!')
})