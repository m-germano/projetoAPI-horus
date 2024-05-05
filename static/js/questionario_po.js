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
        questao:"Qual é o papel do Product Owner em um projeto ágil?",
        respostas:[
            {texto:"Gerenciar o orçamento do projeto", valor: false},
            {texto:"Priorizar o backlog do produto", valor: true},
            {texto:"Desenvolver o código fonte", valor: false},
            {texto:"Conduzir as reuniões diárias", valor: false},
        ]
    },
    {
        questao:"Qual é a principal responsabilidade do Product Owner durante o Sprint Planning?",
        respostas:[
            {texto:"Definir metas de vendas", valor: false},
            {texto:"Estimar o tempo necessário para cada tarefa", valor: false},
            {texto:"Priorizar as histórias do usuário", valor: true},
            {texto:" Configurar o ambiente de desenvolvimento", valor: false},
        ]
    },
    {
        questao:"Quem é responsável por garantir que as histórias do usuário estão bem definidas e prontas para serem implementadas pela equipe de desenvolvimento?",
        respostas:[
            {texto:"Scrum Master", valor: false},
            {texto:"Product Owner", valor: true},
            {texto:"Equipe de Desenvolvimento", valor: false},
            {texto:"Gerente de Projeto", valor: false},
        ]
    },
    {
        questao:"Qual é o objetivo da revisão de sprint conduzida pelo Product Owner?",
        respostas:[
            {texto:"Avaliar o desempenho individual dos membros da equipe", valor: false},
            {texto:"Revisar e adaptar o processo de desenvolvimento", valor: false},
            {texto:"Definir novas histórias do usuário para o próximo sprint", valor: false},
            {texto:"Demonstrar o trabalho concluído à equipe de stakeholders", valor: true},
        ]
    },
    {
        questao:"Qual é a melhor prática para um Product Owner lidar com mudanças nos requisitos do produto durante um sprint?",
        respostas:[
            {texto:"Comunicar imediatamente as mudanças à equipe de desenvolvimento", valor: true},
            {texto:"Ignorar as mudanças e continuar com o plano original", valor: false},
            {texto:"Adicionar as mudanças ao backlog do produto para o próximo sprint", valor: false},
            {texto:"Decidir sozinho como lidar com as mudanças", valor: false},
        ]
    },

   

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