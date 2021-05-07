var express = require('express');
var router = express.Router();
const https = require('https');


/* GET users listing. */
router.get('/', function(req, res, next) {

  
const url = 'https://kitsu.io/api/edge/anime?filter[categories]=adventure';

  
const request = https.request(url, (response) => {
  let data = '';
  response.on('data', (chunk) => {
  data = data + chunk.toString();
  });
  response.on('end', () => {
  const body = JSON.parse(data);
  console.log(body);
  console.log(body.data[0].attributes);

  res.render('api',body);
});

})
  request.on('error', (error) => {
console.log('An error', error);
});
request.end()
  


});

module.exports = router;
