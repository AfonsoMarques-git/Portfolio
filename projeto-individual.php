<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/projeto-individual.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <title>Portfolio - Projeto Individual</title>
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
                    <?php
                    if (isset($_GET['id'])) {
                        $projeto_id = $_GET['id'];
                        $xml = simplexml_load_file('projetos.xml');

                        foreach ($xml->projeto as $projeto) {
                            if ($projeto['id'] == $projeto_id) {
                                echo '<a href="projetos.php" class="voltar-btn">Voltar</a>';
                                echo '<div class="projeto-individual">';
                                echo '<div class="projeto-header">';
                                echo '<img src="' . $projeto->imagem . '" alt="' . $projeto->nome . '" class="projeto-imagem">';
                                echo '<div class="projeto-info">';
                                echo '<div class="projeto-info-header">';
                                echo '<h1 class="aboreto">' . $projeto->nome . '</h1>';
                                echo '<p class="descricao">' . $projeto->descricao . '</p>';
                                echo '</div>';
                                echo '<p class="descricao-all">' . $projeto->descricao_all . '</p>';
                                echo '<p class="data"><strong>Data de Início:</strong> ' . $projeto->data_inicio . '</p>';
                                echo '<p class="data"><strong>Data de Conclusão:</strong> ' . $projeto->data_conclusao . '</p>';
                                echo '<p class="data"><strong>Tecnologias Utilizadas:</strong> ' . $projeto->tecnologias_utilizadas . '</p>';
                                echo '</div>';
                                echo '</div>';
                                echo '</div>';
                                break;
                            }
                        }
                    } else {
                        echo '<p>Projeto não encontrado.</p>';
                    }
                    ?>
                </div>
            </div>
        </div>

    </div>
    <script src="js/main.js"></script>
</body>

</html>