﻿
// Using jQuery.
$(function() {
    var baseUrl = basics.baseUrl;
    var token = cookie.getCookie(cookie.tokenHeader);
    var messages="";
    if (token !== null && token !== 'undefined' && token.trim().length !== 0) {
        goToAccount();
    }
    $('body').each(function() {
        $(this).find('input').keypress(function(e) {
            // Enter pressed?
            if (e.which === 10 || e.which === 13) {
                authenticate();
            }
        });
    });

    $('body').find('button[type=submit]').click(function() {
        authenticate();
    });

    function authenticate() {
        clearMessage();
        showLoader();
        var url = baseUrl + 'api/AuthenticatePivot/authtoken';
        var un = $('input[name=iusername]').val();
        var pw = $('input[name=ipassword]').val();
        if (validate()) {
            var encoded = 'Basic ' + encode(un + ':' + pw);
            jQuery.support.cors = true;
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'text',
                headers: {
                    'Authorization': encoded
                },
                success: function(data, textStatus, request) {
                    var token = request.getResponseHeader('Token');
                    if (token !== null && token !== 'undefined') {
                        var tokenDate = cookie.toDate(request.getResponseHeader('TokenExpiry'));
                        if (tokenDate > cookie.today()) {
                            cookie.setCookie(cookie.tokenHeader, token, tokenDate);
                            goToAccount();
                        }
                    }
                    hideLoader();
                },
                error: function(x, y, z) {
                    if (x !== null && x !== undefined && x.status === 401) {
                        addMessage("You are not authorized");
                    } else {
                        addMessage("Something went wrong. Unable to fetch data." + x);
                    }
                    console.clear();
                    hideLoader();
                }
            });
        } else {
            hideLoader();
        }
    }

    function validate() {
        var isvalid = true;
        var un = $('input[name=iusername]').val();
        var pw = $('input[name=ipassword]').val();
        if (un === null ||
            un === 'undefined' ||
            un.trim().length === 0) {
            isvalid = false;
            addMessage("Username is required");
            $('input[name=iusername]').parent().parent('.form-group').addClass('has-error');
        }
        if (pw === null ||
            pw === 'undefined' ||
            pw.trim().length === 0) {
            isvalid = false;
            addMessage("Password is required");
            $('input[name=ipassword]').parent().parent('.form-group').addClass('has-error');
        }
        return isvalid;
    }

    function addMessage(msg) {
        if (messages.trim().length > 0)
            messages += "<br/>";
        messages += msg;
        if (messages.trim().length > 0)
            $('.div-message').html(messages);
    }

    function clearMessage() {
        messages = "";
        $('.div-message').html(messages);
    }

    function encode(str) {
        return window.btoa(str);
    }

    function showLoader() {
        $('body').find('button[type=submit]').addClass('disabled');
        $('body').find('input[name=iusername]').addClass('disabled');
        $('body').find('input[name=ipassword]').addClass('disabled');
        $('.loading-results').removeClass("hide");
    }

    function hideLoader() {
        $('body').find('button[type=submit]').removeClass('disabled');
        $('body').find('input[name=iusername]').removeClass('disabled');
        $('body').find('input[name=ipassword]').removeClass('disabled');
        $('.loading-results').addClass("hide");
    }

    function goToAccount() {
        location.replace(baseUrl + "view/tracker_report_daterange.html");
    }
});