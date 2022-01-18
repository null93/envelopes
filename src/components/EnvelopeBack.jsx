"use strict"

import { Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer"
import Barcode from "components/Barcode"

function points ( num, frac = 0 ) {
	return ( num * 72 ) + ( frac * 72 )
}

function makeStyle({ fontFamily, recipientTextAlign }) {
	return StyleSheet.create({
		page: {
			display: "flex",
			alignItems: "center",
		},
		backFlapArea: {
			fontFamily,
			fontSize: 12,
			color: "black",
			textAlign: "center",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: points(1 / 4),
			height: points(1, 3 / 8),
			width: points(4, 3 / 4),
		},
	})
}

function EnvelopeBack ( props ) {

	const {
		returnAddress,
		envelopeType,
		fontFamily,
		showAreas,
		capitalizeText,
	} = props

	const styles = makeStyle({
		fontFamily,
	})

	return <Page
		orientation="portrait"
		style={styles.page}
		size={{
			width: points ( 9, 1/2 ),
			height: points ( 4, 1/8 ),
		}} >
		<View
			debug={showAreas}
			style={styles.backFlapArea} >
			<Text>
			{
				capitalizeText
				? returnAddress.toUpperCase ()
				: returnAddress
			}
			</Text>
		</View>
	</Page>
}

export default EnvelopeBack
