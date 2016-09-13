var express = require('express');
var router = express.Router();

//course database
var coursesData = [{
		cid : 1,
		name : "course1",
		description : "course1 desc",
	},
	{
		cid : 2,
		name : "course2",
		description : "course2 desc",
	}]
	
router.getCourse = function () {
	return coursesData;
}

//course function
//Function for /courses

function getAllCourse() {
	return coursesData;
}

function addCourse(course) {
	coursesData.push(course);
}

//Function for /courses/:cid
function getCourseByID(cid) {
	return coursesData.filter(function(course){
        if(course.cid == cid)
        {
            return course;
        }
    });
}

function deleteCourseByID(cid) {
	for (var i = 0; i < coursesData.length; i++) {
        if(coursesData[i].cid == cid)
        {
            coursesData.splice(i,1);
        }
    }
}

//Function for /courses/:cid/edit
function editCourse(cid, newcourse) {
	for (var i = 0; i < coursesData.length; i++) {
        if(coursesData[i].cid == cid)
        {
            coursesData[i].cid = newcourse.cid;
            coursesData[i].name = newcourse.name;
            coursesData[i].description = newcourse.description;
        }
    }
}

//Route

router.route('/courses')
	.get(function (req,res,next) {
		res.json(getAllCourse());
	})
	.post(function (req,res,next) {
		addCourse(req.body);
		res.sendStatus(200);
	})

router.route('/courses/:cid')
	.get(function (req,res,next) {
		res.json(getCourseByID(req.params.cid));
	})
	.delete(function (req,res,next) {
		deleteCourseByID(req.params.cid);
		res.send("deleted");
	})

router.route('/courses/:cid/edit')
	.put(function (req,res,next) {
		editCourse(req.params.cid,req.body);
		res.send("updated");
	})

module.exports = router;