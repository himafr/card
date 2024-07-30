const express=require('express')
const cardControllers=require('../controllers/cardControllers')
const router=express.Router()
router
.route('/')
.get(cardControllers.allCards)
.post(cardControllers.addCard)

module.exports=router