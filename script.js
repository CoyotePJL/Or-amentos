let totalGeral, totalPintura, totalMassa, totalLixamento, valorUmidadeTotal, valorExtraTotal;

function toggleUmidade() { document.getElementById('campoValorUmidade').style.display = document.getElementById('umidadeSim').checked ? 'block' : 'none'; }
function toggleExtra() { document.getElementById('campoServicoExtra').style.display = document.getElementById('extraSim').checked ? 'block' : 'none'; }
function checkReparoMassa() { document.getElementById('reparoMassaManual').style.display = document.getElementById('tipoMassa').value === 'reparos' ? 'block' : 'none'; }
function checkReparoLixa() { document.getElementById('reparoLixaManual').style.display = document.getElementById('tipoLixamento').value === 'reparos_lixa' ? 'block' : 'none'; }

function atualizarOpcoesExtra() {
    const tipo = document.getElementById('tipoExtra').value;
    const sub = document.getElementById('subOpcoesExtra');
    const item = document.getElementById('itemExtra');
    sub.style.display = tipo ? 'block' : 'none';
    if(tipo === 'verniz') {
        item.innerHTML = '<option value="15">Folha de Janela (R$15)</option><option value="70">Porta Lisa (R$70)</option><option value="90">Porta Detalhada (R$90)</option>';
    } else {
        item.innerHTML = '<option value="25">Folha Janela Metal (R$25)</option><option value="80">Porta Lisa Metal (R$80)</option><option value="100">Porta Detalhada Metal (R$100)</option>';
    }
}

function calcularOrcamento() {
    const metros = (Number(document.getElementById('qtdParedes').value) || 1) * (Number(document.getElementById('metros').value) || 0);
    
    // 1. Umidade
    valorUmidadeTotal = 0;
    if(document.getElementById('umidadeSim').checked) {
        valorUmidadeTotal = Number(document.getElementById('valorUmidade').value) || 0;
    }

    // 2. Pintura
    const estado = document.getElementById('estadoParede').value;
    let basePintura = estado === 'simples' ? 120 : 180;
    totalPintura = (metros / 12) * basePintura;

    // 3. Massa / Acabamento Fino (Removido as opções simples)
    const tipoMassa = document.getElementById('tipoMassa').value;
    totalMassa = 0;
    if (tipoMassa === 'reparos') totalMassa = Number(document.getElementById('valorReparoMassa').value) || 0;
    else if (tipoMassa === 'fino_corrida') totalMassa = (metros / 12) * 100;
    else if (tipoMassa === 'fino_acrilica') totalMassa = (metros / 12) * 130;

    // 4. Lixamento / Reparos
    const tipoLixa = document.getElementById('tipoLixamento').value;
    totalLixamento = 0;
    if (tipoLixa === 'reparos_lixa') totalLixamento = Number(document.getElementById('valorReparoLixa').value) || 0;
    else if (tipoLixa === 'lixa_corrida') totalLixamento = (metros / 12) * 20;
    else if (tipoLixa === 'lixa_acrilica') totalLixamento = (metros / 12) * 35;

    // 5. Extras
    valorExtraTotal = 0;
    if(document.getElementById('extraSim').checked) {
        valorExtraTotal = Number(document.getElementById('itemExtra').value) * Number(document.getElementById('qtdExtra').value);
    }

    totalGeral = totalPintura + totalMassa + totalLixamento + valorExtraTotal + valorUmidadeTotal;
    document.getElementById('status').innerHTML = `<strong>Total: R$ ${totalGeral.toFixed(2)}</strong>`;
    document.getElementById('btnCliente').style.display = 'block';
}

function irParaOrcamento() {
    const dados = {
        total: totalGeral,
        itens: [
            { nome: "Serviço de Pintura", valor: totalPintura },
            { nome: "Aplicação de Massa / Acabamento", valor: totalMassa },
            { nome: "Lixamento / Preparo de Superfície", valor: totalLixamento },
            { nome: "Tratamento de Umidade", valor: valorUmidadeTotal },
            { nome: "Serviços Extras (Verniz/Metal)", valor: valorExtraTotal }
        ]
    };
    localStorage.setItem('orcamentoFinal', JSON.stringify(dados));
    window.location.href = 'orcamento.html';
}
