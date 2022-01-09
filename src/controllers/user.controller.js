const express = require("express");
const router = express.Router();
const {body,validationResult} = require("express-validator")

const User = require("../models/user.model");

// ***************************************************************************************************

// post ==>> 1. validation with proper message (validation is for 'required: true in schema');
//           2. for validation --> npm i express-validator
//           3. const {body,validationResult} = require("express-validator") in controller
//           4.1. middleware --> body("schema key").isLength({min: 1}).withMessage("xyz is required")
//           4.2. const errors = validationResult(req);
//           4.3. if (!errors.isEmpty()) return res.status(400).send(errors.array());
router.post("",
    // middleware
    body("name").isLength({min:1}).withMessage("name is required"),
    body("age").isLength({min:1}).withMessage("age is required and of min length is one"),
    body("gender").isLength({min:3}).withMessage("gender is required"),
    body("ip_address").isLength({min:3}).withMessage("ip_address is required"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors.array());
        const user = await User.create(req.body);
        return res.status(201).send({ user });
    })

// ***************************************************************************************************    

// get all ==>>  1. pagination   2. total number of page
router.get("", async (req, res) => {
    // 1. pagination => http://localhost:4567/user?page=3&limit=4
    var page = +req.query.page || 1;
    var size = +req.query.limit || 4;
    var offset = (page - 1) * size;
    const user = await User.find().skip(offset).limit(size).lean().exec();
    // 2. total number of page
    const totalPages = Math.ceil((await User.find().countDocuments().lean().exec()) / size);
    return res.status(201).send({ user, totalPages });
})

// ***************************************************************************************************

// get one
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.status(201).send({ user });
})

// ***************************************************************************************************

// delete one
router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(201).send({ user });
})

// ***************************************************************************************************

// patch one
router.patch("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(201).send({ user });
})

module.exports = router;
