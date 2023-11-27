import { obterLocalizacao } from "./localizacao.js";
import { obterPrevisao, CIDADE_ATUAL } from "./previsao.js";


window.addEventListener('load', async function () {
    if (!('serviceWorker' in navigator)) {
        alert('Seu navegador não suporta Service Worker');
        return;
    }
    try {
        await navigator.serviceWorker.register('sw.js');
    } catch (err) {
        alert('Erro: ' + err.message);
    }

    // const parsedUrl = new URL(window.location);
    // console.log(parsedUrl);
    // this.alert('Title shared: ' + parsedUrl.searchParams.get('title'));
    // this.alert('Text shared: ' + parsedUrl.searchParams.get('text'));
    // this.alert('URL shared: ' + parsedUrl.searchParams.get('url'));
});


function esconderBotaoDeInstalacao( habilitada ) {
    if(!habilitada){
        document.getElementsByClassName( 'instalacao' )[0].classList.add('d-none');
        return;
    }
    // document.getElementsByClassName( 'instalacao' )[0].classList.remove('d-none');
}

let promptEvent;

window.addEventListener( 'beforeinstallprompt', e => {
    e.preventDefault();
    promptEvent = e;
    esconderBotaoDeInstalacao( true );
});

// document.getElementById( 'instalar' ).addEventListener('click', async e => {
//     esconderBotaoDeInstalacao( false );
//     try {
//         const { outcome } = await promptEvent.prompt(); 
//     } catch (err) {
//         alert( 'Instalação não suportada: ', err.message );
//     }
//     promptEvent = null;
// });

document.getElementById('compartilhar').addEventListener('click', () => {
    let cidadeCodificada = CIDADE_ATUAL.toLowerCase().replace(/ /g, '-');
    let info = {title: `Previsão do tempo em ${CIDADE_ATUAL}`, text: `Olá! Estou compartilhando a previsão do tempo em ${CIDADE_ATUAL}:`, url: `#${cidadeCodificada}`}
    navigator.share(info);
})

document.getElementById('pesquisar').addEventListener('click', e => {
    e.preventDefault();
    let cidade = document.getElementById('cidade').value;
    if(cidade){
        obterPrevisao(cidade);
    }
})

document.getElementById('localizacao').addEventListener('click', e => {
    obterLocalizacao();
})


let hash = location.hash;
if(hash.startsWith('#share')) {
    const url = new URL(window.location);
    const titulo = url.searchParams.get('title');
    location.hash = titulo.replace('Previsão do tempo em ', '').replace(' ', '-');
    obterPrevisao();
    document.getElementById('msg').innerHTML = `<p>Você está visualizando uma previsão do tempo que foi compartilhada</p>`;
} else if(hash){
    obterPrevisao();
}