function toggleUmidade(){
    const temUmidade = document.getElementById('umidadeSim').Checked;
    document.getElementById('campoValorUmidade').style.display = temUmidade ? 'block' : 'none';
}

function toggleMassa(){
    const selecao = document.getElementById('tipoMassa').value;
    document.getElementById('campoMassaManual').style.display = (selecao === 'pequeno') ? 'block' 'none';
    document.getElementById('campoDemaosMassa').style.display = (selecao === 'corrida' || selecao === 'acrilica') ? 'block' : 'none';
}

function toggleLixamento(){
    const selecao = document.getElementById('tipoLixamento').value;
    document.getElementById('campoLixamentoManual').style.display = (selecao === 'manual_pequeno') ? 'block' : 'none';
}

function calcularOrcamento(){
    const metros = Number(document.getElementById('metros').value) || 0;
    const m2base = 12; //regua de 12m²

    //calculo de umidade
    const valorUmidade = Number(document.getElementById('valorUmidade').value) || 0;

    //calculo de massa
    let totalMassa = 0;
    const tipoMassa = document.getElementById('tipoMassa').value;
    if (tipoMassa === 'pequeno'){
        totalMassa = Number(document.getElementById('valorMassaManual').value) || 0;
    } else if (tipoMassa === 'corrida' || tipoMassa === 'acrilica'){
        const precoBaseMassa = (tipoMassa === 'corrida') ? 120 : 140; //preço da massa por demao
        const demaosMassa = Number(document.getElementById('demaosMassa').value) || 1;
        totalMassa = (metros / m2base) * precoBaseMassa * demaosMassa;
    }

    //calculo de lixamento
    let totalLixamento = 0;
    const tipoLixamento = document.getElementById('tipoLixamento').value;
    if (tipoLixamento === 'manual_pequeno') {
        totalLixamento = Number(document.getElementById('valorLixaManual').value) || 0;
    } else if (tipoLixamento === 'lixa_corrida' || tipoLixamento === 'lixa_acrilica'){
        const precoBaseLixa = (tipoLixamento === 'lixa_corrida') ? 25 : 35;
        totalLixamento = (metros/m2base) * precoBaseLixa;
    }

    // calculo de pintura
}

