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

            if (e.keyCode !== altKey && e.keyCode!== ctrlKey && !ctrlDown) {
                $('#title-characters').text(60 - $('#courseTitle').val().length - 1);
            }
        }
    });

    $('#course-subtitle').on('keydown', 'input#courseSubtitle', function(e) {
        const currentCount = Number($('#subtitle-characters').text());

        if (ctrlDown && e.keyCode === vKey) {
            // Stop data actually being pasted into div
            e.stopPropagation();
            e.preventDefault();   
            return;
        }

        if (e.keyCode === 8) {
            const selectedStr = window.getSelection().toString();
            $('#subtitle-characters').text(currentCount + (selectedStr === '' ? 1 : selectedStr.length));
        } else {

            if (currentCount === 0) {
                e.preventDefault();
                return;
            }

            if (e.keyCode !== altKey && e.keyCode!== ctrlKey && !ctrlDown) {
                $('#subtitle-characters').text(120 - $('#courseSubtitle').val().length - 1);
            }
        }
    });
});

