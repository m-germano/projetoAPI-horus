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
        questao:"Qual técnica de estimativa é comumente utilizada no Scrum para avaliar o tamanho relativo das histórias de usuário?",
        respostas:[
            {texto:"Análise de Pontos de Função", valor: false},
            {texto:"Planning Poker", valor: true},
            {texto:"Método Delphi", valor: false},
            {texto:"Análise PERT", valor: false},
        ]
    },

    {
        questao:"O que os pontos de história (story points) representam em Scrum?",
        respostas:[
            {texto:"O esforço relativo necessário para completar uma história de usuário", valor: true},
            {texto:"O número de horas necessárias para completar uma tarefa", valor: false},
            {texto:"A complexidade técnica de uma tarefa", valor: false},
            {texto:" A quantidade de linhas de código a serem escritas", valor: false},
        ]
    },

    {
        questao:"Qual é o papel do time de desenvolvimento durante a estimativa das histórias de usuário?",
        respostas:[
            {texto:"Atribuir tarefas específicas aos membros do time", valor: false},
            {texto:"Determinar a prioridade das histórias de usuário no Product Backlog", valor: false},
            {texto:"Estimar coletivamente o esforço necessário para completar cada história de usuário", valor: true},
            {texto:"Aprovar as estimativas fornecidas pelo Product Owner", valor: false},
        ]
    },

    {
        questao:"Por que é importante revisar e ajustar as estimativas durante a Sprint Planning?",
        respostas:[
            {texto:"Para garantir que todas as histórias de usuário sejam concluídas na Sprint", valor: false},
            {texto:"Para refletir um melhor entendimento do trabalho a ser feito e ajustar o planejamento da Sprint", valor: true },
            {texto:"Para alterar a visão do produto conforme necessário", valor: false},
            {texto:"Para aprovar as estimativas finais fornecidas pelos stakeholders", valor: false},
        ]
    },

    {
        questao:"Qual é o benefício principal do uso de técnicas como Planning Poker para estimativas no Scrum?",
        respostas:[
            {texto:"Atribuir pontos de história de forma mais rápida e eficiente", valor: false},
            {texto:"Aumentar a precisão das estimativas baseadas em cálculos matemáticos", valor: false},
            {texto:"Promover a colaboração e obter uma visão compartilhada do esforço necessário", valor: true},
            {texto:"Garantir que o Product Owner defina todas as estimativas de esforço", valor: false},
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