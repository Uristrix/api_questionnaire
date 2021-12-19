const db = require('mongoose')

db.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true

    },
)
    .then(() => console.log("Connect"))
    .catch(err => console.log(err))

module.exports = db
