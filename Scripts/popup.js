$(function () {
    $('.popup').dialog({
        dialogClass: "no-close",
        autoOpen: false,
        resizable: false,
        draggable: false,
        modal: true,
        open: function () {
            $('.popup').removeClass('ui-dialog-content ui-widget-content');
            $('.ui-dialog').removeClass('ui-widget ui-widget-content ui-corner-all no-close');
            $(".ui-dialog-titlebar").remove();
            $(".ui-widget-overlay").show();
            $(this).load(url);
            
        }
    });

    $(".popupLink").live("click", function () {
        url = $(this).attr('href');
        $(".popup").dialog('open');
        return false;
    });

    $(".popupBtn").live("click", function () {
        url = $(this).attr('data-url');
        $(".popup").dialog('open');
        return false;
    });

    $('.close-modal, .ok-close, .cancel').live("click", function () {
        $('.ui-widget-overlay').hide();
        $(".popup").dialog('close');
        $(".popup").html('');
        return false;
    });

    $('#accept-terms').live("click", function () {
        var x = $("#promotions-agree").is(":checked");
        $('.ui-widget-overlay').hide();
        $(".popup").dialog('close');
        $(".popup").html('');
        $("#SBMTerms").prop('checked', true);
        $("#ReceivePromotions").val(x);
        
        return false;
    });

    $('#signin-btn').live("click", function (e) {
        var form = $("#signin form");
        e.preventDefault();
        form.validate();
        if (form.valid()) {
            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                type: "POST",
                success: function (result) {
                    if (result.IsSuccess) {
                        window.location.href = result.ReturnUrl;

                    } else {
                        $("#signin div.validation-summary-errors").text(result.Message);
                        $("#signin #Password").val('');
                    }
                },
                error: function () {
                    $("#signin div.validation-summary-errors").text(result.Message);
                    $("#signin #Password").val('');
                }
            });
        }
        return false;
    });
    
    $('#sign-in-redirect-btn').live("click", function (e) {
        var form = $(".sign-in-redirect form");
        e.preventDefault();
        form.validate();
        if (form.valid()) {
            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                type: "POST",
                success: function (result) {
                    if (result.IsSuccess) {
                        window.location.href = result.ReturnUrl;

                    } else {
                        $(".sign-in-redirect div.validation-summary-errors").text(result.Message);
                        $(".sign-in-redirect #Password").val('');
                    }
                },
                error: function () {
                    $(".sign-in-redirect div.validation-summary-errors").text(result.Message);
                    $(".sign-in-redirect #Password").val('');
                }
            });
        }
        return false;
    });
});

$(function () {
    $('.popup-light').dialog({
        dialogClass: "no-close",
        autoOpen: false,
        resizable: false,
        draggable: false,
        modal: true,
        open: function () {
            $(".ui-widget-overlay").hide();
            $('.ui-widget-overlay').addClass('overlay-hidden');
            $('.popup-light').removeClass('ui-dialog-content ui-widget-content');
            $('.ui-dialog').removeClass('ui-widget ui-widget-content ui-corner-all no-close');
            $(".ui-dialog-titlebar").remove();
            $(this).load(url);
        },
        beforeClose: function (event, ui) {
            $('.ui-widget-overlay').removeClass('overlay-hidden');
        }
    });

    $(".popupLink-light").live("click", function () {
        url = $(this).attr('href');
        $(".popup-light").dialog('open');
        return false;
    });

    $(".popupBtn-light").live("click", function () {
        url = $(this).attr('data-url');
        $(".popup-light").dialog('open');
        return false;
    });

    $('.close-modal-light, .ok-close-light, .cancel-light').live("click", function () {
        $('.ui-widget-overlay').hide();
        $(".popup-light").dialog('close');
        $(".popup-light").html('');
        return false;
    });

    $('#requestInviteSent .close-modal-light, #requestInviteSent .ok-close-light').live("click", function () {
        $("#ColeagueEmail").val('');
        document.getElementById('searchResults').style.display = 'none';
        $("#searchResults table").html('');
        return false;
    });

    $('.invite-to-group-confirm').live("click", function () {
        var returl = $(this).attr('data-returnurl');
        $.ajax({
            url: $(this).attr('data-url'),
            type: "POST",
            data: $(this).attr('data-id'),
            success: function (result) {//поставить вывод сообщения если ошибка (но сначала добавить проверку в контролере)
                if (result.IsSuccess) {
                    window.location.href = returl;
                } else {
                    alert("Something wrong");
                }
            },
            error: function (result) {
            }
        });

        return false;
    });

    $('.find-groups-btn').live("click", function (e) {
        var form = $(".find-groups-form");
        var requestInviteUrl = $("#get-group-by-useremail").attr('data-requestInviteUrl');
        e.preventDefault();
        form.validate();
        if (form.valid()) {
            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                type: "POST",
                success: function (result) {
                    $(".find-groups-form .error").html('');
                    $("#searchResults table").html('');
                    if (result.IsSuccess == true) {
                        if (result.Data != "") {
                            $.each(result.Data, function () {
                                document.getElementById('searchResults').style.display = 'table-row';
                                var link = requestInviteUrl.replace(' ', '') + "?id=" + this.id + "&emailTo=" + result.EmailTo;
                                $("#searchResults table").append(
                                    "<tr>" +
                                        "<td>" + this.name + "</td>" +
                                        "<td>" + "<a id='request-invite' href=" + link + " class='button button-negative popupLink-light'>Request an invite</a>" + "</td>" +
                                    "</tr>");
                            });
                        } else {
                            $(".find-groups-form .error").text("This user haven't got any user groups");
                            $("#searchResults table").html('');
                        }
                    }
                    else {
                        $(".find-groups-form .error").text(result.Message);
                        $("#searchResults table").html('');
                    }

                },
                error: function () {
                }
            });
        }
        return false;
    });
    
    $('.invite-submit').live("click", function (e) {
        var form = $(".invite-colleagues-form");
        e.preventDefault();
        form.validate();
        if (form.valid()) {
            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                type: "POST",
                success: function (result) {
                    if (!result.IsSuccess) {
                        $(".error-valid").html('');
                        if (!result.IsSuccess) {
                            $(".error-valid").text(result.Message);
                        }
                    } else {
                        $('.ui-widget-overlay').hide();
                        $(".popup-light").dialog('close');
                        $(".popup-light").html('');
                    }
                },
                error: function () {
                }
            });
        }
        return false;
    });
    
    $('.remove-group').live("click", function () {
        $.ajax({
            url: $(this).attr('data-url'),
            type: "POST",
            data: $(this).serialize(),
            success: function () {
                window.location.href = window.location.href;
            },
            error: function () {
            }
        });
        return false;
    });

    //inviting to group
    $('#nav-usergroup-invite').live('click', function () {
        $('i.user-group-ico invite-colleague-ico')[0].trigger('click');
    });
    //join group
    $('#nav-usergroup-joinGroup').live('click', function () {
        $('#ColeagueEmail').focus();
    });
    //creating group
    $('#nav-usergroup-createGroup').live('click', function() {
        $('#create-group').trigger('click');
    });
});