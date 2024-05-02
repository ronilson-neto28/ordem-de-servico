document.addEventListener('DOMContentLoaded', function () {
    /*CAMERA*/
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

const tecnicoSelect = document.getElementById('tecnicoSelect');
    tecnicoSelect.addEventListener('change', function () {
        const tecnicoId = this.value;
        if (tecnicoId) {
            fetch(`http://[::1]:3000/tecnicos/${tecnicoId}`)
                .then(response => response.json())
                .then(data => {
                    // Supondo que os dados incluam campos como telefone1 e telefone2
                    document.getElementById('telefone1').value = data.telefone1 || '';
                    document.getElementById('telefone2').value = data.telefone2 || '';
                })
                .catch(error => {
                    console.error('Erro ao buscar informações do técnico:', error);
                });
        } else {
            // Limpar os campos se nenhuma opção válida for selecionada
            document.getElementById('telefone1').value = '';
            document.getElementById('telefone2').value = '';
        }
    });


var btnExpandir = document.querySelector('#btn-exp');
    var menuSide = document.querySelector('.sidebar');

    btnExpandir.addEventListener('click', function(){
        menuSide.classList.toggle('expandir');
    });


