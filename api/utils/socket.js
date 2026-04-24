const { Server } = require('socket.io');


let io;
const userSocketMap = {};

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', socket => {
        const userId = socket.handshake.query.userId;

        if (userId !== undefined) {
            userSocketMap[userId] = socket.id;
        }

        console.log('User socket data', userSocketMap);

        socket.on('disconnect', () => {
            const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
            if (userId !== undefined) {
                delete userSocketMap[userId];
            }
        })

        socket.on('sendMessage', ({ senderId, receiverId, message }) => {
            const receiverSocketId = userSocketMap[receiverId];
            console.log('receiver ID', receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', {
                    senderId,
                    message,
                });
            }
        });
    })

    return io;
}

module.exports = {
    initSocket,
    userSocketMap
}