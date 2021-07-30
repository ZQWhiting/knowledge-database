const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	parent: { type: Schema.Types.ObjectId, ref: 'Tag', default: null },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
