"use strict"

import { useContext } from "react"
import Box from "@mui/material/Box"
import EnvelopeFront from "components/EnvelopeFront"
import EnvelopeBack from "components/EnvelopeBack"
import Editor from "components/Editor"
import { StorageContext } from "contexts/StorageContext"
import { PDFViewer, Document, Font } from "@react-pdf/renderer"

/**
 * https://gist.github.com/karimnaaji/b6c9c9e819204113e9cabf290d580551
 */

Font.register ({
	family: "Roboto",
	src: "https://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf",
})

Font.register ({
	family: "Roboto Mono",
	src: "https://fonts.gstatic.com/s/robotomono/v4/eJ4cxQe85Lo39t-LVoKa26CWcynf_cDxXwCLxiixG1c.ttf",
})

Font.register ({
	family: "Open Sans",
	src: "https://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf",
})

function App ( props ) {

	const {
		returnAddress,
		recipientAddresses,
		envelopeType,
		fontFamily,
		recipientTextAlign,
		returnOnBackFlap,
		showReturnAddress,
		showStampBorder,
		showAreas,
		showBarcode,
		capitalizeText,
		reversePageOrder,
	} = useContext ( StorageContext )

	const addresses = recipientAddresses
		.split(/\n{2,}/g)
		.map(e => e.trim()).filter(e => !!e)

	if ( reversePageOrder ) {
		addresses.reverse ()
	}

	return <Box sx={{ height: "100%", width: "100%", display: { md: "initial", lg: "flex" } }} >
		<Box sx={{ width: { md: "100%", lg: "50%" }, display: "flex" }} >
			<PDFViewer style={{ border: 0, height: "100%", width: "100%", minHeight: "50vh" }} >
				<Document
					title={`Custom Envelopes`}
					creator={"https://github.com/null93/envelopes"}
					producer={"https://github.com/null93/envelopes"} >
					{
						addresses.flatMap((recipientAddress, index ) => [
							<EnvelopeFront
								key={`front-${index}-${recipientAddress}`}
								returnAddress={returnOnBackFlap ? "" : returnAddress}
								recipientAddress={recipientAddress}
								envelopeType={envelopeType}
								fontFamily={fontFamily}
								recipientTextAlign={recipientTextAlign}
								showReturnAddress={showReturnAddress}
								showStampBorder={showStampBorder}
								showAreas={showAreas}
								showBarcode={showBarcode}
								capitalizeText={capitalizeText}
								reversePageOrder={reversePageOrder}
							/>,
							returnOnBackFlap && <EnvelopeBack
								key={`back-${index}-${recipientAddress}`}
								returnAddress={returnAddress}
								envelopeType={envelopeType}
								fontFamily={fontFamily}
								showAreas={showAreas}
								capitalizeText={capitalizeText}
							/>,
						])
					}
				</Document>
			</PDFViewer>
		</Box>
		<Box sx={{ width: { md: "100%", lg: "50%" } }} >
			<Editor addressCount={addresses.length} />
		</Box>
	</Box>
}

export default App
