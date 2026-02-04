const parsePDF = require("../utils/pdfParser");
const extractSkills = require("../utils/skillExtractor");
const {normalizeSkills} = require("../utils/skillNormalizer");
const { getRecommendations } = require("../services/recommendation.service");

const uploadResume = async (req, res)=>{
  try{
    if(!req.file){
      return res.status(400).json({message : "No file uploaded"});
    }

    const rawText = await parsePDF(req.file.buffer);

    console.log("---- RAW TEXT ----");
    console.log(rawText);

    const skillsRaw = extractSkills(rawText);
    console.log("---- EXTRACTED RAW SKILLS ----");
    console.log(skillsRaw);


    const skills = normalizeSkills(skillsRaw);
     console.log("---- NORMALIZED SKILLS ----");
    console.log(skills);
    

    const location = req.body?.location || "";
    let recommendations = [];
    try {
      recommendations = await getRecommendations(skills, location);
    } catch (err) {
      console.warn("RECOMMENDATIONS ERROR:", err.message || err);
    }

    res.status(200).json({
      message : "Resume parsed successfully",
      skills,
      recommendations
    });
  }
  catch(error){
    console.error("Resume processing error:", error);
    res.status(500).json({message : "Failed to process resume"});
  }
};

module.exports = {uploadResume};
