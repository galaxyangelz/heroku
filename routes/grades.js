var courses = require('./courses.js');
var students = require('./students.js');
var express = require('express');
var router = express.Router();

//grade database
var gradeData = [{
		cid : 1,
		sid : 2,
		grade : 4
	},
	{
		cid : 2,
		sid : 1,
		grade : 3
	},
	{
		cid : 1,
		sid : 1,
		grade : 5
	}]

var coursesData = courses.getcourseData();
var studentsData = students.getstudentData();

//Function for /courses/:cid/grades
function courseGrade(cid) {
	var showgrade = [];
	for (var i = 0; i < gradeData.length; i++) {
        if (gradeData[i].cid == cid) {
        	for (j = 0; j < studentsData.length; j++) {
        		if (gradeData[i].sid == studentsData[j].sid) {
            		showgrade.push(gradeData[i]);
        		}
        	}
        }
	}
	return showgrade;
}

function addGrade(grade) {
	gradeData.push(grade);
}

//Function for /coure/:cid/grades/:sid
function getGradeByStudentID(cid, sid) {
	for (var i = 0; i < gradeData.length; i++) {
        if (gradeData[i].cid == cid && gradeData[i].sid == sid) {
            return gradeData[i];
        }
	}	
}
function deleteGrade(cid, sid) {
	for (var i = 0; i < gradeData.length; i++) {
        if (gradeData[i].cid == cid && gradeData[i].sid == sid) {
            gradeData.splice(i,1);
        }
	}
}

function edit(cid,sid,newgrade) {
	for (var i = 0; i < gradeData.length; i++) {
        if (gradeData[i].cid == cid && gradeData[i].sid == sid) {
            gradeData[i].cid = newgrade.cid;
            gradeData[i].sid = newgrade.sid;
            gradeData[i].grade = newgrade.grade;
            return;
        }
	}
}

//route
router.route('/courses/:cid/grades')
	.get(function (req,res,next) {
		res.json(courseGrade(req.params.cid));
	})
	.post(function (req,res,next) {
		addGrade(req.body);
		res.sendStatus(200);
	})
router.route('/courses/:cid/grades/:sid')
	.get(function (req,res,next) {
		res.json(getGradeByStudentID(req.params.cid, req.params.sid));
	})
	.delete(function (req,res,next) {
		deleteGrade(req.params.cid, req.params.sid);
		res.send("deleted");
	})
	.put(function (req,res,next) {
		edit(req.params.cid, req.params.sid, req.body);
		res.send("updated");
	})

module.exports = router;