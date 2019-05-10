const req = require("superagent");

function request(url){
  return new Promise((resolve,reject)=>{
    req
    .get(url)
    .set({  //设置请求头
      "Connection":"keep-alive",
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
    })
    .then(res => {
       resolve(res)
    }).catch((err)=>{
      reject(err)
    });
  })
}

  module.exports=request
