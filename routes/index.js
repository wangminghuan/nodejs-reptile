const router = require('koa-router')()
// const request = require("../request");
const cheerio = require('cheerio')
const req = require("superagent");

const request=(url)=>{
  return new Promise((resolve,reject)=>{
    req
    .get(url)
    .set({  //设置请求头
      "Connection":"keep-alive",
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
    })
    .then(res => {
      const $ = cheerio.load(res.text);
      const listArr = $(".house-list li");
      const myData=[];
      listArr.each(function(){
           const _img=($(this).children(".img-list").find("img").attr("lazy_src"));
           const _title=($(this).children(".des").children("h2").text().trim());
           const _size=($(this).children(".des").children(".room").text().trim());
           const _url=($(this).children(".des").children("h2").children("a").attr("href"));
           (!!_url && !!_title) &&  myData.push({ 
             img:_img, 
             size:_size,
             title:_title,
             url:_url,
            })
      })
      resolve({
        code:0,
        data:myData,
        message:"success"
      })
    }).catch((err)=>{
       reject({
        code:1,
        data:err,
        message:"error"
      })
    });
  })
}
router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/getData', async (ctx, next) => {
  const page=ctx.request.query.page || 1;
  const result= await request(`https://zz.58.com/zufang/pn${page}/?PGTID=0d300008-0015-6c13-af52-ca18754770a7&ClickID=1`)
  ctx.body=result
})
module.exports = router