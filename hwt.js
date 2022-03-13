const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard",
  cb
);

function cb(error, response, html) {
  if (error) {
    console.error("error:", error); // Print the error if one occurred
  } else {
    handleHTML(html);
    // console.log(html);
  }
}

function handleHTML(html) {
  let $ = cheerio.load(html);
  //getting value using css selector in form of array
  let teamArr = $(".match-info.match-info-MATCH .team");
  // console.log(teamArr);
  for (let i = 0; i < teamArr.length; i++) {
      //checking the team-gray is present in which class
    let hasclass = $(teamArr[i]).hasClass("team-gray");
    if (hasclass == false) {
      let teamNameElem = $(teamArr[i]).find(".name");
      console.log(teamNameElem.text());
    }
  }
}
