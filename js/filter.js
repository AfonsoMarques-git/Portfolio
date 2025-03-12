document.addEventListener('DOMContentLoaded', function() {
    const pessoalButton = document.getElementById('pessoalButton');
    const profissionalButton = document.getElementById('profissionalButton');
    const aboutText = document.getElementById('aboutText');

    // Função para atualizar o conteúdo e o estilo dos botões
    function updateContent(state) {
        fetch('filter_content.php?state=' + state)
            .then(response => response.text())
            .then(data => {
                aboutText.innerHTML = data;
                if (state === 'profissional') {
                    pessoalButton.classList.add('active');
                    profissionalButton.classList.remove('active');
                } else {
                    profissionalButton.classList.add('active');
                    pessoalButton.classList.remove('active');
                }
            });
    }

    // Carrega o conteúdo inicial com base no estado do botão "Pessoal"
    updateContent('profissional');

    // Event listeners para os botões
    pessoalButton.addEventListener('click', function() {
        updateContent('profissional');
    });

    profissionalButton.addEventListener('click', function() {
        updateContent('pessoal');
    });
});