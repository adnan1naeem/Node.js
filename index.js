const express = require('express');
const mongooes = require('mongoose');
const dbConfig = require('./configs/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const unless = require('express-unless');
const app = express();

mongooes.Promise = global.Promise;
mongooes.connect(dbConfig.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('DataBase Connected');
    },
    (error)=>{
        console.log('DataBase Can`t be Connected: ',error);
    }
);

auth.authenticateToken = unless;

app.use(
    auth.authenticateToken.unless({
        path: [
            {url: "/users/login", methods: ['POST']},
            {url: "/users/register", methods: ['POST']},
        ]
    })
);

app.use(express.json());
app.use("/users", require("./routes/users.routes"));
app.use(errors.errorHandler);

// process.env.port
app.listen(process.env.port || 4000, function(){
    console.log("ready to go")
})