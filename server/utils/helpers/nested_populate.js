module.exports = function (path, c) {
	let res = { path };

	if (c < 1) return res;

	while (--c) {
		const temp = { path };
		temp.populate = res;
		res = temp;
	}
	return res;
};
