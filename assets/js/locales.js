/**
 * Static landing-page UI strings (PT / EN / ES).
 * Quiz copy stays in quiz-engine I18N + questions.js — not here.
 */
(function () {
  window.__KANGA_LOCALES__ = {
    pt: {
      aria: {
        readingProgress: "Progresso de leitura",
        mainNav: "Navegação principal",
        langSelector: "Seletor de idioma",
        langOptions: "Opções de idioma",
        stateSelect: "Selecionar estado ou território",
        scoreProgress: "Progresso da pontuação",
        practiceBreakdown: "Detalhe da prática",
        previewPractice: "Pré-visualização da prática",
        brandHome: "KangaLearner — início",
        subscribeEmail: "Email"
      },
      ldOptions: {
        pt: { name: "Português", sub: "Somente PT" },
        en: { name: "English", sub: "English only" },
        es: { name: "Español", sub: "Solo ES" },
        pten: { name: "PT + EN", sub: "Bilíngue" },
        esen: { name: "ES + EN", sub: "Bilíngüe" }
      },
      nav: {
        home: "Início",
        learn: "Aprender",
        practice: "Praticar",
        mockTest: "Simulado",
        progress: "Progresso",
        roadRules: "Aprender",
        resources: "Recursos"
      },
      confirm: {
        resetProgress: "Tem certeza que deseja apagar seu progresso?"
      },
      brand: {
        logoSub: "Prática para a prova de learner de WA"
      },
      hero: {
        eyebrow: "Prática para a prova de learner de WA",
        title: "Prepare-se para a prova de learner de WA com confiança.",
        description:
          "Estude as principais regras de trânsito de WA, pratique as perguntas existentes, faça um simulado com 30 questões e acompanhe seu progresso em inglês, português ou espanhol.",
        ctaPractice: "Praticar perguntas de WA",
        ctaMock: "Fazer simulado de 30 questões",
        proof: "WA disponível agora. Outros estados da Austrália em breve."
      },
      preview: {
        practiceTitle: "Prática",
        questionProgress: "Pergunta 12 de 30",
        questionDemo:
          "Ao virar à direita num cruzamento, você deve dar preferência aos veículos que seguem em frente.",
        optTrue: "Verdadeiro",
        optFalse: "Falso",
        optOnlySign: "Só se a placa disser",
        optRoundabout: "Só em rotatórias",
        progressTitle: "Seu progresso",
        legendCorrect: "Corretas",
        legendIncorrect: "Erradas",
        legendUnanswered: "Não respondidas",
        scoreTitle: "Pontuação",
        scoreAwesome: "Ótimo trabalho!"
      },
      features: {
        byStateTitle: "Foco em WA, com expansão futura",
        byStateBody:
          "Pratique regras e questões de WA agora; outros estados australianos virão em breve.",
        practiceTitle: "Questões de prática",
        practiceBody: "Perguntas de múltipla escolha alinhadas ao conteúdo de WA.",
        mockTitle: "Simulados",
        mockBody: "Simulado de 30 questões e modo prova sem dicas até o final.",
        trackTitle: "Acompanhe o progresso",
        trackBody: "Veja acertos por tema e o que revisar a seguir."
      },
      state: {
        banner: "WA está disponível; outros estados em breve.",
        comingSoon: "Em breve"
      },
      trust: {
        sectionTitle: "Por que KangaLearner",
        multiTitle: "Suporte multilíngue",
        multiBody: "Estude em inglês, português e espanhol; mais idiomas em breve.",
        saveTitle: "Salvar progresso",
        saveBody: "Seu progresso é salvo automaticamente no navegador.",
        officialTitle: "Baseado em regras oficiais",
        officialBody:
          "Conteúdo estruturado a partir de fontes públicas de WA; confirme sempre com o Departamento de Transportes."
      },
      topics: {
        sectionTitle: "Aprenda os principais tópicos",
        speedTitle: "Velocidade",
        speedDesc: "Entenda limites e regras de velocidade",
        signsTitle: "Sinais",
        signsDesc: "Reconheça sinais e marcações",
        parkingTitle: "Estacionamento",
        parkingDesc: "Regras e restrições de estacionamento",
        alcoholTitle: "Álcool/BAC",
        alcoholDesc: "Leis e penalidades de álcool ao volante",
        lanesTitle: "Faixas e mudança de faixa",
        lanesDesc: "Uso de faixas, linhas e dar passagem",
        safetyTitle: "Segurança",
        safetyDesc: "Dicas para dirigir com segurança"
      },
      learn: {
        kicker: "Aprenda antes de praticar",
        title: "Regras de trânsito em formato simples",
        sub: "Guias curtos, práticos e baseados em materiais oficiais. Leia o essencial, veja erros comuns e pratique o tema logo em seguida.",
        breadcrumb: "Aprender",
        cardCta: "Estudar tema →",
        keyRules: "✓ Regras principais",
        mistakes: "⚠ Erros comuns",
        example: "📋 Exemplo prático",
        quickCheck: "❓ Teste rápido",
        ctaPracticePrefix: "Praticar",
        ctaPracticeSuffix: "questões",
        ctaAllTopics: "← Todos os tópicos"
      },
      mock: {
        kicker: "Simulado",
        title: "Simulado",
        sub: "Escolha como você quer praticar. Ambos os modos usam questões reais em ordem aleatória.",
        lastAttempt: "Última tentativa",
        viewResults: "Ver resultados completos",
        practiceTitle: "Modo prática",
        practiceDesc:
          "Veja a resposta correta e a explicação após cada questão. Ótimo para aprender enquanto pratica.",
        practiceFeat1: "Feedback imediato por questão",
        practiceFeat2: "Explicações exibidas",
        practiceFeat3: "Sem pressão de tempo",
        practiceBtn: "Iniciar modo prática",
        examBadge: "Simulação de prova",
        examTitle: "Modo prova",
        examDesc:
          "Sem feedback até o final — como na prova real. Veja seu resultado e pontos fracos ao terminar.",
        examFeat1: "Sem dicas durante a prova",
        examFeat2: "Resultados completos no final",
        examFeat3: "Resumo por categoria",
        examBtn: "Iniciar modo prova",
        info: "ℹ️ O simulado usa 30 questões sorteadas do banco oficial para o estado selecionado.",
        examTimerLabel: "Tempo restante (modo prova)",
        examTimerToggle: "Modo prova real (limite de 45 minutos)",
        examTimerHint:
          "O simulado encerra automaticamente quando o tempo acaba. Questões sem resposta contam como erro.",
        examNeedsQuestions: "O Modo Prova precisa de 30 perguntas disponíveis de WA.",
        practiceRedirect:
          "O Practice Mock agora fica na página Practice. Use este botão para ir para lá.",
        practiceGoToPractice: "Ir para Practice Mock",
        resultsTitle: "Resultado do simulado",
        resultsEmpty: "Ainda não há resultados.",
        resultsEmptyCta: "Fazer um simulado",
        resultsStatusPass: "Aprovado",
        resultsStatusMid: "Quase lá",
        resultsStatusLow: "Precisa melhorar",
        resultsMsgPass: "Excelente — você está no caminho certo para a prova real!",
        resultsMsgMid: "Bom progresso. Continue praticando para ganhar confiança.",
        resultsMsgLow: "Continue estudando — prática focada nos temas fracos ajuda muito.",
        resultsElapsed: "Tempo utilizado:",
        resultsCatBreakdown: "Desempenho por tema",
        resultsCatPct: "% correto",
        resultsAgain: "Fazer outro simulado",
        resultsPractice: "Praticar questões",
        resultsRedoMistakes: "Praticar tema mais fraco",
        resultsTotalQs: "questões"
      },
      practice: {
        kicker: "Prática",
        page: {
          title: "Pratique para a prova de learner de WA",
          subtitle:
            "Escolha um modo de estudo. Comece por tema, pratique 30 perguntas aleatórias ou simule a prova sem feedback até o final."
        },
        path: {
          label: "Caminho recomendado:",
          steps: "Praticar perguntas → Simulado com prática → Simulação da prova"
        },
        questions: {
          label: "Melhor para aprender",
          title: "Praticar perguntas",
          description: "Pratique perguntas de WA por tema com feedback imediato e explicações.",
          cta: "Começar prática"
        },
        mock: {
          label: "Melhor para praticar 30 questões",
          title: "Simulado com prática",
          description:
            "Pratique 30 perguntas de WA em ordem aleatória com feedback imediato. Este modo é para aprender.",
          cta: "Iniciar simulado com prática"
        },
        exam: {
          label: "Melhor para se preparar para a prova",
          title: "Simulação da prova",
          description:
            "Responda 30 perguntas de WA sem feedback até o final, como uma simulação real da prova.",
          cta: "Iniciar simulação da prova"
        },
        cards: {
          questionsTitle: "Praticar perguntas",
          questionsDesc: "Pratique perguntas de WA por tema com feedback imediato e explicações.",
          questionsBtn: "Começar prática",
          mockBadge: "30 questões",
          mockTitle: "Simulado com prática",
          mockDesc:
            "Faça um simulado de 30 perguntas com feedback imediato. Este modo é para aprender, não simular a prova real.",
          mockBtn: "Iniciar simulado com prática",
          mockNeedsQuestions: "O Simulado com prática precisa de 30 perguntas disponíveis de WA.",
          examBadge: "Simulação de prova",
          examTitle: "Simulação da prova",
          examDesc:
            "Responda 30 perguntas de WA sem feedback até o final, como uma simulação real da prova.",
          examBtn: "Iniciar simulação da prova",
          examNeedsQuestions: "A Simulação da prova precisa de 30 perguntas disponíveis de WA."
        },
        tip: "Não sabe por onde começar? Comece por Praticar perguntas, depois faça o Simulado com prática antes da Simulação da prova.",
        progress: {
          title: "Seu progresso",
          description:
            "Acompanhe suas perguntas respondidas, taxa de acerto, resultados dos simulados e próximo passo recomendado.",
          answered: "Respondidas",
          correct: "Certas",
          incorrect: "Erradas",
          accuracy: "Taxa de acerto",
          bestMock: "Melhor simulado",
          recommendedNextStep: "Próximo passo recomendado",
          empty:
            "Ainda não há progresso. Comece praticando as perguntas de WA para ver seus resultados aqui.",
          viewFull: "Ver progresso completo",
          backToPractice: "Voltar para Praticar",
          notAvailable: "Ainda não disponível"
        },
        note: "ℹ️ Dica: o modo prova não mostra feedback até o final."
      },
      study: {
        modeLabel: "Modo de estudo",
        all: "Todas",
        wrong: "Erradas",
        unanswered: "Não respondidas",
        saved: "Salvas",
        mock: "Simulado (prática)",
        filterLabel: "Filtrar por tema"
      },
      sim: {
        headerLabel: "Simulado"
      },
      progress: {
        panelTitle: "Seu progresso",
        score: "Pontuação",
        accuracy: "Taxa de acerto",
        correct: "Certas",
        incorrect: "Erradas",
        unanswered: "Não respondidas",
        reset: "Reiniciar tudo",
        nextHead: "Próximo passo:",
        nextUnanswered: "Continue pelas perguntas não respondidas.",
        nextReviewWrong: "Reveja as perguntas erradas.",
        nextMock: "Faça um simulado.",
        nextKeepGoing: "Continue praticando.",
        pageTitle: "Acompanhamento de progresso",
        pageKickerSuffix: " — seu progresso",
        catPerf: "Desempenho por categoria",
        recommendMore: "Recomendamos praticar mais:",
        colCat: "Categoria",
        colAnswered: "Respondidas",
        colCorrect: "Corretas",
        colPct: "% de acerto",
        weakHead: "Recomendamos praticar mais:",
        emptyHint:
          "Ainda não há progresso. Comece praticando as perguntas de WA para ver seus resultados aqui.",
        startPractice: "Começar a praticar"
      },
      resources: {
        kicker: "Fontes oficiais",
        title: "Recursos",
        sub: "Links diretos para manuais oficiais e informações do teste.",
        availableNow: "Disponível agora",
        officialLinksSoon: "Links oficiais em breve",
        available: "Disponível agora",
        comingSoonBadge: "Em breve",
        comingSoon: "Em breve",
        officialResourcesComingSoon:
          "Os recursos oficiais deste estado serão adicionados em breve.",
        waOnlyNotice:
          "Os recursos de WA estão disponíveis agora. Outros estados estarão disponíveis em breve.",
        linkWaSite: "Site oficial (WA)",
        linkWaHandbook: "Manual de regras de trânsito (WA)",
        linkWaTheory: "Informações do teste teórico no computador (WA)",
        practiseWA: "Praticar perguntas de WA",
        backToLearn: "Voltar para Aprender",
        learnerTestInfo: "Informações do teste teórico",
        officialSite: "Site oficial do órgão",
        ctaStudy: "Guias de estudo",
        ctaPractice: "Praticar questões"
      },
      glossary: {
        kicker: "Vocabulário de regras",
        title: "Glossário",
        sub: "Termos-chave que você verá no teste teórico de learner driver na Austrália.",
        ctaPractice: "Praticar questões",
        ctaLearn: "Ver guias de estudo"
      },
      about: {
        title: "Sobre o KangaLearner",
        body: "O KangaLearner é uma plataforma de estudo para ajudar learner drivers a passar na prova teórica de regras de trânsito na Austrália.",
        ctaPractice: "Começar prática",
        ctaContact: "Fale com a gente"
      },
      contact: {
        title: "Contato",
        sub: "Encontrou um erro nas questões? Tem uma sugestão? Queremos ouvir você.",
        nameLabel: "Nome",
        emailLabel: "Email",
        msgLabel: "Mensagem",
        send: "Enviar mensagem"
      },
      footer: {
        note: "O KangaLearner ajuda learner drivers a praticarem perguntas de regras de trânsito de WA com suporte multilíngue.",
        disclaimer:
          "O KangaLearner é uma ferramenta de apoio ao estudo. Confirme sempre os requisitos atuais com o órgão de trânsito do seu estado.",
        officialTitle: "Fontes oficiais (referência)",
        waLearn: "WA — Aprendendo a dirigir",
        product: "Produto",
        navLearn: "Aprender",
        navPractice: "Prática",
        navMock: "Simulado",
        navRules: "Aprender",
        navStates: "Estados",
        company: "Empresa",
        about: "Sobre",
        contact: "Contato",
        legal: "Legal",
        terms: "Termos",
        privacy: "Privacidade",
        newsletterTitle: "Novidades",
        newsletterBody: "Receba dicas, novidades e lembretes de estudo.",
        studyUpdatesSoon: "Novidades de estudo em breve.",
        waFirstBlurb:
          "O KangaLearner ajuda learner drivers a praticarem perguntas de regras de trânsito de WA com suporte multilíngue.",
        subscribe: "Inscrever",
        emailPlaceholder: "email@example.com",
        copyright: "© 2026 KangaLearner. Todos os direitos reservados."
      }
    },
    en: {
      aria: {
        readingProgress: "Reading progress",
        mainNav: "Main navigation",
        langSelector: "Language selector",
        langOptions: "Language options",
        stateSelect: "Select state or territory",
        scoreProgress: "Score progress",
        practiceBreakdown: "Practice breakdown",
        previewPractice: "Practice preview",
        brandHome: "KangaLearner home",
        subscribeEmail: "Email"
      },
      ldOptions: {
        pt: { name: "Portuguese", sub: "PT only" },
        en: { name: "English", sub: "English only" },
        es: { name: "Spanish", sub: "ES only" },
        pten: { name: "PT + EN", sub: "Bilingual" },
        esen: { name: "ES + EN", sub: "Bilingual" }
      },
      nav: {
        home: "Home",
        learn: "Learn",
        practice: "Practice",
        mockTest: "Mock Test",
        progress: "Progress",
        roadRules: "Learn",
        resources: "Resources"
      },
      confirm: {
        resetProgress: "Are you sure you want to reset your progress?"
      },
      brand: {
        logoSub: "WA learner test practice"
      },
      hero: {
        eyebrow: "WA learner test practice",
        title: "Prepare for your WA learner test with confidence.",
        description:
          "Study key WA road rules, practise the existing WA questions, take a 30-question mock test and track your progress in English, Portuguese or Spanish.",
        ctaPractice: "Start practising WA questions",
        ctaMock: "Take the 30-question mock test",
        proof: "WA available now. More Australian states coming soon."
      },
      preview: {
        practiceTitle: "Practice",
        questionProgress: "Question 12 of 30",
        questionDemo:
          "When turning right at an intersection, you must give way to vehicles travelling straight ahead.",
        optTrue: "True",
        optFalse: "False",
        optOnlySign: "Only when a sign says so",
        optRoundabout: "Only at roundabouts",
        progressTitle: "Your progress",
        legendCorrect: "Correct",
        legendIncorrect: "Incorrect",
        legendUnanswered: "Unanswered",
        scoreTitle: "Score",
        scoreAwesome: "Awesome work!"
      },
      features: {
        byStateTitle: "WA-first, with more states later",
        byStateBody:
          "Practise WA road rules and questions now; other Australian states are coming soon.",
        practiceTitle: "Practice questions",
        practiceBody: "Multiple-choice questions aligned with WA learner content.",
        mockTitle: "Mock tests",
        mockBody: "30-question mock and an exam-style mode with no hints until the end.",
        trackTitle: "Track progress",
        trackBody: "See how you score by topic and what to review next."
      },
      state: {
        banner: "WA is available; other states are coming soon.",
        comingSoon: "Coming soon"
      },
      trust: {
        sectionTitle: "Why KangaLearner",
        multiTitle: "Multilingual support",
        multiBody: "Study in English, Portuguese and Spanish now; more languages later.",
        saveTitle: "Save progress",
        saveBody: "Your progress is saved automatically in your browser.",
        officialTitle: "Grounded in official materials",
        officialBody:
          "Structured from public WA sources — always confirm details with the Department of Transport."
      },
      topics: {
        sectionTitle: "Learn key road rule topics",
        speedTitle: "Speed Limits",
        speedDesc: "Understand speed rules and limits",
        signsTitle: "Signs",
        signsDesc: "Recognise road signs and markings",
        parkingTitle: "Parking",
        parkingDesc: "Parking rules and restrictions",
        alcoholTitle: "Alcohol",
        alcoholDesc: "Drink driving laws and penalties",
        lanesTitle: "Lane Rules",
        lanesDesc: "Lane use and merging rules",
        safetyTitle: "Safety",
        safetyDesc: "Safe driving tips for life"
      },
      learn: {
        kicker: "Learn before you practise",
        title: "Road rules in a simple format",
        sub: "Short, practical guides based on official materials. Learn the essentials, review common mistakes and practise the topic right after.",
        breadcrumb: "Learn",
        cardCta: "Study topic →",
        keyRules: "✓ Key rules",
        mistakes: "⚠ Common mistakes",
        example: "📋 Example scenario",
        quickCheck: "❓ Quick check",
        ctaPracticePrefix: "Practise",
        ctaPracticeSuffix: "questions",
        ctaAllTopics: "← All topics"
      },
      mock: {
        kicker: "Simulated exam",
        title: "Mock Test",
        sub: "Choose how you want to practise. Both modes use real test questions in random order.",
        lastAttempt: "Last attempt",
        viewResults: "View full results",
        practiceTitle: "Practice Mock",
        practiceDesc:
          "See the correct answer and explanation after each question. Great for learning as you go.",
        practiceFeat1: "Immediate feedback per question",
        practiceFeat2: "Explanations shown",
        practiceFeat3: "No time pressure",
        practiceBtn: "Start Practice Mock",
        examBadge: "Exam Simulation",
        examTitle: "Exam Mode",
        examDesc:
          "No feedback until the end — just like the real test. See your result and weak areas when you finish.",
        examFeat1: "No hints during the test",
        examFeat2: "Full results at the end",
        examFeat3: "Category breakdown",
        examBtn: "Start Exam Mode",
        info: "ℹ️ The mock test uses 30 questions drawn from the official question bank for your selected state.",
        examTimerLabel: "Time remaining (exam mode)",
        examTimerToggle: "Real exam mode (45 minute limit)",
        examTimerHint:
          "The mock ends automatically when time runs out. Unanswered questions count as incorrect.",
        examNeedsQuestions: "Exam Mode needs 30 available WA questions.",
        practiceRedirect:
          "Practice Mock now lives on the Practice page. Use this button to go there.",
        practiceGoToPractice: "Go to Practice Mock",
        resultsTitle: "Mock test results",
        resultsEmpty: "No results yet.",
        resultsEmptyCta: "Take a mock test",
        resultsStatusPass: "Pass",
        resultsStatusMid: "Almost there",
        resultsStatusLow: "Needs work",
        resultsMsgPass: "Excellent — you are on track for the real test!",
        resultsMsgMid: "Good progress. Keep practising to build confidence.",
        resultsMsgLow: "Keep studying — focused practice on weak areas will help.",
        resultsElapsed: "Time taken:",
        resultsCatBreakdown: "Score by category",
        resultsCatPct: "% correct",
        resultsAgain: "Take another test",
        resultsPractice: "Practise questions",
        resultsRedoMistakes: "Practise weakest topic",
        resultsTotalQs: "questions"
      },
      practice: {
        kicker: "Practice",
        page: {
          title: "Practice for your WA learner test",
          subtitle:
            "Choose a study mode. Start by topic, practise 30 random questions, or simulate the exam with no feedback until the end."
        },
        path: {
          label: "Recommended path:",
          steps: "Practice Questions → Practice Mock → Exam Simulation"
        },
        questions: {
          label: "Best for learning",
          title: "Practice Questions",
          description:
            "Practise WA learner questions by topic with instant feedback and explanations.",
          cta: "Start practice"
        },
        mock: {
          label: "Best for 30-question practice",
          title: "Practice Mock",
          description:
            "Practise 30 WA questions in random order with instant feedback. This mode is for learning.",
          cta: "Start practice mock"
        },
        exam: {
          label: "Best for exam readiness",
          title: "Exam Simulation",
          description:
            "Answer 30 WA questions without feedback until the end, just like a real test simulation.",
          cta: "Start exam simulation"
        },
        cards: {
          questionsTitle: "Practice Questions",
          questionsDesc:
            "Practise WA learner questions by topic with instant feedback and explanations.",
          questionsBtn: "Start practice",
          mockBadge: "30 questions",
          mockTitle: "Practice Mock",
          mockDesc:
            "Practise a 30-question mock with instant feedback. This is for learning, not exam simulation.",
          mockBtn: "Start practice mock",
          mockNeedsQuestions: "Practice Mock needs 30 available WA questions.",
          examBadge: "Exam simulation",
          examTitle: "Exam Simulation",
          examDesc:
            "Answer 30 WA questions without feedback until the end, just like a real test simulation.",
          examBtn: "Start exam simulation",
          examNeedsQuestions: "Exam Simulation needs 30 available WA questions."
        },
        tip: "Not sure where to start? Begin with Practice Questions, then try Practice Mock before Exam Simulation.",
        progress: {
          title: "Your Progress",
          description:
            "Track your answered questions, accuracy, mock results and recommended next step.",
          answered: "Answered",
          correct: "Correct",
          incorrect: "Incorrect",
          accuracy: "Accuracy",
          bestMock: "Best mock score",
          recommendedNextStep: "Recommended next step",
          empty: "No progress yet. Start practising WA questions to see your results here.",
          viewFull: "View full progress",
          backToPractice: "Back to Practice",
          notAvailable: "Not available yet"
        },
        note: "ℹ️ Tip: exam simulation shows no feedback until the end."
      },
      study: {
        modeLabel: "Study mode",
        all: "All questions",
        wrong: "Wrong answers",
        unanswered: "Unanswered",
        saved: "Saved",
        mock: "Practice mock",
        filterLabel: "Filter by topic"
      },
      sim: {
        headerLabel: "Mock test"
      },
      progress: {
        panelTitle: "Progress tracker",
        score: "Score",
        accuracy: "Accuracy",
        correct: "Correct",
        incorrect: "Incorrect",
        unanswered: "Unanswered",
        reset: "Reset all",
        nextHead: "Recommended next step:",
        nextUnanswered: "Continue with unanswered questions.",
        nextReviewWrong: "Review wrong answers.",
        nextMock: "Take a mock test.",
        nextKeepGoing: "Keep practising.",
        pageTitle: "Progress tracker",
        pageKickerSuffix: " — your progress",
        catPerf: "Performance by category",
        recommendMore: "We recommend more practice on:",
        colCat: "Category",
        colAnswered: "Answered",
        colCorrect: "Correct",
        colPct: "% correct",
        weakHead: "We recommend more practice on:",
        emptyHint: "No progress yet. Start practising WA questions to see your results here.",
        startPractice: "Start practising"
      },
      resources: {
        kicker: "Official sources",
        title: "Resources",
        sub: "Direct links to official government handbooks and test information.",
        availableNow: "Available now",
        officialLinksSoon: "Official links coming soon",
        available: "Available now",
        comingSoonBadge: "Coming soon",
        comingSoon: "Coming soon",
        officialResourcesComingSoon: "Official resources for this state will be added soon.",
        waOnlyNotice: "WA resources are available now. More states are coming soon.",
        linkWaSite: "Official website (WA)",
        linkWaHandbook: "Road Rules Handbook (WA)",
        linkWaTheory: "Computer theory test information (WA)",
        practiseWA: "Practise WA questions",
        backToLearn: "Back to Learn",
        learnerTestInfo: "Learner test information",
        officialSite: "Official authority website",
        ctaStudy: "Study guides",
        ctaPractice: "Practice questions"
      },
      glossary: {
        kicker: "Road rules vocabulary",
        title: "Glossary",
        sub: "Key terms you’ll encounter in the Australian learner driver test.",
        ctaPractice: "Practice questions",
        ctaLearn: "Browse study guides"
      },
      about: {
        title: "About KangaLearner",
        body: "KangaLearner is a study platform built to help learner drivers pass the Australian road rules knowledge test.",
        ctaPractice: "Start practising",
        ctaContact: "Contact us"
      },
      contact: {
        title: "Contact",
        sub: "Found an error in the questions? Have a suggestion? We'd love to hear from you.",
        nameLabel: "Name",
        emailLabel: "Email",
        msgLabel: "Message",
        send: "Send message"
      },
      footer: {
        note: "KangaLearner helps learner drivers practise WA road-rule questions with multilingual support.",
        disclaimer:
          "KangaLearner is an independent study tool. Always confirm current requirements with your state transport authority.",
        officialTitle: "Official sources",
        waLearn: "WA — Learn to drive",
        product: "Product",
        navLearn: "Learn",
        navPractice: "Practice",
        navMock: "Mock Test",
        navRules: "Learn",
        navStates: "States",
        company: "Company",
        about: "About",
        contact: "Contact",
        legal: "Legal",
        terms: "Terms",
        privacy: "Privacy",
        newsletterTitle: "Updates",
        newsletterBody: "Get tips, updates and study reminders.",
        studyUpdatesSoon: "Study updates coming soon.",
        waFirstBlurb:
          "KangaLearner helps learner drivers practise WA road-rule questions with multilingual support.",
        subscribe: "Subscribe",
        emailPlaceholder: "email@example.com",
        copyright: "© 2026 KangaLearner. All rights reserved."
      }
    },
    es: {
      aria: {
        readingProgress: "Progreso de lectura",
        mainNav: "Navegación principal",
        langSelector: "Selector de idioma",
        langOptions: "Opciones de idioma",
        stateSelect: "Seleccionar estado o territorio",
        scoreProgress: "Progreso de puntuación",
        practiceBreakdown: "Desglose de práctica",
        previewPractice: "Vista previa de práctica",
        brandHome: "Inicio de KangaLearner",
        subscribeEmail: "Correo electrónico"
      },
      ldOptions: {
        pt: { name: "Portugués", sub: "Solo PT" },
        en: { name: "Inglés", sub: "Solo EN" },
        es: { name: "Español", sub: "Solo ES" },
        pten: { name: "PT + EN", sub: "Bilingüe" },
        esen: { name: "ES + EN", sub: "Bilingüe" }
      },
      nav: {
        home: "Inicio",
        learn: "Aprender",
        practice: "Practicar",
        mockTest: "Simulacro",
        progress: "Progreso",
        roadRules: "Aprender",
        resources: "Recursos"
      },
      confirm: {
        resetProgress: "¿Seguro que deseas borrar tu progreso?"
      },
      brand: {
        logoSub: "Práctica para el examen learner de WA"
      },
      hero: {
        eyebrow: "Práctica para el examen learner de WA",
        title: "Prepárate para el examen learner de WA con confianza.",
        description:
          "Estudia las principales reglas de tránsito de WA, practica las preguntas existentes, haz un simulacro de 30 preguntas y sigue tu progreso en inglés, portugués o español.",
        ctaPractice: "Practicar preguntas de WA",
        ctaMock: "Hacer simulacro de 30 preguntas",
        proof: "WA disponible ahora. Otros estados de Australia próximamente."
      },
      preview: {
        practiceTitle: "Práctica",
        questionProgress: "Pregunta 12 de 30",
        questionDemo:
          "Al girar a la derecha en un cruce, debes ceder el paso a los vehículos que siguen recto.",
        optTrue: "Verdadero",
        optFalse: "Falso",
        optOnlySign: "Solo si la señal lo indica",
        optRoundabout: "Solo en rotondas",
        progressTitle: "Tu progreso",
        legendCorrect: "Correctas",
        legendIncorrect: "Incorrectas",
        legendUnanswered: "Sin responder",
        scoreTitle: "Puntuación",
        scoreAwesome: "¡Buen trabajo!"
      },
      features: {
        byStateTitle: "Enfoque en WA, con más estados después",
        byStateBody:
          "Practica reglas y preguntas de WA ahora; otros estados de Australia llegarán pronto.",
        practiceTitle: "Preguntas de práctica",
        practiceBody: "Preguntas de opción múltiple alineadas con el contenido de WA.",
        mockTitle: "Simulacros",
        mockBody: "Simulacro de 30 preguntas y modo examen sin pistas hasta el final.",
        trackTitle: "Sigue tu progreso",
        trackBody: "Ve tus aciertos por tema y qué repasar después."
      },
      state: {
        banner: "WA está disponible; otros estados llegarán pronto.",
        comingSoon: "Próximamente"
      },
      trust: {
        sectionTitle: "Por qué KangaLearner",
        multiTitle: "Soporte multilingüe",
        multiBody: "Estudia en inglés, portugués y español; más idiomas pronto.",
        saveTitle: "Guardar progreso",
        saveBody: "Tu progreso se guarda automáticamente en el navegador.",
        officialTitle: "Basado en materiales oficiales",
        officialBody:
          "Estructurado a partir de fuentes públicas de WA; confirma siempre con la autoridad de transporte."
      },
      topics: {
        sectionTitle: "Aprende los temas principales",
        speedTitle: "Velocidad",
        speedDesc: "Entiende límites y reglas de velocidad",
        signsTitle: "Señales",
        signsDesc: "Reconoce señales y marcas viales",
        parkingTitle: "Estacionamiento",
        parkingDesc: "Reglas y restricciones de estacionamiento",
        alcoholTitle: "Alcohol/TAC",
        alcoholDesc: "Leyes y sanciones por alcohol al volante",
        lanesTitle: "Carriles y cambio de carril",
        lanesDesc: "Uso de carriles, líneas y ceder el paso",
        safetyTitle: "Seguridad",
        safetyDesc: "Consejos para conducir con seguridad"
      },
      learn: {
        kicker: "Aprende antes de practicar",
        title: "Reglas de tránsito en formato simple",
        sub: "Guías cortas y prácticas basadas en materiales oficiales. Aprende lo esencial, revisa errores comunes y practica el tema enseguida.",
        breadcrumb: "Aprender",
        cardCta: "Estudiar tema →",
        keyRules: "✓ Reglas principales",
        mistakes: "⚠ Errores comunes",
        example: "📋 Ejemplo práctico",
        quickCheck: "❓ Revisión rápida",
        ctaPracticePrefix: "Practicar",
        ctaPracticeSuffix: "preguntas",
        ctaAllTopics: "← Todos los temas"
      },
      mock: {
        kicker: "Simulacro",
        title: "Simulacro",
        sub: "Elige cómo quieres practicar. Ambos modos usan preguntas reales en orden aleatorio.",
        lastAttempt: "Último intento",
        viewResults: "Ver resultados completos",
        practiceTitle: "Modo práctica",
        practiceDesc:
          "Verás la respuesta correcta y la explicación después de cada pregunta. Ideal para aprender mientras practicas.",
        practiceFeat1: "Feedback inmediato por pregunta",
        practiceFeat2: "Explicaciones visibles",
        practiceFeat3: "Sin presión de tiempo",
        practiceBtn: "Iniciar modo práctica",
        examBadge: "Simulación de examen",
        examTitle: "Modo examen",
        examDesc:
          "Sin feedback hasta el final — como en el examen real. Verás tu resultado y puntos débiles al terminar.",
        examFeat1: "Sin pistas durante el examen",
        examFeat2: "Resultados completos al final",
        examFeat3: "Resumen por categoría",
        examBtn: "Iniciar modo examen",
        info: "ℹ️ El simulacro usa 30 preguntas del banco oficial para el estado seleccionado.",
        examTimerLabel: "Tiempo restante (modo examen)",
        examTimerToggle: "Modo examen real (límite 45 minutos)",
        examTimerHint:
          "El simulacro termina automáticamente al acabar el tiempo. Las sin responder cuentan como error.",
        examNeedsQuestions: "El Modo Examen necesita 30 preguntas disponibles de WA.",
        practiceRedirect:
          "El Practice Mock ahora está en la página Practice. Usa este botón para ir allí.",
        practiceGoToPractice: "Ir a Practice Mock",
        resultsTitle: "Resultado del simulacro",
        resultsEmpty: "Aún no hay resultados.",
        resultsEmptyCta: "Hacer un simulacro",
        resultsStatusPass: "Aprobado",
        resultsStatusMid: "Casi",
        resultsStatusLow: "Necesitas mejorar",
        resultsMsgPass: "¡Excelente — vas bien para el examen real!",
        resultsMsgMid: "Buen progreso. Sigue practicando para ganar confianza.",
        resultsMsgLow: "Sigue estudiando — la práctica en tus temas débiles ayuda.",
        resultsElapsed: "Tiempo empleado:",
        resultsCatBreakdown: "Resultado por tema",
        resultsCatPct: "% correcto",
        resultsAgain: "Otro simulacro",
        resultsPractice: "Practicar preguntas",
        resultsRedoMistakes: "Practicar el tema más débil",
        resultsTotalQs: "preguntas"
      },
      practice: {
        kicker: "Práctica",
        page: {
          title: "Practica para el examen learner de WA",
          subtitle:
            "Elige un modo de estudio. Empieza por tema, practica 30 preguntas aleatorias o simula el examen sin feedback hasta el final."
        },
        path: {
          label: "Ruta recomendada:",
          steps: "Practicar preguntas → Simulacro con práctica → Simulación del examen"
        },
        questions: {
          label: "Mejor para aprender",
          title: "Practicar preguntas",
          description: "Practica preguntas de WA por tema con feedback inmediato y explicaciones.",
          cta: "Empezar práctica"
        },
        mock: {
          label: "Mejor para practicar 30 preguntas",
          title: "Simulacro con práctica",
          description:
            "Practica 30 preguntas de WA en orden aleatorio con feedback inmediato. Este modo es para aprender.",
          cta: "Iniciar simulacro con práctica"
        },
        exam: {
          label: "Mejor para prepararte para el examen",
          title: "Simulación del examen",
          description:
            "Responde 30 preguntas de WA sin feedback hasta el final, como una simulación real del examen.",
          cta: "Iniciar simulación del examen"
        },
        cards: {
          questionsTitle: "Practicar preguntas",
          questionsDesc:
            "Practica preguntas de WA por tema con feedback inmediato y explicaciones.",
          questionsBtn: "Empezar práctica",
          mockBadge: "30 preguntas",
          mockTitle: "Simulacro con práctica",
          mockDesc:
            "Haz un simulacro de 30 preguntas con feedback inmediato. Este modo es para aprender, no para simular el examen real.",
          mockBtn: "Iniciar simulacro con práctica",
          mockNeedsQuestions: "El Simulacro con práctica necesita 30 preguntas disponibles de WA.",
          examBadge: "Simulación del examen",
          examTitle: "Simulación del examen",
          examDesc:
            "Responde 30 preguntas de WA sin feedback hasta el final, como una simulación real del examen.",
          examBtn: "Iniciar simulación del examen",
          examNeedsQuestions: "La Simulación del examen necesita 30 preguntas disponibles de WA."
        },
        tip: "¿No sabes por dónde empezar? Empieza con Practicar preguntas, luego haz el Simulacro con práctica antes de la Simulación del examen.",
        progress: {
          title: "Tu progreso",
          description:
            "Sigue tus preguntas respondidas, tasa de acierto, resultados de simulacros y próximo paso recomendado.",
          answered: "Respondidas",
          correct: "Correctas",
          incorrect: "Incorrectas",
          accuracy: "Tasa de acierto",
          bestMock: "Mejor simulacro",
          recommendedNextStep: "Próximo paso recomendado",
          empty:
            "Todavía no hay progreso. Empieza practicando las preguntas de WA para ver tus resultados aquí.",
          viewFull: "Ver progreso completo",
          backToPractice: "Volver a Practicar",
          notAvailable: "Aún no disponible"
        },
        note: "ℹ️ Consejo: la simulación del examen no muestra feedback hasta el final."
      },
      study: {
        modeLabel: "Modo de estudio",
        all: "Todas",
        wrong: "Incorrectas",
        unanswered: "Sin responder",
        saved: "Guardadas",
        mock: "Simulacro (práctica)",
        filterLabel: "Filtrar por tema"
      },
      sim: {
        headerLabel: "Simulacro"
      },
      progress: {
        panelTitle: "Seguimiento del progreso",
        score: "Puntuación",
        accuracy: "Tasa de acierto",
        correct: "Correctas",
        incorrect: "Incorrectas",
        unanswered: "Sin responder",
        reset: "Reiniciar todo",
        nextHead: "Siguiente paso recomendado:",
        nextUnanswered: "Continúa con preguntas sin responder.",
        nextReviewWrong: "Revisa las respuestas incorrectas.",
        nextMock: "Haz un simulacro.",
        nextKeepGoing: "Sigue practicando.",
        pageTitle: "Seguimiento del progreso",
        pageKickerSuffix: " — tu progreso",
        catPerf: "Rendimiento por categoría",
        recommendMore: "Recomendamos practicar más:",
        colCat: "Categoría",
        colAnswered: "Respondidas",
        colCorrect: "Correctas",
        colPct: "% acierto",
        weakHead: "Recomendamos practicar más:",
        emptyHint:
          "Todavía no hay progreso. Empieza practicando las preguntas de WA para ver tus resultados aquí.",
        startPractice: "Empezar a practicar"
      },
      resources: {
        kicker: "Fuentes oficiales",
        title: "Recursos",
        sub: "Enlaces directos a manuales oficiales e información del examen.",
        availableNow: "Disponible ahora",
        officialLinksSoon: "Enlaces oficiales próximamente",
        available: "Disponible ahora",
        comingSoonBadge: "Próximamente",
        comingSoon: "Próximamente",
        officialResourcesComingSoon: "Los recursos oficiales de este estado se agregarán pronto.",
        waOnlyNotice:
          "Los recursos de WA están disponibles ahora. Otros estados estarán disponibles próximamente.",
        linkWaSite: "Sitio oficial (WA)",
        linkWaHandbook: "Manual de reglas de tránsito (WA)",
        linkWaTheory: "Información del examen teórico por computadora (WA)",
        practiseWA: "Practicar preguntas de WA",
        backToLearn: "Volver a Aprender",
        learnerTestInfo: "Información del examen teórico",
        officialSite: "Sitio oficial de la autoridad",
        ctaStudy: "Guías de estudio",
        ctaPractice: "Practicar preguntas"
      },
      glossary: {
        kicker: "Vocabulario de normas",
        title: "Glosario",
        sub: "Términos clave que verás en el test teórico de learner driver en Australia.",
        ctaPractice: "Practicar preguntas",
        ctaLearn: "Ver guías de estudio"
      },
      about: {
        title: "Acerca de KangaLearner",
        body: "KangaLearner es una plataforma de estudio para ayudar a los conductores principiantes a aprobar el examen teórico de normas viales en Australia.",
        ctaPractice: "Empezar práctica",
        ctaContact: "Contáctanos"
      },
      contact: {
        title: "Contacto",
        sub: "¿Encontraste un error en las preguntas? ¿Tienes una sugerencia? Nos encantaría escucharte.",
        nameLabel: "Nombre",
        emailLabel: "Correo",
        msgLabel: "Mensaje",
        send: "Enviar mensaje"
      },
      footer: {
        note: "KangaLearner ayuda a learner drivers a practicar preguntas de reglas de tránsito de WA con soporte multilingüe.",
        disclaimer:
          "KangaLearner es una herramienta de apoyo al estudio. Confirma siempre los requisitos actuales con la autoridad de transporte de tu estado.",
        officialTitle: "Fuentes oficiales",
        waLearn: "WA — Aprender a conducir",
        product: "Producto",
        navLearn: "Aprender",
        navPractice: "Práctica",
        navMock: "Simulacro",
        navRules: "Aprender",
        navStates: "Estados",
        company: "Empresa",
        about: "Sobre",
        contact: "Contacto",
        legal: "Legal",
        terms: "Términos",
        privacy: "Privacidad",
        newsletterTitle: "Novedades",
        newsletterBody: "Recibe consejos, novedades y recordatorios.",
        studyUpdatesSoon: "Novedades de estudio próximamente.",
        waFirstBlurb:
          "KangaLearner ayuda a learner drivers a practicar preguntas de reglas de tránsito de WA con soporte multilingüe.",
        subscribe: "Suscribirse",
        emailPlaceholder: "email@example.com",
        copyright: "© 2026 KangaLearner. Todos los derechos reservados."
      }
    }
  };

  function localePick(localeRoot, key) {
    if (!localeRoot || !key) return null;
    return key.split(".").reduce(function (obj, k) {
      return obj && obj[k] !== undefined ? obj[k] : null;
    }, localeRoot);
  }

  function packLang(lang) {
    if (lang === "pten") return "pt";
    if (lang === "esen") return "es";
    return lang;
  }

  function langSpan(host, code) {
    var direct = host.querySelector(":scope > .l-" + code);
    if (direct) return direct;
    return host.querySelector(".l-" + code);
  }

  function hydrateKangaStaticI18n(lang) {
    var L = window.__KANGA_LOCALES__;
    if (!L || !L.pt || !L.en || !L.es) return;

    document.querySelectorAll("[data-i18n]").forEach(function (host) {
      var key = host.getAttribute("data-i18n");
      var vPt = localePick(L.pt, key);
      var vEn = localePick(L.en, key);
      var vEs = localePick(L.es, key);
      var sPt = langSpan(host, "pt");
      var sEn = langSpan(host, "en");
      var sEs = langSpan(host, "es");
      if (sPt) sPt.textContent = typeof vPt === "string" ? vPt : "";
      if (sEn) sEn.textContent = typeof vEn === "string" ? vEn : "";
      if (sEs) sEs.textContent = typeof vEs === "string" ? vEs : "";
    });

    var pk = L[packLang(lang)] || L.en;

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var pkey = el.getAttribute("data-i18n-placeholder");
      var val = localePick(pk, pkey);
      if (typeof val === "string") el.setAttribute("placeholder", val);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var akey = el.getAttribute("data-i18n-aria");
      var aval = localePick(pk, akey);
      if (typeof aval === "string") el.setAttribute("aria-label", aval);
    });

    document.querySelectorAll(".ld-option[data-lang]").forEach(function (btn) {
      var code = btn.getAttribute("data-lang");
      var LO = pk.ldOptions && pk.ldOptions[code];
      if (!LO) return;
      var nm = btn.querySelector(".ld-oname");
      var sb = btn.querySelector(".ld-osub");
      if (nm) nm.textContent = LO.name || "";
      if (sb) sb.textContent = LO.sub || "";
    });
  }

  window.hydrateKangaStaticI18n = hydrateKangaStaticI18n;

  function tSafe(key, fallback) {
    var L = window.__KANGA_LOCALES__;
    var raw = "en";
    try {
      if (window.KangaStorage && typeof window.KangaStorage.getLang === "function") {
        raw = window.KangaStorage.getLang() || "en";
      } else {
        raw = localStorage.getItem("kl-lang") || "en";
      }
    } catch (e) {
      raw = "en";
    }
    var pk = L && (L[packLang(raw)] || L.en);
    if (pk) {
      var v = localePick(pk, key);
      if (typeof v === "string" && v.length) return v;
    }
    return fallback || "";
  }
  window.tSafe = tSafe;

  document.addEventListener("DOMContentLoaded", function () {
    var initialLang = "en";
    try {
      if (window.KangaStorage && typeof window.KangaStorage.getLang === "function") {
        initialLang = window.KangaStorage.getLang() || initialLang;
      } else {
        initialLang = localStorage.getItem("kl-lang") || initialLang;
      }
    } catch (e) {
      initialLang = "en";
    }
    if (!initialLang) initialLang = "en";
    hydrateKangaStaticI18n(initialLang);
  });
})();
