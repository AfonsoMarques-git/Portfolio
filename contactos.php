<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/contactos.css">
	<link rel="stylesheet" href="css/sidebar.css">
	<title>Portfolio - Contactos</title>
	<link rel="icon" href="Imagens/AM.png" sizes="100x100">
	<link rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
	<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
    <?php
    session_start();
    if (isset($_SESSION['success_message'])) {
        echo '<div id="successMessage" class="success-message">' . $_SESSION['success_message'] . '</div>';
        unset($_SESSION['success_message']);
    }
    ?>
	<div class="container">
		<?php include('sidebar.html'); ?>
		<div class="row">
			<section class="col left">
				<div class="contactTitle">
					<h2>Contacte-me</h2>
				</div>
				<div class="contactInfo">
					<div class="iconGroup">
						<div class="icon">
							<i class="bx bxs-phone" style="color: #ffffff;"></i>
						</div>
						<div class="details">
							<span>Contacto Telefónico</span>
							<span>+351 910604498</span>
						</div>
					</div>

					<div class="iconGroup">
						<div class="icon">
							<i class="bx bxl-gmail" style="color: #ffffff;"></i>
						</div>
						<div class="details">
							<span>Email</span>
							<span>afonsolobo945@gmail.com</span>
						</div>
					</div>

					<div class="iconGroup">
						<div class="icon">
							<i class="bx bxs-map" style="color: #ffffff;"></i>
						</div>
						<div class="details">
							<span>Localização</span>
							<span>Caldelas, Guimarães</span>
						</div>
					</div>
				</div>
				<div class="socialMedia">
					<a href="https://www.facebook.com/profile.php?id=61556322613867" target="_blank"><i
							class='bx bxl-facebook' style='color:#ffffff'></i></a>
					<a href="https://www.instagram.com/afonso_lm2/" target="_blank"><i class='bx bxl-instagram'
							style='color:#ffffff'></i></a>
					<a href="#" target="_blank"><i class='bx bxl-linkedin' style='color:#ffffff'></i></a>
					<a href="https://wa.me/351910604498" target="_blank"><i class='bx bxl-whatsapp'
							style='color:#ffffff'></i></a>
				</div>
			</section>
			<section class="col right">
                <form class="messageForm" action="processar_contacto.php" method="post">
                    <div class="inputGroup halfWidth">
                        <input type="text" name="nome" required="required">
                        <label>Nome</label>
                    </div>

                    <div class="inputGroup halfWidth">
                        <input type="email" name="email" required="required">
                        <label>Email</label>
                    </div>

                    <div class="inputGroup fullWidth">
                        <input type="text" name="assunto" required="required">
                        <label>Assunto</label>
                    </div>

                    <div class="inputGroup fullWidth">
                        <textarea name="mensagem" required="required"></textarea>
                        <label>Mensagem</label>
                    </div>

                    <div class="inputGroup fullWidth">
                        <button type="submit">Enviar mensagem</button>
                    </div>
                </form>
            </section>
		</div>

	</div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var successMessage = document.getElementById('successMessage');
            if (successMessage) {
                setTimeout(function () {
                    successMessage.style.display = 'none';
                }, 3000);
            }
        });
    </script>
	<script src="js/main.js"></script>
</body>

</html>