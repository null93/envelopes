const identity = require ("fake-identity")

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
	envelopeType: "10-regular",
	customWidth: "5",
	customHeight: "3",
	fontFamily: "Roboto",
	returnOnBackFlap: false,
	showStampBorder: true,
	showAreas: false,
	showBarcode: true,
	capitalizeText: true,
	reversePageOrder: true,
	recipientTextAlign: "left",
}
