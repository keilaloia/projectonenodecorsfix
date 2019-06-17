//const axios = require('axios');
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('5EAHVR-Y5YXPLL59Q');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var localCity = '';
var localState = '';
var foundCity = '';
var foundState = '';

var population, medianHouse, unemployment, crimeRate, salesTax;

var data = 
{
    pop: '',
    medianH: '',
    unemployed: '',
    crime: '',
    sales: ''

}
exports.helloWorld = (req, res) => {
    waApi.getFull({
        input: 'moving Redmond,Washington to New York,New York',
      }).then((queryresult) => {

        population = queryresult.pods[1].subpods[0].img.src;
        medianHouse = queryresult.pods[2].subpods[0].img.src;
        unemployment = queryresult.pods[3].subpods[0].img.src;
        crimeRate = queryresult.pods[4].subpods[0].img.src;
        salesTax = queryresult.pods[5].subpods[0].img.src;

        data.pop = population;
        data.medianH = medianHouse;
        data.unemployed = unemployment;
        data.crime = crimeRate;
        data.sales = salesTax;

        let datajson = JSON.stringify(data); 
        res.json(datajson);
        fs.writeFileSync('data.json', datajson);
      }).catch(console.error)
  };

  app.get('/',(req,res)=>{
    waApi.getFull({
        input: `moving  ${req.query.startCity} ${req.query.startState} to ${req.query.endCity} ${req.query.endState}`,
      }).then((queryresult) => {
        // res.send(queryresult);
        population = queryresult.pods[1].subpods[0].img.src;
        medianHouse = queryresult.pods[2].subpods[0].img.src;
        unemployment = queryresult.pods[3].subpods[0].img.src;
        crimeRate = queryresult.pods[4].subpods[0].img.src;
        salesTax = queryresult.pods[5].subpods[0].img.src;

        data.pop = population;
        data.medianH = medianHouse;
        data.unemployed = unemployment;
        data.crime = crimeRate;
        data.sales = salesTax;

        res.send(data)
      }).catch(console.error)
  })

  app.listen(PORT);

