document.addEventListener('DOMContentLoaded', () => {
    const terms = document.querySelectorAll('.term');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const spanClose = document.getElementsByClassName('close')[0];

    const descriptions = {
        //LETRA A
        artefato:'Itens tangíveis e intangíveis criados, usados e modificados durante o desenvolvimento de um produto em Scrum, como o Product Backlog, Sprint Backlog e Incremento.',
        aceitacao:'Conjunto de condições que um produto ou serviço deve atender para ser aceito pelo usuário ou cliente.',
        agile:'Um conjunto de práticas e princípios que promovem a entrega iterativa e incremental de produtos de software.',
        aperfeicoamento:'Processo contínuo de revisão e ajuste do Product Backlog para garantir que esteja atualizado e priorizado adequadamente.',
        adaptar:'Um dos pilares do Scrum, que envolve ajustar os processos e práticas com base no feedback e nos resultados obtidos.',
        aprovacao:'O ato de aceitar um incremento de produto ou uma história de usuário como "Pronta" com base nos critérios de aceitação definidos.',
        autoOrganizacao:'Princípio fundamental do Scrum onde as equipes são encorajadas a se auto-organizarem para melhor alcançar seus objetivos.',
        atribuicao:'O processo de designar tarefas específicas para membros da equipe durante uma Sprint.',
        analiseValor:'Avaliação do valor potencial que um incremento ou história de usuário pode trazer para o cliente ou usuário final.',
        acompanhamento:'Monitoramento contínuo do progresso da equipe durante a Sprint, frequentemente utilizando ferramentas como o gráfico Burndown.',
        //LETRA B
        productBacklog: 'Lista ordenada de tudo que é necessário no produto. É a única fonte de requisitos para qualquer alteração a ser feita no produto.',
        sprintBacklog: 'Conjunto de itens do Product Backlog selecionados para a Sprint, junto com um plano para entregar o incremento do produto e atingir a meta da Sprint.',
        burndownChart: 'Gráfico que mostra a quantidade de trabalho restante ao longo do tempo de uma Sprint, usado para monitorar o progresso da equipe.',
        backlogRefinement: ' Processo contínuo de revisão e detalhamento dos itens do Product Backlog para garantir que estejam prontos para futuras Sprints.',
        bugs: 'Problemas ou falhas no software que precisam ser corrigidos. No contexto do Scrum, os bugs são frequentemente adicionados ao Product Backlog e priorizados.',
        brainstorming: 'Técnica usada para gerar ideias e soluções através de discussões em grupo, frequentemente utilizada durante as reuniões de planejamento ou retrospectiva.',
        stakeholder: 'Qualquer pessoa ou grupo que tenha interesse no resultado do projeto ou que possa ser afetado pelo produto.',
        boxing: 'Técnica de gerenciamento de tempo que define uma quantidade fixa de tempo para realizar uma atividade específica, como uma reunião ou uma Sprint.',
        buffer: 'Reserva de tempo ou recursos adicionada ao planejamento para lidar com incertezas e variabilidades no desenvolvimento.',

        //LETRA C
        cadencia: 'A cadência refere-se à regularidade com que eventos ocorrem no Scrum. Por exemplo, a cadência das Sprints define o ritmo de entrega do trabalho, enquanto a cadência das cerimônias define a frequência das reuniões e eventos principais dentro do framework Scrum.',

        capacidade: 'Capacidade no contexto do Scrum refere-se à quantidade de trabalho que a equipe é capaz de realizar em um determinado período de tempo, como uma Sprint. É importante para o planejamento adequado e para a definição de metas realistas.',
        cerimonias: 'Cerimônias são eventos estruturados dentro do Scrum que ajudam a garantir uma execução eficiente e colaborativa do processo. Incluem Reunião de Planejamento da Sprint, Daily Scrum, Revisão da Sprint e Retrospectiva da Sprint.',
        colaboracao: 'Colaboração é fundamental no Scrum, onde a equipe multidisciplinar trabalha em conjunto para alcançar os objetivos do projeto. Incentiva a comunicação aberta, a troca de ideias e a resolução de problemas de forma colaborativa.',
        comprometimento: 'O comprometimento no Scrum envolve a dedicação da equipe em atingir os objetivos acordados para a Sprint. Cada membro se compromete com as tarefas que serão realizadas durante o ciclo de desenvolvimento.',
        construcaoIncremental: 'A construção incremental é uma abordagem no Scrum onde o produto é desenvolvido em pequenas partes funcionais e completas, chamadas de incrementos. Cada incremento adiciona funcionalidades ao produto de forma evolutiva.',
        criteriosDeAceitacao: 'Os critérios de aceitação são condições específicas que uma funcionalidade ou um incremento do produto deve atender para ser considerado completo e aceito pelo Product Owner ou pelo cliente.',
        cicloDeVida: 'O ciclo de vida no Scrum refere-se ao processo completo de desenvolvimento do produto, desde a concepção até a entrega e manutenção. Inclui todas as fases e atividades envolvidas na criação do produto.',
        cliente: 'O cliente no Scrum é a pessoa ou entidade que receberá o produto final. Representa os interesses dos usuários finais e stakeholders, e trabalha em estreita colaboração com o Product Owner para garantir que suas necessidades sejam atendidas.',
        confianca: 'A confiança é essencial no Scrum para promover uma colaboração eficaz entre os membros da equipe, stakeholders e clientes. A confiança mútua facilita a comunicação aberta, a resolução de problemas e o alcance dos objetivos do projeto.',

        productOwner: 'O Product Owner é responsável por maximizar o valor do produto e o trabalho do time de desenvolvimento.',
        scrumMaster: 'O Scrum Master é responsável por promover e suportar o Scrum conforme definido no Guia do Scrum.',
        sprint: 'Uma Sprint é um período de tempo durante o qual um incremento de produto "Pronto" é criado. Tem uma duração fixa de um mês ou menos.',
        
        // Adicione mais descrições conforme necessário
    };

    terms.forEach(term => {
        term.addEventListener('click', (event) => {
            event.preventDefault();
            const termKey = event.target.getAttribute('data-term');
            modalTitle.textContent = event.target.textContent;
            modalDescription.textContent = descriptions[termKey];
            modal.style.display = 'block';
        });
    });

    spanClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});