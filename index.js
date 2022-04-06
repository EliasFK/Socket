const ws = require('ws')

const clients = new Set()
const server = new ws.Server({ port: 8080 })

server.on('connection', (socket) => {
    clients.add(socket)

    socket.on('close', () => {
        clients.delete(socket)
    })

    socket.on('message', (msg) => {
        const [comando, ...data] = JSON.parse(msg.toString('utf-8'));

        if (comando === 'nome') {
            socket.nome = data;
        } else if (comando === 'mensagem') {
            clients.forEach(client => client.send(JSON.stringify(['mensagem', socket.nome, data])));
        }

    })
})
