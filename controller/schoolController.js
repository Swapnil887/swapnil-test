const Establishment = require("../model/schoolModel");

const schoolController = {
  getAllSchools: async (req, res) => {
    const data = await Establishment.find();
    res.send(data);
  },

  getUniqueSchool: async (req, res) => {
    const { urn } = req.params;
    const data = await Establishment.findOne({ urn });
    res.send(data);
  },

  createSchool: async (req, res) => {
    const payLoad = req.body;

    var data = [
      "urn",
      "establishmentName",
      "typeOfEstablishment",
      "establishmentStatus",
      "statutoryLowAge",
      "statutoryHighAge",
      "boarders",
      "gender",
      "admissionsPolicy",
      "schoolCapacity",
      "numberOfPupils",
      "numberOfBoys",
      "numberOfGirls",
      "OfstedLastInsp",
      "OfstedRating",
      "Street",
      "town",
      "postcode",
      "region",
      "schoolWebsite",
      "telephoneNum",
      "headTitle",
      "headFirstName",
      "headLastName",
      "headPreferredJobTitle",
    ];

    for (var i in data) {
      // console.log(i)
      if (!payLoad[data[i]]) {
        return res.send(`please provided ${data[i]} field`);
      }
    }

    var dbData = await Establishment.findOne({ urn: payLoad.urn });
    if (dbData) {
      return res.send("data already exist");
    }

    var newData = await Establishment(payLoad).save();

    res.send(newData);
  },

  deleteSchool: async (req, res) => {
    const { urn } = req.params;
    const data = await Establishment.findOne({ urn });

    if (!data) {
      return res.send("data not found for this url");
    }

    var x = await Establishment.deleteOne({ urn });
    res.send({ m: "data delete", x });
  },

  updateSchool: async (req, res) => {
    let { update } = req.query;
    const { urn } = req.params;
    update = JSON.parse(update);
    var data = await Establishment.findOne({ urn });
    console.log(data);
    if (!data) {
      return res.send("data not found");
    }

    for (var key in update) {
      if (!data[key]) {
        return res.send("this key is not available");
      }
    }

    for (var key in update) {
      data[key] = update[key];
    }

    await Establishment.updateOne({ urn }, data);
    res.send(data);
  },

  searchSchool: async (req, res) => {
    const { query} = req.query;
    var postcode = "";
    var establishmentName = "";
    var urn = "";
    var hasNumber = /\d/;     
   if(!isNaN(query)){
    urn = query
   }else if(hasNumber.test(query)){
    postcode = query
   }else{
    establishmentName = query
   }
    var value = establishmentName
      ? {
          $search: {
            index: "establishmentName",
            autocomplete: {
              query: establishmentName,
              path: "establishmentName",
              fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 50 },
            },
          },
        }
      : postcode
      ? {
          $search: {
            index: "establishmentName",
            text: {
              query: postcode,
              path: "postcode",
              fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 50 },
            },
          },
        }
      : {
          $search: {
            index: "establishmentName",
            text: {
              query: urn,
              path: "urn",
              fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 50 },
            },
          },
        };

    var data = await Establishment.aggregate([
      value,
      { $limit: 10 },
    ]);

    res.send(data);
  },

 filterController:async (req, res) => {
  const { filter } = req.query;
  const filterArr = filter.split(",");

  
  console.log(filterArr);
  var data = await Establishment.aggregate([
    
      {
        $search: {
          index: "filter",
          text: {
            query: filterArr,
            path: "OfstedRating"
          }
        }
      }
    ,
    { $project: { OfstedRating: 1 },},{$limit:10} 
  ]);
  res.send(data);
}
};

module.exports = schoolController;
