var express = require('express');
const { token } = require('morgan');
var router = express.Router();
var debug = require('debug')('services:server');
var http = require('http');



var users = [
  {
    email:'kartheekenumarthi@gmail.com',
    password:'zxcvbnm',
    token:'qa12ws3ed4rf5tg5tg6yh.',
    userId:'123456',
    userName:'Karthik',
    role:0,
    firstTime:true,
  },{
    email:'kamal@gmail.com',
    password:'zxcvbnm',
    token:'mlp0oknji98uhbvgy7',
    userId:'123457',
    userName:'Ram',
    role:1,
    firstTime:true,
  },{
    email:'admin@gmail.com',
    password:'zxcvbnm',
    token:'vfgbhn,lkj.-yfrtghy',
    userId:'123796',
    userName:'admin',
    role:2,
    firstTime:false
  }
]

details = [
  {
    id:0,
    firstName: 'karthik',
    lastName: 'Enumarthi',
    email:'kartheekenumarthi@gmail.com',
    whatsappNo:9493454298,
    phoneNo:9493454298,
    meetingLink:'zoom.us/j/weewdxcsfdewd',
    slokaName:'red',
    timeZone:'IST',
    numberOfStudents:3,
    customerId:'livek1',
    country:'india',
    placeOfStay:'#20-18-12/b,thummalava,rajahmundry',
    groupOrOneToOne:'group',
    classStatus:'tbd',
    proposedAmount:5000,
    proposedCurrency:'INR',
    AgentId:'lka12',
    welcomeCall:false,
    welcomeChat:true,
    welcomeEmail:false,
    studyMaterialSent:false
  },
  {
    id:1,
    firstName: 'john',
    lastName: 'doe',
    email:'john@gmail.com',
    whatsappNo:9544922344,
    phoneNo:322392232,
    meetingLink:'zoom.us/j/wdw34ded33',
    slokaName:'yellow',
    timeZone:'PST',
    numberOfStudents:1,
    customerId:'livek2',
    country:'USA',
    placeOfStay:'#3-12/1',
    groupOrOneToOne:'single',
    classStatus:'tbd',
    proposedAmount:200,
    proposedCurrency:'USD',
    AgentId:'lka34',
    welcomeCall:false,
    welcomeChat:true,
    welcomeEmail:true,
    studyMaterialSent:false
  },
  {
    id:2,
    firstName: 'jane',
    lastName: 'mark',
    email:'jane@gmail.com',
    whatsappNo:9433292334,
    phoneNo:9443224493,
    meetingLink:'zoom.us/j/efcdercvfed',
    slokaName:'red',
    timeZone:'IST',
    numberOfStudents:1,
    customerId:'livek2',
    country:'india',
    placeOfStay:'#3-3 kakinada',
    groupOrOneToOne:'group',
    classStatus:'tbd',
    proposedAmount:8000,
    proposedCurrency:'INR',
    AgentId:'lka12',
    welcomeCall:true,
    welcomeChat:false,
    welcomeEmail:false,
    studyMaterialSent:true
  }
]

/**
 * POST Login route
 */
router.post('/login',(req, res) => {
  const { email,password } = req.body
  var errors = []

  if(!email){
    errors.push('email required')
  }
  if(!password){
    errors.push('password required')
  }
  if(!errors[0] && email == 'kartheekenumarthi@gmail.com' && password == users[0].password) {
    return res.json(users[0])
  } else if(!errors[0] && email == 'kamal@gmail.com' && password == users[1].password) {
    return res.json(users[1])
  }  else if(!errors[0] && email == 'admin@gmail.com' && password == users[2].password) {
    return res.json(users[2])
  }
   else if(errors[0]) {
    return res.json({errors})
  } else {
    errors.push('invalid username or password')
    return res.json({errors})
  }
});

/**
 * Post change Password
*/
router.post('/change/password',(req,res)=>{
  var {token,currentPassword,newPassword,confirmPassword} = req.body
  if(token == users[0].token){
    if(currentPassword == users[0].password){
      if(newPassword === confirmPassword){
        users[0].password = newPassword
        users[0].firstTime = false
        return res.json(users[0])
      } else {
        return res.json({error:`new password and confirm password didn't match` })
      }
    } else {
      return res.json({error:`Current password didn't match` })
    }
  } else if(token == users[1].token){
    if(currentPassword == users[1].password){
      if(newPassword === confirmPassword){
        users[1].password = newPassword
        users[1].firstTime = false
        return res.json(users[1])
      } else {
        return res.json({error:`new password and confirm password didn't match` })
      }
    } else {
      return res.json({error:`Current password didn't match` })
    }
  }
  else {
    return res.json({error: 'Access denied, Unauthenticated request'})
  }
})

router.post('/meeting',(req,res) => {
  var { token,time } = req.body
  if(token == users[0].token){
    return res.json({
      meetingNumber:72627844135,
      meetingPassword:'1234',
      startTime:time,
      username:users[0].userName,
      apiKey:'Bmeg3RihS7CjvDQaJDjRxQ',
      apiSecret:'HLdGZhctBHzJ1vWcdtj6qogD1GwqfFUcLTSJ',
      role:users[0].role,
      email:users[0].email
    })
  } else if(token == users[1].token){
    return res.json({
      meetingNumber:72627844135,
      meetingPassword:'1234',
      startTime:new Date(new Date(time).getTime() + 1000*20),
      username:users[1].userName,
      apiKey:'Bmeg3RihS7CjvDQaJDjRxQ',
      apiSecret:'HLdGZhctBHzJ1vWcdtj6qogD1GwqfFUcLTSJ',
      role:users[1].role,
      email:users[1].email
    })
  } else {
    return res.json({error:"no meetings available"})
  }
})

router.get('/customer/details',(req,res) => {
  res.json({details})
})

router.post('/customer/details',(req,res)=>{
  details[req.body.id-1] = req.body
  res.json({data:details[req.body.id-1]})
})
module.exports = router;