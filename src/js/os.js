document.addEventListener('DOMContentLoaded', function () {
    var openCameraButton = document.getElementById('openCamera');
    var cameraInput = document.getElementById('cameraInput');
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    if (navigator.mediaDevices.getUserMedia) {
        openCameraButton.addEventListener('click', function() {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(function(stream) {
                    video.style.display = 'block';
                    video.srcObject = stream;
                    video.play();
                    openCameraButton.textContent = 'Capturar Foto';
                })
                .catch(function(error) {
                    console.error('Não foi possível acessar a câmera: ', error);
                });
        });

        openCameraButton.addEventListener('click', function() {
            if (video.style.display !== 'none') {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);
                var link = document.createElement('a');
                link.download = 'foto.png';
                link.href = canvas.toDataURL();
                link.textContent = 'Clique para baixar a imagem';
                document.body.appendChild(link);
                video.style.display = 'none'; // Esconder o vídeo após tirar a foto
            } else {
                cameraInput.click(); // Simula um clique no input de câmera oculto
            }
        });
    } else {
        console.error('Navegador não suporta getUserMedia');
    }
});


var btnExpandir = document.querySelector('#btn-exp');
    var menuSide = document.querySelector('.sidebar');

    btnExpandir.addEventListener('click', function(){
        menuSide.classList.toggle('expandir');
    });


