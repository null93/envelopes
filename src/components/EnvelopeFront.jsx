"use strict"

import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer"
import Barcode from "components/Barcode"

function points ( num, frac = 0 ) {
	return ( num * 72 ) + ( frac * 72 )
}

function makeStyle({ fontFamily, firstLineFontFamily, fontSize, firstLineFontSize, extraSpaceAfterFirstLine, recipientTextAlign, returnHeight }) {
	return StyleSheet.create({
		page: {
			fontFamily,
			fontSize,
			color: "black",
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			maxHeight: "100%",
			overflow: "hidden",
		},
		returnAddress: {
			textAlign: "left",
			paddingTop: points(1 / 4),
			paddingLeft: points(1 / 4),
			width: "50%",
			minHeight: points ( returnHeight ),
		},
		recipientAddressArea: {
			fontSize: fontSize + 2,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: recipientTextAlign,
			paddingHorizontal: points(1 / 4),
			width: "100%",
			flex: 1,
		},
		recipientAddress: {
			fontSize: fontSize + 2,
		},
		firstLine: {
			fontSize: firstLineFontSize + 2,
			fontFamily: firstLineFontFamily,
			paddingBottom: extraSpaceAfterFirstLine ? fontSize : 0,
			textAlign: recipientTextAlign,
		},
		barcodeArea: {
			display: "flex",
			width: "100%",
			height: points(5 / 8),
			alignItems: "flex-end",
		},
		barcode: {
			height: "100%",
			width: "50%",
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
		envelopeHeight,
		envelopeWidth,
		showStampBorder,
		showAreas,
		showBarcode,
		capitalizeText,
	} = props

	const styles = makeStyle ( props )

	return <Page
		orientation="portrait"
		style={styles.page}
		size={{
			width: points ( envelopeWidth ),
			height: points ( envelopeHeight ),
		}} >
		<View
			debug={showAreas}
			style={styles.returnAddress} >
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
			<Text style={styles.firstLine} >
			{
				( capitalizeText ? recipientAddress.toUpperCase () : recipientAddress ).replace (/^([^\n]+).*$/s, "$1")
			}
			</Text>
			<Text style={styles.recipientAddress} >
			{
				( capitalizeText ? recipientAddress.toUpperCase () : recipientAddress ).replace (/^[^\n]+\n?(.*)$/s, "$1")
			}
			</Text>
		</View>
		{
			showBarcode && <View style={styles.barcodeArea} >
				<Image
					src={Barcode ( recipientAddress )}
					debug={showAreas}
					style={styles.barcode}
				/>
			</View>
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
