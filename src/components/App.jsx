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

Font.register ({
	family: "Poppins",
	src: "http://fonts.gstatic.com/s/poppins/v1/hlvAxH6aIdOjWlLzgm0jqg.ttf",
})

Font.register ({
	family: "Dancing Script",
	src: "http://fonts.gstatic.com/s/dancingscript/v7/KGBfwabt0ZRLA5W1ywjowb_dAmXiKjTPGCuO6G2MbfA.ttf",
})

Font.register ({
	family: "Satisfy",
	src: "http://fonts.gstatic.com/s/satisfy/v6/PRlyepkd-JCGHiN8e9WV2w.ttf",
})

Font.register ({
	family: "Dawning of a New Day",
	src: "http://fonts.gstatic.com/s/dawningofanewday/v7/JiDsRhiKZt8uz3NJ5xA06gXLnohmOYWQZqo_sW8GLTk.ttf",
})

function App ( props ) {

	const {
		returnAddress,
		recipientAddresses,
		envelopeHeight,
		envelopeWidth,
		fontFamily,
		firstLineFontFamily,
		fontSize,
		firstLineFontSize,
		extraSpaceAfterFirstLine,
		recipientTextAlign,
		returnOnBackFlap,
		flapHeight,
		returnHeight,
		showReturnAddress,
		showStampBorder,
		showAreas,
		showBarcode,
		capitalizeText,
		reversePageOrder,
	} = useContext ( StorageContext )

	const addresses = recipientAddresses
		.split (/\n{2,}/g)
		.map ( e => e.trim()).filter(e => !!e)
		.map ( e => e.split ("\n").slice ( 0, 5 ).join ("\n") )

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
								fontFamily={fontFamily}
								firstLineFontFamily={firstLineFontFamily}
								recipientTextAlign={recipientTextAlign}
								showReturnAddress={showReturnAddress}
								showStampBorder={showStampBorder}
								showAreas={showAreas}
								showBarcode={showBarcode}
								capitalizeText={capitalizeText}
								reversePageOrder={reversePageOrder}
								fontSize={fontSize}
								firstLineFontSize={firstLineFontSize}
								extraSpaceAfterFirstLine={extraSpaceAfterFirstLine}
								envelopeHeight={envelopeHeight}
								envelopeWidth={envelopeWidth}
								returnHeight={returnHeight}
							/>,
							returnOnBackFlap && <EnvelopeBack
								key={`back-${index}-${recipientAddress}`}
								returnAddress={returnAddress}
								fontFamily={fontFamily}
								showAreas={showAreas}
								capitalizeText={capitalizeText}
								fontSize={fontSize}
								envelopeHeight={envelopeHeight}
								envelopeWidth={envelopeWidth}
								flapHeight={flapHeight}
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
