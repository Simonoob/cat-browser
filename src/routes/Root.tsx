import { Theme, css } from '@emotion/react'
import { Stack } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const styles = {
	root: (theme: Theme) =>
		css({
			padding: '3rem 1rem',
			width: '100vw',
			minHeight: '100vh',
			backgroundColor: theme.colors.background,
		}),
	content: (theme: Theme) =>
		css({
			margin: '0 auto',
			width: '100%',
			maxWidth: '1400px',
			position: 'relative',
			color: theme.colors.primary,
		}),
}

const Root = () => {
	return (
		<main css={styles.root}>
			<div css={styles.content}>
				<Stack gap={5}>
					<h1>Cat Browser</h1>
					<Outlet />
				</Stack>
			</div>
		</main>
	)
}

export default Root
