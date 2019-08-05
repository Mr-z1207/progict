const express = require('express')
const users = require('../models/user.js')
const pagination = require('../util/pagination.js')

const router = express.Router()

//权限验证
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>')
    }
})


router.get("/",(req,res)=>{
	res.render("admin/index",{userInfo:req.userInfo})
})

router.get("/user",(req,res)=>{
	// console.log(req.userInfo)
	// let page = req.query.page
	// page = parseInt(page)
	// const limit = 2
	// if (isNaN(page)) {
	// 	page = 1
	// }

	// users.countDocuments((err,count)=>{
	// 	const pageMax = Math.ceil(count / limit)
	// 	if (page < 1) {
	// 		page = 1
	// 	}else if(page > pageMax){
	// 		page = pageMax
	// 	}
	// 	let list = []
	// 	for(let i = 0;i < pageMax;i++){
	// 		list.push(i+1)
	// 	}
	// 	const skip = (page-1)*limit

	// 	users.find({})
	// 	.skip(skip)
	// 	.limit(limit)
	// 	.then(data=>{
	// 		// console.log(data)
	// 		res.render("admin/user_list",{
	// 			userInfo:req.userInfo,
	// 			users:data,
	// 			page:page,
	// 			list:list,
	// 			pageMax:pageMax
	// 		})
	// 	})
	// })
	pagination({
		page:req.query.page,
		modules:users
	})
	.then(data=>{
		// console.log(data)
		res.render("admin/user_list",{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pageMax:data.pageMax,
			url:"/admin/user"
		})
	})
})
module.exports = router