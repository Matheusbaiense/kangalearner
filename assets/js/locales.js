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
        stateSelect: "Selecionar estado ou Austrália (todos disponíveis)",
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
        practice: "Prática",
        mockTest: "Simulado",
        roadRules: "Regras",
        resources: "Recursos"
      },
      brand: {
        logoSub: "Plataforma para learner drivers"
      },
      hero: {
        eyebrow: "Plataforma australiana para learner drivers",
        title: "Passe na prova teórica com confiança.",
        description:
          "Estude as regras de trânsito da Austrália por estado, pratique perguntas ilimitadas e acompanhe seu progresso em cada etapa.",
        ctaPractice: "Começar prática",
        ctaMock: "Fazer simulado",
        proof:
          "Regras oficiais. Conteúdo atualizado. Feito para learner drivers em toda a Austrália."
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
        byStateTitle: "Estude por estado",
        byStateBody: "Aprenda as regras do seu estado ou território.",
        practiceTitle: "Questões de prática",
        practiceBody: "Perguntas de múltipla escolha atualizadas.",
        mockTitle: "Simulados",
        mockBody: "Simule a prova real e ganhe confiança.",
        trackTitle: "Acompanhe o progresso",
        trackBody: "Foque nos pontos fracos e evolua mais rápido."
      },
      state: {
        banner: "Selecione seu estado e estude as regras certas.",
        comingSoon: "Em breve"
      },
      trust: {
        sectionTitle: "Por que KangaLearner",
        multiTitle: "Suporte multilíngue",
        multiBody: "Estude em inglês, português e espanhol; mais idiomas em breve.",
        saveTitle: "Salvar progresso",
        saveBody: "Seu progresso é salvo automaticamente no navegador.",
        officialTitle: "Baseado em regras oficiais",
        officialBody: "Conteúdo estruturado em regras oficiais e temas da prova."
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
        lanesTitle: "Faixas",
        lanesDesc: "Uso de faixas, linhas e preferências",
        safetyTitle: "Segurança",
        safetyDesc: "Dicas para dirigir com segurança"
      },
      learn: {
        kicker: "Aprenda antes de praticar",
        title: "Regras de trânsito em formato simples.",
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
        practiceDesc: "Veja a resposta correta e a explicação após cada questão. Ótimo para aprender enquanto pratica.",
        practiceFeat1: "Feedback imediato por questão",
        practiceFeat2: "Explicações exibidas",
        practiceFeat3: "Sem pressão de tempo",
        practiceBtn: "Iniciar modo prática",
        examBadge: "Simulação de prova",
        examTitle: "Modo prova",
        examDesc: "Sem feedback até o final — como na prova real. Veja seu resultado e pontos fracos ao terminar.",
        examFeat1: "Sem dicas durante a prova",
        examFeat2: "Resultados completos no final",
        examFeat3: "Resumo por categoria",
        examBtn: "Iniciar modo prova",
        info: "ℹ️ O simulado usa 30 questões sorteadas do banco oficial para o estado selecionado."
      },
      practice: {
        title: "Pratique como se fosse a prova real.",
        sub: "Comece pelas questões de WA. A estrutura já está pronta para receber NSW, VIC, QLD, SA, TAS, ACT e NT."
      },
      study: {
        modeLabel: "Modo de estudo",
        all: "Todas",
        wrong: "Erradas",
        unanswered: "Não respondidas",
        mock: "Simulado",
        filterLabel: "Filtrar por tema"
      },
      sim: {
        headerLabel: "Simulado"
      },
      progress: {
        panelTitle: "Seu progresso",
        score: "Pontuação",
        accuracy: "Precisão",
        correct: "Certas",
        incorrect: "Erradas",
        unanswered: "Não respondidas",
        reset: "Reiniciar tudo"
      },
      resources: {
        kicker: "Fontes oficiais",
        title: "Recursos",
        sub: "Links diretos para manuais oficiais e informações do teste.",
        availableNow: "Disponível agora",
        learnerTestInfo: "Informações do teste teórico",
        officialSite: "Site oficial do órgão",
        ctaStudy: "Guias de estudo",
        ctaPractice: "Praticar questões"
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
        note: "Apoio a learner drivers em toda a Austrália para passar com confiança.",
        disclaimer:
          "O KangaLearner é uma ferramenta de apoio ao estudo. Confirme sempre as regras atuais com o órgão de trânsito do seu estado.",
        officialTitle: "Fontes oficiais (referência)",
        waLearn: "WA — Aprendendo a dirigir",
        product: "Produto",
        navLearn: "Aprender",
        navPractice: "Prática",
        navMock: "Simulado",
        navRules: "Regras",
        navStates: "Estados",
        company: "Empresa",
        about: "Sobre",
        contact: "Contato",
        legal: "Legal",
        terms: "Termos",
        privacy: "Privacidade",
        newsletterTitle: "Fique no caminho certo",
        newsletterBody: "Receba dicas, novidades e lembretes de estudo.",
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
        stateSelect: "Select state or Australia (all available)",
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
        roadRules: "Road Rules",
        resources: "Resources"
      },
      brand: {
        logoSub: "Learner driver platform"
      },
      hero: {
        eyebrow: "Australia’s trusted learner driver platform",
        title: "Pass your learner test with confidence.",
        description:
          "Study Australian road rules by state, practice unlimited questions and track your progress every step of the way.",
        ctaPractice: "Start Practice",
        ctaMock: "Take a Mock Test",
        proof: "Official road rules. Up to date. Trusted by learner drivers Australia-wide."
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
        byStateTitle: "Study by State",
        byStateBody: "Learn the road rules for your state or territory.",
        practiceTitle: "Practice Questions",
        practiceBody: "Up-to-date multiple choice questions.",
        mockTitle: "Mock Tests",
        mockBody: "Simulate the real test and build confidence.",
        trackTitle: "Track Progress",
        trackBody: "Focus on your weak areas and improve faster."
      },
      state: {
        banner: "Select your state and study the rules that apply to you.",
        comingSoon: "Coming soon"
      },
      trust: {
        sectionTitle: "Why KangaLearner",
        multiTitle: "Multilingual Support",
        multiBody: "Study in English, Portuguese and Spanish now; more languages later.",
        saveTitle: "Save Progress",
        saveBody: "Your progress is saved automatically in your browser.",
        officialTitle: "Official Rule Based",
        officialBody: "Content is structured around official road rules and test topics."
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
        title: "Road rules in a simple format.",
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
        practiceDesc: "See the correct answer and explanation after each question. Great for learning as you go.",
        practiceFeat1: "Immediate feedback per question",
        practiceFeat2: "Explanations shown",
        practiceFeat3: "No time pressure",
        practiceBtn: "Start Practice Mock",
        examBadge: "Exam Simulation",
        examTitle: "Exam Mode",
        examDesc: "No feedback until the end — just like the real test. See your result and weak areas when you finish.",
        examFeat1: "No hints during the test",
        examFeat2: "Full results at the end",
        examFeat3: "Category breakdown",
        examBtn: "Start Exam Mode",
        info: "ℹ️ The mock test uses 30 questions drawn from the official question bank for your selected state."
      },
      practice: {
        title: "Practice like the real test.",
        sub: "Start with WA questions. The structure is ready to expand to NSW, VIC, QLD, SA, TAS, ACT and NT."
      },
      study: {
        modeLabel: "Study mode",
        all: "All questions",
        wrong: "Wrong answers",
        unanswered: "Unanswered",
        mock: "Mock test",
        filterLabel: "Filter by topic"
      },
      sim: {
        headerLabel: "Mock test"
      },
      progress: {
        panelTitle: "Your Progress",
        score: "Score",
        accuracy: "Accuracy",
        correct: "Correct",
        incorrect: "Incorrect",
        unanswered: "Unanswered",
        reset: "Reset all"
      },
      resources: {
        kicker: "Official sources",
        title: "Resources",
        sub: "Direct links to official government handbooks and test information.",
        availableNow: "Available now",
        learnerTestInfo: "Learner test information",
        officialSite: "Official authority website",
        ctaStudy: "Study guides",
        ctaPractice: "Practice questions"
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
        note: "Empowering learner drivers Australia-wide to pass with confidence.",
        disclaimer:
          "KangaLearner is a study aid. Always confirm current requirements with your state transport authority.",
        officialTitle: "Official sources",
        waLearn: "WA — Learn to drive",
        product: "Product",
        navLearn: "Learn",
        navPractice: "Practice",
        navMock: "Mock Test",
        navRules: "Road Rules",
        navStates: "States",
        company: "Company",
        about: "About",
        contact: "Contact",
        legal: "Legal",
        terms: "Terms",
        privacy: "Privacy",
        newsletterTitle: "Stay on the right track",
        newsletterBody: "Get tips, updates and study reminders.",
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
        stateSelect: "Seleccionar estado o Australia (todos los disponibles)",
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
        practice: "Práctica",
        mockTest: "Simulacro",
        roadRules: "Normas",
        resources: "Recursos"
      },
      brand: {
        logoSub: "Plataforma para learner drivers"
      },
      hero: {
        eyebrow: "Plataforma australiana para conductores principiantes",
        title: "Aprueba tu examen teórico con confianza.",
        description:
          "Estudia las reglas de tránsito australianas por estado, practica preguntas ilimitadas y sigue tu progreso paso a paso.",
        ctaPractice: "Empezar práctica",
        ctaMock: "Hacer simulacro",
        proof: "Reglas oficiales. Contenido actualizado. Para learner drivers en toda Australia."
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
        byStateTitle: "Estudia por estado",
        byStateBody: "Aprende las reglas de tu estado o territorio.",
        practiceTitle: "Preguntas de práctica",
        practiceBody: "Preguntas de opción múltiple actualizadas.",
        mockTitle: "Simulacros",
        mockBody: "Simula el examen real y gana confianza.",
        trackTitle: "Sigue tu progreso",
        trackBody: "Enfócate en tus puntos débiles y mejora más rápido."
      },
      state: {
        banner: "Selecciona tu estado y estudia las reglas correctas.",
        comingSoon: "Próximamente"
      },
      trust: {
        sectionTitle: "Por qué KangaLearner",
        multiTitle: "Soporte multilingüe",
        multiBody: "Estudia en inglés, portugués y español; más idiomas pronto.",
        saveTitle: "Guardar progreso",
        saveBody: "Tu progreso se guarda automáticamente en el navegador.",
        officialTitle: "Basado en normas oficiales",
        officialBody: "Contenido estructurado en reglas oficiales y temas del examen."
      },
      topics: {
        sectionTitle: "Aprende los temas principales",
        speedTitle: "Velocidad",
        speedDesc: "Entiende límites y reglas de velocidad",
        signsTitle: "Señales",
        signsDesc: "Reconoce señales y marcas viales",
        parkingTitle: "Aparcamiento",
        parkingDesc: "Reglas y restricciones de aparcamiento",
        alcoholTitle: "Alcohol/TAC",
        alcoholDesc: "Leyes y sanciones por alcohol al volante",
        lanesTitle: "Marcas viales",
        lanesDesc: "Uso de carriles, líneas y señales viales",
        safetyTitle: "Seguridad",
        safetyDesc: "Consejos para conducir con seguridad"
      },
      learn: {
        kicker: "Aprende antes de practicar",
        title: "Reglas de tránsito en formato simple.",
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
        practiceDesc: "Verás la respuesta correcta y la explicación después de cada pregunta. Ideal para aprender mientras practicas.",
        practiceFeat1: "Feedback inmediato por pregunta",
        practiceFeat2: "Explicaciones visibles",
        practiceFeat3: "Sin presión de tiempo",
        practiceBtn: "Iniciar modo práctica",
        examBadge: "Simulación de examen",
        examTitle: "Modo examen",
        examDesc: "Sin feedback hasta el final — como en el examen real. Verás tu resultado y puntos débiles al terminar.",
        examFeat1: "Sin pistas durante el examen",
        examFeat2: "Resultados completos al final",
        examFeat3: "Resumen por categoría",
        examBtn: "Iniciar modo examen",
        info: "ℹ️ El simulacro usa 30 preguntas del banco oficial para el estado seleccionado."
      },
      practice: {
        title: "Practica como si fuera el examen real.",
        sub: "Empieza con preguntas de WA. La estructura está lista para expandirse a NSW, VIC, QLD, SA, TAS, ACT y NT."
      },
      study: {
        modeLabel: "Modo de estudio",
        all: "Todas",
        wrong: "Erradas",
        unanswered: "Sin responder",
        mock: "Simulacro",
        filterLabel: "Filtrar por tema"
      },
      sim: {
        headerLabel: "Simulacro"
      },
      progress: {
        panelTitle: "Tu progreso",
        score: "Puntuación",
        accuracy: "Precisión",
        correct: "Correctas",
        incorrect: "Incorrectas",
        unanswered: "Sin responder",
        reset: "Reiniciar todo"
      },
      resources: {
        kicker: "Fuentes oficiales",
        title: "Recursos",
        sub: "Enlaces directos a manuales oficiales e información del examen.",
        availableNow: "Disponible ahora",
        learnerTestInfo: "Información del examen teórico",
        officialSite: "Sitio oficial de la autoridad",
        ctaStudy: "Guías de estudio",
        ctaPractice: "Practicar preguntas"
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
        note: "Apoyo a learner drivers en toda Australia para aprobar con confianza.",
        disclaimer:
          "KangaLearner es una herramienta de apoyo al estudio. Confirma siempre los requisitos actuales con la autoridad de transporte de tu estado.",
        officialTitle: "Fuentes oficiales",
        waLearn: "WA — Aprender a conducir",
        product: "Producto",
        navLearn: "Aprender",
        navPractice: "Práctica",
        navMock: "Simulacro",
        navRules: "Normas",
        navStates: "Estados",
        company: "Empresa",
        about: "Sobre",
        contact: "Contacto",
        legal: "Legal",
        terms: "Términos",
        privacy: "Privacidad",
        newsletterTitle: "Sigue el buen camino",
        newsletterBody: "Recibe consejos, novedades y recordatorios.",
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
