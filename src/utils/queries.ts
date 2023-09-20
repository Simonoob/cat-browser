import axios from 'axios'
import { API_BASE_URL, API_ITEMS_PER_PAGE } from './constants'

export const imagesQuery = (breed = 'none') => ({
	queryKey: ['images', breed],
	queryFn: async ({ pageParam = 0 }) => {
		const apiKey = import.meta.env.VITE_CAT_API_KEY

		if (breed === 'none') return { data: [] }

		return await axios.get(`${API_BASE_URL}/images/search`, {
			params: {
				breed_id: breed,
				limit: API_ITEMS_PER_PAGE,
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
	queryFn: async () => await axios.get(`${API_BASE_URL}/breeds`),
}

export const catDetailsQuery = (breedId: string, catId: string) => ({
	queryKey: [breedId, catId],
	queryFn: async () => {
		return (await axios.get(`${API_BASE_URL}/images/${catId}`)).data
	},
})
