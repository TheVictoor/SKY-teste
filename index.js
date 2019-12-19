const dotenv = require('dotenv-safe').config(); // carregar variaveis de ambiente
// dotenv.load();

const restify = require('restify');
const authRouter = require("./router/auth-router");
const userRouter = require("./router/user-router");
const defaultRouter = require("./router/default-router");
const server = require( "./server/server.js" );

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.get("/usuario/:id", authRouter.autorizar, userRouter.listar);
server.get("*", defaultRouter.default);

server.post("/signin", userRouter.validarLogar, userRouter.logar);
server.post("/signup", userRouter.validarCriar, userRouter.criar);
server.post("*", defaultRouter.default);

console.log( process.env.SECRET );

module.exports = server;