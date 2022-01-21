import identity from "fake-identity"
import sizes from "source/sizes"

function generate ( company = false ) {
	const random = identity.generate ()
	return [
		company ? random.company : `${random.firstName} ${random.lastName}`,
		random.street,
		`${random.city}, ${random.state} ${random.zipCode}`,
	].join ("\n")
}

export default {
	returnAddress: generate ( false ),
	recipientAddresses: generate ( true ) + "\n\n" + generate ( false ),
	envelopePreset: "10-regular",
	envelopeWidth: sizes ["10-regular"].width,
	envelopeHeight: sizes ["10-regular"].height,
	fontFamily: "Roboto",
	fontSize: sizes ["10-regular"].fontSize,
	returnOnBackFlap: false,
	returnHeight: sizes ["10-regular"].returnHeight,
	flapHeight: sizes ["10-regular"].flapHeight,
	showStampBorder: true,
	showAreas: false,
	showBarcode: true,
	capitalizeText: true,
	reversePageOrder: true,
	recipientTextAlign: "left",
}
