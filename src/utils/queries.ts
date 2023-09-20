import axios from 'axios'

export const imagesQuery = (breed = 'none') => ({
	queryKey: ['images', breed],
	queryFn: async ({ pageParam = 0 }) => {
		const apiKey = import.meta.env.VITE_CAT_API_KEY

		if (breed === 'none') return { data: [] }

		return await axios.get('https://api.thecatapi.com/v1/images/search', {
			params: {
				breed_id: breed,
				limit: 4,
				page: pageParam,
				order: 'ASC',
			},
			headers: {
				'x-api-key': apiKey,
			},
		})
	},
})

export const breedsQuery = {
	queryKey: ['breeds'],
	queryFn: async () => await axios.get('https://api.thecatapi.com/v1/breeds'),
}

export const catDetailsQuery = (breedId: string, catId: string) => ({
	queryKey: [breedId, catId],
	queryFn: async () => {
		return (await axios.get(`https://api.thecatapi.com/v1/images/${catId}`))
			.data
	},
})
