
module.exports = {
	entry:'./src/controller/controller.js',
	output:{
		filename:'bundle.js',
		path:'./dist'
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'jsx-loader'
			}
		]
	}
}