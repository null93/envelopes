"use strict"

function inches ( num, frac = 0 ) {
	return num + frac
}

module.exports = {
	"#10 - Regular": {
		width: inches ( 9, 1/2 ),
		height: inches ( 4, 1/8 ),
		returnHeight: inches ( 1, 3/8 ),
		flapHeight: inches ( 2 ),
		fontSize: 12,
	},
	"#10 - Square": {
		width: inches ( 9, 1/2 ),
		height: inches ( 4, 1/8 ),
		returnHeight: inches ( 1, 3/8 ),
		flapHeight: inches ( 1, 1/4 ),
		fontSize: 12,
	},
	"5 1/2 x 5 1/2": {
		width: inches ( 5, 1/2 ),
		height: inches ( 5, 1/2 ),
		returnHeight: inches ( 1, 5/6 ),
		flapHeight: inches ( 1, 15/16 ),
		fontSize: 12,
	},
	"A7": {
		width: inches ( 7, 1/4 ),
		height: inches ( 5, 1/4 ),
		returnHeight: inches ( 1, 3/4 ),
		flapHeight: inches ( 2, 1/2 ),
		fontSize: 14,
	},
	"A2": {
		width: inches ( 5, 3/4 ),
		height: inches ( 4, 3/8 ),
		returnHeight: inches ( 1, 1/2 ),
		flapHeight: inches ( 2, 1/4 ),
		fontSize: 13,
	},
	"A1": {
		width: inches ( 5, 1/8 ),
		height: inches ( 3, 5/8 ),
		returnHeight: inches ( 1, 1/4 ),
		flapHeight: inches ( 1, 11/16 ),
		fontSize: 12,
	},
}
