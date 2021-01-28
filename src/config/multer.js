// multer configuration file

/**
 * LEARNING COMMENT
 * multer is a middleware and as such
 * it will intercept route calls with its method.
 * With separation of concern in mind,
 * we inject its parameters in another file (this)
 * and then require this file on routes file
 */

const multer = require('multer')
const path = require('path') // guarantees correct path between different OS
const crypto = require('crypto') // lib used to hash files, passwords, et cetera

module.exports = {
	dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'), // redundancy for storage: >> multer.diskStorage >> destination: >> callback
	storage: multer.diskStorage({
		destination: (request, file, callback) => callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads')),
		filename: (request, file, callback) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) callback(err)
				
				const fileName = `${hash.toString('hex')}-${file.originalname}`
				callback(null, fileName)
			})
		},
	}),
	limites: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (request, file, callback) => {
		const allowedMimes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/gif',
		]
		
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Invalid file type!\nExtensions allowed: JPEG, JPG, PNG, GIF'))
		}
	}
}

