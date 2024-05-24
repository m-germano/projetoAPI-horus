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
        questao:"O que é o Kanban?",
        respostas:[
            {texto:"Um método de gestão visual de tarefas que utiliza cartões e quadros para otimizar fluxos de trabalho.", valor: true},
            {texto:"Um software de controle de versões utilizado no desenvolvimento de software.", valor: false},
            {texto:" Um tipo de metodologia ágil focada exclusivamente em reuniões diárias.", valor: false},
            {texto:"Uma ferramenta de design gráfico utilizada para criação de diagramas.", valor: false},
        ]
    },

    {
        questao:"Qual é o principal objetivo do Kanban?",
        respostas:[
            {texto:"Aumentar a quantidade de trabalho em andamento.", valor: false},
            {texto:"Melhorar a comunicação entre os membros da equipe através de e-mails constantes.", valor: false},
            {texto:"Otimizar o fluxo de trabalho, reduzindo desperdícios e melhorando a eficiência.", valor: true},
            {texto:"Substituir completamente todas as metodologias de gestão de projetos tradicionais.", valor: false},
        ]
    },

    {
        questao:"Qual dos seguintes é um dos princípios básicos do Kanban?",
        respostas:[
            {texto:" Priorizar o trabalho em equipe sobre o trabalho individual.", valor: false},
            {texto:"Fazer reuniões diárias obrigatórias.", valor: false},
            {texto:"Limitar o trabalho em progresso (WIP) para evitar sobrecarga.", valor: true},
            {texto:"Ter uma estrutura fixa e rígida para todas as equipes.", valor: false},
        ]
    },

    {
        questao:"Como é geralmente representado um quadro Kanban?",
        respostas:[
            {texto:"Por meio de uma lista de tarefas em um documento de texto.", valor: false},
            {texto:"Por um conjunto de cartões organizados em colunas que representam diferentes etapas do fluxo de trabalho.", valor: true},
            {texto:" Por uma série de gráficos de Gantt detalhados.", valor: false},
            {texto:"Por uma coleção de diagramas de rede complexos.", valor: false},
        ]
    },

    {
        questao:"Qual é uma prática comum ao usar Kanban para gerenciar um projeto?",
        respostas:[
            {texto:"Estabelecer prazos fixos e imutáveis para todas as tarefas.", valor: false},
            {texto:"Realizar sessões de brainstorming diárias.", valor: false},
            {texto:"Revisar e ajustar continuamente o processo de trabalho com base no feedback e nas métricas de desempenho.", valor: true},
            {texto:"Manter a quantidade de tarefas em andamento ilimitada para maximizar a produtividade.", valor: false},
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