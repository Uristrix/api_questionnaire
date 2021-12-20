const db = require('mongoose')

db.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true

    },
)

    .then(() => console.log("Connect"))
    .catch(err => console.log(err))

module.exports = db
