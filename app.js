   /**
    * Dependencies */

   var express       = require('express');
   var cors       = require('cors');

   var apiController    = require('./controllers/apiController');

   var app = express();

   /**
    * App Setup */

   app.use('/assets', express.static(__dirname + '/public'));

   apiController(app);

   app.use(cors());

   /**
    * Server Setup */

   var port = process.env.PORT || 3001;

   app.listen(port, function () {
       console.log('Server started on port: ' + port);
   });