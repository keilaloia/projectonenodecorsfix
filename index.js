//const axios = require('axios');
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('5EAHVR-Y5YXPLL59Q');
var cors = require('cors')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
}));

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

  app.get('/',(req,res)=>{
    waApi.getFull({
        input: `moving  ${req.query.startCity} ${req.query.startState} to ${req.query.endCity} ${req.query.endState}`,
      }).then((queryresult) => {
        // res.send(queryresult);

        for (let i = 0; i < queryresult.pods.length; i++) {
          
          populate(queryresult.pods[i]);
          
        }
        // population = queryresult.pods[2].subpods[0].img.src;
        // medianHouse = queryresult.pods[3].subpods[0].img.src;
        // unemployment = queryresult.pods[4].subpods[0].img.src;
        // crimeRate = queryresult.pods[5].subpods[0].img.src;
        // salesTax = queryresult.pods[6].subpods[0].img.src;

        data.pop = population;
        data.medianH = medianHouse;
        data.unemployed = unemployment;
        data.crime = crimeRate;
        data.sales = salesTax;

        res.send(data);
      }).catch(console.error)
  })

  function populate(val)
  {
    switch(val.title)
    {
      case "Populations":
          console.log("pop")
          population = val.subpods[0].img.src;
        break;
      case "Housing sale prices":
          console.log("housing")

          medianHouse = val.subpods[0].img.src;
        break;      
      case "Unemployment rates":
          console.log("employment")

          unemployment = val.subpods[0].img.src;
        break;      
      case "Crime rates":
          console.log("crime")

          crimeRate = val.subpods[0].img.src;
        break;
      case "Sales taxes":
          console.log("ST")

          salesTax = val.subpods[0].img.src;
        break;
      default:
          console.log("error");
        break;

    }

  }

  app.listen(PORT);

