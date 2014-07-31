(function () {
    $(function () {
        var linevalue = $("#TargetLine").val();
        linevalue = linevalue.replace(",", ".");
        
        $('#slider-range').slider({
            range: 'min',
            value: linevalue,
            min: 0,
            max: 10,
            step: 0.1,
            slide: function (event, ui) {
                $('#slider-range-value').html(ui.value);
            },
            change: function (event, ui) {
                updateOme();
            }
        });
        $('#slider-range-value').html($('#slider-range').slider('value'));
    });
    // clicking on rangeline
    // $('div#slider-range').live('click', function () {
    //  $('a.ui-slider-handle').trigger('slide'); });
 })();