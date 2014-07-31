$(document).ready(function () {
    $(".userGroup").change(function () {
        updateOme();
        return false;
    });
    
    $("#question").change(function () {
        updateOme();
        return false;
    });
    
    $("#calendar-dropdown li button").click(function () {
        $("#calendar-dropdown li button").removeClass("primary");
        $(this).addClass("primary");
        updateOme();
        updateDateRange();
        return false;
    });

    function updateOme() {
        var questionId = $("#question").val();
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
        var url = $("#UpdateDetailedAnalysisChartUrl").val();

        $.get(url,
            {
                questionId: questionId,
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