const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playerdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connection established."))
    .catch(err => console.log("DB connection failed.", err))