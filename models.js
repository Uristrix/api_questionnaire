const db = require("./db");

const music = new db.Schema({
        name:
            {
                type: String,
                required: true,
                maxlength: 80,
            },
        vote:
            {
                type: Number,
                default: 0
            }
    },{ versionKey: false }
)

const turn = new db.Schema({
        time:
            {
                type: String,
                required: true,
            },
        music: [music]
    }
)
module.exports = db.model('turn', turn)
