var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TS');
//var ClassroomModel = require('../../db/group2db/ClassroomModel');
var CourseModel = require('../../db/group1db/CourseModel');

var Course = mongoose.model('CourseModel',CourseModel.CourseSchema);


Course.remove({},function(err){console.log("Removed all data")});

var tmpCourse = new Course({
	courseid2: '1223',
	coursename: 'math'
});
tmpCourse.save(); //insert a tmp data


//global vars
var courseList = new Array();		//all courses waiting to be sorted
var roomList = new Array();			//all classroom 
var arrangeList;					//there are 5*7 point-in-time to start a course
									//arrangeList[35i+j] stores the index of courseList that satisfies roomList[i] is occupied at time-j  

// the course class used by SA 
function CourseClass(courseId, courseName, stuRange)
{
	this.cid = courseId;
	this.cname = courseName;
	this.stuRange = stuRange;
	this.Print = function()
	{
		console.log("CourseID: "+ this.cid + " Name: "+ this.cname);
	}
}

function RoomClass(roomId, capacity)
{
	this.rid = roomId;
	this.capacity = capacity;
	this.Print = function(){}
	
}

// input all course in campusXXX
function InputCourse (campusName)
{
	courseList.push(new CourseClass("1001","math", 40));
	courseList.push(new CourseClass("1002","english", 60));
	courseList.push(new CourseClass("1003","bio", 80));
}

// input all class room in campusXXX
function InputClassroom(campusName)
{
	roomList.push(new RoomClass("d-101",60));
	roomList.push(new RoomClass("d-102",80));
	roomList.push(new RoomClass("d-103",120));
	roomList.push(new RoomClass("d-104",40));
}

//get the first solution 
function InitFirstSolu()
{
	console.log("courseList.length: "+ roomList.length);
	tmpArr = new Array(35*roomList.length);
	for(var i = 0; i< courseList.length; i++)
		tmpArr[i] = i;
	for(var i = courseList.length; i<tmpArr.length; i++)
		tmpArr[i] = -1;
	return tmpArr;
}

//calc the socre of sort, lower means better 
function CalcScore(aList)
{
	var score = 0;
	for(var i = 0; i<aList.length; i++)
		if(aList[i] != -1)
		{
			var roomIndex = Math.floor( i / 35);
			var timeIndex = i % 35;
			var courseIndex = aList[i];
			
			//judge the capacity
			if(roomList[roomIndex].capacity == courseList[courseIndex].stuRange)
			{
				score += 10;
			}
			else if(roomList[roomIndex].capacity > courseList[courseIndex].stuRange)
			{
				score += 3;
			}
			
			//judge others
			
		}
	//console.log("length: "+ aList.length);
	return score;
}

//analyze an arrangeList, output some info
function AnalyList(aList)
{
	for(var i = 0; i < aList.length; i++)
		if(aList[i] != -1)
		{
			var roomIndex = Math.floor( i / 35);
			var timeIndex = i % 35;
			var courseIndex = aList[i];
			console.log(courseList[courseIndex].cname + " is taken at room-"+roomList[roomIndex].rid + 
			" in week"+ Math.floor(timeIndex / 7+1) + ": "+ (timeIndex % 7));
		}
}

//use slice() to copy a array

function SA(campusName)
{
	
	
	InputClassroom(campusName);
	InputCourse(campusName);
	arrangeList = InitFirstSolu();
	
	var tempera = 1000.0;
	var K = 1;
	var bestScore = CalcScore(arrangeList);
	var bestArrange = arrangeList.slice();
	
	var tot=0;
	console.log("arrang length: " + arrangeList.length);
	
	while(tempera > 0.0001 )
	{
		tot++;
		var oldScore = CalcScore(arrangeList);
		
		
		//get a new sorted list by swap two items
		var newList = arrangeList.slice();
		var t1 = Math.floor(Math.random()*newList.length);//random returns float in [0,1)
		var t2 = Math.floor(Math.random()*newList.length);
		var tmp = newList[t1];
		newList[t1] = newList[t2];
		newList[t2] = tmp;
 		//return a newList
		
		//update the best solution 
		var newScore = CalcScore(newList);
		if(newScore > bestScore)
		{
			bestScore = newScore;
			bestArrange = newList.slice();
		}
		
		
		if(newScore >= oldScore)// we get a better solution, just replace it.
		{
			arrangeList = newList;
		}
		else// or we replace it in a probability
		{
			var delta = oldScore - newScore; //bigger than 0, higher means worser
			if(Math.exp(-delta/(K*tempera))>Math.random())
			{
				arrangeList = newList;
			}
			
		}	
		tempera *= 0.999;
	}
	console.log(tot);
	console.log("best score: "+ bestScore);
	AnalyList(bestArrange);
	
	console.log("SA done")
}
SA("ZJG");

mongoose.connection.close();

