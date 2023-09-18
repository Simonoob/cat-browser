import { Theme, css } from '@emotion/react'
import { Button, Card } from 'react-bootstrap'

const styles = {
	root: css({
		width: '15rem',
		maxWidth: '100%',
	}),
	image: css({
		width: '100%',
		aspectRatio: '4 / 3',
		objectFit: 'cover',
		objectPosition: 'center',
	}),
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

const CatCard = ({ image }: { image: string }) => {
	return (
		<Card css={styles.root}>
			<Card.Img variant="top" src={image} css={styles.image} />
			<Card.Body>
				<Button variant="primary" href="#" css={styles.button}>
					<span>See details</span>
				</Button>
			</Card.Body>
		</Card>
	)
}

export default CatCard
