const {User} = require("../../../Models/userModel");
const jwt = require("jsonwebtoken");
const config = require('config');
const mongoose = require('mongoose');
describe('check creating of JWT', () => {
   it('check jwt', () => {
    const payload ={_id:new mongoose.Types.ObjectId().toHexString(),isAdmin:true};
    const user = new User(payload);
    const token =  user.generateToken();
    const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload)
   });
});