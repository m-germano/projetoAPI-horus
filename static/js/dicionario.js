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
        dailyScrum: 'Reunião diária realizada pela equipe Scrum para sincronizar atividades e planejar o trabalho para as próximas 24 horas. Ajuda a identificar impedimentos e manter o foco na meta da Sprint.',
        definitionOfDone: 'Critérios claros e concisos que uma funcionalidade ou incremento do produto deve atender para ser considerado pronto para entrega. Define as condições de qualidade que o produto deve alcançar.',
        demo: 'Apresentação do incremento de produto concluído ao Product Owner e stakeholders ao final da Sprint. Serve para obter feedback e validar se os requisitos foram atendidos.',
        devOps: 'Práticas e ferramentas que integram desenvolvimento (Dev) e operações (Ops) para melhorar a colaboração e a entrega contínua de software de alta qualidade.',
        debt: 'Débito Técnico refere-se ao custo adicional incorrido no futuro devido a escolhas de desenvolvimento rápidas ou soluções temporárias que comprometem a qualidade do software.',
        //LETRA E
        estimativa: 'Processo de estimar o esforço necessário para completar uma tarefa ou uma história de usuário. Pode ser feito usando técnicas como Planning Poker, Story Points, ou horas estimadas.',
        entregaContinua: 'Prática de liberar software em pequenos incrementos frequentemente, garantindo que o produto esteja sempre pronto para ser lançado. Promove feedback rápido e reduz riscos.',
        epic: 'Requisito grande e complexo que pode ser dividido em histórias menores e mais gerenciáveis. É tratado como uma unidade de trabalho significativa que pode levar várias Sprints para ser concluído.',
        equipe: 'Grupo de indivíduos que trabalham juntos para alcançar um objetivo comum, como desenvolver um produto. No Scrum, a equipe é multifuncional e auto-organizada.',
        escopo: 'O conjunto de funcionalidades e requisitos que definem o que será entregue em um projeto. O escopo pode mudar ao longo do tempo, especialmente em resposta ao feedback do cliente ou mudanças nos requisitos.',
        //LETRA F
        feedback: 'Retorno de informações sobre o produto ou processo, geralmente fornecido por stakeholders, clientes ou usuários finais. O feedback é crucial para melhorar continuamente o produto e o processo de desenvolvimento.',
        framework: 'Estrutura conceitual e organizacional que facilita o desenvolvimento e a implementação de projetos. No contexto de desenvolvimento ágil, Scrum é um exemplo de framework que define papéis, cerimônias e artefatos.',

        gerenteDeProduto: 'Profissional responsável por liderar o desenvolvimento do produto, alinhando as necessidades do mercado com a visão e estratégia da empresa. No contexto do Scrum, o Gerente de Produto é frequentemente o Product Owner.',

        justInTime: 'Just-in-Time (JIT) é um princípio de gestão de produção que se concentra em reduzir o desperdício e melhorar a eficiência, entregando produtos ou serviços no momento exato em que são necessários. No contexto do desenvolvimento ágil, JIT pode se referir à entrega de valor incremental e oportuna durante as Sprints.',

        leadTime: 'Lead Time é o tempo total decorrido desde o início até a conclusão de um processo ou ciclo, incluindo tempos de espera e de execução. No contexto do desenvolvimento ágil, o Lead Time pode referir-se ao tempo necessário para concluir uma história de usuário, uma Sprint ou um ciclo de desenvolvimento.',
        lifecycle: 'O Ciclo de Vida no Scrum refere-se ao conjunto de fases e atividades que um produto passa desde sua concepção até sua obsolescência. Inclui todas as etapas de desenvolvimento, manutenção e eventual retirada do mercado.',
        lean: 'Lean é uma abordagem de gestão focada na criação de valor com o mínimo de desperdício. No contexto do Scrum, princípios lean como eliminação de desperdícios e otimização de fluxos de trabalho são frequentemente aplicados para aumentar a eficiência e reduzir o tempo de entrega.',
       
        meta: 'A Meta da Sprint é o objetivo geral que a equipe pretende alcançar até o final da Sprint. É uma declaração breve que descreve o que deve ser construído durante a Sprint para que o trabalho seja considerado completo.',
        meeting: 'No Scrum, as reuniões são eventos estruturados que fazem parte das cerimônias do Scrum, como a Reunião de Planejamento da Sprint, Daily Scrum, Revisão da Sprint e Retrospectiva da Sprint. Cada uma dessas reuniões tem um propósito específico para manter a equipe alinhada e focada nos objetivos.',
        mvp: 'O Produto Mínimo Viável (MVP) é a versão mais simples de um produto que ainda entrega valor significativo aos usuários. É utilizado para validar hipóteses de mercado e aprender com o feedback dos clientes antes de investir em funcionalidades adicionais.',

        negociacao: 'Negociação no contexto do Scrum envolve a colaboração e discussão entre o Product Owner, equipe de desenvolvimento e stakeholders para priorizar requisitos e planejar o trabalho de forma a maximizar o valor entregue pelo produto.',
        nfr: 'Requisitos Não Funcionais (NFR) são critérios que especificam características do sistema além das funcionalidades principais. Eles abrangem aspectos como desempenho, segurança, usabilidade e confiabilidade.',
        nexus: 'Nexus é um framework desenvolvido pelo Scrum.org para escalar o Scrum além de uma única equipe. Ele fornece orientação e práticas para coordenar e integrar atividades de múltiplas equipes Scrum que trabalham juntas em um produto.',

        ownership: 'Propriedade no contexto do Scrum refere-se ao senso de responsabilidade e comprometimento que os membros da equipe têm em relação às tarefas e ao produto. Cada membro é incentivado a assumir a propriedade de suas responsabilidades e trabalhar para alcançar os objetivos da equipe.',
        observability: 'Observabilidade é a capacidade de entender e monitorar o comportamento interno de um sistema, através de métricas, logs e outros dados gerados. No contexto do desenvolvimento de software, é crucial para identificar problemas e otimizar o desempenho do sistema.',
        overhead: 'Overhead refere-se ao custo adicional de tempo, recursos ou esforço que não contribui diretamente para o valor entregue pelo produto. No Scrum, o objetivo é minimizar o overhead para maximizar a eficiência e a entrega de valor.',


        productOwner: 'O Product Owner é responsável por maximizar o valor do produto e o trabalho do time de desenvolvimento.',
        planningPoker: 'Planning Poker é uma técnica de estimativa usada pelo Scrum Team para determinar o esforço ou tamanho relativo das histórias de usuário. Os membros da equipe atribuem valores de Story Points às histórias usando cartas numeradas, facilitando o consenso e a colaboração.',
        productIncrement: 'Incremento do Produto é a soma de todas as histórias de usuário completadas durante uma Sprint, além do trabalho realizado nas Sprints anteriores. É um produto em evolução, com novas funcionalidades adicionadas a cada Sprint e pronto para ser entregue ao final de cada Sprint.',

        retrospectiva: 'A Retrospectiva é uma cerimônia do Scrum realizada ao final de cada Sprint, onde a equipe revisa o trabalho realizado e identifica melhorias contínuas. O objetivo é aprender com experiências passadas para ajustar e adaptar práticas que maximizem a eficácia da equipe.',
        release: 'Um Release no Scrum refere-se à entrega de um incremento de produto que alcança um conjunto de metas e requisitos. Pode incluir novas funcionalidades, correções de bugs e melhorias, geralmente resultando em uma versão do produto que pode ser disponibilizada para os clientes ou usuários finais.',
        risk: 'Risco no contexto do Scrum refere-se a eventos incertos ou condições que, se ocorrerem, podem ter um impacto negativo no sucesso do projeto. A gestão de riscos no Scrum envolve identificar, avaliar e mitigar riscos potenciais durante todo o ciclo de vida do projeto.',
        functionalRequirements: 'Requisitos Funcionais são descrições detalhadas das funcionalidades ou comportamentos específicos que um sistema, software ou produto deve oferecer. Eles definem o que o sistema deve fazer, suas capacidades e como ele deve se comportar em determinadas situações. Esses requisitos são geralmente expressos em termos de funções do sistema, operações, entradas e saídas esperadas.',


        scrumMaster: 'O Scrum Master é responsável por promover e suportar o Scrum conforme definido no Guia do Scrum.',
        sprint: 'Uma Sprint é um período de tempo durante o qual um incremento de produto "Pronto" é criado. Tem uma duração fixa de um mês ou menos.',
        scrum: 'Scrum é um framework ágil para gerenciar e desenvolver produtos complexos. É baseado em iterações curtas chamadas Sprints, onde a equipe trabalha para entregar incrementos de produto funcionais a cada duas semanas a um mês.',


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