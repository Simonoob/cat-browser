import '@emotion/react'

const theme = {
	colors: {
		background: '#EDF2F4',
		secondary: '#8D99AE',
		primary: '#2B2D42',
	},
}

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			background: string
			secondary: string
			primary: string
		}
	}
}

export default theme
