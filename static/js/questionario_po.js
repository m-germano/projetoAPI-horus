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
        questao:"Qual é uma das principais responsabilidades de um Scrum Master durante uma reunião diária (Daily Scrum)?",
        respostas:[
            {texto:"Dar ordens e direcionar a equipe", valor: false},
            {texto:"Facilitar a reunião e remover impedimentos", valor: true},
            {texto:"Fornecer atualizações detalhadas sobre o progresso do projeto", valor: false},
            {texto:"Desenvolver novos recursos do produto", valor: false},
        ]
    },

    {
        questao:"Qual é o papel do Scrum Master em relação ao Product Owner?",
        respostas:[
            {texto:"Desenvolver e priorizar o Product Backlog", valor: false},
            {texto:"Tomar decisões finais sobre os requisitos do projeto", valor: false},
            {texto:"Facilitar a colaboração entre o Product Owner e a equipe de desenvolvimento", valor: true},
            {texto:"Definir metas de sprint e estimar o tempo necessário para cada tarefa", valor: false},
        ]
    },

    {
        questao:"Como um Scrum Master pode ajudar a equipe a resolver conflitos?",
        respostas:[
            {texto:"Ignorando os conflitos e deixando a equipe resolver por conta própria", valor: false},
            {texto:"Intervindo diretamente e tomando partido em disputas", valor: false},
            {texto:"Facilitando discussões construtivas e ajudando a encontrar soluções colaborativas", valor: true},
            {texto:"Evitando situações conflituosas e priorizando o progresso do projeto", valor: false},
        ]
    },

    {
        questao:"Quais são algumas das habilidades-chave que um Scrum Master deve possuir?",
        respostas:[
            {texto:"Habilidades técnicas avançadas em desenvolvimento de software", valor: false},
            {texto:"Fortes habilidades de liderança e comunicação", valor: true},
            {texto:"Experiência extensa em gerenciamento de projetos tradicionais", valor: false},
            {texto:"Capacidade de tomar decisões unilaterais sem consultar a equipe", valor: false},
        ]
    },

    {
        questao:"O que um Scrum Master faz para ajudar a equipe a melhorar continuamente?",
        respostas:[
            {texto:"Facilitar retrospectivas de sprint e identificar áreas de melhoria", valor: true},
            {texto:"Estabelecer metas individuais para cada membro da equipe", valor: false},
            {texto:"Realizar revisões de desempenho trimestrais", valor: false},
            {texto:"Fornecer recompensas financeiras por bom desempenho individual", valor: false},
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