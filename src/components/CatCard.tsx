import { css } from '@emotion/react'
import { Button, Card } from 'react-bootstrap'
import CustomButton from './Button'

const styles = {
	root: css({
		width: '100%',
	}),
	image: css({
		width: '100%',
		aspectRatio: '4 / 3',
		objectFit: 'cover',
		objectPosition: 'center',
	}),
	button: css({
		width: '100%',
	}),
}

const CatCard = ({ image }: { image: string }) => {
	return (
		<Card css={styles.root}>
			<Card.Img variant="top" src={image} css={styles.image} />
			<Card.Body>
				<Button variant="dark" css={styles.button}>
					See Details
				</Button>
			</Card.Body>
		</Card>
	)
}

export default CatCard
