var express = require('express');
var router = express.Router()
const https = require('https')
/* GET users listing. */
router.get('/', function (req, res, next) {


  const url = 'https://kitsu.io/api/edge/anime?filter[categories]=adventure';


  const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data = data + chunk.toString();
    });
    response.on('end', () => {
      const body = JSON.parse(data);
      console.log(body);
      console.log(body.data[0].attributes.posterImage);
      for( i = 0; i < body.length; i++){
        var img = img + body.data[i].attributes
      }
      console.log(img);

      res.render('index', body);
    });
    
  })
  request.on('error', (error) => {
    console.log('An error', error);
  });
  request.end()

  res.render('index');

});

module.exports = router;
