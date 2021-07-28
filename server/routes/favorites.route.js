const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require('../middleware/isLoggedIn')
const User = require('../models/User.model')
const transporter = require('../config/nodemailer')

router.put('/:Id', (req, res)=>{
const {Id} = req.params
const {selectedPic} = req.body // esto viene del front a traves del body
console.log(req.body)

if (!mongoose.Types.ObjectId.isValid(Id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

User.findByIdAndUpdate(Id, {
					$addToSet: { favorites: req.body }//asi se accede al value concreto y se añade a un array
				},{ new : true })
.then(newFavorite => res.json(newFavorite))
.catch(err=>res.json(err))

})

router.get('/:Id', (req, res)=>{
  const {Id} = req.params

  User.findById(Id)
  .then((userWithThatId)=>{
    res.json(userWithThatId.favorites)
    
  })
  .catch(err=>res.json(err))
})

router.delete('/:userId/:fecha', (req, res)=>{
  const { userId, fecha } = req.params
  console.log(userId, fecha, "linea 39 fav")


  User.findByIdAndUpdate(userId, { $pull: {favorites: { date: fecha } }}, {new: true})
  .then((userWithThatId)=>{
    res.json(userWithThatId.favorites)
  })
  .catch(err=>res.json(err))
})

router.post('/send-star', (req, res)=>{
  const { email, message, hdurl, url } = req.body
  console.log("inside send mail", req.body)
  transporter.sendMail({
    from: process.env.user,
    to: email,
    subject: "Someone has sent a star to you",
    html: `<p>Hola, mira esta estrella<p><a href=${url}>Click here</a><p>${message}</p>`
  })
  .then(suggestion => console.log("email sent"))
  .catch(err=> console.log("email not sent"))
})


module.exports = router