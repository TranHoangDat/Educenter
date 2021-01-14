$(document).ready(function() {
    let ratingPoint = null;

    courses.map(course => {
        ratingPoint = course.rating / course.voters;
        $(`#${course.idCourse}`).find('.rating-point').append(ratingPoint.toFixed(2));
        if (course.buyersPerWeek > 1000) {
            $(`#${course.idCourse}`).append("<div class='card-footer mt-2'>Bestseller</div>");
        }
        $(`#${course.idCourse}`).click(function(e) {
            e.preventDefault();
            window.location.href = `http://localhost:5000/course/${course.idCourse}`;
        });
    });

});

function showRegisterModalMsg(type, msg) {
    $("#instructorModalAlert").empty();
    $("#instructorModalAlert").removeClass();

    switch (type) {
        case 'success':
            $("#instructorModalAlert").addClass("alert alert-success alert-dismissible fade show");
            break;
        case 'error':
            $("#instructorModalAlert").addClass("alert alert-danger alert-dismissible fade show");
            break;
    }

    $("#instructorModalAlert").css({"height": "45px", "visibility": "visible"});
    $("#instructorModalAlert").prepend(msg);
}

$('#instructorRegisterBtn').click(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/instructors/register',
        data: $('#instructorRegisterForm').serialize(),
        dataType: 'json',
        encode: true
    }).done(function(data) {
        if (data.errors.length) {
            showRegisterModalMsg('error', data.errors[0].msg);
        } else {
            showRegisterModalMsg('success', 'You are now registered and can log in');
            window.setTimeout(function(){
                window.location.href = "http://localhost:5000/users/login";
            }, 3000);
        }
    });
});