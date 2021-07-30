const mongoose = require('mongoose');

mongoose.plugin(require('mongoose-unique-validator'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/knowledge', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

module.exports = mongoose.connection;
