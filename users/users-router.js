const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
    } catch {
        console.log(error);
        res.status(500).json({ error: "The users information could not be retrieved." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);

        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The user information could not be retrieved." });
    }
});

router.post('/', isUpperCase(), async (req, res) => {
    if(!req.body.name){
        res.status(400).json({ errorMessage: 'Please provide a name for the user' });
    } else {
         try {
             const user = await Users.insert(req.body);
 
             res.status(201).json(user);
         } catch (error) {
             console.log(error);
             res.status(500).json({ error: "There was an error while saving the user to the database" });
         }
    }
 });

router.get('/posts/:id', async (req, res) => {
    try {
        const posts = await Users.getUserPosts(req.params.id);

        if(posts.length > 0){
            res.status(200).json(posts);
        } else {
            res.status(404).json({ errorMessage: "The user has no post" });
        }
    } catch (error){
        console.log(error);
        res.status(500).json({ error: "The user information could not be retrieved." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const posts = await Users.getUserPosts(req.params.id);
        if(posts){
            for(let i = 0; i < posts.length; i++){
                await Posts.remove(posts[i].id);
            }
            const userId = await Users.remove(req.params.id);

            if(userId){
                res.status(200).json({ message: 'User deleted' });
            } else {
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
            }
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The user could not be removed" });
    }
});

function isUpperCase(){
    return function(req, res, next){
        if(req.body.name[0] !== req.body.name[0].toUpperCase()){
            res.status(400).json({ errorMessage: 'The first letter of the name must be capitalized '});
        } else {
            next();
        }
    };
}
module.exports = router;