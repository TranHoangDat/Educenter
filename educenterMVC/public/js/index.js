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
            $("#instructorModalAlert").addClass("alert alert-warning alert-dismissible fade show");
            $("#instructorModalAlert").css({"height": "45px", "visibility": "visible"});
            $("#instructorModalAlert").prepend(data.errors[0].msg);
        }
    })
});