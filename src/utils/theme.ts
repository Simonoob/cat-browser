import '@emotion/react'

const theme = {
	colors: {
		background: '#f9f9f9',
	},
}

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			background: string
		}
	}
}

export default theme
