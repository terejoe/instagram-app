module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js,svg}'
	],
	swDest: "build/sw.js",
	swSrc: "src/sw.js",
	"globIgnores": [
		"../workbox-config.js"
	]
};