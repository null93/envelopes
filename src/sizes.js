"use strict"

function points ( num, frac = 0 ) {
	return ( num * 72 ) + ( frac * 72 )
}

function inches ( num, frac = 0 ) {
	return num + frac
}

module.exports = {
	"10-regular": {
		width: inches ( 9, 1/2 ),
		height: inches ( 4, 1/8 ),
		returnHeight: inches ( 1, 3/8 ),
		flapHeight: inches ( 2 ),
		fontSize: 12,
	},
	"10-square": {
		width: inches ( 9, 1/2 ),
		height: inches ( 4, 1/8 ),
		returnHeight: inches ( 1, 3/8 ),
		flapHeight: inches ( 1, 1/4 ),
		fontSize: 12,
	},
}
