const router =require('express').Router();
const {UserActivity,User,UserMood} =require('../../models');


router.get('/', async (req,res)=> {
    try{
        const userMoodEl= await UserMood.findAll({
            include:[
                { model:UserActivity,
                attributes: ['user_id','activity_id'],
            },
            ],
        });
        res.status(200).json(userMoodEl);
    } catch(err) {
        res.status(500).json(err);
    }
});
router.get('/:id', async (req, res) => {
    try {
      const userMoodE2= await UserMood.findByPk(req.params.id,{
        include:[{
            model:UserActivity,
            attributes: ['user_id','activity_id'],}]
      });
      res.status(200).json(userMoodE2);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });




module.exports=router; 