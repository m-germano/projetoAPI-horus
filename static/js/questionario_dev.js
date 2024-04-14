const questoes = [
    // {
    //     questao:"",
    //     respostas:[
    //         {texto:"", valor: false},
    //         {texto:"", valor: false},
    //         {texto:"", valor: false},
    //         {texto:"", valor: false},
    //     ]
    // },

    {
        questao:"Qual é a principal responsabilidade do Time de Desenvolvimento em um projeto Scrum?",
    respostas:[
        {texto:"Desenvolver e entregar as funcionalidades do produto", valor: true},
        {texto:"Realizar o planejamento financeiro do projeto", valor: false},
        {texto:"Coordenar as reuniões diárias", valor: false},
        {texto:"Garantir a satisfação do cliente", valor: false},
    ]
},

{
    questao:"O que significa a auto-organização do Time de Desenvolvimento?",
    respostas:[
        {texto:"Cada membro do time decide suas próprias férias", valor: false},
        {texto:"Os membros do time escolhem suas próprias tarefas e como executá-las", valor: true},
        {texto:"O time é supervisionado diretamente pelo Product Owner", valor: false},
        {texto:"Os membros do time trabalham sem interação com outras equipes", valor: false},
    ]
},

{
    questao:"Quem é responsável por determinar quanto trabalho o Time de Desenvolvimento pode realizar em um sprint?",
    respostas:[
        {texto:"Scrum Master", valor: false},
        {texto:"Product Owner", valor: false},
        {texto:"O próprio Time de Desenvolvimento", valor: true},
        {texto:"Gerente de Projeto", valor: false},
    ]
},

{
    questao:"Qual é uma das práticas recomendadas para garantir a qualidade do trabalho realizado pelo Time de Desenvolvimento?",
    respostas:[
        {texto:"Terceirização de parte do desenvolvimento", valor: false},
        {texto:"Revisões trimestrais por uma equipe externa", valor: false},
        {texto:"Testes automatizados e revisões de código", valor: true},
        {texto:"Depender exclusivamente do Product Owner para validação", valor: false},
    ]
},

{
    questao:"Como o Time de Desenvolvimento pode garantir uma comunicação eficaz durante o sprint?",
    respostas:[
        {texto:"Realizando reuniões longas diárias para revisar o progresso", valor: false},
        {texto:"Usando uma ferramenta de gestão de projetos online", valor: true},
        {texto:"Dependendo de e-mails para todas as comunicações", valor: false},
        {texto:"Esperando pela reunião de revisão do sprint para compartilhar atualizações", valor: false},
    ]
}
    

];

const questionElement = document.getElementById("questao-local");
const answerButton = document.getElementById("answer-buttons");
const nextBtn= document.getElementById("next-btn");

let currentQuestionIndex =0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML="Próximo";
    showQuestion();
}

function showQuestion(){
    // resetar();
    // let currentQuestion = questoes[currentQuestionIndex];
    // let questaoNo = currentQuestionIndex + 1;
    // questionElement.innerHTML = questaoNo + ". " + currentQuestion.questao;

    // currentQuestion.respostas.forEach(resposta => {
    //     const button = document.createElement("button");
    //     button.innerHTML = resposta.texto;
    //     button.classList.add("btn");
    //     answerButton.appendChild(button);
    //     if(resposta.correct){
    //         button.dataset.correct = answer.correct;
    //     }
    //     button.addEventListener("click", selectAnswer);
    // });
    resetar();
    let currentQuestion = questoes[currentQuestionIndex];
    let questaoNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questaoNo + ". " + currentQuestion.questao;

    currentQuestion.respostas.forEach(resposta => {
        const button = document.createElement("button");
        button.innerHTML = resposta.texto;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(resposta.valor){
            button.dataset.correct = "true"; // Corrigido para "true" em vez de resposta.valor
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetar(){
    nextBtn.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    selectedBtn.classList.add("selected");

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });

    nextBtn.style.display="block";

}

function showScore(){
    resetar();
    questionElement.innerHTML=`Voce pontuou ${score} de ${questoes.length}!`;
    nextBtn.innerHTML="Jogar novamente";
    nextBtn.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questoes.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questoes.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();