"use strict"

import Box from "@mui/material/Box"
import Accordion from "@mui/material/Accordion"

function SimpleRow ( props ) {
	const { children } = props
	return <Accordion elevation={0} >
		<Box sx={{
			py: 1,
			px: 2,
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between" }} >
			{children}
		</Box>
	</Accordion>
}

export default SimpleRow
