"use strict"

import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer"
import Barcode from "components/Barcode"

function points ( num, frac = 0 ) {
	return ( num * 72 ) + ( frac * 72 )
}

function makeStyle({ fontFamily, recipientTextAlign }) {
	return StyleSheet.create({
		page: {
			fontFamily,
			position: "relative",
		},
		returnAddressArea: {
			fontSize: 12,
			color: "black",
			textAlign: "left",
			padding: points(1 / 4),
			paddingBottom: 0,
			paddingRight: 0,
			height: points(1, 3 / 8),
			width: points(4, 3 / 4),
		},
		recipientAddressArea: {
			fontSize: 14,
			color: "black",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: recipientTextAlign,
			padding: 0,
			height: points(2, 1 / 8),
			width: points(9),
			marginHorizontal: points(1 / 4),
		},
		barcodeArea: {
			position: "absolute",
			right: 0,
			bottom: 0,
			height: points(5 / 8),
			width: points(4, 3 / 4),
			objectFit: "none",
			objectPosition: "center",
		},
		stampArea: {
			position: "absolute",
			right: 0,
			top: 0,
			height: points(1, 1 / 4),
			width: points(1, 1 / 4),
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		stamp: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: points ( 0.98 ) * 0.7, // scale down so it was covered by stamp
			width: points ( 0.870 ) * 0.7, // scale down so it was covered by stamp
			borderStyle: "solid",
			borderTop: 1,
			borderBottom: 1,
			borderLeft: 1,
			borderRight: 1,
			borderColor: "black",
			fontSize: 8,
			textTransform: "uppercase",
		},
	})
}

function EnvelopeFront ( props ) {

	const {
		returnAddress,
		recipientAddress,
		envelopeType,
		fontFamily,
		recipientTextAlign,
		showStampBorder,
		showAreas,
		showBarcode,
		capitalizeText,
	} = props

	const styles = makeStyle({
		fontFamily,
		recipientTextAlign,
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
			style={styles.returnAddressArea} >
			<Text>
				{
					capitalizeText
					? returnAddress.toUpperCase ()
					: returnAddress
				}
			</Text>
		</View>
		<View
			debug={showAreas}
			style={styles.recipientAddressArea} >
			<Text>
			{
				capitalizeText
				? recipientAddress.toUpperCase ()
				: recipientAddress
			}
			</Text>
		</View>
		{
			showBarcode && <Image
				src={Barcode ( recipientAddress )}
				debug={showAreas}
				style={styles.barcodeArea}
			/>
		}
		{
			showStampBorder && <View
				debug={showAreas}
				style={styles.stampArea} >
				<View style={styles.stamp} >
					<Text>Place</Text>
					<Text>Stamp</Text>
					<Text>Here</Text>
				</View>
			</View>
		}
	</Page>
}

export default EnvelopeFront
