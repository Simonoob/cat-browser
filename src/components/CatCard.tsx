import { css } from '@emotion/react'
import { Button, Card } from 'react-bootstrap'
import { loader } from '../routes/pages/Index'
import { useLoaderData, useNavigate } from 'react-router-dom'

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
			[`&::view-transition-old(${`image-${imageId}`})`]: {
				animation: 'none',
				mixBlendMode: 'normal',
				height: '100%',
				overflow: 'clip',
				opacity: 1,
				isolation: 'isolate',
				zIndex: 0,
			},
			[`&::view-transition-new(${`image-${imageId}`})`]: {
				animation: 'none',
				mixBlendMode: 'normal',
				height: '100%',
				overflow: 'clip',
				opacity: 1,
				isolation: 'isolate',
				zIndex: 1,
			},
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
						document.startViewTransition(async () => {
							navigate(`/${selectedBreed}/${image.id}`)

							// await until the url changes
							while (
								window.location.pathname !==
								`/${selectedBreed}/${image.id}`
							) {
								await new Promise(resolve =>
									setTimeout(resolve, 100),
								)
							}
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
