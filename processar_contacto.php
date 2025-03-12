<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio";

// Cria a ligação
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a ligação
if ($conn->connect_error) {
    die("Falha na ligação: " . $conn->connect_error);
}

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Escapa os dados do formulário para evitar SQL injection
    $nome = $conn->real_escape_string($_POST["nome"]);
    $email = $conn->real_escape_string($_POST["email"]);
    $assunto = $conn->real_escape_string($_POST["assunto"]);
    $mensagem = $conn->real_escape_string($_POST["mensagem"]);

    // Prepara e executa a query SQL para inserir os dados
    $sql = "INSERT INTO contactos (nome, email, assunto, mensagem) VALUES ('$nome', '$email', '$assunto', '$mensagem')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION['success_message'] = "Mensagem enviada com sucesso!";
        // Redireciona para uma página de agradecimento ou para a página de contactos
        header("Location: contactos.php");
        exit();
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>