const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://animenewsnetwork.p.rapidapi.com/api.xml",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "741410205bmshea93a709b872245p1f1d9ejsnfb5a36b85398",
		"x-rapidapi-host": "animenewsnetwork.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});