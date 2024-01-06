const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Database Connected : ${process.env.DATABASE_URI}`
    )
}).catch(err => {
    console.error('Database Connection Error', err)
})