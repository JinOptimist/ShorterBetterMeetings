(function( $ ){
    $.fn.triggerButton = function() {
        var make = function() {
            $(this).bind('click', function(event){
                event.preventDefault();
                $(this).closest('li').children('.button').removeClass('selected');
                $(this).addClass('selected');
            });
        };
        return this.each(make);    
    };
})( jQuery );
$('#questions .button').triggerButton();

