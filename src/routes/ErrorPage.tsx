import { Theme, css } from '@emotion/react'
import { ErrorResponse, useRouteError } from 'react-router-dom'

const styles = {
	root: (theme: Theme) =>
		css({
			padding: '3rem 1rem',
			width: '100vw',
			minHeight: '100vh',
			backgroundColor: theme.colors.background,
			position: 'relative',
			display: 'grid',
			placeItems: 'center',
		}),
	content: css({
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxWidth: '800px',
		padding: '1rem 3rem',
		borderRadius: '0.5rem',
	}),
}

const ErrorPage = () => {
	const error = useRouteError() as ErrorResponse

	return (
		<main css={styles.root}>
			<div css={styles.content}>
				<h1>Oops!</h1>
				<p>
					Apologies but we could not load new cats for you at this
					time! Miau!
				</p>
				<p>
					<i>{error.statusText || error.data}</i>
				</p>
			</div>
		</main>
	)
}

export default ErrorPage
