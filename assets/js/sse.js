const HOST = 'http://localhost:3000'
let eventSource = null;

export function conectarAoServidor(cidade) {

    if(eventSource) {
        eventSource.close();
    }

    eventSource = new EventSource(HOST + `/previsao?cidade=${cidade}`);

    eventSource.addEventListener('open', () => {
        console.log('conectado!');
    });

    eventSource.onmessage = e => {
        console.log('a');
        let data = JSON.parse(e.data);
        console.log(data);
        alert(data.message);
    }

    eventSource.onerror = () => {
        eventSource.close();
    }
}