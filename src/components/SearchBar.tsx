import { css } from '@emotion/react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSubmit } from 'react-router-dom'
import { Form as BootstrapForm } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'

const styles = {
	root: css({
		position: 'relative',
		width: '20rem',
		maxWidth: '100%',
	}),
}

const breedsQuery = {
	queryKey: ['breeds'],
	queryFn: async () => {
		const data = await axios.get('https://api.thecatapi.com/v1/breeds')
		return data.data
	},
}

export const loader =
	(queryClient: QueryClient) =>
	async ({ request }: { request: Request }) => {
		const url = new URL(request.url)
		const selectedBreed = url.searchParams.get('breed')
		if (!queryClient.getQueryData(breedsQuery.queryKey)) {
			await queryClient.fetchQuery(
				breedsQuery.queryKey,
				breedsQuery.queryFn,
			)
		}
		return { selectedBreed }
	}

const SearchBar = () => {
	const { selectedBreed } = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>

	const { data: breeds } = useQuery(breedsQuery.queryKey) as {
		data: { id: string; name: string }[]
	}

	const submit = useSubmit()

	const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		submit(event.currentTarget.form)

	return (
		<BootstrapForm css={styles.root} id="search-form" role="search">
			<BootstrapForm.Group controlId="bootstrapformBasicEmail">
				<BootstrapForm.Label>Breed</BootstrapForm.Label>
				<BootstrapForm.Select
					id="breed"
					name="breed"
					defaultValue={selectedBreed ?? undefined}
					onChange={handleBreedChange}
				>
					{breeds.map(breed => (
						<option value={breed.id} key={breed.id}>
							{breed.name}
						</option>
					))}
				</BootstrapForm.Select>
			</BootstrapForm.Group>
		</BootstrapForm>
	)
}

export default SearchBar
