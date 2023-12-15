const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema( {
    urn: {
      type: String,
      unique:true,
      required: true,
    },
    establishmentName: {
      type: String,
      required: false,
    },
    typeOfEstablishment: {
      type: String,
      required: false,
    },
    establishmentStatus: {
      type: String,
      required: false,
    },
    statutoryLowAge: {
      type: String,
      required: false,
    },
    statutoryHighAge: {
      type: String,
      required: false,
    },
    boarders: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    admissionsPolicy: {
      type: String,
      required: false,
    },
    schoolCapacity: {
      type: String,
      required: false,
    },
    numberOfPupils: {
      type: String,
      required: false,
    },
    numberOfBoys: {
      type: String,
      required: false,
    },
    numberOfGirls: {
      type: String,
      required: false,
    },
    OfstedLastInsp: {
      type: String,
      required: false,
    },
    OfstedRating: {
      type: String,
      required: false,
    },
    Street: {
      type: String,
      required: false,
    },
    locality: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    town: {
      type: String,
      required: false,
    },
    county: {
      type: String,
      required: false,
    },
    postcode: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    schoolWebsite: {
      type: String,
      required: false,
    },
    telephoneNum: {
      type: String,
      required: false,
    },
    headTitle: {
      type: String,
      required: false,
    },
    headFirstName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    headLastName: {
      type: String,
      required: false,
    },
    headPreferredJobTitle: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  });

const Establishment = mongoose.model('School', establishmentSchema);

module.exports = Establishment;
