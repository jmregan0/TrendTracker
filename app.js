const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');
// const moment = require('moment');
const axios = require('axios');

const app = express();
const twitterBearerToken = /*process.env.TWITTER_BEARER_TOKEN ?
                           process.env.TWITTER_BEARER_TOKEN :*/
                           require('./secrets').bearer_token_creds;



app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X_Requested-With, Content-Type, Accept");
  next();
});

app.get('/:place', (req, res, next) => {
    axios({
      method: 'post',
      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        Authorization: `Basic ${new Buffer(twitterBearerToken).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data: 'grant_type=client_credentials',
    })
    .then(res => res.data)
    .then(({ access_token: accessToken }) => {
      app.use(morgan('dev'));
      app.use(express.static('public'));

    if(req.params.place === 'global'){
      axios({
          method: 'get',
          url: 'https://api.twitter.com/1.1/trends/place.json?id=1',
          headers: { Authorization: `Bearer ${accessToken}`}
        })
        .then(response => res.send(response.data[0]))
    }
    else if(req.params.place === 'chicago'){
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/trends/place.json?id=2379574',
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      .then(response => res.send(response.data[0]))
    }
    else if(req.params.place === 'nyc'){
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/trends/place.json?id=2459115',
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      .then(response => res.send(response.data[0]))
    }
    else if(req.params.place === 'la'){
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/trends/place.json?id=2442047',
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      .then(response => res.send(response.data[0]))
    }
    else if(req.params.place === 'silicon') {
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/trends/place.json?id=23511745',
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      .then(response => res.send(response.data[0]))
    }
    else if(req.params.place === 'seattle') {
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/trends/place.json?id=2490383',
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      .then(response => res.send(response.data[0]))
    }
    else if(req.params.place === 'paris'){
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/trends/place.json?id=615702',
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      .then(response => res.send(response.data[0]))
    }
    else if(req.params.place === 'london'){
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/trends/place.json?id=44418',
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      .then(response => res.send(response.data[0]))
    }
  })
})

app.use((err, req, res, next) =>{
  if(err){
    console.error(err)
    res.end()
  } else {
    console.log(req)
    res.end()
  }
})

app.listen(3001, console.log('listening on 3001 all day baby!'))
