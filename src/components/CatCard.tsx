import { css } from '@emotion/react'
import { Button, Card } from 'react-bootstrap'
import { loader } from '../routes/pages/Index'
import { useLoaderData, useNavigate } from 'react-router-dom'

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

const CatCard = ({
	image,
}: {
	image: {
		url: string
		id: string
	}
}) => {
	const { selectedBreed } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>

	const navigate = useNavigate()

	return (
		<Card css={styles.root}>
			<Card.Img variant="top" src={image.url} css={styles.image} />
			<Card.Body>
				<Button
					variant="dark"
					css={styles.button}
					onClick={() => navigate(`/${selectedBreed}/${image.id}`)}
				>
					See Details
				</Button>
			</Card.Body>
		</Card>
	)
}

export default CatCard
