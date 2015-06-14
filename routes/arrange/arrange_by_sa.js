var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/TS');
//var ClassroomModel = require('../../db/group2db/ClassroomModel');
var CourseModel = require('../../db/group1db/CourseModel');
var RoomModel = require('../../db/group2db/ClassroomModel');
// var Course = mongoose.model('CourseModel',CourseModel.CourseSchema);
// var Room = mongoose.model('ClassroomModel',RoomModel.ClassroomSchema);

//global vars
var courseList = new Array();		//all courses waiting to be sorted
var roomList = new Array();			//all classroom 
var arrangeList;					//there are 5*7 point-in-time to start a course
									//arrangeList[35i+j] stores the index of courseList that satisfies roomList[i] is occupied at time-j  

// the course class used by SA 
function CourseClass(courseId, courseName, stuRange, times, isOnWeekend)
{
	this.cid = courseId;
	this.cname = courseName;
	this.stuRange = stuRange;
	this.times = times;
	this.isOnWeekend = isOnWeekend;
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

function print(line)
{
	console.log(line);
}

// InputCourse ---> InputClassroom 
// input all course in campusXXX
function InputCourse (campusName, NextReadFunction)
{
	print("start read course");
	Course.find({campus: campusName},function(err, res){
		if(err)
			console.log(err);
		else
		{
			print("read Course.length: " + res.length);			
			courseList = [];
			for(var i = 0; i< res.length; i++)
			{
				//transform data type	
				courseList.push(new CourseClass(
					res[i].courseid2,
					res[i].coursename,
					75,
					1,				//times
					0				//isOnWeekend
					));		
			}
			NextReadFunction(campusName, SA);
		}
	}
)
}


// inputClassroom ---> SA
// input all class room in campusXXX
function InputClassroom(campusName, ReadDoneFunction)
{
	print("start read class room");
	Room.find({campus: campusName}, function(err, res){
		if(err)
			console.log(err);
		else
		{
			print("read Room.length: " + res.length);
			roomList = [];
			for(var i = 0; i < res.length; i++)
			{
				roomList.push(new RoomClass(
					res[i].classid2,
					res[i].capacity
					))
			}
			//do SA()
			ReadDoneFunction();
		}
	})
	
	
	
}

//get the first solution 
function InitFirstSolu()
{
	console.log("courseList.length: "+ roomList.length);
	tmpArr = new Array(35*roomList.length);
	var tmpIndex = 0;
	for(var i = 0; i< courseList.length; i++)
		for(var j = 0; j< courseList[i].times; j++)
			tmpArr[tmpIndex++] = i;
	for(var i = tmpIndex; i<tmpArr.length; i++)
		tmpArr[i] = -1;
	return tmpArr;
}

//calc the socre of sort, lower means better 
function CalcScore(aList)
{
	var score = 0;
	for(var i = 0; i<courseList.length; i++)
	{
		var lastOne = -1;
		for(var j = 0; j<aList.length; j++)
		{
			if(aList[j] == i)		//find this course
			{
				var roomIndex = Math.floor(j / 35); 
				var timeIndex = j % 35; 			// week = timeIndex / 5;  time = timeIndex %5
				var courseIndex = i;
				//judge the capacity
				if(roomList[roomIndex].capacity == courseList[courseIndex].stuRange)
					score += 5;
				else if(roomList[roomIndex].capacity > courseList[courseIndex].stuRange)
					score += 3;
				else
					score -= 5;
				
				//judge workday
				if(courseList[i].isOnWeekend == 1 && (Math.floor(timeIndex/5) < 5))
					score -= 5;
				if(courseList[i].isOnWeekend == 0 && (Math.floor(timeIndex/5) >= 5) )
					score -= 5;
				
				//judge the time interval
				if(lastOne != -1 && (timeIndex - lastOne)<=14)
					score -= 5;
				lastOne  = timeIndex;		//store last course time
			}
		}
		
	}
	return score;
	
}

//analyze an arrangeList, output some info
function AnalyList(aList)
{
	for(var j = 0; j < courseList.length; j++)
	{
		var roomString="";
		var timeString="";
		for(var i = 0; i < aList.length; i++)
			if(aList[i] == j)
			{
				var roomIndex = Math.floor( i / 35);
				var timeIndex = i % 35;
				print("courseID: "+ courseList[j].cid + " room: " + roomList[roomIndex].rid + " time: "
					+  Math.floor(timeIndex / 5) + "-"+ (timeIndex % 5));
				roomString = roomString + roomList[roomIndex].rid + ";";
				timeString = timeString + Math.floor(timeIndex / 5) + "-"+ (timeIndex % 5) + ";";
			}
		Course.findOne({ courseid2: courseList[j].cid }, function (err, doc){
			if(err)
				console.log(err);
			else
			{
				doc.coursetime = timeString;
				doc.room = roomString;
				doc.save();
			}
		});
		
	}
	return;
}



//sa algorithm
function SA()
{
	print("SA start");
	arrangeList = InitFirstSolu();
	
	var tempera = 1000.0;
	var K = 1;
	var bestScore = CalcScore(arrangeList);
	var bestArrange = arrangeList.slice();
	//use slice() to copy a array
	

	console.log("arrang length: " + arrangeList.length);
	
	while(tempera > 0.0001 )
	{
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
		tempera *= 0.99;
	}
	console.log("best score: "+ bestScore);
	AnalyList(bestArrange);
	
	console.log("Program end at time: "+ Date());
	//mongoose.connection.close();
}


function ArrangeACampus(campusName)
{
	
	//InputCourse ---> InputClassroom ---> SA
	InputCourse(campusName, InputClassroom);
	
}
console.log("Begin at time: "+ Date());
ArrangeACampus('zjg');



