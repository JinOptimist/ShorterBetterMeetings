$(function() {
    $('form button[type=submit]').click(function () {
        $(this).attr('disabled', 'disabled');
        $('form').trigger('submit');
    });
    $("button[type=submit]").removeAttr("disabled");

    $('form input').change(function () {
        $("button[type=submit]").removeAttr("disabled");
    });

});