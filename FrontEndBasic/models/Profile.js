const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  github: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        default: Date.now
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        default: Date.now
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    github: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

function validateProfile(profile) {
  const experienceItems = Joi.object().keys({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.bool()
  });
  const educationItems = Joi.object().keys({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.bool()
  });
  const socialItems = Joi.object().keys({
    youtube: Joi.string(),
    twitter: Joi.string(),
    facebook: Joi.string(),
    linkedin: Joi.string(),
    instagram: Joi.string(),
    github: Joi.string()
  });

  const schema = {
    handle: Joi.string()
      .min(2)
      .max(40)
      .required(),
    company: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
    status: Joi.string().required(),
    skills: Joi.array().required(),
    bio: Joi.string(),
    github: Joi.string(),
    experience: Joi.array().items(experienceItems),
    education: Joi.array().items(educationItems),
    social: socialItems
  };
  return Joi.validate(profile, schema);
}

function validateProfileExperience(expereinceItems) {
  const experiencItemsSchema = Joi.object().keys({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.bool()
  });
  const experienceSchema = {
    experience: Joi.array().items(experiencItemsSchema)
  };
  return Joi.validate(expereinceItems, experienceSchema);
}

function validateProfileEducation(educationItems) {
  const educationItemsSchema = Joi.object().keys({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.bool()
  });
  const educationSchema = Joi.object().keys({
    experience: Joi.array().items(educationItemsSchema)
  });
  return Joi.validate(educationItems, educationSchema);
}
exports.Profile = mongoose.model("profile", ProfileSchema);
exports.validateProfile = validateProfile;
exports.validateProfileExperience = validateProfileExperience;
exports.validateProfileEducation = validateProfileEducation;
