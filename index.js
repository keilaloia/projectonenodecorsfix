//const axios = require('axios');
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('5EAHVR-Y5YXPLL59Q');
var cors = require('cors')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
}));

var population, medianHouse, unemployment, incomeRate, crimeRate, salesTax;

var data = 
{
    pop: '',
    medianH: '',//median household income and COL
    unemployed: '',//demographics
    crime: '',
    sales: ''//average income

}

  app.get('/',(req,res)=>{
    waApi.getFull({
        input: `${req.query.startCity} ${req.query.startState} vs ${req.query.endCity} ${req.query.endState}`,
      }).then((queryresult) => {
        // res.send(queryresult);

        for (let i = 0; i < queryresult.pods.length; i++) {
          
          populate(queryresult.pods[i]);
          
        }
    
        data.pop = population;
        data.medianH = medianHouse;
        data.unemployed = unemployment;
        data.crime = crimeRate;
        data.sales = salesTax;
        //res.send(queryresult);
        res.send(data);
      }).catch(console.error)
  })

  function populate(val)
  {
    switch(val.title)
    {
      case "Populations":

          population = val.subpods[0].img.src;
        break;
      case "Economic properties"://household income and COL

          medianHouse = val.subpods[0].img.src;
        break;      
      case "Demographics":

          unemployment = val.subpods[0].img.src;
        break;    
      case "Other indicators":

          crimeRate = val.subpods[0].img.src;
        break;
      case "Income statistics"://average income

          salesTax = val.subpods[0].img.src;
        break;
      default:
        break;

    }

  }

  
  app.listen(PORT);

