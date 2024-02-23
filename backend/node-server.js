const path=require("node:path")
require("dotenv").config({origin:true,credentials:true})
const {connectDb}=require("./database/connectDb");
const app=require("./index")
const port=3000||process.env.PORT;
const axios=require("axios")



app.get('/data-from-java', async (req, res) => {
    try {
    const response = await axios.get('http://localhost:8080/api/data');
    res.json(response.data);
    } catch (error) {
    console.error('Error fetching data from Java server:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
});
// database connection
connectDb();
// node server
app.listen(port,(err)=>{
    if(err) throw new Error(`Failed to start server ${err.message}`);
    console.log(`server is up on port :${port}`)
})