import { obterPrevisao } from "./previsao.js";

export async function obterLocalizacao() {
    try {
        // const permissao = await navigator.permissions.query({ name:'geolocation' })
        // if(permissao.state !== 'denied'){
        navigator.geolocation.getCurrentPosition(localizacaoConcedida, localizacaoNegada);
        // }
    } catch(e) {
        alert('Erro ao obter localização')
    }
}


async function localizacaoConcedida(posicao) {
    console.log(posicao.coords);
    obterPrevisao(null, posicao);
}

function localizacaoNegada() {
    document.body.innerHTML += '<p>Localização não concedida</p>';
}