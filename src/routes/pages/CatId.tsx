import { css } from '@emotion/react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Card, Stack } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'

const catDetailQuery = (breedId: string, catId: string) => ({
	queryKey: [breedId, catId],
	queryFn: async () => {
		return (await axios.get(`https://api.thecatapi.com/v1/images/${catId}`))
			.data
	},
})

export const loader =
	(queryClient: QueryClient) =>
	async ({ request }: { request: Request }) => {
		const url = new URL(request.url)

		const breedId = url.pathname.split('/')[1]
		const catId = url.pathname.split('/')[2]

		const data = await queryClient.fetchQuery(
			catDetailQuery(breedId, catId).queryKey,
			catDetailQuery(breedId, catId).queryFn,
		)

		if (!data.breeds.find((breed: { id: string }) => breed.id === breedId))
			throw new Error('Not Found')

		return {
			breedId,
			catId,
		}
	}

const styles = {
	root: css({
		width: '100%',
		maxWidth: '80rem',
		padding: '2rem',
	}),
	image: css({
		maxHeight: '50rem',
		maxWidth: '50rem',
		objectFit: 'cover',
		objectPosition: 'center',
		borderRadius: '0.5rem',
		margin: '0 auto',
	}),
	button: css({
		width: '6rem',
	}),
	label: css({
		fontWeight: 'bold',
		fontSize: '1.25rem',
	}),
}

const CatId = () => {
	const { catId, breedId } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>
	const { data } = useQuery(
		catDetailQuery(breedId, catId).queryKey,
		catDetailQuery(breedId, catId).queryFn,
	)
	const navigate = useNavigate()

	return (
		<>
			{data && (
				<Card css={styles.root}>
					<Stack gap={5}>
						<Button
							variant="dark"
							onClick={() => navigate(`/?breed=${breedId}`)}
							css={styles.button}
						>
							Back
						</Button>
						<Card.Img
							variant="top"
							src={data.url}
							css={styles.image}
						/>
						<Card.Body>
							<h2>
								{
									data.breeds.find(
										(breed: { id: string }) =>
											breed.id === breedId,
									).name
								}
							</h2>
							<p>
								<span css={styles.label}>Origin: </span>
								{
									data.breeds.find(
										(breed: { id: string }) =>
											breed.id === breedId,
									).origin
								}
							</p>
							<p>
								<span css={styles.label}>Temperament: </span>
								{
									data.breeds.find(
										(breed: { id: string }) =>
											breed.id === breedId,
									).temperament
								}
							</p>
							<hr />
							<p>
								{
									data.breeds.find(
										(breed: { id: string }) =>
											breed.id === breedId,
									).description
								}
							</p>
						</Card.Body>
					</Stack>
				</Card>
			)}
		</>
	)
}

export default CatId
