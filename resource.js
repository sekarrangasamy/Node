var config = './images';
var mv = require('mv');
var path = require('path');

function move(files, resourceName) {
	return new Promise((resolve, reject) => {
		var sourcePath = files.image.path;
		var imgName = path.parse(files.image.originalFilename);
		var resourcePath = '/' + resourceName + '/' + new Date().getTime() + imgName.ext;
		var destPath = config + resourcePath;

		mv(sourcePath, destPath, {
				mkdirp: true
			},
			function(error) {
				if (!error) {
					return resolve(resourcePath);
				} else {
					return reject(error);
				}
			});
	});
}

exports.move = move;