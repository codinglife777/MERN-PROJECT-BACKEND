const mongoose = require("mongoose");

const Report = require("../models/report.model");

const DB_TITLE = "klout";

mongoose.connect(`mongodb://localhost/${DB_TITLE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Report.collection.drop();

const reports = [
  {
    facebook: {
      follows: 5542,
      like: 327,
      rate: 15,
    },
    twitter: {
      follows: 14575,
      like: 2542,
      rate: 12,
    },
    Instagram: {
      follows: 654,
      like: 154,
      rate: 5,
    },

    user: "5f59d31c8927093585e35f70",
  },
  {
    facebook: {
      follows: 15542,
      like: 1327,
      rate: 115,
    },
    twitter: {
      follows: 24575,
      like: 12542,
      rate: 112,
    },
    Instagram: {
      follows: 1654,
      like: 1154,
      rate: 15,
    },

    user: "f5a18e01ce4d737da432fc8",
  },
];

Report.create(reports)
  .then((reports) => console.log("Report database created !"))
  .catch((err) => `An error occurred : ${err}`);
