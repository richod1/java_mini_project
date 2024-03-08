
    require('module-alias/register');
    const mongoose = require('mongoose');
    const { globSync } = require('glob');
    const path = require('path');
    const {connectDb}=require("./database/connectDb")
    const app = require('./index');

    // Make sure we are running node 7.6+
    const [major, minor] = process.versions.node.split('.').map(parseFloat);
    if (major < 20) {
    console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
    process.exit();
    }

    // import environmental variables from our variables.env file
    require('dotenv').config({ path: '.env' });
    require('dotenv').config({ path: '.env.local' });

    // database connection
    connectDb();

    const modelsFiles = globSync('./models');

    for (const filePath of modelsFiles) {
    require(path.resolve(filePath));
    }

    // java server
    app.get('/data-from-java', async (req, res) => {
        try {
        const response = await axios.get('http://localhost:8080/api/data');
        res.json(response.data);
        } catch (error) {
        console.error('Error fetching data from Java server:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });


    // Start our app!

    app.set('port', process.env.PORT || 8888);
    const server = app.listen(app.get('port'), () => {
    console.log(`Express running → On PORT : ${server.address().port}`);
    });












