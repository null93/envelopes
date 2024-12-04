"use strict"

import { useContext } from "react"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import Switch from "@mui/material/Switch"
import Divider from "@mui/material/Divider"
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
import sizes from "source/sizes"

function determinePersetValue ( props ) {
	const {
		envelopePreset,
		envelopeHeight,
		envelopeWidth,
		returnHeight,
		flapHeight,
		fontSize,
	} = props
	const preset = sizes [ envelopePreset ]
	if ( false
		|| preset.height != envelopeHeight
		|| preset.width != envelopeWidth
		|| preset.returnHeight != returnHeight
		|| preset.flapHeight != flapHeight
		|| preset.fontSize != fontSize
	) {
		return "custom"
	}
	return envelopePreset
}

function Editor ( props ) {

	const { addressCount } = props

	const {
		reset,
		returnAddress, setReturnAddress,
		recipientAddresses, setRecipientAddresses,
		envelopePreset, setEnvelopePreset,
		envelopeWidth, setEnvelopeWidth,
		envelopeHeight, setEnvelopeHeight,
		flapHeight, setFlapHeight,
		returnHeight, setReturnHeight,
		fontFamily, setFontFamily,
		firstLineFontFamily, setFirstLineFontFamily,
		fontSize, setFontSize,
		firstLineFontSize, setFirstLineFontSize,
		extraSpaceAfterFirstLine, setExtraSpaceAfterFirstLine,
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
					fullWidth
					multiline
					minRows={3}
					variant="filled"
					label="Return Address"
					value={returnAddress}
					onChange={e => setReturnAddress ( e.target.value.split ("\n").slice ( 0, 5 ).join ("\n") )}
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
					<Typography>Envelope Preset</Typography>
					<Select
						variant="filled"
						hiddenLabel={true}
						value={determinePersetValue ({
							envelopePreset,
							envelopeHeight,
							envelopeWidth,
							returnHeight,
							flapHeight,
							fontSize,
						})}
						onChange={e => {
							setEnvelopePreset ( e.target.value )
							if ( e.target.value !== "custom" ) {
								const preset = sizes [ e.target.value ]
								setEnvelopeHeight ( preset.height )
								setEnvelopeWidth ( preset.width )
								setFontSize ( preset.fontSize )
								setFlapHeight ( preset.flapHeight )
								setReturnHeight ( preset.returnHeight )
							}
						}} >
						{
							Object.keys ( sizes ).map ( key =>
								<MenuItem key={key} value={key} >{key}</MenuItem>
							)
						}
						<MenuItem value="custom" disabled >Custom</MenuItem>
					</Select>
				</SimpleRow>
				<SimpleRow>
					<Typography>Envelope Dimensions </Typography>
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} >
						<TextField
							type="number"
							variant="filled"
							hiddenLabel={true}
							value={envelopeHeight}
							placeholder="1.00"
							onChange={e => e.target.value >= 2.0 ? setEnvelopeHeight ( parseFloat ( e.target.value ) ) : setEnvelopeHeight ( 2.0 )}
							sx={{ width: 95 }}
							inputProps={{ min: "1", style: { textAlign: "right" } }}
							InputProps={{ endAdornment: <InputAdornment position="end" >″ H</InputAdornment> }}
						/>
						<Divider orientation="vertical" flexItem />
						<TextField
							type="number"
							variant="filled"
							hiddenLabel={true}
							value={envelopeWidth}
							placeholder="1.00"
							onChange={e => e.target.value >= 2.0 ? setEnvelopeWidth ( parseFloat ( e.target.value ) ) : setEnvelopeWidth ( 2.0 )}
							inputProps={{ min: "1", style: { textAlign: "right" } }}
							sx={{ width: 95 }}
							InputProps={{ endAdornment: <InputAdornment position="end" >″ W</InputAdornment> }}
						/>
					</Box>
				</SimpleRow>
				<SimpleRow>
					<Typography>Return Address Height</Typography>
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} >
						<TextField
							type="number"
							variant="filled"
							hiddenLabel={true}
							value={returnHeight}
							placeholder="1.00"
							onChange={e => setReturnHeight ( e.target.value )}
							inputProps={{ min: "1", style: { textAlign: "right" } }}
							sx={{ width: 100 }}
							InputProps={{ endAdornment: <InputAdornment position="end" >″ W</InputAdornment> }}
						/>
					</Box>
				</SimpleRow>
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
						<MenuItem value="Poppins" >Poppins</MenuItem>
						<MenuItem value="Dancing Script" >Dancing Script</MenuItem>
						<MenuItem value="Satisfy" >Satisfy</MenuItem>
						<MenuItem value="Dawning of a New Day" >Dawning of a New Day</MenuItem>
					</Select>
				</SimpleRow>
				<SimpleRow>
					<Typography sx={{ display: "flex", alignItems: "center" }} >
						First Line Font Family
					</Typography>
					<Select
						variant="filled"
						hiddenLabel={true}
						value={firstLineFontFamily}
						onChange={e => setFirstLineFontFamily ( e.target.value )} >
						<MenuItem value="Open Sans" >Open Sans</MenuItem>
						<MenuItem value="Roboto" >Roboto</MenuItem>
						<MenuItem value="Roboto Mono" >Roboto Mono</MenuItem>
						<MenuItem value="Poppins" >Poppins</MenuItem>
						<MenuItem value="Dancing Script" >Dancing Script</MenuItem>
						<MenuItem value="Satisfy" >Satisfy</MenuItem>
						<MenuItem value="Dawning of a New Day" >Dawning of a New Day</MenuItem>
					</Select>
				</SimpleRow>
				<SimpleRow>
					<Typography>Base Font Size</Typography>
					<Select
						variant="filled"
						hiddenLabel={true}
						value={fontSize}
						onChange={e => setFontSize ( e.target.value )} >
						<MenuItem value={8} >8 pt</MenuItem>
						<MenuItem value={9} >9 pt</MenuItem>
						<MenuItem value={10} >10 pt</MenuItem>
						<MenuItem value={11} >11 pt</MenuItem>
						<MenuItem value={12} >12 pt</MenuItem>
						<MenuItem value={13} >13 pt</MenuItem>
						<MenuItem value={14} >14 pt</MenuItem>
						<MenuItem value={15} >15 pt</MenuItem>
						<MenuItem value={16} >16 pt</MenuItem>
						<MenuItem value={17} >17 pt</MenuItem>
						<MenuItem value={18} >18 pt</MenuItem>
						<MenuItem value={19} >19 pt</MenuItem>
						<MenuItem value={20} >20 pt</MenuItem>
						<MenuItem value={21} >21 pt</MenuItem>
						<MenuItem value={22} >22 pt</MenuItem>
					</Select>
				</SimpleRow>
				<SimpleRow>
					<Typography>First Line Font Size</Typography>
					<Select
						variant="filled"
						hiddenLabel={true}
						value={firstLineFontSize}
						onChange={e => setFirstLineFontSize ( e.target.value )} >
						<MenuItem value={8} >8 pt</MenuItem>
						<MenuItem value={9} >9 pt</MenuItem>
						<MenuItem value={10} >10 pt</MenuItem>
						<MenuItem value={11} >11 pt</MenuItem>
						<MenuItem value={12} >12 pt</MenuItem>
						<MenuItem value={13} >13 pt</MenuItem>
						<MenuItem value={14} >14 pt</MenuItem>
						<MenuItem value={15} >15 pt</MenuItem>
						<MenuItem value={16} >16 pt</MenuItem>
						<MenuItem value={17} >17 pt</MenuItem>
						<MenuItem value={18} >18 pt</MenuItem>
						<MenuItem value={19} >19 pt</MenuItem>
						<MenuItem value={20} >20 pt</MenuItem>
						<MenuItem value={21} >21 pt</MenuItem>
						<MenuItem value={22} >22 pt</MenuItem>
					</Select>
				</SimpleRow>
				<SimpleRow>
					<Typography>Extra Space After First Line</Typography>
					<Switch
						checked={extraSpaceAfterFirstLine}
						onChange={e => setExtraSpaceAfterFirstLine ( e.target.checked )}
					/>
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
				{
					returnOnBackFlap && <SimpleRow>
						<Typography>Back Flap Height</Typography>
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} >
							<TextField
								type="number"
								variant="filled"
								hiddenLabel={true}
								value={flapHeight}
								placeholder="1.00"
								onChange={e => setFlapHeight ( e.target.value )}
								inputProps={{ min: "1", style: { textAlign: "right" } }}
								sx={{ width: 100 }}
								InputProps={{ endAdornment: <InputAdornment position="end" >″ W</InputAdornment> }}
							/>
						</Box>
					</SimpleRow>
				}
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
