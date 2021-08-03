const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	children: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

const Tag = mongoose.model('Tag', tagSchema);

tagSchema.pre('remove', function (doc) {
	// Remove all the docs that refers
	Tag.remove({ _id: { $in: doc.children } });
});

module.exports = Tag;
