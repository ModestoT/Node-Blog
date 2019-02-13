const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);

        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

router.post('/', userId(), async (req, res) => {
    try {
        const newPost = { ...req.body, user_id: req.headers.userid};
        const post = await Posts.insert(newPost);

        if(post){
            res.status(201).json(post);
        } else {
            res.status(404).json({ error: 'that userId does not exist'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postId = await Posts.remove(req.params.id);

        if(postId){
            res.status(200).json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post could not be removed" });
    }
});

function userId() {
    return function(req, res, next){
        const userId = req.headers.userid;
        if(userId){
            next();
        } else {
            res.status(400).json({ message: 'Please login to preform this action' });
        }
    };
}

module.exports = router;