import "@fontsource/roboto"
import { createTheme } from "@mui/material/styles"
import { deepOrange } from "@mui/material/colors"

export default createTheme ({
	typography: {
		fontFamily: "Roboto",
		fontSize: 14,
	},
	palette: {
		mode: "dark",
		primary: {
			main: deepOrange [ 500 ],
		},
		background: {
			default: "#121212",
			paper: "#1A1A1A",
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				html: {
					height: "100%",
					width: "100%",
				},
				body: {
					margin: 0,
					height: "100%",
					width: "100%",
				},
				"#main": {
					height: "100%",
					width: "100%",
				},
				"::selection": {
					background: deepOrange [ 500 ],
					color: "#121212",
				},
				"input::-webkit-outer-spin-button": {
					appearance: "none",
					margin: 0,
				},
				"input::-webkit-inner-spin-button": {
					appearance: "none",
					margin: 0,
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
					backgroundColor: "#1A1A1A",
					"&$focused, &:hover, &$disabled, &$disabled:hover": {
						backgroundColor: "#121212",
					},
				},
				input: {
					paddingTop: 9.5,
					paddingBottom: 9.5,
				},
			},
			defaultProps: {
				disableUnderline: true,
				margin: "dense",
			},
		},
	},
})
