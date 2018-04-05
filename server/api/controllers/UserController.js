/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi= require('joi');
module.exports = {
    
    signup: async function (req,res){
        try{
            const schema =Joi.object().keys({
                userEmail:Joi.string().required().email(),
                userPassword: Joi.string().required()
            })
            //validate the email and password
            const { userEmail, userPassword}= await Joi.validate(req.allParams(),schema)

            //create a new user
            const user= await User.create({
                userEmail,
                userPassword
            }).fetch();
            //send a new user in response
            return res.ok(user)
        }catch(err){
            if(err.name==='ValidationError'){
                return res.badRequest({err})
            }
            return res.serverError(err);

        }
    },
    getAllUsers: async function (req, res) {
        return res.ok({msg:"OK"})
    },
    login: async function (req, res){
        try {
            const schema = Joi.object().keys({
                userEmail: Joi.string().required().email(),
                userPassword: Joi.string().required()
            })
            //validate the email and password
            const { userEmail, userPassword } = await Joi.validate(req.allParams(), schema);
            const user = await User.findOne({ userEmail});
            console.log(user);
            if(!user){
                return res.notFound({err: 'user does not exist'});
            }
            //const matchedPassword= await UtilService.comparePassword(password,user.password);
           

            if (userPassword !== user.userPassword){
                return res.badRequest({ err: 'unauthorized', userPassword: userPassword, userBd: user.userPassword});
            }
            const token = JWTService.issuer({ user: user.id }, '1 day');
            return res.ok(token);

        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.badRequest({ err })
            }
            return res.serverError(err);

        }
    }
};

