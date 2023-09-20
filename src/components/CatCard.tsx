import { css } from '@emotion/react'
import { Button, Card } from 'react-bootstrap'
import { loader } from '../routes/pages/Index'
import { useLoaderData, useNavigate } from 'react-router-dom'
import navigateWithTransition from '../utils/navigateWithTransition'

const styles = {
	root: css({
		width: '100%',
	}),
	image: (imageId: string) =>
		css({
			width: '100%',
			height: '100%',
			aspectRatio: '4 / 3',
			objectFit: 'cover',
			objectPosition: 'center',
			viewTransitionName: `image-${imageId}`,
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
		ReturnType<ReturnType<typeof loader>>
	>

	const navigate = useNavigate()

	return (
		<Card css={styles.root}>
			<Card.Img
				variant="top"
				src={image.url}
				css={styles.image(image.id)}
			/>
			<Card.Body>
				<Button
					variant="dark"
					css={styles.button}
					onClick={() =>
						navigateWithTransition({
							to: `/${selectedBreed}/${image.id}`,
							navigate,
						})
					}
				>
					See Details
				</Button>
			</Card.Body>
		</Card>
	)
}

export default CatCard
