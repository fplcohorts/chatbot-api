const routes = require('express').Router();
const axios = require('axios');
const currentUser = require('../server');

var verification = 0;
var stage =0;
var pvtAns;
routes.post('/', function(req, res, next) {

    console.log(req.query.text);
    console.log(JSON.stringify(currentUser));
    const options = {
        url: 'http://localhost:5005/webhooks/rest/webhook',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            message: req.query.text,
            sender:"Tirtha2"
        }
      };
      if(!currentUser.isValid && verification == 1){
          if(stage == 5 && currentUser.isDetailFailed) stage = 1;
          if(stage == 0 && currentUser.isDetailVerified) stage =5;
              switch(stage){
                  case 1: 
                  currentUser.setName(req.query.text);
                  console.log(JSON.stringify(currentUser));
                  stage +=1;
                  res.status(200).json("Please enter your userID");
                  break;
                  
                  case 2: 
                  currentUser.setId(req.query.text);
                  console.log(JSON.stringify(currentUser));
                  res.status(200).json("Please enter your Phone");
                  stage +=1;
                  break;
                  case 3:
                      console.log("In 4th");
                      currentUser.setPhone(req.query.text);
                      console.log(JSON.stringify(currentUser));
                      stage +=1;
                      res.status(200).json("Please enter your Email");
                      break;
                      case 4:
                          currentUser.setEmail(req.query.text);
                          stage +=1;
                          console.log(JSON.stringify(currentUser));
                          currentUser.verify(res);
                          
                            // if(currentUser.verify() == 1){
                                //     stage +=1;
                                //     res.status(200).json("Please enter your Password");
                                // }
                                // ;
                                // res.status(200).json("Please enter your Email");
                                break;
                                case 5:
                                    currentUser.setPassword(req.query.text);
                                    currentUser.verifyPass(res,pvtAns);
                                    verification = 0;
                                    stage=0;
                                    break;
                                }
                                }
                            else{
        
        axios(options).then(function (response) {
            const resp = response.data[0].text;
            console.log(resp);
            console.log("In Post");
            
            if(resp.match(/#Private/) && !currentUser.isValid)
            {
                pvtAns = resp.replace(/#Private/,'');
                verification = 1;
                stage+=1;
                res.status(200).json("Please enter your username");
            }else{
                res.status(200).json(response.data[0].text);
            }
            // res.status(200).json(currentUser.getName());
        }, (error) => {
            //   console.log("error");
            console.log(error);
          }).catch(function (errors) {
              console.log(errors);
            // console.log("Error in fetching market updates");
          });
    }

    console.log(stage);


  });
  
module.exports = routes;
