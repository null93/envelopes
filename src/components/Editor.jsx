"use strict"

import { useContext } from "react"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import InputAdornment from "@mui/material/InputAdornment"
import HintIcon from "@mui/icons-material/Help"
import ClearIcon from "@mui/icons-material/Clear"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import SimpleRow from "components/SimpleRow"
import { StorageContext } from "contexts/StorageContext"

function Editor ( props ) {

	const { addressCount } = props

	const {
		reset,
		returnAddress, setReturnAddress,
		recipientAddresses, setRecipientAddresses,
		envelopeType, setEnvelopeType,
		customWidth, setCustomWidth,
		customHeight, setCustomHeight,
		fontFamily, setFontFamily,
		returnOnBackFlap, setReturnOnBackFlap,
		showStampBorder, setShowStampBorder,
		showAreas, setShowAreas,
		showBarcode, setShowBarcode,
		capitalizeText, setCapitalizeText,
		reversePageOrder, setReversePageOrder,
		recipientTextAlign, setRecipientTextAlign,
	} = useContext ( StorageContext )

	return <Box sx={{ p: { xs: 0, sm: 4 }, height: "100%", overflow: "auto" }} >
		<Box>
			<Box sx={{ p: { xs: 2, sm: 0 } }} >
				<Typography variant="h4" component="h1" sx={{ mb: 2 }} >Envelopes</Typography>
				<Typography variant="body1" >
					Simply customize the envelope(s) to fit your needs and watch them render in real time.
					Previous data/settings are saved locally for your convenience.
					Everything is rendered locally so no information is shared outside your browser.
					This software just generates the desired PDF files, it is up to you to choose the correct settings for your printer.
				</Typography>
			</Box>
			<Alert variant="outlined" severity="warning" sx={{ mt: 3, mb: 3 }} >
				This project is currently a work-in-progress and should be used cautiously.
			</Alert>
			<Paper elevation={2} sx={{ mb: 3, mt: 3, overflow: "hidden" }} >
				<TextField
					autoFocus
					fullWidth
					multiline
					minRows={3}
					variant="filled"
					label="Return Address"
					value={returnAddress}
					onChange={e => setReturnAddress ( e.target.value.split ("\n").slice ( 0, 6 ).join ("\n") )}
				/>
			</Paper>
			<Paper elevation={2} sx={{ mt: 3, mb: 3, overflow: "hidden" }} >
				<TextField
					fullWidth
					multiline
					minRows={3}
					variant="filled"
					label={`Recipient Addresses (${addressCount})`}
					value={recipientAddresses}
					onChange={e => setRecipientAddresses ( e.target.value.replace (/\n{2,}/g, "\n\n") )}
				/>
			</Paper>
			<Paper elevation={2} sx={{ mt: 3, mb: 3 }} >
				<SimpleRow>
					<Typography>Envelope Type</Typography>
					<Select
						variant="filled"
						hiddenLabel={true}
						value={envelopeType}
						onChange={e => setEnvelopeType ( e.target.value )} >
						<MenuItem value="10-regular" >#10 - Regular</MenuItem>
						<MenuItem value="10-square" disabled >#10 - Square</MenuItem>
						<MenuItem value="custom" disabled >Custom</MenuItem>
					</Select>
				</SimpleRow>
				{
					envelopeType === "custom" && <SimpleRow>
						<Typography>Envelope Dimensions </Typography>
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} >
							<TextField
								type="number"
								variant="filled"
								hiddenLabel={true}
								value={customWidth}
								placeholder="1.00"
								onChange={e => setCustomWidth ( e.target.value )}
								inputProps={{ min: "1" }}
								sx={{ width: 100 }}
								InputProps={{ endAdornment: <InputAdornment position="end" >″ W</InputAdornment> }}
							/>
							<ClearIcon sx={{ mx: 1, fontSize: 14 }} fontSize="inherit" />
							<TextField
								type="number"
								variant="filled"
								hiddenLabel={true}
								value={customHeight}
								placeholder="1.00"
								onChange={e => setCustomHeight ( e.target.value )}
								sx={{ width: 100 }}
								inputProps={{ min: "1" }}
								InputProps={{ endAdornment: <InputAdornment position="end" >″ H</InputAdornment> }}
							/>
						</Box>
					</SimpleRow>
				}
				<SimpleRow>
					<Typography sx={{ display: "flex", alignItems: "center" }} >
						Font Family
						<Tooltip title="USPS recommends an OCR readable font" placement="right" >
							<HintIcon sx={{ ml: 1, fontSize: 18, color: "text.secondary" }} />
						</Tooltip>
					</Typography>
					<Select
						variant="filled"
						hiddenLabel={true}
						value={fontFamily}
						onChange={e => setFontFamily ( e.target.value )} >
						<MenuItem value="Open Sans" >Open Sans</MenuItem>
						<MenuItem value="Roboto" >Roboto</MenuItem>
						<MenuItem value="Roboto Mono" >Roboto Mono</MenuItem>
					</Select>
				</SimpleRow>
				<SimpleRow>
					<Typography sx={{ display: "flex", alignItems: "center" }} >
						Recipient Text Alignment
						<Tooltip title="USPS prefers all lines of an address block to have a uniform left margin" placement="right" >
							<HintIcon sx={{ ml: 1, fontSize: 18, color: "text.secondary" }} />
						</Tooltip>
					</Typography>
					<Select
						variant="filled"
						hiddenLabel={true}
						value={recipientTextAlign}
						onChange={e => setRecipientTextAlign ( e.target.value )} >
						<MenuItem value="left" >Left</MenuItem>
						<MenuItem value="center" >Center</MenuItem>
						<MenuItem value="right" >Right</MenuItem>
					</Select>
				</SimpleRow>
				<SimpleRow>
					<Typography>Stamp Placeholder</Typography>
					<Switch
						checked={showStampBorder}
						onChange={e => setShowStampBorder ( e.target.checked )}
					/>
				</SimpleRow>
				<SimpleRow>
					<Typography>Return Address On Back Flap</Typography>
					<Switch
						checked={returnOnBackFlap}
						onChange={e => setReturnOnBackFlap ( e.target.checked )}
					/>
				</SimpleRow>
				<SimpleRow>
					<Typography>Show Safe Areas</Typography>
					<Switch
						checked={showAreas}
						onChange={e => setShowAreas ( e.target.checked )}
					/>
				</SimpleRow>
				<SimpleRow>
					<Typography>Show POSTNET Barcode</Typography>
					<Switch
						checked={showBarcode}
						onChange={e => setShowBarcode ( e.target.checked )}
					/>
				</SimpleRow>
				<SimpleRow>
					<Typography sx={{ display: "flex", alignItems: "center" }} >
						Capitalize Text
						<Tooltip title="USPS prefers all lines of an address block to be capitalized" placement="right" >
							<HintIcon sx={{ ml: 1, fontSize: 18, color: "text.secondary" }} />
						</Tooltip>
					</Typography>
					<Switch
						checked={capitalizeText}
						onChange={e => setCapitalizeText ( e.target.checked )}
					/>
				</SimpleRow>
				<SimpleRow>
					<Typography>Reverse Page Order</Typography>
					<Switch
						checked={reversePageOrder}
						onChange={e => setReversePageOrder ( e.target.checked )}
					/>
				</SimpleRow>
				<SimpleRow>
					<Typography sx={{ display: "flex", alignItems: "center" }} >
						Reset All Data
						<Tooltip title="Everything that is stored locally will be replaced with default values" placement="right" >
							<HintIcon sx={{ ml: 1, fontSize: 18, color: "text.secondary" }} />
						</Tooltip>
					</Typography>
					<Button
						variant="standard"
						onClick={() => {
							reset ()
							window.location.reload ()
						}} >
						Reset
					</Button>
				</SimpleRow>
			</Paper>
			<Box sx={{
				p: 2,
				pt: { xs: "25vh", sm: "50vh" },
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}} >
				<Typography variant="overline" sx={{ fontSize: 12 }} >Coded With</Typography>
				<Typography variant="overline" sx={{ fontSize: 12, px: 0.5, color: "primary.main" }} >❤</Typography>
				<Typography variant="overline" sx={{ fontSize: 12 }} >
					By <Link href="https://github.com/null93" target="_blank" color="inherit" underline="hover" >Rafael Grigorian</Link>
				</Typography>
			</Box>
		</Box>
	</Box>
}

export default Editor
