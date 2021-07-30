const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		default: ""
	},
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
