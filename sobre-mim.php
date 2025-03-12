<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/sobre-mim.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <title>Portfólio - Sobre Mim</title>
    <link rel="icon" href="Imagens/AM.png" sizes="100x100">
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
                        <h1 class="aboreto">SOBRE MIM</h1>
                        <p> - Um pouco sobre mim </p>
                    </div>
                    <div class="content">
                        <img src="Imagens/Me.jpg" alt="minha_foto">
                        <div class="about">
                            <p id="aboutText">
                                Olá, o meu nome é Afonso Marques e sou um apaixonado por desafios. A minha vida divide-se
                                entre o mundo digital e o desporto. Como estudante de Gestão e Programação de Sistemas
                                Informáticos, encontro no desenvolvimento web, em particular no Front-End, um espaço
                                onde posso dar asas à minha criatividade e aplicar as minhas competências técnicas.<br /><br /> Nos
                                tempos livres, o meu espírito competitivo e a busca por equilíbrio levam-me a praticar
                                diversos desportos, como musculação, futebol, basquetebol e voleibol. Estas atividades
                                não só fortalecem o meu corpo, como também moldam o meu carácter, incutindo-me
                                qualidades como foco, disciplina, espírito de equipa e resiliência.<br /><br /> Acredito no poder do
                                aprendizado contínuo e encaro cada novo desafio como uma oportunidade de crescimento
                                pessoal e profissional.
                            </p>
                            <div class="bottom">
                                <div class="filter">
                                    <button id="pessoalButton" class="filter-button active" data-state="profissional">Profissional</button>
                                    <button id="profissionalButton" class="filter-button" data-state="pessoal">Pessoal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <script src="js/main.js"></script>
    <script src="js/filter.js"></script>
</body>

</html>