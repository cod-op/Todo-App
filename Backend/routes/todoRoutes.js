const express=require("express");
const { createTodoController,getTodoController,deleteTodoController,updateTodoController } = require("../controllers/todocontroller");
const auth=require("../middlewares/auth");
const router=express.Router();



router.post('/create',auth,createTodoController);
router.post('/getAll/:userId',auth,getTodoController);
router.delete('/delete/:id',auth,deleteTodoController);
router.patch('/update/:id',auth,updateTodoController);


module.exports=router;