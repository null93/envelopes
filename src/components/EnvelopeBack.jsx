"use strict"

import { Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer"
import Barcode from "components/Barcode"

function points ( num, frac = 0 ) {
	return ( num * 72 ) + ( frac * 72 )
}

function makeStyle({ fontFamily, fontSize, flapHeight }) {
	return StyleSheet.create({
		page: {
			fontFamily,
			fontSize,
			color: "black",
			display: "flex",
			alignItems: "center",
		},
		backFlapArea: {
			display: "flex",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
			height: points ( flapHeight ),
			width: "100%",
		},
	})
}

function EnvelopeBack ( props ) {

	const {
		returnAddress,
		envelopeHeight,
		envelopeWidth,
		showAreas,
		capitalizeText,
	} = props

	const styles = makeStyle( props )

	return <Page
		orientation="portrait"
		style={styles.page}
		size={{
			width: points ( envelopeWidth ),
			height: points ( envelopeHeight ),
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
