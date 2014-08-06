$(document).ready(function () {
    $("#personal-info").submit(function () {
        var newVal = cutLtGt($("#FirstName").val());
        $("#FirstName").val(newVal);
        
        newVal = cutLtGt($("#LastName").val());
        $("#LastName").val(newVal);
    });
    
    $("#instead-account-info").submit(function () {
        var newVal = cutLtGt($("#NewPassword").val());
        $("#NewPassword").val(newVal);

        newVal = cutLtGt($("#ConfirmNewPassword").val());
        $("#ConfirmNewPassword").val(newVal);
    });
    
    function cutLtGt(str) {
        return str.replace(/</g, "").replace(/>/g, "");
    }
});