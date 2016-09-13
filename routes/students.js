var express = require('express');
var router = express.Router();

//Student database
var studentData = [{
		sid : 1,
		name : "student1",
		address : "kajaanintie 1",
		class : "DIN1"
	},
	{
		sid : 2,
		name : "student2",
		address : "kajaanintie 2",
		class : "DIN2"
	}]

router.getStudent = function () {
	return studentData;
}

//Student function
//Function for /students
function getAllStudent() {
	return studentData;
}

function addStudent(student) {
	studentData.push(student);
}

//Function for /students/:sid
function getStudentByID(sid) {
	return studentData.filter(function(student){
        if(student.sid == sid)
        {
            return student;
        }
    });
}

function deleteStudentByID(sid) {
	for (var i = 0; i < studentData.length; i++) {
        if(studentData[i].sid == sid)
        {
            studentData.splice(i,1);
        }
    }
}

//Function for /students/:sid/edit
function editStudent(sid, newstudent) {
	for (var i = 0; i < studentData.length; i++) {
        if(studentData[i].sid == sid)
        {
            studentData[i].sid = newstudent.sid;
            studentData[i].name = newstudent.name;
            studentData[i].address = newstudent.address;
            studentData[i].class = newstudent.class;
        }
    }
}

//Route

router.route('/students')
	.get(function (req,res,next) {
		res.json(getAllStudent());
	})
	.post(function (req,res,next) {
		addStudent(req.body);
		res.sendStatus(200);
	})

router.route('/students/:sid')
	.get(function (req,res,next) {
		res.json(getStudentByID(req.params.sid));
	})
	.delete(function (req,res,next) {
		deleteStudentByID(req.params.sid);
		res.send("deleted");
	})

router.route('/students/:sid/edit')
	.put(function (req,res,next) {
		editStudent(req.params.sid,req.body);
		res.send("updated");
	})

module.exports = router;