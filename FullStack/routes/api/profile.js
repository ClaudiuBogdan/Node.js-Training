const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile Model
const { Profile, validateProfile } = require("../../models/Profile");
//Load User Model
const { User } = require("../../models/User");

//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile works!" });
});

//@route    GET api/profile
//@desc     Get current user profile
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        const errorMsg = "Profile not found!";
        if (!profile) return res.status(404).json(errorMsg);
        res.json(profile);
      })
      .catch(err => res.status(500).json(err));
  }
);

//@route    POST api/profile
//@desc     Create or update profile
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate profile data
    const { error } = validateProfile(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Get fields
    const profileFields = {};
    profileFields.user = req.user._id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Experience
    if (req.body.experience)
      profileFields.experience = JSON.parse(req.body.experience);
    //Education
    if (req.body.education)
      profileFields.education = JSON.parse(req.body.education);
    //Skills - Split into array
    if (req.body.skills) profileFields.skills = JSON.parse(req.body.skills);
    //Social
    if (req.body.social) profileFields.social = JSON.parse(req.body.social);

    if (req.body.date) profileFields.date = req.body.date;
    // res.json(profileFields);

    Profile.findOne({ user: req.user._id }).then(profile => {
      if (profile) {
        //Update profile
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      } else {
        //Create profile

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errMsg = "That handle already esists";
            res.status(400).json(errMsg);
          }

          //Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
