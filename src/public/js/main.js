$(function () {
    const socket = io();
    var nick = '';
    // Accediendo al DOM

    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');

    const userNames = $('#usernames');


    // Enviar mensaje al servidor
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        messageBox.val('');
    })

    //Obtenemos respuesta del servidor:

    socket.on('nuevo mensaje', function(datos){
        // console.log(datos);

        let color = '#f4f4f4';
        if(nick == datos.nick){
            color = "#9ff4c5";
        }

        chat.append(`<div class="msg-area mb-2" style="background-color:${color}"><b>${datos.username}</b><p class="msg">${datos.msg}</p></div>`)
    });

    // Nuevo usuario

    nickForm.submit( e => {
        e.preventDefault();

        socket.emit('nuevo usuario', nickName.val(), datos => {
            if(datos){
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else{
                nickError.html('<div class="alert alert-danger">El usuario ya existe</div>');
            }

            nickName.val('');
        })
    })

    //Obtenemos el array de usuarios conectados:

    socket.on('usernames', datos => {
        let html = '';
        let color = '';
        let salir = '';
        console.log('usuarios conectados: ',datos)
        for(let i = 0; i < datos.length; i++){
            if(nick == datos[i]){
                color === "#0DBC79";
                salir = '<a class="enlace-salir" href="/">Salir</a>';
            }else{
                color = "#000";
                salir = '';
            }

            html += `<p style="color: ${color}">${datos[i]} ${salir}</p>`;
        }

        userNames.html(html);

    })

})

// const socket =  io();