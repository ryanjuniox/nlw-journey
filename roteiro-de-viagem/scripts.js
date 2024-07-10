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

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
    </div>
    `;
};


const section = document.querySelector('section')

for(let atividade of atividades){
    section.innerHTML += criarItemAtividade(atividade);
}

