import { configurarBotoes } from "./index.js";
import { obterPrevisao } from "./previsao.js";

export async function obterLocalizacao() {
    try {
        let opcoes = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
        navigator.geolocation.getCurrentPosition(localizacaoConcedida, localizacaoNegada, opcoes);
    } catch(e) {
        alert('Erro ao obter localização')
    }    
}


async function localizacaoConcedida(posicao) {
    document.getElementById('estiloPrevisao').rel = 'stylesheet';
    obterPrevisao(null, posicao);
}

function localizacaoNegada() {
    document.body.innerHTML += '<p>Localização não concedida</p>';
    configurarBotoes();
}