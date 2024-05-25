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
        questao:"Qual é o objetivo da Reunião Diária (Daily Scrum) no método Scrum?",
        respostas:[
            {texto:"Discutir a visão do produto e atualizar o backlog", valor: false},
            {texto:"Planejar o trabalho do próximo Sprint", valor: false},
            {texto:"Sincronizar as atividades e identificar impedimentos", valor: true},
            {texto:"Avaliar o desempenho individual dos membros da equipe", valor: false},
        ]
    },

    {
        questao:"O que ocorre na Sprint Review?",
        respostas:[
            {texto:"Revisão e priorização do Product Backlog", valor: false},
            {texto:"Planejamento do próximo Sprint", valor: false},
            {texto:"Demonstração do trabalho completado durante a Sprint para os stakeholders", valor: true},
            {texto:"Discussão sobre melhorias no processo Scrum", valor: false},
        ]
    },

    {
        questao:"Qual é o propósito da Sprint Retrospective?",
        respostas:[
            {texto:"Revisar o Product Backlog", valor: false},
            {texto:"Identificar e planejar melhorias para o próximo Sprint", valor: true},
            {texto:"Definir os objetivos da próxima Sprint", valor: false},
            {texto:"Aprovar o trabalho realizado durante a Sprint", valor: false},
        ]
    },

    {
        questao:"Quando é realizado o Sprint Planning?",
        respostas:[
            {texto:" No início de cada Sprint", valor: true},
            {texto:"No final de cada Sprint", valor: false },
            {texto:"Diariamente durante a Sprint", valor: false},
            {texto:"Apenas quando um novo produto é iniciado", valor: false},
        ]
    },

    {
        questao:"Qual é a duração típica de uma Sprint no método Scrum?",
        respostas:[
            {texto:"Uma semana", valor: false},
            {texto:" Duas semanas", valor: false},
            {texto:" De uma a quatro semanas", valor: true},
            {texto:"De quatro a seis semanas", valor: false},
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