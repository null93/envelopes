"use strict"

import * as bwipjs from "bwip-js"
import parser from "parse-address"

function millimeter ( num, frac = 0 ) {
	return ( num * 25.4 ) + ( frac * 25.4 )
}

function extractPostNetCode ( recipientAddress ) {
	let barcodeValue = {}
	let address = recipientAddress.split ("\n")
	do {
		barcodeValue = parser.parseLocation ( address.join ("\n") )
		address = address.slice ( 1 )
	}
	while ( address.length > 0 && !barcodeValue.zip )
	if ( address.length == 0 || !barcodeValue || !barcodeValue.zip ) {
		return null
	}
	var result = barcodeValue.zip
	if ( barcodeValue.plus4 ) {
		result += barcodeValue.plus4
		if ( barcodeValue.number ) {
			result += barcodeValue.number.substr (-2).padStart (2, "0")
		}
	}
	return result
}

function Barcode ( address ) {
	try {
		const value = extractPostNetCode ( address )
		const canvas = document.createElement ("canvas")
		if ( !value ) return canvas.toDataURL ("image/png")
		bwipjs.toCanvas ( canvas, {
			bcid: "postnet",
			text: value,
			scale: 1,
			height: millimeter ( 1/8 ),
		})
		return canvas.toDataURL ("image/png")
	}
	catch ( error ) {
		console.error ( error )
		return document.createElement ("canvas").toDataURL ("image/png")
	}
}

export default Barcode
