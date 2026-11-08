import { api } from './http'

export const getSite = async () => (await api.get('/site')).data
export const submitAppointment = async (payload) => (await api.post('/appointments', payload)).data
