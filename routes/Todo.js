const express= require ("express")
const router = express.Router();
const {createTodo,getAllTodo,deleteTodo,updateTodo} = require("../controllers/Todo");

router.post('/add-todo',createTodo);
router.get('/get-todo',getAllTodo);
router.delete('/delete-todo/:id',deleteTodo);
router.post('/update-todo',updateTodo);

module.exports = router;
