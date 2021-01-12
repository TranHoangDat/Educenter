$(document).ready(function() {

  $("#newCourseBtn").click(function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/instructor/course/newCourse',
      data: $('#newCourseForm').serialize(),
      dataType: 'json',
      encode: true
    }).done(function(data) {
      if (data.msg === 'success') {
        window.location.href = `http://localhost:5000/instructor/course/${data.courseId}/`;
      } else {
        $("#newCourseModalAlert").empty();
  
        if (!$("#newCourseModalAlert").hasClass('alert')) {
          $("#newCourseModalAlert").addClass("alert alert-danger alert-dismissible fade show");
          $("#newCourseModalAlert").css({"height": "45px", "visibility": "visible"});
        }
  
        $("#newCourseModalAlert").prepend('Failed to create a new course. Please try again later');
      }
    });
  });

  get_courses.map(course => {
    $(`#${course._id}`).click(function() {
      window.location.href = `http://localhost:5000/instructor/course/${course._id}/`;
    });

    $(`#${course._id}`).hover(function() {
      $(this).find('.on-hover').css("visibility", "visible");
    }, function() {
      $(this).find('.on-hover').css("visibility", "hidden");
    });
  });

});