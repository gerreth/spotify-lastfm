import express from 'express';
import UserController from '../../controllers/userController';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('response');
});

router.post('/dislike', async (req, res) => {
  UserController.dislike(req.body.band);
});

router.post('/like', async (req, res) => {
  UserController.like(req.body.band);
});

module.exports = router;
