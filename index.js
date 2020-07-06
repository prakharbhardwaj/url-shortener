const express = require('express')
const ShortUrl = require('./models/short-url')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shorteners = await ShortUrl.find()
    res.render('index', { shorteners: shorteners })
})

app.post('/short', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({
        short: req.params.shortUrl,
    }).then((url) => {
        if (!url) {
            res.status(404).send('No URL found')
        } else {
            url.clicks++
            url.save()
            res.redirect(url.full)
        }
    });
})

app.listen((process.env.PORT || 9898), () => {
    console.log(`Application running at: http://localhost:9898`)
})