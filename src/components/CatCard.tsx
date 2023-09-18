import { Theme, css } from '@emotion/react'
import { Button, Card } from 'react-bootstrap'

const styles = {
	root: {
		width: '18rem',
		maxWidth: '100%',
	},
	button: (theme: Theme) =>
		css({
			width: '100%',
			backgroundColor: theme.colors.primary,
			border: 'none',
			display: 'flex',
			padding: '0',
			span: {
				position: 'relative',
				top: '-0.2rem',
				backgroundColor: theme.colors.secondary,
				width: '100%',
				padding: '0.5rem 3rem',
				borderRadius: '0.35rem',
			},
			'&:hover, &:focus': {
				backgroundColor: theme.colors.primary,
			},
			'&:first-of-type:active': {
				backgroundColor: theme.colors.primary,
				span: {
					top: '-0.1rem',
				},
			},
		}),
}

const CatCard = () => {
	return (
		<Card css={styles.root}>
			<Card.Img
				variant="top"
				src="https://w0.peakpx.com/wallpaper/409/266/HD-wallpaper-anime-pokemon-pikachu-bulbasaur-pokemon-charmander-pokemon-squirtle-pokemon-snorlax-pokemon-thumbnail.jpg"
			/>
			<Card.Body>
				<Button variant="primary" href="#" css={styles.button}>
					<span>See details</span>
				</Button>
			</Card.Body>
		</Card>
	)
}

export default CatCard
