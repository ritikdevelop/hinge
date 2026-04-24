const express = require('express')
const connectDB = require('./db')
const dotenv = require('dotenv')
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const {initSocket} = require('./utils/socket');

dotenv.config();
connectDB();

//Route imports
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');



const app = express();
const server = http.createServer(app);


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());



// Socket
initSocket(server);

//Routes
app.use('/', authRoutes);
app.use('/', userRoutes);

server.listen(4000, '0.0.0.0', () => {
    console.log("Server is running on port 4000");
});

