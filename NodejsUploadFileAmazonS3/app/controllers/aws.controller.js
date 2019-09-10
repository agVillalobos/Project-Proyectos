var stream = require('stream');
 
const s3 = require('../config/s3.config.js');
 
exports.doUpload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	
	params.Key = req.file.originalname;
	params.Body = req.file.buffer;
		
	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		res.json({message: 'File uploaded successfully! -> keyname = ' + req.file.originalname});
	});
}