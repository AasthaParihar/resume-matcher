const pdfParse = require("pdf-parse");

const parsePDF = async(buffer)=>{
  const data = await pdfParse(buffer);
  return data.text;
};

module.exports = parsePDF;