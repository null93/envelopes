"use strict"

import { createContext, useState } from "react"

function getItem ( key, defaultValue ) {
	const found = localStorage.getItem ( key )
	if ( found ) return JSON.parse ( found )
	localStorage.setItem ( key, JSON.stringify ( defaultValue ) )
	return defaultValue
}

function setItem ( key, value ) {
	localStorage.setItem ( key, JSON.stringify ( value ) )
}

function useSavedState ( key, defaultValue ) {
	const [ value, setter ] = useState ( getItem ( key, defaultValue ) )
	const wrappedSetter = value => {
		setItem ( key, value )
		return setter ( value )
	}
	return {
		[key]: value,
		[`set${key.charAt (0).toUpperCase () + key.slice (1)}`]: wrappedSetter,
	}
}

export const StorageContext = createContext ()

export default ({ defaultValues, children }) => {
	const reset = () => Object.keys ( defaultValues ).map ( key => setItem ( key, defaultValues [ key ] ) )
	const store = Object.keys ( defaultValues ).reduce ( ( a, e ) => {
		return { ...a, ...useSavedState ( e, defaultValues [ e ] ) }
	}, { reset } )
	return <StorageContext.Provider value={store} >
		{children}
	</StorageContext.Provider>
}
