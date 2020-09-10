const mongoose = require("mongoose");

const User = require("../models/user.model");

const DB_TITLE = "klout";

mongoose.connect(`mongodb://localhost/${DB_TITLE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

User.collection.drop();

const users = [
  {
    username: "ChusSantana",
    password: "Enjoy",
    image: 
      
      
        "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
    
  },
  {
    username: "Pepe",
    password: "Enjoy",
    image: 
      
      
        "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
    
  },
 
];

User.create(users)
  .then((users) => console.log("User database created !"))
  .catch((err) => `An error occurred : ${err}`);
