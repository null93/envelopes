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

const defaultPreset = "#10 - Regular"

export default {
	returnAddress: generate ( false ),
	recipientAddresses: generate ( true ) + "\n\n" + generate ( false ),
	envelopePreset: defaultPreset,
	envelopeWidth: sizes [defaultPreset].width,
	envelopeHeight: sizes [defaultPreset].height,
	fontFamily: "Roboto",
	fontSize: sizes [defaultPreset].fontSize,
	returnOnBackFlap: false,
	returnHeight: sizes [defaultPreset].returnHeight,
	flapHeight: sizes [defaultPreset].flapHeight,
	showStampBorder: true,
	showAreas: false,
	showBarcode: true,
	capitalizeText: true,
	reversePageOrder: true,
	recipientTextAlign: "left",
}
