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
});


document.getElementById('compartilhar').addEventListener('click', async () => {
    const { compartilharPrevisao } = await import('./compartilhar.js');
    compartilharPrevisao();
});

document.getElementById('pesquisar').addEventListener('click', async (e) => {
    e.preventDefault();
    const { obterPrevisao } = await import('./previsao.js');
    document.getElementById('estiloPrevisao').rel = 'stylesheet';
    let cidade = document.getElementById('cidade').value;
    if(cidade){
        obterPrevisao(cidade);
    }
})

document.getElementById('localizacao').addEventListener('click', async () => {
    const { obterLocalizacao } = await import('./localizacao.js');
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