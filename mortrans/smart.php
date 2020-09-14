<?php 

$whence = $_POST['whence'];
$where = $_POST['where'];
$date = $_POST['date'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'maximklimuk69@yandex.by';                 // Наш логин
$mail->Password = 'asap123456789';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('maximklimuk69@yandex.by', 'Максим Климук');   // От кого письмо 
$mail->addAddress('yaroslavklimuk@yandex.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = '
	Пользователь оставил заявку <br> 
	Откуда: ' . $whence . ' <br>
	Куда: ' . $where . '
	Дата: ' . $date . '
	Телефон: ' . $phone . '';

$mail->AltBody = 'Это альтернативный текст';

if(!$mail->send()) {
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    header('location: ../thanks.html');
}

?>