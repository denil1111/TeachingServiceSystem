# Interfaces of subsystem 2 #

3120101274 宋志平
----------


- Teaching resource management

	No interfaces
	
	Webpages:
	>Add/modify classroom information

- Automatically course scheduling
	
	In: 
	> Course_Information     //from subsystem 1
	> 
	> Teacher_Information    //from subsystem 1

	No webpages.
	
- Manually course adjustment
	
	In:
	> Request_dueto_classroom //Maybe from subsystem 1

	Webpages:
	> Teacher’s request(by teacher) or classroom resource requirements(maybe by system manager), the course arrangement can be manually adjusted without conflict.
- Schedule Inquiry
	
	Out:
	> Teacher_Schedule(teacher)    //Maybe to subsystem 1,3
	>
	> Classroom_Schedule(classroom)    //Maybe to subsystem 1,3

	Webpages:
	>Query and print his class schedule(by teacher)
	>
	>Search every classroom’s class schedule(by classroom)