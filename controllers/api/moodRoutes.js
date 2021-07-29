const router =require('express').Router();
const {Mood} =require('../../models');

router.get('/', async (req,res)=> {
    try{
        const moodEl= await Mood.findAll({
            include:[
                {
                attributes: ['name','description'],
            },
            ],
        });
        res.status(200).json(moodEl);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const moodE2= await Mood.findByPk(req.params.id,{
        include:[{attributes: ['name','description'],}]
      });
      res.status(200).json(moodE2);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req,res)=> {
    try{
        const postMood= await Mood.create({
           ...req.body,
            name:req.params.name,
            description:req.params.description,
        });
        res.status(200).json(postMood);
        
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports=router; 