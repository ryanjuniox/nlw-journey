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
let atividades = [
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

    let input = `
    <input 
    onchange="concluirAtividade(event)" 
    value="${atividade.data}" 
    type="checkbox"
    `

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
    section.innerHTML = ''

    if(atividades.length == 0){
        section.innerHTML = '<p>Nenhuma atividade cadastrada. </p>'
        return
    }

    for(let atividade of atividades){
        section.innerHTML += criarItemAtividade(atividade);
    }
}
atualizarListaDeAtividades()


const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulatio = new FormData(event.target)
    const nome = dadosDoFormulatio.get('atividade')
    const dia = dadosDoFormulatio.get('dia')
    const hora = dadosDoFormulatio.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome: nome,
        data: data,
        finalizada: false,
    }

    const atividadeExiste = novaAtividade.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste){
        return alert('Dia/Hora não disponível!')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}
salvarAtividade()

const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03"
    ]

    let diasSelecao = ''

    for(let dia of dias){
        const formatar = formatador(dia)
        const diaFormatado = `
            ${formatar.dia.numerico} de ${formatar.dia.mes}
        `
        diasSelecao += `
            <option value="${dia}">${diaFormatado}</option>
        `
    }

    document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
}
criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    let i=0;
    for(i=6; i<23; i++){
        horasDisponiveis += `<option value="${i}:00">${i}:00</option>`
        horasDisponiveis += `<option value="${i}:30">${i}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if(!atividade){
        return 
    }

    atividade.finalizada = !atividade.finalizada
}