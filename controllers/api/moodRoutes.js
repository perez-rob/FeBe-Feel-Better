const router = require("express").Router();
const { Mood } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const moodEl = await Mood.findAll({
      attributes: ["name", "description"],
    });
    res.status(200).json(moodEl);
  } catch (err) {
    res.status(500).json(err);
  }
});

// include is for other models, for selecting specific columns just use attributes like above
router.get("/:id", async (req, res) => {
  try {
    const moodE2 = await Mood.findByPk(req.params.id, {
       attributes: ["name", "description"] 
    });
    res.status(200).json(moodE2);
  } catch (err) {
    res.status(500).json(err);
  }
});

// req.params is usally only used for UPDATE or DELETE requests where we need to target a specific instance, POST does not need them, the data we want is all in req.body
router.post("/", async (req, res) => {
  try {
    const postMood = await Mood.create({
      ...req.body,
      //   name: req.params.name,
      //   description: req.params.description,
    });
    res.status(200).json(postMood);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put('/:id', async (req,res)=>{
  try{
    const updateMood = await Mood.update ({
      name:req.body.name,
      description:req.body.description,
    },
    {
      where:{
        id:req.params.id,
      },
    }
    );
    res.status(200).json(updateMood);
  }
  catch(err) {res.status(500).json(err)}; 
} );

router.delete('/:id', async (req,res)=> 
{
  try{
    const deleteMood= await Mood.destroy({
      where:{
        id:req.params.id,
      },
    });
    res.status(200).json(deleteMood);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
