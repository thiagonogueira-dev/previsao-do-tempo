import { CIDADE_ATUAL } from "./previsao.js";

export function compartilharPrevisao(){
    let cidadeCodificada = CIDADE_ATUAL.toLowerCase().replace(/ /g, '-');
    let info = {title: `Previsão do tempo em ${CIDADE_ATUAL}`, text: `Olá! Estou compartilhando a previsão do tempo em ${CIDADE_ATUAL}:`, url: `#${cidadeCodificada}`}
    navigator.share(info);
}
