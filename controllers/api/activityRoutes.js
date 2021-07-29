const router =require('express').Router();
const {Activity} =require('../../models');

router.get('/', async (req,res)=> {
    try{
        const activityEl= await Activity.findAll({
            include:[
                {
                attributes: ['title','description'],
            },
            ],
        });
        res.status(200).json(activityEl);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const activityE2= await Activity.findByPk(req.params.id,{
        include:[{attributes: ['title','description'],}]
      });
      res.status(200).json(activityE2);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req,res)=> {
    try{
        const postActivity= await Activity.create({
           ...req.body,
            title:req.params.title,
            description:req.params.description,
        });
        res.status(200).json(postActivity);
        
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports=router; 



