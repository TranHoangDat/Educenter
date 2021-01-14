$(document).ready(function() {
  var ctrlDown = false,
      ctrlKey = 17,
      altKey = 18,
      vKey = 86,
      cmdKey = 91;

  $(document).keydown(function(e) {
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
  }).keyup(function(e) {
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
  });

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

  $('#course-title').on('keydown', 'input#courseTitle', function(e) {
    const currentCount = Number($('#title-characters').text());

    if (ctrlDown && e.keyCode === vKey) {
      // Stop data actually being pasted into div
      e.stopPropagation();
      e.preventDefault();   
      return;
    }

    if (e.keyCode === 8) {
      const selectedStr = window.getSelection().toString();
      $('#title-characters').text(currentCount + (selectedStr === '' ? 1 : selectedStr.length));
    } else {
      if (currentCount === 0) {
          e.preventDefault();
          return;
      }

      if (e.keyCode !== altKey && e.keyCode !== ctrlKey && !ctrlDown) {
          $('#title-characters').text(60 - $('#courseTitle').val().length - 1);
      }
    }
  });
});
