// extend the document object with a startViewTransition method
declare global {
	interface Document {
		startViewTransition: undefined | ((callback: () => void) => void) // TS doesn't know about this method yet, so we need to extend the Document interface
	}
}

const navigateWithTransition = ({
	navigate,
	to,
}: {
	navigate: (to: string) => void
	to: string
}) => {
	if (
		!document.startViewTransition ||
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	)
		return navigate(to)

	document.startViewTransition &&
		document.startViewTransition(async () => {
			const oldPath = window.location.pathname
			navigate(to)

			// await until the url changes
			while (window.location.pathname === oldPath) {
				await new Promise(resolve => setTimeout(resolve, 50))
			}
		})
}

export default navigateWithTransition
