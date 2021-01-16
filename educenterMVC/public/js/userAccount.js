function showPageMsg(type, msg) {
    $('#editSectionAlert').empty();
    $('#editSectionAlert').removeClass();

    switch (type) {
        case 'success':
            $('#editSectionAlert').addClass("alert alert-success alert-dismissible fade show text-center");
            break;
        case 'error':
            $('#editSectionAlert').addClass("alert alert-danger alert-dismissible fade show text-center");
            break;
    }

    $('#editSectionAlert').css({"height": "45px", "visibility": "visible"});
    $('#editSectionAlert').prepend(msg);
}

function showModalMsg(msg) {
    $("#editEmailModalAlert").empty();

    if (!($("#editEmailModalAlert").hasClass('alert'))) {
        $("#editEmailModalAlert").addClass("alert alert-danger alert-dismissible fade show text-center");
        $("#editEmailModalAlert").css({"height": "45px", "visibility": "visible"});
    }

    $("#editEmailModalAlert").prepend(msg);
}

$(document).ready(function() {
    if (localStorage.getItem('success')) {
        const success = localStorage.getItem('success');

        if (success === '1') {
            showPageMsg('success', localStorage.getItem('msg'));
        } else {
            showPageMsg('error', localStorage.getItem('msg'));
        }

        localStorage.removeItem('success');
        localStorage.removeItem('msg');
    }
});

$('#btn-edit-name').on('click', function(e) {
    e.preventDefault();
    const newName = $('#input-edit-name').val();
    const currentName = $('#user-name').text();

    if (newName === '') {
        showPageMsg('error', 'You must enter your new name!');
        $('#input-edit-name').val('');
        return;
    }

    if (newName === currentName) {
        showPageMsg('error', 'You are using this name!');
        $('#input-edit-name').val('');
        return;
    }

    const userEmail = $('#user-email').text();
    $.ajax({
        url: '/user/edit-account/name',
        data: { newName, email: userEmail },
        type: 'POST',
        async: false,
        success: function(data) {
            if (data.result === 'success') {
                localStorage.setItem('success', '1');
                localStorage.setItem('msg', data.msg);
            } else {
                localStorage.setItem('success', '0');
                localStorage.setItem('msg', data.msg);
            }
            window.location.reload();
        }
    });
});

$('#btn-edit-email').on('click', function(e) {
    e.preventDefault();
    const currentEmail = $('#user-email').text();
    const newEmail = $('#user-new-email').val();

    if (newEmail === '') {
        showModalMsg('You must enter your new email address!');
        return;
    }

    if (newEmail === currentEmail) {
        showModalMsg('You are using this email address!');
        $('#user-new-email').val('');
        return;
    }

    const password = $('#user-password').val();

    if (password === '') {
        showModalMsg('You must enter your password!');
        return;
    }

    $.ajax({
        url: '/user/edit-account/email',
        data: {
            newEmail,
            password
        },
        type: 'POST',
        async: false,
        success: function(data) {
            if (data.result === 'success') {
                localStorage.setItem('success', '1');
                localStorage.setItem('msg', data.msg);
                window.location.reload();
            } else {
                showModalMsg(data.msg);
            }
        }
    });
});

$('#btn-edit-password').on('click', function(e) {
    e.preventDefault();
    const currentPassword = $('#current-password').val();
    const newPassword = $('#new-password').val();
    const reNewPassword = $('#re-new-password').val();

    if (newPassword === '') {
        showPageMsg('error', 'You must enter your new password!');
        return;
    }

    if (newPassword !== reNewPassword) {
        showPageMsg('error', 'Please re type your new password correctly!');
        $('#re-new-password').val('');
        return;
    }

    if (currentPassword === newPassword) {
        showPageMsg('error', 'You are using this password!');
        $('#current-password').val('');
        $('#new-password').val('');
        $('#re-new-password').val('');
        return;
    }

    $.ajax({
        url: '/user/edit-account/password',
        data: { 
            oldPassword: currentPassword,
            newPassword: newPassword
        },
        type: 'POST',
        async: false,
        success: function(data) {
            if (data.result === 'success') {
                localStorage.setItem('success', '1');
                localStorage.setItem('msg', data.msg);
            } else {
                localStorage.setItem('success', '0');
                localStorage.setItem('msg', data.msg);
            }
            window.location.reload();
        }
    })
});