<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/projetos.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <title>Portfolio - Projetos</title>
    <link rel="icon" href="Imagens/AM.png" sizes="100x100">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
    <div class="container">

        <?php include('sidebar.html'); ?>

        <div class="main-content">
            <div class="caixa_content">
                <div class="conteudo">
                    <div class="titles">
                        <h1 class="aboreto">PROJETOS</h1>
                        <p> - Trabalhos Realizados </p>
                    </div>

                    <div class="projetos">
                        <?php
                        $xml = simplexml_load_file('projetos.xml');

                        foreach ($xml->projeto as $projeto) {
							echo '<div class="projeto-item">';
							echo '<a href="projeto-individual.php?id=' . $projeto['id'] . '" target="_self">';
							echo '<p>' . $projeto->nome . '</p>';
							echo '</a>';
							echo '<a href="projeto-individual.php?id=' . $projeto['id'] . '" target="_self">';
							echo '<img src="' . $projeto->imagem . '" alt="' . $projeto->nome . '">';
							echo '</a>';
							echo '</div>';
						}
                        ?>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <script src="js/main.js"></script>
</body>

</html>