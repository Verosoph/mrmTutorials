module.exports = {
    database: 'mongodb://localhost:27017/meanauth',
    secret: 'secret',
    options: {
        useUnifiedTopology: true,   //https://mongoosejs.com/docs/connections.html
        useNewUrlParser: true,
    }
}
