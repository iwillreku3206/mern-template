import Joi from 'joi'
import { ObjectId } from 'mongodb'

export const SampleTypeSchema = Joi.object({
	name: Joi.string().required(),
})

export interface SampleType {
	_id?: ObjectId
	name: string
}

export const DefaultSampleType: SampleType = {
	name: '',
}
