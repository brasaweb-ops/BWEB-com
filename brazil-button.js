document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('brazil-button');
    const audioPlayer = document.getElementById('audio-player');
    const flagImage = document.getElementById('flag-image');

    // URLs dos arquivos
    const staticUrl = 'brazil.jpg';
    const gifUrl = 'brazil.gif';

    if (button && audioPlayer && flagImage) {
        button.addEventListener('click', () => {
            // Toca o áudio
            audioPlayer.currentTime = 0;
            audioPlayer.play();

            // Ativa o GIF
            flagImage.src = gifUrl;

            // Volta para a imagem estática após 2 segundos
            setTimeout(() => {
                flagImage.src = staticUrl;
            }, 2000);
        });
    }
});