const router = require('express').Router();
const model = require('./models')



router.route("/music_list/:time").post((req, res) =>
    {
        let mod = new model({
            time: req.params.time, //передаём время
            music: req.body.music //передаём массив композиций
        })
        mod.save(err => {
            if(err) {return res.status(400).json({message: "Какие-то проблемы(", err})}
            res.json({message: "Всё хорошо"})
        });
    }
).get((req, res) =>
    {
        model.findOne({time: req.params.time}, (err, data) => {
            if (err) return res.status(400).json({message: "Какие-то проблемы(", err})
            res.json({music: data.music})
        })
    }
).put((req, res) =>
    {
        model.findOneAndUpdate({time: req.params.time}, {music: req.body.music},
            (err, data) => {
                if (err) return res.status(400).json({message: "Какие-то проблемы(", err})
                res.json({music: data.music})
            })
    }
).delete((req, res) =>
    {
        model.findOneAndDelete({time: req.params.time},
            (err, data) => {
                if (err) return res.status(400).json({message: "Какие-то проблемы(", err})
                res.json({music: data.music})
            })
    }
)

router.get('/time', (req, res) =>
    {
        let time = [];
        model.find().then((docs) =>
            {
                docs.forEach((t) => time.push(t.time))
                res.json({time: time.sort()})
            }
        ).catch(err => {return res.status(400).json({message: "Какие-то проблемы(", err})})

    }
)

router.put("/update/:time", (req, res) => {

        model.findOneAndUpdate({time: req.params.time, music:{$elemMatch: {name: req.body.selected}} }, {"$inc":{"music.$.vote":"1"}}, {new: true},(err,data) =>
            {
                if (err) return res.status(400).json({message: "Какие-то проблемы(", err})
                res.json({music: data.music})
            }
        )
    }
)

router.delete("/erase/:time", (req, res) => {

        model.findOneAndUpdate({time: req.params.time}, {"$set":{"music.$[].vote":"0"}}, {new: true},(err, data) =>
            {
                if (err) return res.status(400).json({message: "Какие-то проблемы(", err})
                res.json({music: data.music})
            }
        )
    }
)


module.exports = router;


//{"music": [{"name": "System of a down - Lonely days"}, {"name": "Billie Eilish - Bad Guy"}, {"name": "Анимация - Родина"}, {"name": "Дора - ДораДура"}, {"name": "Чайковский - 8 симфония"}]}