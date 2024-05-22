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
        questao:"O que é Scrum e quais são seus principais objetivos no desenvolvimento de projetos?",
        respostas:[
            {texto:"Um conjunto de práticas para desenvolvimento de software que visa melhorar a eficiência através de longos ciclos de desenvolvimento.", valor: false},
            {texto:" Um framework ágil que ajuda equipes a trabalhar em conjunto, promover a entrega contínua e adaptativa de produtos de alta qualidade.", valor: true},
            {texto:"Uma metodologia tradicional de gerenciamento de projetos focada em planejamento extensivo e controle rígido.", valor: false},
            {texto:"Um processo automatizado de desenvolvimento que elimina a necessidade de reuniões e feedback contínuo.", valor: false},
        ]
    },

    {
        questao:"Quais são os principais papéis em uma equipe Scrum e quais são suas responsabilidades?",
        respostas:[
            {texto:"Product Owner, que é responsável pelo desenvolvimento técnico do produto; Scrum Master, que aprova todas as mudanças; e Equipe de Desenvolvimento, que documenta todos os processos.", valor: false},
            {texto:"Product Owner, que define as prioridades e garante o valor do produto; Scrum Master, que facilita o processo e remove impedimentos; e Equipe de Desenvolvimento, que entrega o produto.", valor: true},
            {texto:"Project Manager, que lidera a equipe; Developer, que escreve o código; e Tester, que verifica a qualidade do produto.", valor: false},
            {texto:"Analista de Negócios, que cria requisitos; Gerente de Projeto, que monitora o cronograma; e Desenvolvedor, que implementa as funcionalidades.", valor: false},
        ]
    },

    {
        questao:"Como funciona o ciclo de vida de um Sprint e quais são as suas principais atividades??",
        respostas:[
            {texto:"Um Sprint dura cerca de seis meses e inclui atividades de planejamento inicial e entrega final do produto.", valor: false},
            {texto:"Um Sprint é uma fase contínua sem duração específica, onde o produto é desenvolvido sem interrupções.", valor: false},
            {texto:"Um Sprint geralmente dura de uma a quatro semanas e inclui planejamento, desenvolvimento, revisão e retrospectiva.", valor: true},
            {texto:"Um Sprint é uma fase única que ocorre apenas no início do projeto e envolve a definição dos requisitos.", valor: false},
        ]
    },

    {
        questao:"Quais são os principais artefatos no Scrum e qual é a função de cada um?",
        respostas:[
            {texto:"Business Case, que justifica o projeto; Project Charter, que define a visão; e Status Report, que monitora o progresso.", valor: false},
            {texto:"Product Backlog, que lista todas as funcionalidades desejadas; Sprint Backlog, que detalha as tarefas para o próximo Sprint; e Increment, que é a versão funcional do produto.", valor: true},
            {texto:"Gantt Chart, que mostra o cronograma; Risk Register, que identifica riscos; e Quality Plan, que garante a qualidade.", valor: false},
            {texto:"Use Case Diagram, que mostra interações do usuário; Entity-Relationship Diagram, que modela dados; e Test Plan, que define os testes.", valor: false},
        ]
    },

    {
        questao:"Como o Scrum facilita a comunicação e colaboração dentro da equipe e com as partes interessadas?",
        respostas:[
            {texto:"Através de reuniões diárias chamadas Daily Stand-ups, revisões regulares chamadas Sprint Reviews, e retrospectivas para melhoria contínua.", valor: true},
            {texto:"Através de relatórios semanais enviados por e-mail e reuniões mensais de status.", valor: false},
            {texto:"Através de uma estrutura hierárquica onde o Scrum Master comunica todas as decisões.", valor: false},
            {texto:"Através de um software de gerenciamento que automatiza toda a comunicação, eliminando a necessidade de reuniões.", valor: false},
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