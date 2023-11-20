import mqtt from 'mqtt';
import { enviarCorreo } from './correo.js';
import readline from 'readline';

// Crea una interfaz readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*Funcion que crea las instancias*/
function crearComponente(id, correo) {
    var client = mqtt.connect('mqtt://broker.hivemq.com')

    /*Metodo para que el componente se suscriba a un topico*/
    client.on('connect', function () {
        client.subscribe('correos_a_enviar', function (err) {
            if (!err) {
                pedirMensaje(client);
            }
        })
    })

    /*El mensaje ejecuta la funcion enviar correo en el caso que exista alguna publicacion suscrita al topico*/
    client.on('message', function (topic, message) {
        console.log('\nComponente ' + id + ' recibió en el tópico ' + topic + ': ' + message.toString())
        enviarCorreo(correo, message.toString(), id * 1000)
    })
}


/*Funcion que recibe como input el mensaje por consola*/
function pedirMensaje(client) {
    rl.question('Introduce el mensaje que quieres enviar (o "salir" para terminar): ', (mensaje) => {
        if (mensaje.toLowerCase() === 'salir') {
            rl.close();
        } else {
            /*Se publica el mensaje al topico*/
            client.publish('correos_a_enviar', mensaje);
            pedirMensaje(client);
        }
    });
}

crearComponente(0, 'correo1.1.1@gmail.com')
crearComponente(1, 'dsadasdasdaanthonyjosueth@gmail.com')
