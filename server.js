const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const socketIO = require("socket.io");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 2 * 60 * 60 * 1000,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () =>
    console.log(`Now listening on port ${PORT}`)
  );

  const io = socketIO(server);

  let users = {};
  let userName;

  io.on("connection", (socket) => {
    socket.on("new-user", (userName) => {
      users[socket.id] = userName;
      socket.broadcast.emit("user-connected", userName);
    });
    socket.on("send-chat-message", (message) => {
      socket.broadcast.emit("chat-message", {
        message: message,
        userName: users[socket.id],
      });
    });
    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", users[socket.id]);
      users[socket.id] = userName;
      delete users[socket.id];
    });
  });
});

// server for socket.io chat =========================== //
// const server = app
//   .use((req, res) => res.sendFile("/index.html", { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = socketIO(server);

// let users = {};
// let userName;

// io.on("connection", (socket) => {
//   console.log("New connection 1 from " + socket.handshake.address);

//   socket.on("new-user", (userName) => {
//     console.log("New connection 2 from " + socket.handshake.address);

//     users[socket.id] = userName;
//     socket.broadcast.emit("user-connected", userName);
//   });
//   socket.on("send-chat-message", (message) => {
//     socket.broadcast.emit("chat-message", {
//       message: message,
//       userName: users[socket.id],
//     });
//   });
//   socket.on("disconnect", () => {
//     socket.broadcast.emit("user-disconnected", users[socket.id]);
//     users[socket.id] = userName;
//     delete users[socket.id];
//   });
// });

// end of socket chat stuff ===================== //
