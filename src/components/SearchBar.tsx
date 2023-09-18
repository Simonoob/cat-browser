import { css } from '@emotion/react'
import { useQuery } from '@tanstack/react-query'
import { useSubmit } from 'react-router-dom'
import { Form as BootstrapForm } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import { breedsQuery, loader } from '../routes/pages/Index'

const styles = {
	root: css({
		position: 'relative',
		width: '20rem',
		maxWidth: '100%',
	}),
}

const SearchBar = () => {
	const { selectedBreed } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>

	const { data: breeds, isLoading } = useQuery(
		breedsQuery.queryKey,
		breedsQuery.queryFn,
	)

	const submit = useSubmit()

	const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		submit(event.currentTarget.form)

	return (
		<BootstrapForm css={styles.root} id="search-form" role="search">
			<BootstrapForm.Group>
				<BootstrapForm.Label>Breed</BootstrapForm.Label>
				<BootstrapForm.Select
					id="breed"
					name="breed"
					defaultValue={selectedBreed ?? undefined}
					onChange={handleBreedChange}
					disabled={isLoading}
				>
					<option value="all">All breeds</option>
					{!!breeds &&
						!isLoading &&
						breeds.map((breed: { id: string; name: string }) => (
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
