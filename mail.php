<?php
ob_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');
if ($_SERVER['REQUEST_METHOD'] == 'POST') :
    $to = "abdullah.dheir@gmail.com"; // replace this mail with yours
    $email = $_POST["email"];
    $from = $_POST['URL'] . " " . $email;
    $name = $_POST["name"];
    $subject = $_POST["subject"];
    $headers = "From: $from";
    $message = $_POST["message"];

    $body = "Contact Message \n";
    $body .= " \n\n\t Name: " . $name;
    $body .= " \n\n\t Email: " . $email;
    $body .= " \n\n\t Subject: " . $subject;
    $body .= " \n\n\t Message: " . $message;

    if (!empty($email)) :
        if (mail($to, $subject, $body, $headers))
            echo 1;
        else
            echo 0;
    endif;
else :
    echo 'GET';
endif;

ob_end_flush();
