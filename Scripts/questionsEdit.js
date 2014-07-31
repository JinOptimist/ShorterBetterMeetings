/*
    Question script section
*/
$(document).ready(function () {
    $('.question').click(function () {
        var questionId = $(this).data("id");
        $("#questionText" + questionId).hide();

        $("#questionInput" + questionId).show();
        updateInputTextWidth($("#questionInput" + questionId + ">.questionInput"));

        $("#questionConfirm" + questionId).show();
        $("#questionDelete" + questionId).show();
    });

    $('.questionInput').keyup(function () {
        updateInputTextWidth($(this));
    });

    $('.questionConfirm').click(function () {
        var questionId = $(this).data("id");
        var url = $(this).attr('href');

        //var questionType = $("#QuestionType" + questionId).val();

        $("#questionConfirm" + questionId).hide();
        $("#questionWait" + questionId).show();
        var input = $("#questionInput" + questionId + ">input");
        input.attr('disabled', true);

        var newText = input.val();
        editQuestion(url, questionId, newText);
        return false;
    });

    function editQuestion(url, questionId, text) {
        $.get(url, { id: questionId, newText: text },
            function(data) {
                if (data == "+") {
                    $("#questionText" + questionId).text(text);
                    $("#questionText" + questionId).show();
                    $("#questionWait" + questionId).hide();
                    $("#questionEidt" + questionId).show();
                    $("#questionInput" + questionId + ">input").attr('disabled', false);
                    $("#questionInput" + questionId).hide();
                } else {
                    alert("bad");
                }
            });
    }

    $('.deleteQuestion').click(function () {
        var questionText = $(this).data("question-text");
        var questionId = $(this).data("id");
        var url = $(this).attr("href");
        var userAnswer = confirm("Are you sure you want to delete this question?" + "\r\n\"" + questionText + "\"");
        if (userAnswer) {
            deleteQuestion(url, questionId);
        }

        return false;
    });

    function deleteQuestion(url, questionId) {
        $.get(url, { id: questionId },
            function(data) {
                if (data == "+") {
                    $("#questionRow" + questionId).remove();
                } else {
                    alert("bad");
                }
            });
    }
});


/*
    Answer script section
*/
$(document).ready(function () {
    $('.answer').click(function () {
        var answerId = $(this).data("id");
        $("#answerText" + answerId).hide();
        $("#answerInput" + answerId).show();

        $("#answerInput" + answerId).width($("#answerText" + answerId).width());

        $("#AnswerStyle" + answerId).show();
        $("#answerConfirm" + answerId).show();
        $("#answerDelete" + answerId).show();
    });
    
    $('.answerInput').keyup(function () {
        updateInputTextWidth($(this));
        $("#answerText").width($(this).width());
    });

    $('.answerStyle').change(function () {
        var answerStyle = $(this);
        var className = "answer-input-" + answerStyle.val().toLowerCase().toLowerCase();
        answerStyle.removeClass();
        answerStyle.addClass("answerStyle");
        answerStyle.addClass(className);

        var id = answerStyle.attr("id").replace("AnswerStyle", "");
        var answerInput = $("#answerInput" + id);
        answerInput.removeClass();
        answerInput.addClass(className);
        answerInput.addClass("answerInput");
        
        var answerText = $("#answerText" + id);
        answerText.removeClass();
        answerText.addClass("button");
        answerText.addClass("answer");
        answerText.addClass(className);
    });

    $('.confirmAnswer').click(function () {
        var answerId = $(this).data("id");
        $("#answerConfirm" + answerId).hide();
        $("#answerWait" + answerId).show();
        var answerType = $("#AnswerStyle" + answerId).val();
        var input = $("#answerInput" + answerId);
        input.attr('disabled', true);

        var newText = input.val();
        var url = $(this).attr("href");
        editAnswer(url, answerId, newText, answerType);

        return false;
    });

    function editAnswer(url, answerId, text, answerType) {
        $.get(url, { id: answerId, newText: text, answerType: answerType },
            function (data) {
                if (data == "+") {
                    $("#answerText" + answerId).text(text);
                    $("#answerText" + answerId).show();
                    $("#answerInput" + answerId).attr('disabled', false);
                    $("#answerInput" + answerId).hide();
                    $("#AnswerStyle" + answerId).hide();
                    $("#answerDelete" + answerId).hide();
                    $("#answerWait" + answerId).hide();
                } else {
                    alert("bad");
                }
            });
        return;
    }

    $('.deleteAnswer').click(function () {
        var answerText = $(this).data("answer-text");
        var answerId = $(this).data("id");
        var userAnswer = confirm("Are you sure you want to delete this answer?" + "\r\n\"" + answerText + "\"");
        if (userAnswer) {
            $("#answerWait" + answerId).show();
            var url = $(this).attr("href");
            deleteAnswer(url, answerId);
        }
        
        return false;
    });

    function deleteAnswer(url, answerId) {
        $.get(url,
            function (data) {
                if (data == "+") {
                    $("#answerText" + answerId).remove();
                    $("#answerDelete" + answerId).remove();
                    $("#answerInput" + answerId).remove();
                    $("#answerConfirm" + answerId).remove();
                    $("#answerWait" + answerId).remove();
                } else {
                    alert("bad");
                }
            });
        return;
    }
});

function updateInputTextWidth(input) {
    var inputText = input.val();
    $("#tempDiv").text(inputText);
    var width = $("#tempDiv").width();
    input.width(width + 15);
}