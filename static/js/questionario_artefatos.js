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
        questao:"Qual é o propósito do Product Backlog no Scrum?",
        respostas:[
            {texto:"Monitorar o desempenho dos membros da equipe", valor: false},
            {texto:"Listar e priorizar todos os itens de trabalho necessários para o produto", valor: true},
            {texto:"Registrar os problemas encontrados durante o desenvolvimento", valor: false},
            {texto:"Documentar as reuniões de revisão do Sprint", valor: false},
        ]
    },

    {
        questao:"O que é o Sprint Backlog?",
        respostas:[
            {texto:"Uma lista dos itens selecionados do Product Backlog para a Sprint, juntamente com um plano para entregá-los", valor: true},
            {texto:"Um registro de todos os impedimentos encontrados durante a Sprint", valor: false},
            {texto:"A documentação das reuniões diárias", valor: false},
            {texto:"Uma lista de sugestões para melhorar o processo Scrum", valor: false},
        ]
    },

    {
        questao:"O que é o Incremento no Scrum?",
        respostas:[
            {texto:"Um relatório de progresso semanal", valor: false},
            {texto:"Um conjunto de histórias de usuário não concluídas", valor: false},
            {texto:"A soma de todos os itens do Product Backlog completados durante a Sprint e todas as Sprints anteriores", valor: true},
            {texto:"Um documento que descreve as lições aprendidas na Retrospective", valor: false},
        ]
    },

    {
        questao:"Como o Product Backlog é mantido atualizado?",
        respostas:[
            {texto:"Pelo Scrum Master durante a Sprint Retrospective", valor: false},
            {texto:"Pelo Product Owner, que adiciona, remove e prioriza os itens conforme necessário", valor: true },
            {texto:"Pelo time de desenvolvimento durante as reuniões diárias", valor: false},
            {texto:"Pelos stakeholders durante a Sprint Review", valor: false},
        ]
    },

    {
        questao:"O que o gráfico Burn Down no Scrum representa?",
        respostas:[
            {texto:"A quantidade de trabalho completado ao longo de todas as Sprints", valor: false},
            {texto:"A velocidade média do time de desenvolvimento", valor: false},
            {texto:"A quantidade de trabalho restante ao longo do tempo em uma Sprint", valor: true},
            {texto:"A lista priorizada de requisitos do Product Backlog", valor: false},
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