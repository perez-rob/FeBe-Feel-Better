const router=require('express').Router();
const activityRoutes= require ('./activityRoutes');
const moodRoutes= require ('./moodRoutes');
const userActivityRoutes= require ('./userActivityRoutes');
const userMoodRoutes =require ('./userMoodRoutes');
const userRoutes =require ('./userRoutes');

router.use('/activity',activityRoutes); 
router.use('/mood',moodRoutes); 
router.use('/useractivity',userActivityRoutes); 
router.use('/usermood',userMoodRoutes); 
router.use('/user',userRoutes);

module.exports=router; 
