
const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotEnv = require('dotenv')

dotEnv.config();

const secretkey = process.env.WhatIsYourName;

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const vendorEmail = await Vendor.findOne({ email })
        if (vendorEmail) {
            return res.status(400).json("This Email Already token")
        }
        else {
            const hashedpassword = await bcrypt.hash(password, 10);
            const newVendor = await Vendor({ username, email, password: hashedpassword });
            await newVendor.save();
            res.status(201).json({ massage: "Vendor registered successfully" });
            console.log('registered')
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal server error" })
    }
}


const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email })
        if (vendorEmail) {
            const ispassworMatch = await bcrypt.compare(password, vendorEmail.password)
            if (ispassworMatch === true) {
                const payload = { vendorId: vendorEmail._id }
                const Jwt = jwt.sign(payload, secretkey, { expiresIn: "1h" })

                res.status(200).json({ success: "login successful", Jwt })
            }
            else {
                res.status(500).json("password")
            }
        }
        else {
            res.send(500).json('invalid user')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllvendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');//populte enduku ante vendor lo save chesina firm ante restuarent info get cheyyaniki if i don't use puplur i only get vendor info not restuarent info .
        res.status(200).json(vendors)
    } catch (error) {
        console.log(error)
        res.status(500).json("internal serve error")
    }
}

const getOnevendor = async (req, res) => {
    // const {vendorId} = req;
    const vendorId = req.params.id;
    try {
        // const vendor = await Vendor.findOne({_id:vendorId}).populate('firm') we can do like this 
        const vendor = await Vendor.findOne({_id:vendorId}).populate('firm')
        if (!vendor) {
            return res.status(404).json({ error: "vendor not found" })
        }
        res.status(200).json(vendor)
    } catch (error) {
        console.log(error)
        res.status(500).json("internal serve error")
    }
}


module.exports = { vendorRegister, vendorLogin, getAllvendors, getOnevendor }