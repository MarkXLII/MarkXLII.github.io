<?php
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    $email_from = $visitor_email;
    $email_subject = "From Subtitle Studio Website";
    $email_body = "New message from the user $name.\n"."Here is the message:\n $message\nEnd of the message.";

    $to = "subtitle.studio@swapnilbhoite.in";
    $headers = "From: $email_from \r\n";
    $headers .= "Reply-To: $visitor_email \r\n";

    function IsInjected($str)
    {
        $injections = array('(\n+)',
               '(\r+)',
               '(\t+)',
               '(%0A+)',
               '(%0D+)',
               '(%08+)',
               '(%09+)'
               );

        $inject = join('|', $injections);
        $inject = "/$inject/i";

        if (preg_match($inject, $str)) {
            return true;
        } else {
            return false;
        }
    }

    if (IsInjected($visitor_email)) {
        echo "Bad email value!!!";
        exit;
    }

    mail($to, $email_subject, $email_body, $headers);

    header('Location: index.php');
    exit;
