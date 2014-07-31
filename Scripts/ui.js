(function(){
    $(window).scroll(function() {
        $( '.wrapper' ).css('left', -$(window).scrollLeft());
        
        if ($(window).scrollLeft() > 0) {
            $('.sidebar').css('left', -$(window).scrollLeft() + 20 );
        } else {
            $('.sidebar').css('left', '');
        }
    });
    $(window).resize(function() {
        if ($(window).scrollLeft() === 0) {
            $('.sidebar').css('left', '');
        }
    });

    $().ready(function(){
        $('.checkbox-style').each(function() {
            $(this).prettyCheckable();
        }); 
    });

    $().ready(function(){
        $('.radio-style').each(function() {
            $(this).prettyCheckable();
        }); 
    });

    $('.notifications-toggle').live('click', function (event) {
        event.preventDefault();
        $('#notifications-dropdown').slideToggle();
    });

    $(function(){
        $(document).click(function(event) {
            if ($(event.target).closest('#notifications-dropdown').length || $(event.target).closest('.notifications-toggle').length) return;
            $('#notifications-dropdown').slideUp();
            event.stopPropagation();
        });
    });

    $('#profile-toggle').live('click', function (event) {
        event.preventDefault();
        $('#profile-dropdown').slideToggle();
    });

    $(function(){
        $(document).click(function(event) {
            if ($(event.target).closest('#profile-dropdown').length || $(event.target).closest('#profile-toggle').length) return;
            $('#profile-dropdown').slideUp();
            event.stopPropagation();
        });
    });

    $('#calendar-toggle').live('click', function (event) {
        event.preventDefault();
        $('#range-dropdown').slideUp();
        $('#calendar-dropdown').slideToggle();
        ( $('#calendar-toggle').hasClass('calendar-toggle-active') ) ? $('#calendar-toggle').removeClass('calendar-toggle-active') : $('#calendar-toggle').addClass('calendar-toggle-active'); 
    } );

    $(function(){
        $(document).click(function(event) {
            if ($(event.target).closest('#calendar-dropdown').length || $(event.target).closest('#calendar-toggle').length) return;
            $('#calendar-toggle').removeClass('calendar-toggle-active');
            $('#calendar-dropdown').slideUp();
            $('#range-dropdown').slideUp();
            event.stopPropagation();
        });
    });

    $('#range-toggle').live('click', function (event) {
        event.preventDefault();
        $('#range-dropdown').slideToggle();
    });

    $('#hide-show').live('click', function (event) {
        event.preventDefault();

        if  ( $('#sidebar').hasClass('sidebar-close') ) {
            $('#hide-show').removeClass('flip-horizontal'); 
            $('#sidebar').removeClass('sidebar-close');
            $('#main').removeClass('section-short');
            setTimeout(function () { $('#menu span').show(); }, 300);
            
            $(".navigation li#nav-usergroup").animate({
                height: "125px"
            });
        }
        else {
            $('#menu span').hide();
            $('#main').addClass('section-short');
            $('#sidebar').addClass('sidebar-close');
            $('#hide-show').addClass('flip-horizontal');
            
            $(".navigation li#nav-usergroup").animate({
                height: "25px"
            });
        }
    });

    //$('#apply-button').live('click', function (event) {
    //    event.preventDefault();
    //    $('.modal-overlay').show();
    //});

    //$('#cancel-button').live('click', function (event) {
    //    event.preventDefault();
    //    $('.modal-overlay').hide();
    //});
    
    $('#personal-info-change').live('click', function (event) {
        event.preventDefault();
        $('#personal-info span.label').hide();
        $('#personal-info input').show();
        $('#personal-info .action').show();
        $('#personal-info label').css('display', 'block');
        $('#personal-info-change').hide();
    });

    $('#change-password').live('click', function (event) {
        event.preventDefault();
        $('#change-password-block').hide();
        $('#instead-account-info').show();
        $('#instead-account-info .action').show();
        $('#change-password').hide();
    });
})();
 
    


    
