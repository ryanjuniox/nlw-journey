//biblioteca
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana:{
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            },
            mes: dayjs(data).format('MMMM'),
            hora: dayjs(data).format('HH:mm')
        }
    }
}

// object {}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

//array
const atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date("2024-07-08 08:00"),
        finalizada: true
    },
    {
        nome: 'Jogo Futebol',
        data: new Date("2024-07-09 12:45"),
        finalizada: false
    }
]

//array function
const criarItemAtividade = (atividade) => {

    let input = '<input type="checkbox" '
    if(atividade.finalizada) {
        input = input + 'checked'
    }
    input = input + '>'

    const formatar = formatador(atividade.data);

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${formatar.dia.semana.longo}, dia ${formatar.dia .numerico} de ${formatar.dia.mes} ás ${formatar.dia.hora} </time>
    </div>
    `;
};

const atualizarListaDeAtividades = (atividade) => {
    const section = document.querySelector('section')
    
    if(atividades.length == 0){
        section.innerHTML = '<p>Nenhuma atividade cadastrada. </p>'
        return
    }

    for(let atividade of atividades){
        section.innerHTML += criarItemAtividade(atividade);
    }
}

atualizarListaDeAtividades();
