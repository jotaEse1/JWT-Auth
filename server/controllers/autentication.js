const { verify, sign } = require('jsonwebtoken');
const { hash, compare, genSalt } = require('bcryptjs') 
const { body, validationResult } = require('express-validator');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, 'server', '.env')})
const {sendAccessToken, sendRefreshToken} = require('../helper/helper')

//actions from db
const {User} = require('../db')

//controllers
const signIn = async (req, res) => {
    let errors = validationResult(req),
        {username, password, email} = req.body;
       
    //checking for errors in email and password
    if(!errors.isEmpty()) return res.json({error: errors.array()})

    try {
        //check if the user exists
        const find = await User.find({email})
        if(find.length) return res.json({success: true, msg: 'user exists'})
    
        //hash password
        const salt = await genSalt()
        password = await hash(password, salt)

        //new user
        const newUser = new User({username, email, password, token: ''})
        await newUser.save()

        res.status(201).json({success: true, msg: 'user created'})
    } catch {
        res.status(500).json({error: [{msg: 'Something went wrong. Try again later...'}]});
    }
}

const logIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        //find user and compare hash password
        const user = await User.find({email})
        if(!user.length) return res.send({success: true, msg: 'Incorrect email or password'})
    
        const {password: hashPassword, _id} = user[0]
            verified = await compare(password, hashPassword) 
        if(!verified) return res.send({success: true, msg: 'Incorrect email or password'})
    
        //create access and refresh tokens
        const accessToken = sign({_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}),
            refreshToken = sign({_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
        
        //save refreshToken in database 
        await User.updateOne({email}, {$set: {'token': refreshToken}})
    
        //send tokens
        sendRefreshToken(res, refreshToken)
        sendAccessToken(res, email, accessToken)
        
    } catch {
        res.status(500).json({error: [{msg: 'Something went wrong. Try again later...'}]});
    }

    

}

const checkToken = async (req, res) => {
    const token = req.cookies.refreshtoken
  
    //validate if token exists
    if(!token) return res.json({success: true, accessToken: ''})

    //verify token
    let payload;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch {
        return res.json({success: true, accesstoken: '' })
    }

    //validate user
    const user = await User.find({'_id': payload['_id']}),
        {_id, token: dbToken} = user[0];

    if(!user) return res.json({success: true, accessToken: ''})
    if(dbToken !== token) return res.json({success: true, accessToken: ''})

    //create access and refresh tokens
    const accessToken = sign({_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}),
        refreshToken = sign({_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})

    //save refreshToken in database 
    await User.updateOne({_id}, {$set: {'token': refreshToken}})

    //send tokens
    sendRefreshToken(res, refreshToken)
    res.json({accessToken})
}

const logOut = async (req, res) => {
    const token = req.cookies.refreshtoken;

    if(!token) return res.json({success: true, msg: 'No token'})

    //find user, i need the _id
    let payload;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        return res.json({success: true, msg: 'Something went wrong. Try again later...' })
    }

    //delete token in db
    await User.updateOne({'_id': payload['_id']}, {$set: {'token': ''}})

    //delete cookie
    res.clearCookie('refreshtoken')
    return res.json({success: true, msg: 'Logged out'})
}


module.exports = {signIn, logIn, checkToken, logOut}
