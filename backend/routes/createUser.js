const express = require("express");
const router = express.Router();
const user =require("../models/User");
const{body , validationResult} = require('express-validator');
const jwt =require("jsonwebtoken"); 
const bcrypt = require("bcryptjs");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz123456";

router.post("/createuser" ,[
body(`email`).isEmail(),
body(`name`).isLength({min:5}),
body(`password` ,"Password is not valid").isLength({min:5})],
async(req , res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let secPasaword = await bcrypt.hash(req.body.password , salt);

    try{
        await user.create({
            name:req.body.name,
            password:secPasaword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }catch(err){
            console.log(err);
            res.json({success:false});
    }
})

router.post("/loginuser" ,[
body(`email`).isEmail(),
body(`password` ,"Password is not valid").isLength({min:5})],
async(req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

        let email =req.body.email;

        try{
           let userData = await user.findOne({email});
            if(!userData){
                return res.status(400).json({errors:"Try logging in with correct credentials"})
            }
            
            const pswrdCompare = await bcrypt.compare(req.body.password ,userData.password);

            if(!pswrdCompare){
                return res.status(400).json({errors:"Try logging in with correct credentials"})
            }

            const data={
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret)
            return res.json({success:true , authToken:authToken})
        }
        catch(err){
                console.log(err);
                res.json({success:false});
        }
    })

    // Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

module.exports = router ;