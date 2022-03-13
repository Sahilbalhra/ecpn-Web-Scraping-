const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary",
  cb
);

function cb(error, response, html) {
    if(error){

        console.error("error:", error); // Print the error if one occurred
    }else{
        handleHTML(html);
        // console.log(html);
    }
}
function handleHTML(html) {
  let $=cheerio.load(html);
    let elementArr=$('.d-flex.match-comment-padder.align-items-center .match-comment-long-text');
  //getting value using css selector in form of array
  
  //conveting to the text

    let text = $(elementArr[0]).text();
    let htmlData = $(elementArr[0]).html();
    console.log("Text", text);
    console.log("HTML Data", htmlData);
}
