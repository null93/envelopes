import ReactDOM from "react-dom"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "source/theme"
import App from "components/App"
import StorageProvider from "contexts/StorageContext"
import { ThemeProvider } from "@mui/material/styles"
import defaultValues from "source/data"

const NODE_ENV = process.env.NODE_ENV

if ( NODE_ENV !== "production" ) {
	console.log ( "MuiTheme:", theme )
	console.log ( "Default Values:", defaultValues )
}

ReactDOM.render (
	<StorageProvider defaultValues={defaultValues} >
		<ThemeProvider theme={theme} >
			<CssBaseline/>
			<App/>
		</ThemeProvider>
	</StorageProvider>,
	document.querySelector ("#main"),
)
