$(function () {  
    $('#slider-range-value').bind("DOMSubtreeModified", function () {
        var linevalue = $(this).text();
        //linevalue = linevalue.replace(".", ",");
        $('#TargetLine').val(linevalue);
    });
    
    $("#cancel-button").live("click", function () {
        url = $(this).attr('data-returnurl');
        window.location.href = url;
        return false;
    });
    
    $('#types-face').change(function () {
        $(this).attr('checked', 'checked');
        $('#meetingtype-conference input').removeAttr('checked');
        $('#meetingtype-combination input').removeAttr('checked');

        var typevalue = $(this).data("value");
        $('#MeetingTypePreference').val(typevalue);
    });

    $('#types-conference').change(function () {
        $(this).attr('checked', 'checked');
        $('#meetingtype-face input').removeAttr('checked');
        $('#meetingtype-combination input').removeAttr('checked');

        var typevalue = $(this).data("value");
        $('#MeetingTypePreference').val(typevalue);
    });

    $('#types-combination').change(function () {
        $(this).attr('checked', 'checked');
        $('#meetingtype-face input').removeAttr('checked');
        $('#meetingtype-conference input').removeAttr('checked');

        var typevalue = $(this).data("value");
        $('#MeetingTypePreference').val(typevalue);
    });

    $('#DivideByTypeOfMeeting').change(function () {
        if ($(this).is(":checked")) {
            $('#meetingtype-face').removeClass('disabled');
            $('#meetingtype-conference').removeClass('disabled');
            $('#meetingtype-combination').removeClass('disabled');

            $('#meetingtype-face input').prop('disabled', false);
            $('#meetingtype-conference input').prop('disabled', false);
            $('#meetingtype-combination input').prop('disabled', false);

            $('#meetingtype-face a').removeClass('disabled');
            $('#meetingtype-conference a').removeClass('disabled');
            $('#meetingtype-combination a').removeClass('disabled');

            $('#meetingtype-face input').attr('checked', 'checked');//the first item is checked
            $('#meetingtype-face a').addClass('checked');
        }
        else {
            $('#meetingtype-face').addClass('disabled');
            $('#meetingtype-conference').addClass('disabled');
            $('#meetingtype-combination').addClass('disabled');

            $('#meetingtype-face input').prop('disabled', true);
            $('#meetingtype-conference input').prop('disabled', true);
            $('#meetingtype-combination input').prop('disabled', true);

            $('#meetingtype-face a').addClass('disabled').removeClass('checked');
            $('#meetingtype-conference a').addClass('disabled').removeClass('checked');
            $('#meetingtype-combination a').addClass('disabled').removeClass('checked');

            $('#meetingtype-face input').removeAttr('checked');
            $('#meetingtype-conference input').removeAttr('checked');
            $('#meetingtype-combination input').removeAttr('checked');
        }
        //var typevalue = $('#meetingtype-face').attr('data-value');
        var typevalue = $("[name=meeting-type-preference]:checked").data("value");
        $('#MeetingTypePreference').val(typevalue);
    });
});

$(document).ready(function (e) {
    if (!$('#DivideByTypeOfMeeting').is(":checked")) {
        $('#meetingtype-face').addClass('disabled');
        $('#meetingtype-conference').addClass('disabled');
        $('#meetingtype-combination').addClass('disabled');

        $('#meetingtype-face input').prop('disabled', true);
        $('#meetingtype-conference input').prop('disabled', true);
        $('#meetingtype-combination input').prop('disabled', true);

        $('#meetingtype-face a').addClass('disabled').removeClass('checked');
        $('#meetingtype-conference a').addClass('disabled').removeClass('checked');
        $('#meetingtype-combination a').addClass('disabled').removeClass('checked');

        $('#meetingtype-face input').removeAttr('checked');
        $('#meetingtype-conference input').removeAttr('checked');
        $('#meetingtype-combination input').removeAttr('checked');
    } else {
    }
});