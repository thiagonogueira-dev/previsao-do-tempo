import { conectarAoServidor } from "./sse.js";

const LINK_IMGS = 'https://openweathermap.org/img/wn/'
const HOST_API = 'https://api.openweathermap.org/data/2.5/weather';
const KEY_API = 'c793f897efe6867343a3872fed738f2e'

const condicoes = [
    {codigo: '01', descricao: 'Céu limpo'},
    {codigo: '02', descricao: 'Algumas nuvens'},
    {codigo: '03', descricao: 'Nublado'},
    {codigo: '04', descricao: 'Nuvens carregadas'},
    {codigo: '09', descricao: 'Chuva fina'},
    {codigo: '10', descricao: 'Chuva'},
    {codigo: '11', descricao: 'Tempestade'},
    {codigo: '13', descricao: 'Neve'},
    {codigo: '50', descricao: 'Névoa'},
]

export let CIDADE_ATUAL = '';

function obterSituacao(codigo){
    switch(codigo){
        case '01': return 'Céu limpo';
        case '02': return 'Algumas nuvens';
        case '03': return 'Nublado';
        case '04': return 'Nuvens carregadas';
        case '09': return 'Chuva fina';
        case '10': return 'Chuva';
        case '11': return 'Tempestade';
        case '13': return 'Neve';
        case '50': return 'Névoa';
    }
}

export async function obterPrevisao(cidade, posicao) {
    let info, resp;
    
    if(!navigator.onLine){
        info = JSON.parse(localStorage.getItem('info'));
        if(!info) {
            alert('Você está offline, nenhum resultado está disponível')
            return;
        }
        CIDADE_ATUAL = info.name;
        montarPrevisao(info, true);
        return;
    }
    
    if(posicao) {
        resp = await fetch(HOST_API + `?lat=${posicao.coords.latitude}&lon=${posicao.coords.longitude}&appid=${KEY_API}&units=metric`);
    } else if(! cidade) {
        let cidadeCodificada = location.hash.replace(/-/g, '%20').replace('#', '');
        resp = await fetch(HOST_API + `?q=${cidadeCodificada}&appid=${KEY_API}&units=metric`);
    } else {
        resp = await fetch(HOST_API + `?q=${cidade}&appid=${KEY_API}&units=metric`);
    }

    info = await resp.json();
    localStorage.setItem('info', JSON.stringify(info));

    CIDADE_ATUAL = info.name;
    montarPrevisao(info);
    conectarAoServidor(CIDADE_ATUAL);
}


function montarPrevisao(info, offline) {
    let previsao = document.getElementById('previsao');
    previsao.innerHTML = `
        ${offline ? '<p>Você está offline, sua última busca está sendo mostrada</p>' : ''}
        <h1>${info.name}</h1>
        <div class="info">
            <div class="img-temp">
                <img src="${LINK_IMGS + info.weather[0].icon + '@4x.png'}" alt="clima">
                <div class="temperatura">
                    <h2>${parseInt(info.main.temp)}°</h2>
                    <p>Sensação térmica: ${parseInt(info.main.feels_like)}°</p>
                </div>
            </div>
            <div class="data-situacao">
                <p class="data">${new Date(info.dt * 1000).toLocaleString('pt-BR')}</p>
                <p class="situacao">${obterSituacao(info.weather[0].icon.substring(0, 2))}</p>  
            </div>
        </div>
        <div class="metricas">
            <p>Nascer do sol: ${new Date(info.sys.sunrise * 1000).toLocaleTimeString('pt-BR').replace(/:\d{2}$/, '')}</p>
            <p>Pôr do sol: ${new Date(info.sys.sunset * 1000).toLocaleTimeString('pt-BR').replace(/:\d{2}$/, '')}</p>
            <p class="umidade">Umidade: ${info.main.humidity}%</p>
            <p class="vento">Vento: ${info.wind.speed} m/s</p>
        </div>
    `;
    previsao.classList.remove('d-none');
    document.getElementById('compartilhar').classList.remove('d-none');
}