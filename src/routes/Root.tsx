import { Theme, css } from '@emotion/react'
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
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			maxWidth: '800px',
			color: theme.colors.primary,
		}),
}

const Root = () => {
	return (
		<div css={styles.root}>
			<div css={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}

export default Root
