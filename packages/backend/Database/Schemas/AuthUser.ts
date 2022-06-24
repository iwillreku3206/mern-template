import Joi from 'joi'

export interface AuthUser {
	_id?: string
	username: string
	hashedKey: string
}

export const AuthUserSchema = Joi.object({
	username: Joi.string().alphanum().required(),
	hashedKey: Joi.string().pattern(new RegExp(/[A-z0-9/.$].*/)),
})
