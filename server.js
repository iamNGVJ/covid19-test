const express = require('express');
const app = express();
const cheerio = require('cheerio');
const request = require('request');

app.get('/', (req, res) => {
	request('https://www.worldometers.info/coronavirus/', (err, response, html) => {
    if(!err && response.statusCode == 200){
        const $ = cheerio.load(html);
		var data = $('.maincounter-number').text().split(" ");
		var currentlyInfected = $('.number-table-main').text().split(",")[1];
        var inMildCondition = $('.number-table').text();
        var dataset = [];
        data.forEach((item) => {
            item != "" ? dataset.push(item) : console.log("skip");
        });

        var issue = {
            cases: dataset[0],
            deaths: dataset[1],
            recovered: dataset[2]
		};
		
		if(issue != null){
			return res.status(200).send(issue);
		}
    }
});
});

app.listen(8080, () => {
	console.log("app now running");
});
