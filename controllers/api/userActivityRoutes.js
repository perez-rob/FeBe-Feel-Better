const router =require('express').Router();
const {UserActivity,User,UserMood} =require('../../models');



router.get('/', async (req,res)=> {
    try{
        const userActivityEl= await UserActivity.findAll({
            include:[
                { model:UserMood,
                attributes: ['name','description'],
            },
            ],
        });
        res.status(200).json(userActivityEl);
    } catch(err) {
        res.status(500).json(err);
    }
});
router.get('/:id', async (req, res) => {
    try {
      const userActivityE2= await UserActivity.findByPk(req.params.id,{
        include:[{
            model:UserMood,
            attributes: ['name','description'],}]
      });
      res.status(200).json(userActivityE2);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });












module.exports=router; 