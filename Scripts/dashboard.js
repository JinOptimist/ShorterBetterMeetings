$(document).ready(function () {
    $("#target-use").change(function () {
        updateOme();
        return false;
    });

    $("#benchmark-use").change(function () {
        updateOme();
        return false;
    });

    $(".userGroup").change(function () {
        updateOme();
        return false;
    });

    $("#calendar-dropdown li button").click(function () {
        $("#calendar-dropdown li button").removeClass("primary");
        $(this).addClass("primary");
        updateChart();
        updateDateRange();
        return false;
    });


    $("#types-dividing").change(function () {
        //var divideByMeetingType = $("#types-dividing:checked").length > 0;
        //var meetingTypePreference = $("[name=meeting-type-preference]");
        //if (!divideByMeetingType) {
        //    meetingTypePreference.attr('disabled', 'disabled');
        //    meetingTypePreference.next().addClass("disabled");
        //    meetingTypePreference.next().removeClass("checked");
        //} else {
        //    meetingTypePreference.removeAttr('disabled');
        //    meetingTypePreference.next().removeClass("disabled");
        //    meetingTypePreference.first().next().addClass("checked");
        //}
        
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

        updateOme();
        return false;
    });

    $("[name=meeting-type-preference]").change(function () {
        updateOme();
    });

    $("[name=pie-groups-group]").change(function () {
        updatePieChart();
    });

    $("#slider-range-value").parent().bind('touchstart click slidechange', function () {
        updateChart();
    });

    function updateChart() {
        updateOme();
        updatePieChart();
    }

    function updatePieChart() {
        $("#pieChartDiv").hide();
        $("#PieWait").show();

        var group = $("[name=pie-groups-group]:checked");
        var groupId = group.data("group-id");
        var timeLine = $("#calendar-dropdown li button.primary").data("value");

        var url = $("#UpdatePieUrl").val();

        $.get(url, { groupId: groupId, timeLine: timeLine },
            function (data) {
                $("#pieChartDiv").html(data);
                $("#pieChartDiv").show();
                $("#PieWait").hide();
                $.each($(".questionIds"), function () {
                    var questionId = $(this).val();
                    setTimeout("drawChart" + questionId + "();", 1);
                });
            });
    }

    function updateDateRange() {
        var timeLine = $("#calendar-dropdown li button.primary").data("value");
        var url = $("#UpdateDateRangeUrl").val();

        $.get(url,
            {
                timeLine: timeLine
            },
            function (data) {
                $("#calendar-toggle").html(data);
            });

    }
});

function updateOme() {
    var useTargetLine = $("#target-use:checked").length > 0;
    var targetLine = $("#slider-range-value").text();
    var useBenchmark = $("#benchmark-use:checked").length > 0;
    var divideByMeetingType = $("#types-dividing:checked").length > 0;
    var meetingTypePreference = $("[name=meeting-type-preference]:checked").data("value");
    var timeLine = $("#calendar-dropdown li button.primary").data("value");

    var groupIds = new Array();
    $.each($(".userGroup"), function () {
        var elementId = $(this).attr("id");
        if ($("#" + elementId + ":checked").length > 0) {
            var id = $(this).data("group-id");
            groupIds.push(id);
        }
    });

    $("#chart_div").empty();
    $("#chart_div").hide();
    $("#OmeWait").show();
    var url = $("#UpdateOmeUrl").val();

    $.get(url,
        {
            useTargetLine: useTargetLine,
            targetLine: targetLine,
            useBenchmark: useBenchmark,
            divideByMeetingType: divideByMeetingType,
            meetingType: meetingTypePreference,
            groupIds: groupIds.toString(),
            timeLine: timeLine
        },
        function (data) {
            $("#chart_div").html(data);
            $("#chart_div").show();
            $("#OmeWait").hide();
            drawChart();
        });
}

$(document).ready(function () {
    if (!$('#types-dividing').is(":checked")) {
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
});