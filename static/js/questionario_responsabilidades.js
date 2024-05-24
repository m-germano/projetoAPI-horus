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
        questao:"Qual é a principal responsabilidade do Product Owner em um time Scrum?",
        respostas:[
            {texto:"Facilitar as reuniões diárias do Scrum.", valor: false},
            {texto:"Garantir a transparência do processo Scrum.", valor: false},
            {texto:"Definir e priorizar o Product Backlog", valor: true},
            {texto:"Desenvolver incrementos funcionais de software", valor: false},
        ]
    },

    {
        questao:"Quem é responsável por remover impedimentos que atrapalham o progresso do time Scrum?",
        respostas:[
            {texto:"Product Owner", valor: false},
            {texto:"Desenvolvedor", valor: false},
            {texto:"Scrum Master", valor: true},
            {texto:"Gerente de Projeto.", valor: false},
        ]
    },

    {
        questao:"Qual é a função do Scrum Master em relação ao time de desenvolvimento?",
        respostas:[
            {texto:"Atribuir tarefas diárias aos desenvolvedores", valor: false},
            {texto:"Ajudar o time a entender e aplicar as práticas Scrum", valor: true},
            {texto:"Determinar a ordem das histórias de usuário no backlog", valor: false},
            {texto:" Aprovar o trabalho completado durante a Sprint", valor: false},
        ]
    },

    {
        questao:"Quem é responsável por criar o Incremento que pode ser entregue ao final de cada Sprint?",
        respostas:[
            {texto:"Product Owner", valor: false},
            {texto:"Scrum Master", valor: false},
            {texto:"Time de Desenvolvimento", valor: true},
            {texto:"Gerente de Produto", valor: false},
        ]
    },

    {
        questao:"Qual das seguintes atividades é responsabilidade do Time de Desenvolvimento durante a Sprint?",
        respostas:[
            {texto:"Revisar e priorizar o Product Backlog", valor: false},
            {texto:"Facilitar as reuniões diárias do Scrum", valor: false},
            {texto:"Implementar, testar e entregar incrementos funcionais", valor: true},
            {texto:"Definir a visão do produto", valor: false},
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