const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	children: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	parent: { type: Schema.Types.ObjectId, ref: 'Tag', default: null },
});

tagSchema.pre('deleteOne', { document: true }, async function () {
	const tags = await Tag.find({ _id: { $in: this.children } });
	tags.forEach((tag) => tag.deleteOne());
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
