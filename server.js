var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

var apiUrl = 'http://gsa.gov';

app.use('/', function(req, res) {
    var url = apiUrl + req.url;
    console.log('request: ', url)
    request({
    	uri: url
    }, function(error, response, html) {
    	if (!error && response.statusCode == 200) {
    		var $ = cheerio.load(html);
            var pageLayout = $('#pageLayout').html();
        	res.header('Access-Control-Allow-Origin', '*').send(pageLayout);
    	}
    	else{
    		res.header('Access-Control-Allow-Origin', '*').status(404).send('404');
    	}
    })

});

app.listen(process.env.PORT || 3333);
