<!DOCTYPE html>
<html>
  <head>
    <title>Course Insert</title>
    <meta charset="UTF-8">
    <link rel='stylesheet' href='./public/stylesheets/style.css' />
  </head>
  <body>
    <h1>Sign In</h1>
    <form action="/courseinsert" role="form" method="post">
        <p><span><%= insertresult %></span>
        </p>
        <p>
          <span>课程名称</span>
          <br>
          <input id="coursename" name="coursename" placeholder="course name" type="text">
        </p>
        <p>
            <span>教师</span>
            <br>
            <input id="teacher" name="teacher" placeholder="teacher name" type="text">
        </p>
        <p>
          <span>考试时间</span>
          <br>
          <input id="examtime" name="examtime" placeholder="exam name" type="text">
        </p>
        <p>
          <span>上课教室</span>
          <br>
          <input id="room" name="age" type="text">
        </p>
        <p>
          <span>开课学院</span>
          <br>
          <input id="college " name="college" type="text">
        </p>
        <p><input type="submit" onclick="courseinsert();" value="submit"></p>
    </form>
  </body>
</html>