
const Joi=require('joi')
const UsersSchema=Joi.object().keys({
    name:Joi.string().alphanum().required(),
    password:Joi.string().min(8).max(30).alphanum().required()
})
module.exports=UsersSchema;