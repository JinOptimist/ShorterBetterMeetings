$(document).ready(function () {
    $('.answer').click(function () {
        var answer = $(this);
        var questionId = answer.data("question-id");
        var answerId = answer.data("answer-id");

        $(".selected-question-" + questionId).val("False");
        $("#Questions_" + questionId + "__Answers_" + answerId + "__Selected").val("True");

        if (answer.data("type") == "BaseQuestion") {
            
            $(".question-group-" + questionId).removeClass("answer-select-positive-button");
            $(".question-group-" + questionId).removeClass("answer-select-negative-button");
            $(".question-group-" + questionId).removeClass("answer-select-indifferent-button");

            if (answer.data("style-type") == "Positive") {
                answer.addClass("answer-select-positive-button");
            }
            if (answer.data("style-type") == "Negative") {
                answer.addClass("answer-select-negative-button");
            }
            if (answer.data("style-type") == "Indifferent") {
                answer.addClass("answer-select-indifferent-button");
            }
        }
        
        $(".question-group-" + questionId).removeClass("answer-select");
        answer.addClass("answer-select");

        return false;
    });
    
    $('.button-meeting-type').click(function () {
        $(".button-meeting-type").removeClass("answer-select-positive-button");
        var type = $(this).data("value");
        $(this).addClass("answer-select-positive-button");
        $("#Meeting_MeetingType").val(type);
    });

    $('#apply-button').click(function () {

        $(".question-required").hide();
        var valid = true;

        var questionCount = $("#QuestionCount").val();
        for (var i = 0; i < questionCount; i++) {
            if (!$(".question-group-" + i).hasClass("answer-select")) {
                $("#questionRequired" + i).show();
                valid = false;
            }
        }

        if ($(".button-meeting-type").length && !$(".button-meeting-type").hasClass("answer-select-positive-button")) {
            $("#questionRequiredMeetingType").show();
            valid = false;
        }

        if (!valid) {
            return false;
        }

        $("form").submit();
        return true;
    });
    
});