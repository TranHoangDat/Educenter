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
            $("#instructorModalAlert").empty();

            if (!($("#instructorModalAlert").hasClass('alert'))) {
                $("#instructorModalAlert").addClass("alert alert-danger alert-dismissible fade show text-center");
                $("#instructorModalAlert").css({"height": "45px", "visibility": "visible"});
            }

            $("#instructorModalAlert").prepend(data.errors[0].msg);
        }
    })
});