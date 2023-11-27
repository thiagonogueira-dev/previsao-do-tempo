const HOST = 'http://localhost:3000'
let eventSource = null;

export function conectarAoServidor(cidade) {

    if(eventSource) {
        eventSource.close();
    }

    eventSource = new EventSource(HOST + `/previsao?cidade=${cidade}`);

    eventSource.onmessage = e => {
        let data = JSON.parse(e.data);
        alert(data.message);
    }

    eventSource.onerror = () => {
        eventSource.close();
    }
}