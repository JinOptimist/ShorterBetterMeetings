function hideInviteCollegue() {
    $('#invite-colleagues').hide();
}
function hideNewGroup() {
    $('#new-user-group').hide();
}
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

    $( '#notifications-toggle' ).on( 'click', function(event) {
        event.preventDefault();
        $('#notifications-dropdown').slideToggle();
    });

    $(function(){
        $(document).click(function(event) {
            if ($(event.target).closest('#notifications-dropdown').length || $(event.target).closest('#notifications-toggle').length) return;
            $('#notifications-dropdown').slideUp();
            event.stopPropagation();
        });
    });

    $( '#profile-toggle' ).on( 'click', function(event) {
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

    $( '#calendar-toggle' ).on( 'click', function(event) {
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

    $( '#range-toggle' ).on( 'click', function(event) {
        event.preventDefault();
        $('#range-dropdown').slideToggle();
    });

    $( '#hide-show' ).on( 'click', function(event) {
        event.preventDefault();
        if  ( $('#sidebar').hasClass('sidebar-close') ) {
            $('#hide-show').removeClass('flip-horizontal'); 
            $('#sidebar').removeClass('sidebar-close');
            $('#main').removeClass('section-short');
            setTimeout(function(){ $('#menu span').show(); }, 300);
        }
        else {
            $('#menu span').hide();
            $('#main').addClass('section-short');
            $('#sidebar').addClass('sidebar-close');
            $('#hide-show').addClass('flip-horizontal');
        }
    });

    $( '#create-group' ).on( 'click', function(event) {
        event.preventDefault();
        $('#new-user-group').show();
    });

    $( 'a.invite-colleague' ).on( 'click', function(event) {
        event.preventDefault();
        $('#invite-colleagues').show();
    });

    $( '#apply-button' ).on( 'click', function(event) {
        event.preventDefault();
        $('.modal-overlay').show();
    });

    $( '#cancel-button' ).on( 'click', function(event) {
        event.preventDefault();
        $('.modal-overlay').hide();
    });
})();
 
    


    
