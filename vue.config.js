
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000'
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      },
      'sockjs-node': {
        target: 'http://localhost:3000',
        ws: false
      }
    }
  }
}
