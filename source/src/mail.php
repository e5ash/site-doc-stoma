<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '_/phpmailer/Exception.php';
require '_/phpmailer/PHPMailer.php';
require '_/phpmailer/SMTP.php';

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['page'])) {$page = $_POST['page'];}
if (isset($_POST['url'])) {$url = $_POST['url'];}
if (isset($_POST['form'])) {$form = $_POST['form'];}


if (isset($_POST['utm_source'])) {$utm_source = $_POST['utm_source'];}
if (isset($_POST['utm_medium'])) {$utm_medium = $_POST['utm_medium'];}
if (isset($_POST['utm_campaign'])) {$utm_campaign = $_POST['utm_campaign'];}
if (isset($_POST['utm_term'])) {$utm_term = $_POST['utm_term'];}
if (isset($_POST['utm_content'])) {$utm_content = $_POST['utm_content'];}

if (isset($_POST['comment'])) {$comment = $_POST['comment'];}

if (isset($_POST['upload'])) {$file = $_POST['upload'];}



$message;



if ($form) {
	$message .= "\n<p>Форма: $form</p>";
}
if ($page) {
	$message .= "\n<p>Страница: $page</p>";
}
if ($url) {
	$message .= "\n<p>Ссылка: $url</p>";
}

$message .= "\n<br>";

if ($name) {
	$message .= "\n<p>Имя: $name</p>";
}
if ($phone) {
	$message .= "\n<p>Телефон: $phone</p>";
}
if ($email) {
	$message .= "\n<p>Почта: $email</p>";
}
if ($comment) {
	$message .= "\n<p>Комментарий: $comment</p>";
}

$message .= "\n<br>";

if ($utm_source){
	$message .= "\n<p>utm_source = $utm_source</p>";
}
if ($utm_medium){
	$message .= "\n<p>utm_medium = $utm_medium</p>";
}
if ($utm_campaign){
	$message .= "\n<p>utm_campaign = $utm_campaign</p>";
}
if ($utm_term){
	$message .= "\n<p>utm_term = $utm_term</p>";
}
if ($utm_content){
	$message .= "\n<p>utm_content = $utm_content</p>";
}

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'ssl.5sl@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '18alesor!'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('ssl.5sl@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('ads@polovinkin.pro');     // Кому будет уходить письмо 

$mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);    // Optional name

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = $message;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thanks.html');
}
?>


