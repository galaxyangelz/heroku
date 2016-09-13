var students = require('./students.js');
var courses = require('./courses.js');
var express = require('express');
var router = express.Router();

//Grade database
var gradeData = [{
		sid: 1,
		cid: 1,
		grade: 5
	},
	{
		sid: 2,
		cid: 1,
		grade: 1
	},
	{
		sid: 1,
		cid: 2,
		grade: 4
	},
	{
		sid: 3,
		cid: 2,
		grade:1
	}]
var gradeDataShow = [];
//Function for
function getAllGrade() {
	studentData = students.getStudent();
	courseData = courses.getCourse();
	for (var i = 0; i < studentData.length; i++) {
		for (var j = 0; j < courseData.length; j++) {
			for (var k = 0; k < gradeData.length; k++) {
				if (gradeData[k].sid == studentData[i].sid && gradeData[k].cid == courseData[j].cid) {
					var mystudent = {
						sid: studentData[i].sid,
						cid: courseData[j].cid,
						grade: gradeData[k].grade
					};
					gradeDataShow.push(mystudent);
				}
			}
		}
	}
	return gradeDataShow;
}
/*var studentData = students.getStudent(),
	courseData = courses.getCourse();

function abc(sid,cid) {
	return (gradeData.sid == studentData.sid && gradeData.cid == courseData.cid);
}

var gradeDataShow = gradeData.filter(abc);*/

router.route('/grades').get(function(req,res,next){
	res.json(gradeDataShow);
});

module.exports = router;