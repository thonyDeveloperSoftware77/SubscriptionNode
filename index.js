import mqtt from 'mqtt';
import { enviarCorreo } from './correo.js';
import readline from 'readline';

// Crea una interfaz readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function crearComponente(id, correo) {
    var client = mqtt.connect('mqtt://broker.hivemq.com')

    client.on('connect', function () {
        client.subscribe('correos_a_enviar', function (err) {
            if (!err) {
                pedirMensaje(client);
            }
        })
    })

    client.on('message', function (topic, message) {
        console.log('\nComponente ' + id + ' recibió en el tópico ' + topic + ': ' + message.toString())
        enviarCorreo(correo, message.toString(), id * 1000)
    })
}

function pedirMensaje(client) {
    rl.question('Introduce el mensaje que quieres enviar (o "salir" para terminar): ', (mensaje) => {
        if (mensaje.toLowerCase() === 'salir') {
            rl.close();
        } else {
            client.publish('correos_a_enviar', mensaje);
            pedirMensaje(client);
        }
    });
}

crearComponente(0, 'correo1.1.1@gmail.com')
crearComponente(1, 'dsadasdasdaanthonyjosueth@gmail.com')
