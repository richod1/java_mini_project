require('module-alias/register');
const mongoose = require('mongoose');
const { globSync } = require('glob');
const path = require('path');
const port=8888

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
  console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });



const OPENAI_API_KEY = process.env.OPENAI_API_KEY;



const modelsFiles = globSync('./src/models/**/*.js');

for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// Start our app!
const app = require('./app');

// test endpoint
app.get("/api/test",(req,res)=>{
  res.status(200).send("<h1>Hello test api endpoint</h1>")
})


mongoose.connect(`${process.env.DATABASE}`).then(()=>{
  console.log("Database connected successfully")

  app.listen(port,(err)=>{
    if(err) throw new Error("server is asleep")
    console.log(`server is up on port :${port}`)
  })
}).catch((err)=>{
  console.log(`Database failed ${err}`)
})

