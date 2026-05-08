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
          steps: "Prática por tema → Simulado com prática → Simulação da prova"
        },
        cards: {
          topic: {
            badge: "POR TEMA",
            micro: "Melhor para aprender",
            title: "Prática por tema",
            description: "Pratique perguntas de WA por tema com feedback imediato e explicações.",
            cta: "Começar prática"
          },
          mock: {
            badge: "30 QUESTÕES",
            micro: "Melhor para praticar 30 questões",
            title: "Simulado com prática",
            description:
              "Pratique 30 perguntas de WA em ordem aleatória com feedback imediato. Este modo é para aprender.",
            cta: "Iniciar simulado"
          },
          exam: {
            badge: "ESTILO PROVA",
            micro: "Melhor para se preparar para a prova",
            title: "Simulação da prova",
            description:
              "Responda 30 perguntas de WA sem feedback até o final, como uma simulação real da prova.",
            cta: "Iniciar prova"
          },
          mockNeedsQuestions: "O Simulado com prática precisa de 30 perguntas disponíveis de WA.",
          examNeedsQuestions: "A Simulação da prova precisa de 30 perguntas disponíveis de WA."
        },
        tip: "Não sabe por onde começar? Comece com Prática por tema, depois faça o Simulado com prática antes da Simulação da prova.",
        progress: {
          title: "Seu progresso",
          description:
            "Acompanhe suas perguntas respondidas, taxa de acerto, resultados dos simulados e próximo passo recomendado.",
          answered: "Respondidas",
          accuracy: "Taxa de acerto",
          bestMock: "Melhor simulado",
          examReadiness: "Prontidão para a prova",
          weakestTopic: "Tema mais fraco",
          nextStep: "Próximo passo",
          empty:
            "Ainda não há progresso. Comece praticando as perguntas de WA para ver seus resultados aqui.",
          viewFull: "Ver progresso completo",
          backToPractice: "Voltar para Praticar",
          notAvailable: "Ainda não disponível"
        },
        readiness: {
          title: "Readiness & próximo passo",
          description: "Seu resumo de preparação e a próxima melhor ação para hoje.",
          scoreLabel: "Readiness score",
          nextLabel: "Próximo passo",
          band: {
            foundation: "Construindo sua base",
            keep: "Continue praticando",
            nearly: "Quase pronto",
            ready: "Pronto para a simulação da prova"
          }
        },
        nextstep: {
          startTopic: "Comece por Prática por tema",
          focusTopic: "Faça mais Prática por tema",
          weakTopic: "Reforce seu tema mais fraco",
          tryMock: "Tente o Simulado com prática",
          retryMock: "Faça um novo Simulado com prática",
          tryExam: "Tente a Simulação da prova"
        }
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
        security: "Segurança",
        contactSupport: "Contato",
        newsletterTitle: "Novidades",
        newsletterBody: "Receba dicas, novidades e lembretes de estudo.",
        studyUpdatesSoon: "Novidades de estudo em breve.",
        waFirstBlurb:
          "O KangaLearner ajuda learner drivers a praticarem perguntas de regras de trânsito de WA com suporte multilíngue.",
        subscribe: "Inscrever",
        emailPlaceholder: "email@example.com",
        copyright: "© 2026 KangaLearner. Todos os direitos reservados."
      },
      auth: {
        header: {
          signIn: "Entrar"
        },
        common: {
          or: "ou",
          backToLogin: "Voltar para entrar"
        },
        fields: {
          firstName: "Nome",
          email: "E-mail",
          password: "Senha",
          confirmPassword: "Confirmar senha",
          newPassword: "Nova senha",
          confirmNewPassword: "Confirmar nova senha"
        },
        validation: {
          emailHint: "Use um e-mail válido, como nome@exemplo.com",
          firstRequired: "Informe seu nome.",
          emailRequired: "Informe seu e-mail.",
          emailInvalid: "Informe um e-mail válido.",
          passwordRequired: "Informe sua senha.",
          passwordMin: "A senha deve ter pelo menos 8 caracteres.",
          confirmMismatch: "As senhas não coincidem.",
          termsRequired: "Você precisa aceitar os Termos e a Política de Privacidade."
        },
        login: {
          eyebrow: "Conta",
          title: "Entrar no KangaLearner",
          subtitle:
            "Salve seu progresso, sincronize seu histórico de estudo e continue se preparando para a prova de learner de WA.",
          remember: "Lembrar este dispositivo",
          submit: "Entrar",
          google: "Continuar com Google",
          forgot: "Esqueceu a senha?",
          create: "Criar conta",
          guest: "Continuar como visitante",
          placeholderNotice:
            "A autenticação ainda não está conectada. Esta tela está pronta para integração com Supabase."
        },
        signup: {
          eyebrow: "Conta",
          title: "Criar conta",
          subtitle:
            "Crie uma conta para salvar e sincronizar seu progresso quando o sync estiver disponível.",
          passwordRules: "• mínimo 8 caracteres • uma letra • um número",
          agree: "Eu concordo com os Termos e a Política de Privacidade",
          marketing: "Quero receber dicas de estudo e novidades do produto",
          submit: "Criar conta",
          google: "Continuar com Google",
          haveAccount: "Já tem conta? Entrar",
          guest: "Continuar como visitante",
          placeholderNotice:
            "A criação de conta ainda não está conectada. Esta tela está pronta para integração com Supabase."
        },
        forgot: {
          eyebrow: "Conta",
          title: "Esqueci minha senha",
          subtitle: "Enviaremos um link para redefinir sua senha.",
          submit: "Enviar link de redefinição",
          placeholderNotice: "A redefinição de senha ainda não está conectada."
        },
        reset: {
          eyebrow: "Conta",
          title: "Redefinir senha",
          subtitle: "Defina uma nova senha para sua conta.",
          submit: "Salvar nova senha",
          placeholderNotice: "A redefinição de senha ainda não está conectada."
        },
        verify: {
          eyebrow: "Conta",
          title: "Verifique seu e-mail",
          subtitle: "Enviamos um link de verificação para seu endereço de e-mail.",
          resend: "Reenviar e-mail",
          changeEmail: "Alterar e-mail",
          placeholderNotice: "A verificação de e-mail ainda não está conectada."
        },
        callback: {
          title: "Entrando…",
          subtitle: "Esta página será conectada ao Supabase mais tarde."
        },
        logout: {
          title: "Saindo…",
          subtitle: "O logout será conectado ao Supabase mais tarde.",
          backHome: "Voltar para o início"
        },
        sessionExpired: {
          title: "Sua sessão expirou",
          subtitle: "Entre novamente para continuar sincronizando seu progresso.",
          signInAgain: "Entrar novamente",
          guest: "Continuar como visitante"
        }
      },
      guards: {
        requireSignIn: "Faça login para acessar sua conta.",
        requirePremium: "Este recurso exige Premium (placeholder).",
        requireAdmin: "Acesso de admin necessário (placeholder)."
      },
      account: {
        dashboard: {
          kicker: "Conta",
          title: "Sua conta",
          subtitle:
            "A sincronização da conta está chegando. Por enquanto, seu progresso fica armazenado localmente neste dispositivo.",
          quickActions: "Ações rápidas",
          devMock: "Mock roles (dev)",
          devMockHelp: "Esta seção é só para testes locais de UI/guards. Não é autenticação real.",
          cards: {
            role: "Papel atual",
            localProgress: "Progresso local",
            accountSync: "Sincronização"
          },
          values: {
            localOnly: "Somente neste dispositivo",
            notConnected: "Não conectado"
          },
          cta: {
            practice: "Continuar prática",
            profile: "Configurar perfil",
            privacy: "Configurações de privacidade",
            dataControls: "Controles de dados"
          }
        },
        common: {
          offByDefault: "Desligado por padrão"
        },
        profile: {
          kicker: "Conta",
          title: "Perfil",
          subtitle: "Atualize suas preferências. (Placeholder — não salva em backend.)",
          fields: {
            displayName: "Nome de exibição",
            language: "Idioma preferido",
            state: "Estado"
          },
          save: "Salvar alterações",
          placeholderNotice: "O salvamento do perfil ainda não está conectado."
        },
        settings: {
          kicker: "Conta",
          title: "Configurações",
          subtitle: "Ajuste preferências de estudo e conta (placeholder).",
          sections: {
            study: "Preferências de estudo",
            account: "Conta"
          },
          actions: {
            changeLanguage: "Alterar idioma",
            changeState: "Alterar estado",
            goSecurity: "Ir para segurança",
            goPrivacy: "Ir para privacidade",
            goData: "Ir para controles de dados"
          },
          open: "Abrir"
        },
        security: {
          kicker: "Conta",
          title: "Segurança",
          subtitle: "Controles de segurança serão habilitados quando o sync estiver conectado.",
          placeholder: "Tudo aqui é placeholder nesta fase."
        },
        privacy: {
          kicker: "Conta",
          title: "Privacidade",
          subtitle: "Escolha suas preferências (local-only nesta fase).",
          toggles: {
            analytics: "Analytics (consentimento)",
            marketing: "E-mails de marketing",
            personalisation: "Recomendações personalizadas"
          },
          localOnly: "Somente recomendações locais",
          savedLocal: "Salvo localmente (placeholder)."
        },
        dataControls: {
          kicker: "Conta",
          title: "Controles de dados",
          subtitle: "Exportar/deletar dados locais e solicitar exclusão futura (placeholder).",
          export: "Exportar dados locais",
          deleteLocal: "Apagar progresso local",
          requestDeletion: "Solicitar exclusão de conta",
          contact: "Falar com suporte",
          deleted: "Progresso local apagado.",
          exportPlaceholder: "Export ainda não está conectado."
        },
        notifications: {
          kicker: "Conta",
          title: "Notificações",
          subtitle: "Notificações ainda não estão conectadas.",
          studyReminders: "Lembretes de estudo",
          productUpdates: "Atualizações do produto",
          marketingEmails: "E-mails de marketing",
          securityAlerts: "Alertas de segurança",
          notConnected: "Ainda não conectado"
        }
      },
      premium: {
        kicker: "Premium",
        title: "Premium",
        subtitle: "Planos e benefícios estão chegando (placeholder).",
        currentRole: "Papel atual",
        currentPlan: "Plano atual",
        plan: { free: "Gratuito" },
        next: { title: "Em breve", body: "O upgrade será conectado ao Stripe mais tarde." },
        cta: { viewPricing: "Ver preços", backAccount: "Voltar para conta" }
      },
      pricing: {
        kicker: "Premium",
        title: "Preços",
        subtitle: "Esta página é placeholder. Nenhum pagamento é processado.",
        plans: {
          free: { title: "Free", body: "Acesso básico ao estudo local." },
          plus: {
            title: "Plus (em breve)",
            body: "Recursos premium e sync na nuvem (quando habilitado)."
          }
        },
        cta: { upgrade: "Simular upgrade", cancel: "Cancelar" },
        notice: { noStripe: "Stripe ainda não está conectado. Este é um fluxo simulado." },
        success: {
          title: "Upgrade concluído (simulado)",
          subtitle: "Pronto para integrar Stripe/Supabase depois.",
          backPremium: "Voltar"
        },
        cancelled: {
          title: "Upgrade cancelado (simulado)",
          subtitle: "Nada foi cobrado.",
          backPricing: "Voltar para preços"
        }
      },
      billing: {
        kicker: "Premium",
        title: "Cobrança",
        subtitle: "Cobrança não está conectada (sem Stripe).",
        currentPlan: "Plano atual",
        history: "Histórico de cobrança",
        notAvailable: "Ainda não disponível"
      },
      admin: {
        kicker: "Admin",
        header: { link: "Admin" },
        dashboard: { title: "Admin dashboard", subtitle: "Apenas UI/placeholder nesta fase." },
        links: {
          users: "Usuários",
          usersHelp: "Gerenciar usuários (placeholder).",
          reports: "Relatórios",
          reportsHelp: "Visualizar relatórios (placeholder).",
          content: "Conteúdo",
          contentHelp: "Gerenciar conteúdo (placeholder).",
          support: "Suporte",
          supportHelp: "Fila de suporte (placeholder).",
          dataRequests: "Solicitações de dados",
          dataRequestsHelp: "Privacidade e solicitações (placeholder).",
          auditLog: "Audit log",
          auditLogHelp: "Eventos e auditoria (placeholder)."
        },
        users: {
          title: "Admin — usuários",
          subtitle: "Placeholder",
          placeholderTitle: "Em construção",
          placeholderBody: "Esta tela será conectada ao Supabase mais tarde."
        },
        reports: {
          title: "Admin — relatórios",
          subtitle: "Placeholder",
          placeholderTitle: "Em construção",
          placeholderBody: "Esta tela será conectada ao Supabase mais tarde."
        },
        content: {
          title: "Admin — conteúdo",
          subtitle: "Placeholder",
          placeholderTitle: "Em construção",
          placeholderBody: "Esta tela será conectada ao Supabase mais tarde."
        },
        support: {
          title: "Admin — suporte",
          subtitle: "Placeholder",
          placeholderTitle: "Em construção",
          placeholderBody: "Esta tela será conectada ao Supabase mais tarde."
        },
        dataRequests: {
          title: "Admin — solicitações de dados",
          subtitle: "Placeholder",
          placeholderTitle: "Em construção",
          placeholderBody: "Esta tela será conectada ao Supabase mais tarde."
        },
        auditLog: {
          title: "Admin — audit log",
          subtitle: "Placeholder",
          placeholderTitle: "Em construção",
          placeholderBody: "Esta tela será conectada ao Supabase mais tarde."
        }
      },
      legal: {
        kicker: "Legal",
        privacy: {
          title: "Política de Privacidade",
          sections: {
            overview: "Visão geral",
            collect: "O que coletamos",
            localProgress: "Dados de progresso local",
            accountFuture: "Dados de conta (quando habilitado)",
            analytics: "Analytics e cookies",
            use: "Como usamos as informações",
            security: "Como protegemos as informações",
            access: "Acesso e correção",
            deletion: "Solicitações de exclusão",
            contact: "Contato"
          },
          body: {
            overview:
              "Esta é uma política placeholder para readiness. O texto final deve ser revisado antes do lançamento.",
            collect:
              "Atualmente, o KangaLearner não exige conta e não coleta dados sensíveis via backend.",
            localProgress:
              "Por enquanto, o KangaLearner armazena o progresso de estudo localmente no seu dispositivo.",
            accountFuture:
              "Quando contas forem habilitadas no futuro, dados de conta poderão ser armazenados para sync.",
            analytics:
              "Consentimentos de analytics/marketing são controles visuais nesta fase (sem envio a backend).",
            use: "Usamos informações para melhorar a experiência de estudo e a qualidade do produto.",
            security:
              "Planejamos práticas de segurança e controles de acesso quando o sync estiver conectado.",
            access:
              "Você poderá solicitar acesso/correção de dados quando contas estiverem disponíveis.",
            deletion:
              "Você pode apagar o progresso local e solicitar exclusão futura quando houver contas.",
            contact: "Para dúvidas, use a página de contato de suporte."
          }
        },
        terms: {
          title: "Termos",
          sections: {
            independent: "Ferramenta independente",
            notOfficial: "Não oficial",
            noGuarantee: "Sem garantia de aprovação",
            acceptableUse: "Uso aceitável",
            limitations: "Limitações",
            changes: "Alterações"
          },
          body: {
            independent: "O KangaLearner é uma ferramenta de estudo independente.",
            notOfficial:
              "Não somos afiliados ao Department of Transport WA ou a qualquer autoridade governamental australiana.",
            noGuarantee: "O uso do KangaLearner não garante aprovação em nenhum teste.",
            acceptableUse: "Use o produto de forma responsável e legal.",
            limitations: "O conteúdo pode conter erros e deve ser conferido em fontes oficiais.",
            changes: "Podemos atualizar estes termos no futuro."
          }
        },
        security: {
          title: "Política de Segurança",
          sections: {
            account: "Segurança de conta",
            passwords: "Senhas",
            disclosure: "Responsible disclosure",
            breach: "Incidentes"
          },
          body: {
            account:
              "Controles de segurança serão ativados quando o sync de conta estiver conectado.",
            passwords: "Use senhas fortes e evite reutilização.",
            disclosure: "Canal de disclosure será adicionado futuramente.",
            breach: "Processo de incident response será documentado futuramente."
          }
        },
        dataDeletion: {
          title: "Exclusão de dados",
          sections: { local: "Progresso local", future: "Exclusão de conta", contact: "Contato" },
          body: {
            local: "Você pode apagar seu progresso local em Controles de dados.",
            future:
              "Quando contas forem habilitadas, haverá um fluxo para solicitar exclusão de conta.",
            contact: "Se precisar de ajuda, contate o suporte."
          }
        },
        notOfficial: {
          title: "Não oficial",
          body: "KangaLearner é uma ferramenta independente e não é afiliada ao Department of Transport WA ou a qualquer autoridade governamental australiana."
        }
      },
      support: {
        kicker: "Suporte",
        title: "Contato de suporte",
        fields: {
          name: "Nome",
          email: "E-mail",
          topic: "Tema",
          message: "Mensagem"
        },
        submit: "Enviar",
        placeholderNotice: "O formulário de suporte ainda não está conectado."
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
          steps: "Topic Practice → Practice Mock → Exam Simulation"
        },
        cards: {
          topic: {
            badge: "BY TOPIC",
            micro: "Best for learning",
            title: "Topic Practice",
            description:
              "Practise WA learner questions by topic with instant feedback and explanations.",
            cta: "Start practice"
          },
          mock: {
            badge: "30 QUESTIONS",
            micro: "Best for 30-question practice",
            title: "Practice Mock",
            description:
              "Practise 30 WA questions in random order with instant feedback. This mode is for learning.",
            cta: "Start mock"
          },
          exam: {
            badge: "EXAM STYLE",
            micro: "Best for exam readiness",
            title: "Exam Simulation",
            description:
              "Answer 30 WA questions without feedback until the end, just like a real test simulation.",
            cta: "Start exam"
          },
          mockNeedsQuestions: "Practice Mock needs 30 available WA questions.",
          examNeedsQuestions: "Exam Simulation needs 30 available WA questions."
        },
        tip: "Not sure where to start? Begin with Topic Practice, then try Practice Mock before Exam Simulation.",
        progress: {
          title: "Your Progress",
          description:
            "Track your answered questions, accuracy, mock results and recommended next step.",
          answered: "Answered",
          accuracy: "Accuracy",
          bestMock: "Best mock score",
          examReadiness: "Exam readiness",
          weakestTopic: "Weakest topic",
          nextStep: "Next step",
          empty: "No progress yet. Start practising WA questions to see your results here.",
          viewFull: "View full progress",
          backToPractice: "Back to Practice",
          notAvailable: "Not available yet"
        },
        readiness: {
          title: "Readiness & Next step",
          description: "Your readiness summary and the smartest next move for today.",
          scoreLabel: "Readiness score",
          nextLabel: "Next step",
          band: {
            foundation: "Building your foundation",
            keep: "Keep practising",
            nearly: "Nearly ready",
            ready: "Ready for exam simulation"
          }
        },
        nextstep: {
          startTopic: "Start with Topic Practice",
          focusTopic: "Do more Topic Practice",
          weakTopic: "Focus on your weakest topic",
          tryMock: "Try Practice Mock",
          retryMock: "Take another Practice Mock",
          tryExam: "Try Exam Simulation"
        }
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
        security: "Security",
        contactSupport: "Contact",
        newsletterTitle: "Updates",
        newsletterBody: "Get tips, updates and study reminders.",
        studyUpdatesSoon: "Study updates coming soon.",
        waFirstBlurb:
          "KangaLearner helps learner drivers practise WA road-rule questions with multilingual support.",
        subscribe: "Subscribe",
        emailPlaceholder: "email@example.com",
        copyright: "© 2026 KangaLearner. All rights reserved."
      },
      auth: {
        header: { signIn: "Sign in" },
        common: { or: "or", backToLogin: "Back to login" },
        fields: {
          firstName: "First name",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm password",
          newPassword: "New password",
          confirmNewPassword: "Confirm new password"
        },
        validation: {
          emailHint: "Use a valid email like name@example.com",
          firstRequired: "First name is required.",
          emailRequired: "Email is required.",
          emailInvalid: "Enter a valid email.",
          passwordRequired: "Password is required.",
          passwordMin: "Password must be at least 8 characters.",
          confirmMismatch: "Passwords do not match.",
          termsRequired: "You must agree to the Terms and Privacy Policy."
        },
        login: {
          eyebrow: "Account",
          title: "Sign in to KangaLearner",
          subtitle:
            "Save your progress, sync your study history and continue preparing for your WA learner test.",
          remember: "Remember this device",
          submit: "Sign in",
          google: "Continue with Google",
          forgot: "Forgot password?",
          create: "Create an account",
          guest: "Continue as guest",
          placeholderNotice:
            "Authentication is not connected yet. This screen is ready for Supabase integration."
        },
        signup: {
          eyebrow: "Account",
          title: "Create your account",
          subtitle: "Create an account to sync your progress when account sync is enabled.",
          passwordRules: "• at least 8 characters • one letter • one number",
          agree: "I agree to the Terms and Privacy Policy",
          marketing: "Send me study tips and product updates",
          submit: "Create account",
          google: "Continue with Google",
          haveAccount: "Already have an account? Sign in",
          guest: "Continue as guest",
          placeholderNotice:
            "Account creation is not connected yet. This screen is ready for Supabase integration."
        },
        forgot: {
          eyebrow: "Account",
          title: "Forgot your password?",
          subtitle: "We'll email you a reset link.",
          submit: "Send reset link",
          placeholderNotice: "Password reset is not connected yet."
        },
        reset: {
          eyebrow: "Account",
          title: "Reset password",
          subtitle: "Set a new password for your account.",
          submit: "Save new password",
          placeholderNotice: "Password reset is not connected yet."
        },
        verify: {
          eyebrow: "Account",
          title: "Check your email",
          subtitle: "We sent a verification link to your email address.",
          resend: "Resend email",
          changeEmail: "Change email",
          placeholderNotice: "Email verification is not connected yet."
        },
        callback: {
          title: "Signing you in…",
          subtitle: "This page will connect to Supabase later."
        },
        logout: {
          title: "Signing you out…",
          subtitle: "Logout will connect to Supabase later.",
          backHome: "Back to home"
        },
        sessionExpired: {
          title: "Your session expired",
          subtitle: "Please sign in again to continue syncing your progress.",
          signInAgain: "Sign in again",
          guest: "Continue as guest"
        }
      },
      guards: {
        requireSignIn: "Please sign in to access your account.",
        requirePremium: "This requires Premium (placeholder).",
        requireAdmin: "Admin access required (placeholder)."
      },
      account: {
        dashboard: {
          kicker: "Account",
          title: "Your account",
          subtitle:
            "Account sync is coming soon. For now, your progress is stored locally on this device.",
          quickActions: "Quick actions",
          devMock: "Mock roles (dev)",
          devMockHelp: "Local UI/guard testing only. Not real authentication.",
          cards: {
            role: "Current role",
            localProgress: "Local progress",
            accountSync: "Account sync"
          },
          values: { localOnly: "Local only", notConnected: "Not connected" },
          cta: {
            practice: "Continue practice",
            profile: "Profile settings",
            privacy: "Privacy settings",
            dataControls: "Data controls"
          }
        },
        common: { offByDefault: "Off by default" },
        profile: {
          kicker: "Account",
          title: "Profile",
          subtitle: "Update your preferences. (Placeholder — not connected.)",
          fields: { displayName: "Display name", language: "Preferred language", state: "State" },
          save: "Save changes",
          placeholderNotice: "Profile saving is not connected yet."
        },
        settings: {
          kicker: "Account",
          title: "Settings",
          subtitle: "Study preferences and account shortcuts (placeholder).",
          sections: { study: "Study preferences", account: "Account" },
          actions: {
            changeLanguage: "Change language",
            changeState: "Change state",
            goSecurity: "Go to security",
            goPrivacy: "Go to privacy settings",
            goData: "Go to data controls"
          },
          open: "Open"
        },
        security: {
          kicker: "Account",
          title: "Security",
          subtitle: "Security controls will be enabled when account sync is connected.",
          placeholder: "Everything here is placeholder in this phase."
        },
        privacy: {
          kicker: "Account",
          title: "Privacy settings",
          subtitle: "Choose your preferences (local-only in this phase).",
          toggles: {
            analytics: "Analytics consent",
            marketing: "Marketing emails",
            personalisation: "Personalised study recommendations"
          },
          localOnly: "Local-only recommendations",
          savedLocal: "Saved locally (placeholder)."
        },
        dataControls: {
          kicker: "Account",
          title: "Data controls",
          subtitle: "Export/delete local progress and request deletion (placeholder).",
          export: "Export local data",
          deleteLocal: "Delete local progress",
          requestDeletion: "Request account deletion",
          contact: "Contact support",
          deleted: "Local progress deleted.",
          exportPlaceholder: "Export is not connected yet."
        },
        notifications: {
          kicker: "Account",
          title: "Notifications",
          subtitle: "Notifications are not connected yet.",
          studyReminders: "Study reminders",
          productUpdates: "Product updates",
          marketingEmails: "Marketing emails",
          securityAlerts: "Security alerts",
          notConnected: "Not connected yet"
        }
      },
      premium: {
        kicker: "Premium",
        title: "Premium",
        subtitle: "Plans and benefits are coming soon (placeholder).",
        currentRole: "Current role",
        currentPlan: "Current plan",
        plan: { free: "Free plan" },
        next: { title: "Coming soon", body: "Upgrades will connect to Stripe later." },
        cta: { viewPricing: "View pricing", backAccount: "Back to account" }
      },
      pricing: {
        kicker: "Premium",
        title: "Pricing",
        subtitle: "Placeholder only. No payments are processed.",
        plans: {
          free: { title: "Free", body: "Basic access with local-only progress." },
          plus: {
            title: "Plus (coming soon)",
            body: "Premium features and cloud sync (when enabled)."
          }
        },
        cta: { upgrade: "Simulate upgrade", cancel: "Cancel" },
        notice: { noStripe: "Stripe is not connected yet. This is a simulated flow." },
        success: {
          title: "Upgrade successful (simulated)",
          subtitle: "Ready to wire Stripe/Supabase later.",
          backPremium: "Back"
        },
        cancelled: {
          title: "Upgrade cancelled (simulated)",
          subtitle: "Nothing was charged.",
          backPricing: "Back to pricing"
        }
      },
      billing: {
        kicker: "Premium",
        title: "Billing",
        subtitle: "Billing is not connected (no Stripe).",
        currentPlan: "Current plan",
        history: "Billing history",
        notAvailable: "Not available yet"
      },
      admin: {
        kicker: "Admin",
        header: { link: "Admin" },
        dashboard: { title: "Admin dashboard", subtitle: "UI placeholder only in this phase." },
        links: {
          users: "Users",
          usersHelp: "Manage users (placeholder).",
          reports: "Reports",
          reportsHelp: "View reports (placeholder).",
          content: "Content",
          contentHelp: "Manage content (placeholder).",
          support: "Support",
          supportHelp: "Support queue (placeholder).",
          dataRequests: "Data requests",
          dataRequestsHelp: "Privacy requests (placeholder).",
          auditLog: "Audit log",
          auditLogHelp: "Events and auditing (placeholder)."
        },
        users: {
          title: "Admin — users",
          subtitle: "Placeholder",
          placeholderTitle: "Work in progress",
          placeholderBody: "This screen will connect to Supabase later."
        },
        reports: {
          title: "Admin — reports",
          subtitle: "Placeholder",
          placeholderTitle: "Work in progress",
          placeholderBody: "This screen will connect to Supabase later."
        },
        content: {
          title: "Admin — content",
          subtitle: "Placeholder",
          placeholderTitle: "Work in progress",
          placeholderBody: "This screen will connect to Supabase later."
        },
        support: {
          title: "Admin — support",
          subtitle: "Placeholder",
          placeholderTitle: "Work in progress",
          placeholderBody: "This screen will connect to Supabase later."
        },
        dataRequests: {
          title: "Admin — data requests",
          subtitle: "Placeholder",
          placeholderTitle: "Work in progress",
          placeholderBody: "This screen will connect to Supabase later."
        },
        auditLog: {
          title: "Admin — audit log",
          subtitle: "Placeholder",
          placeholderTitle: "Work in progress",
          placeholderBody: "This screen will connect to Supabase later."
        }
      },
      legal: {
        kicker: "Legal",
        privacy: {
          title: "Privacy Policy",
          sections: {
            overview: "Overview",
            collect: "What information we collect",
            localProgress: "Local progress data",
            accountFuture: "Account data (when enabled)",
            analytics: "Analytics and cookies",
            use: "How we use information",
            security: "How we protect information",
            access: "Access and correction",
            deletion: "Deletion requests",
            contact: "Contact"
          },
          body: {
            overview: "This is a placeholder policy for readiness. Final text should be reviewed.",
            collect:
              "Right now, KangaLearner does not require an account and does not collect sensitive data via backend.",
            localProgress:
              "For now, KangaLearner stores study progress locally on your device unless account sync is enabled in the future.",
            accountFuture: "When accounts are enabled, account data may be stored to support sync.",
            analytics: "Analytics/marketing consents are UI-only in this phase (no backend).",
            use: "We use information to improve the study experience and product quality.",
            security:
              "We plan to add security controls and access policies when sync is connected.",
            access: "You will be able to request access/corrections when accounts are available.",
            deletion: "You can delete local progress and request deletion once accounts exist.",
            contact: "For questions, use the support contact page."
          }
        },
        terms: {
          title: "Terms",
          sections: {
            independent: "Independent study tool",
            notOfficial: "Not official",
            noGuarantee: "No guaranteed pass",
            acceptableUse: "Acceptable use",
            limitations: "Limitations",
            changes: "Changes"
          },
          body: {
            independent: "KangaLearner is an independent study tool.",
            notOfficial:
              "Not affiliated with the Department of Transport WA or any Australian government authority.",
            noGuarantee: "Using KangaLearner does not guarantee a pass.",
            acceptableUse: "Use the product responsibly and legally.",
            limitations: "Content may contain errors — always confirm with official sources.",
            changes: "We may update these terms in the future."
          }
        },
        security: {
          title: "Security Policy",
          sections: {
            account: "Account security",
            passwords: "Password safety",
            disclosure: "Responsible disclosure",
            breach: "Incidents"
          },
          body: {
            account: "Security controls will be enabled when account sync is connected.",
            passwords: "Use strong passwords and avoid reuse.",
            disclosure: "Responsible disclosure process will be added later.",
            breach: "Incident response and breach process will be documented later."
          }
        },
        dataDeletion: {
          title: "Data deletion",
          sections: {
            local: "Delete local progress",
            future: "Future account deletion",
            contact: "Contact support"
          },
          body: {
            local: "You can delete local progress in Data controls.",
            future: "When accounts are enabled, there will be an account deletion request flow.",
            contact: "If you need help, contact support."
          }
        },
        notOfficial: {
          title: "Not official",
          body: "KangaLearner is an independent study tool and is not affiliated with the Department of Transport WA or any Australian government authority."
        }
      },
      support: {
        kicker: "Support",
        title: "Contact support",
        fields: { name: "Name", email: "Email", topic: "Topic", message: "Message" },
        submit: "Send",
        placeholderNotice: "Support form is not connected yet."
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
          steps: "Práctica por tema → Simulacro con práctica → Simulación del examen"
        },
        cards: {
          topic: {
            badge: "POR TEMA",
            micro: "Mejor para aprender",
            title: "Práctica por tema",
            description:
              "Practica preguntas de WA por tema con feedback inmediato y explicaciones.",
            cta: "Empezar práctica"
          },
          mock: {
            badge: "30 PREGUNTAS",
            micro: "Mejor para practicar 30 preguntas",
            title: "Simulacro con práctica",
            description:
              "Practica 30 preguntas de WA en orden aleatorio con feedback inmediato. Este modo es para aprender.",
            cta: "Iniciar simulacro"
          },
          exam: {
            badge: "ESTILO EXAMEN",
            micro: "Mejor para prepararte para el examen",
            title: "Simulación del examen",
            description:
              "Responde 30 preguntas de WA sin feedback hasta el final, como una simulación real del examen.",
            cta: "Iniciar examen"
          },
          mockNeedsQuestions: "El Simulacro con práctica necesita 30 preguntas disponibles de WA.",
          examNeedsQuestions: "La Simulación del examen necesita 30 preguntas disponibles de WA."
        },
        tip: "¿No sabes por dónde empezar? Empieza con Práctica por tema, luego haz el Simulacro con práctica antes de la Simulación del examen.",
        progress: {
          title: "Tu progreso",
          description:
            "Sigue tus preguntas respondidas, tasa de acierto, resultados de simulacros y próximo paso recomendado.",
          answered: "Respondidas",
          accuracy: "Tasa de acierto",
          bestMock: "Mejor simulacro",
          examReadiness: "Preparación para el examen",
          weakestTopic: "Tema más débil",
          nextStep: "Próximo paso",
          empty:
            "Todavía no hay progreso. Empieza practicando las preguntas de WA para ver tus resultados aquí.",
          viewFull: "Ver progreso completo",
          backToPractice: "Volver a Practicar",
          notAvailable: "Aún no disponible"
        },
        readiness: {
          title: "Readiness & próximo paso",
          description: "Tu resumen de preparación y el mejor próximo paso para hoy.",
          scoreLabel: "Readiness score",
          nextLabel: "Próximo paso",
          band: {
            foundation: "Construyendo tu base",
            keep: "Sigue practicando",
            nearly: "Casi listo",
            ready: "Listo para la simulación del examen"
          }
        },
        nextstep: {
          startTopic: "Empieza con Práctica por tema",
          focusTopic: "Haz más Práctica por tema",
          weakTopic: "Refuerza tu tema más débil",
          tryMock: "Prueba el Simulacro con práctica",
          retryMock: "Haz otro Simulacro con práctica",
          tryExam: "Prueba la Simulación del examen"
        }
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
        security: "Seguridad",
        contactSupport: "Contacto",
        newsletterTitle: "Novedades",
        newsletterBody: "Recibe consejos, novedades y recordatorios.",
        studyUpdatesSoon: "Novedades de estudio próximamente.",
        waFirstBlurb:
          "KangaLearner ayuda a learner drivers a practicar preguntas de reglas de tránsito de WA con soporte multilingüe.",
        subscribe: "Suscribirse",
        emailPlaceholder: "email@example.com",
        copyright: "© 2026 KangaLearner. Todos los derechos reservados."
      },
      auth: {
        header: { signIn: "Iniciar sesión" },
        common: { or: "o", backToLogin: "Volver al inicio de sesión" },
        fields: {
          firstName: "Nombre",
          email: "Correo electrónico",
          password: "Contraseña",
          confirmPassword: "Confirmar contraseña",
          newPassword: "Nueva contraseña",
          confirmNewPassword: "Confirmar nueva contraseña"
        },
        validation: {
          emailHint: "Usa un correo válido como nombre@ejemplo.com",
          firstRequired: "El nombre es obligatorio.",
          emailRequired: "El correo es obligatorio.",
          emailInvalid: "Introduce un correo válido.",
          passwordRequired: "La contraseña es obligatoria.",
          passwordMin: "La contraseña debe tener al menos 8 caracteres.",
          confirmMismatch: "Las contraseñas no coinciden.",
          termsRequired: "Debes aceptar los Términos y la Política de Privacidad."
        },
        login: {
          eyebrow: "Cuenta",
          title: "Iniciar sesión en KangaLearner",
          subtitle:
            "Guarda tu progreso, sincroniza tu historial de estudio y sigue preparándote para el examen learner de WA.",
          remember: "Recordar este dispositivo",
          submit: "Iniciar sesión",
          google: "Continuar con Google",
          forgot: "¿Olvidaste tu contraseña?",
          create: "Crear cuenta",
          guest: "Continuar como visitante",
          placeholderNotice:
            "La autenticación aún no está conectada. Esta pantalla está lista para integrarse con Supabase."
        },
        signup: {
          eyebrow: "Cuenta",
          title: "Crear cuenta",
          subtitle: "Crea una cuenta para sincronizar tu progreso cuando el sync esté habilitado.",
          passwordRules: "• al menos 8 caracteres • una letra • un número",
          agree: "Acepto los Términos y la Política de Privacidad",
          marketing: "Envíame consejos de estudio y novedades del producto",
          submit: "Crear cuenta",
          google: "Continuar con Google",
          haveAccount: "¿Ya tienes cuenta? Iniciar sesión",
          guest: "Continuar como visitante",
          placeholderNotice:
            "La creación de cuenta aún no está conectada. Esta pantalla está lista para integrarse con Supabase."
        },
        forgot: {
          eyebrow: "Cuenta",
          title: "Recuperar contraseña",
          subtitle: "Te enviaremos un enlace para restablecer tu contraseña.",
          submit: "Enviar enlace de restablecimiento",
          placeholderNotice: "El restablecimiento de contraseña aún no está conectado."
        },
        reset: {
          eyebrow: "Cuenta",
          title: "Restablecer contraseña",
          subtitle: "Elige una nueva contraseña.",
          submit: "Guardar nueva contraseña",
          placeholderNotice: "El restablecimiento de contraseña aún no está conectado."
        },
        verify: {
          eyebrow: "Cuenta",
          title: "Revisa tu correo",
          subtitle: "Te enviamos un enlace de verificación a tu correo.",
          resend: "Reenviar correo",
          changeEmail: "Cambiar correo",
          placeholderNotice: "La verificación de correo aún no está conectada."
        },
        callback: {
          title: "Iniciando sesión…",
          subtitle: "Esta página se conectará a Supabase más adelante."
        },
        logout: {
          title: "Cerrando sesión…",
          subtitle: "El logout se conectará a Supabase más adelante.",
          backHome: "Volver al inicio"
        },
        sessionExpired: {
          title: "Tu sesión expiró",
          subtitle: "Inicia sesión de nuevo para seguir sincronizando tu progreso.",
          signInAgain: "Iniciar sesión de nuevo",
          guest: "Continuar como visitante"
        }
      },
      guards: {
        requireSignIn: "Inicia sesión para acceder a tu cuenta.",
        requirePremium: "Esto requiere Premium (placeholder).",
        requireAdmin: "Se requiere acceso de admin (placeholder)."
      },
      account: {
        dashboard: {
          kicker: "Cuenta",
          title: "Tu cuenta",
          subtitle:
            "La sincronización de cuenta llegará pronto. Por ahora, tu progreso se guarda localmente en este dispositivo.",
          quickActions: "Acciones rápidas",
          devMock: "Mock roles (dev)",
          devMockHelp: "Solo para pruebas locales de UI/guards. No es autenticación real.",
          cards: {
            role: "Rol actual",
            localProgress: "Progreso local",
            accountSync: "Sincronización"
          },
          values: { localOnly: "Solo local", notConnected: "No conectado" },
          cta: {
            practice: "Continuar práctica",
            profile: "Ajustes de perfil",
            privacy: "Ajustes de privacidad",
            dataControls: "Controles de datos"
          }
        },
        common: { offByDefault: "Desactivado por defecto" },
        profile: {
          kicker: "Cuenta",
          title: "Perfil",
          subtitle: "Actualiza tus preferencias. (Placeholder — no conectado.)",
          fields: { displayName: "Nombre visible", language: "Idioma preferido", state: "Estado" },
          save: "Guardar cambios",
          placeholderNotice: "El guardado de perfil aún no está conectado."
        },
        settings: {
          kicker: "Cuenta",
          title: "Configuración",
          subtitle: "Preferencias y accesos (placeholder).",
          sections: { study: "Preferencias de estudio", account: "Cuenta" },
          actions: {
            changeLanguage: "Cambiar idioma",
            changeState: "Cambiar estado",
            goSecurity: "Ir a seguridad",
            goPrivacy: "Ir a privacidad",
            goData: "Ir a controles de datos"
          },
          open: "Abrir"
        },
        security: {
          kicker: "Cuenta",
          title: "Seguridad",
          subtitle: "Los controles se habilitarán cuando el sync esté conectado.",
          placeholder: "Todo aquí es placeholder en esta fase."
        },
        privacy: {
          kicker: "Cuenta",
          title: "Privacidad",
          subtitle: "Elige tus preferencias (solo local en esta fase).",
          toggles: {
            analytics: "Consentimiento de analytics",
            marketing: "Correos de marketing",
            personalisation: "Recomendaciones personalizadas"
          },
          localOnly: "Recomendaciones solo locales",
          savedLocal: "Guardado localmente (placeholder)."
        },
        dataControls: {
          kicker: "Cuenta",
          title: "Controles de datos",
          subtitle: "Exportar/borrar progreso local y solicitar eliminación (placeholder).",
          export: "Exportar datos locales",
          deleteLocal: "Borrar progreso local",
          requestDeletion: "Solicitar eliminación de cuenta",
          contact: "Contactar soporte",
          deleted: "Progreso local eliminado.",
          exportPlaceholder: "La exportación aún no está conectada."
        },
        notifications: {
          kicker: "Cuenta",
          title: "Notificaciones",
          subtitle: "Las notificaciones aún no están conectadas.",
          studyReminders: "Recordatorios de estudio",
          productUpdates: "Actualizaciones del producto",
          marketingEmails: "Correos de marketing",
          securityAlerts: "Alertas de seguridad",
          notConnected: "Aún no conectado"
        }
      },
      premium: {
        kicker: "Premium",
        title: "Premium",
        subtitle: "Planes y beneficios próximamente (placeholder).",
        currentRole: "Rol actual",
        currentPlan: "Plan actual",
        plan: { free: "Gratis" },
        next: { title: "Próximamente", body: "Las mejoras se conectarán a Stripe más adelante." },
        cta: { viewPricing: "Ver precios", backAccount: "Volver a la cuenta" }
      },
      pricing: {
        kicker: "Premium",
        title: "Precios",
        subtitle: "Solo placeholder. No se procesan pagos.",
        plans: {
          free: { title: "Free", body: "Acceso básico con progreso solo local." },
          plus: {
            title: "Plus (próximamente)",
            body: "Funciones premium y sync en la nube (cuando esté habilitado)."
          }
        },
        cta: { upgrade: "Simular upgrade", cancel: "Cancelar" },
        notice: { noStripe: "Stripe aún no está conectado. Este flujo es simulado." },
        success: {
          title: "Upgrade exitoso (simulado)",
          subtitle: "Listo para integrar Stripe/Supabase luego.",
          backPremium: "Volver"
        },
        cancelled: {
          title: "Upgrade cancelado (simulado)",
          subtitle: "No se cobró nada.",
          backPricing: "Volver a precios"
        }
      },
      billing: {
        kicker: "Premium",
        title: "Facturación",
        subtitle: "La facturación no está conectada (sin Stripe).",
        currentPlan: "Plan actual",
        history: "Historial de facturación",
        notAvailable: "Aún no disponible"
      },
      admin: {
        kicker: "Admin",
        header: { link: "Admin" },
        dashboard: { title: "Panel admin", subtitle: "Solo UI/placeholder en esta fase." },
        links: {
          users: "Usuarios",
          usersHelp: "Gestionar usuarios (placeholder).",
          reports: "Reportes",
          reportsHelp: "Ver reportes (placeholder).",
          content: "Contenido",
          contentHelp: "Gestionar contenido (placeholder).",
          support: "Soporte",
          supportHelp: "Cola de soporte (placeholder).",
          dataRequests: "Solicitudes de datos",
          dataRequestsHelp: "Solicitudes de privacidad (placeholder).",
          auditLog: "Audit log",
          auditLogHelp: "Eventos y auditoría (placeholder)."
        },
        users: {
          title: "Admin — usuarios",
          subtitle: "Placeholder",
          placeholderTitle: "En construcción",
          placeholderBody: "Esta pantalla se conectará a Supabase más adelante."
        },
        reports: {
          title: "Admin — reportes",
          subtitle: "Placeholder",
          placeholderTitle: "En construcción",
          placeholderBody: "Esta pantalla se conectará a Supabase más adelante."
        },
        content: {
          title: "Admin — contenido",
          subtitle: "Placeholder",
          placeholderTitle: "En construcción",
          placeholderBody: "Esta pantalla se conectará a Supabase más adelante."
        },
        support: {
          title: "Admin — soporte",
          subtitle: "Placeholder",
          placeholderTitle: "En construcción",
          placeholderBody: "Esta pantalla se conectará a Supabase más adelante."
        },
        dataRequests: {
          title: "Admin — solicitudes de datos",
          subtitle: "Placeholder",
          placeholderTitle: "En construcción",
          placeholderBody: "Esta pantalla se conectará a Supabase más adelante."
        },
        auditLog: {
          title: "Admin — audit log",
          subtitle: "Placeholder",
          placeholderTitle: "En construcción",
          placeholderBody: "Esta pantalla se conectará a Supabase más adelante."
        }
      },
      legal: {
        kicker: "Legal",
        privacy: {
          title: "Política de Privacidad",
          sections: {
            overview: "Resumen",
            collect: "Qué información recopilamos",
            localProgress: "Datos de progreso local",
            accountFuture: "Datos de cuenta (cuando exista)",
            analytics: "Analytics y cookies",
            use: "Cómo usamos la información",
            security: "Cómo protegemos la información",
            access: "Acceso y corrección",
            deletion: "Solicitudes de eliminación",
            contact: "Contacto"
          },
          body: {
            overview:
              "Esta es una política placeholder para readiness. El texto final debe revisarse antes del lanzamiento.",
            collect:
              "Por ahora, KangaLearner no requiere cuenta y no recopila datos sensibles vía backend.",
            localProgress:
              "Por ahora, KangaLearner guarda el progreso de estudio localmente en tu dispositivo.",
            accountFuture:
              "Cuando las cuentas estén habilitadas, los datos de cuenta podrán almacenarse para sync.",
            analytics:
              "Consentimientos de analytics/marketing son solo UI en esta fase (sin backend).",
            use: "Usamos la información para mejorar la experiencia de estudio y el producto.",
            security: "Planeamos controles de seguridad y acceso cuando el sync esté conectado.",
            access: "Podrás solicitar acceso/corrección cuando existan cuentas.",
            deletion:
              "Puedes borrar el progreso local y solicitar eliminación futura cuando existan cuentas.",
            contact: "Para preguntas, usa la página de soporte."
          }
        },
        terms: {
          title: "Términos",
          sections: {
            independent: "Herramienta independiente",
            notOfficial: "No oficial",
            noGuarantee: "Sin garantía de aprobar",
            acceptableUse: "Uso aceptable",
            limitations: "Limitaciones",
            changes: "Cambios"
          },
          body: {
            independent: "KangaLearner es una herramienta de estudio independiente.",
            notOfficial:
              "No está afiliada al Department of Transport WA ni a ninguna autoridad gubernamental australiana.",
            noGuarantee: "Usar KangaLearner no garantiza aprobar.",
            acceptableUse: "Usa el producto de forma responsable y legal.",
            limitations: "El contenido puede tener errores — confirma con fuentes oficiales.",
            changes: "Podemos actualizar estos términos en el futuro."
          }
        },
        security: {
          title: "Política de Seguridad",
          sections: {
            account: "Seguridad de cuenta",
            passwords: "Seguridad de contraseñas",
            disclosure: "Responsible disclosure",
            breach: "Incidentes"
          },
          body: {
            account: "Los controles se habilitarán cuando el sync esté conectado.",
            passwords: "Usa contraseñas fuertes y evita reutilización.",
            disclosure: "El proceso de disclosure se añadirá más adelante.",
            breach: "El proceso de incident response se documentará más adelante."
          }
        },
        dataDeletion: {
          title: "Eliminación de datos",
          sections: {
            local: "Borrar progreso local",
            future: "Eliminación de cuenta futura",
            contact: "Contacto"
          },
          body: {
            local: "Puedes borrar el progreso local en Controles de datos.",
            future: "Cuando existan cuentas, habrá un flujo para solicitar eliminación de cuenta.",
            contact: "Si necesitas ayuda, contacta soporte."
          }
        },
        notOfficial: {
          title: "No oficial",
          body: "KangaLearner es una herramienta de estudio independiente y no está afiliada al Department of Transport WA ni a ninguna autoridad gubernamental australiana."
        }
      },
      support: {
        kicker: "Soporte",
        title: "Contactar soporte",
        fields: { name: "Nombre", email: "Correo", topic: "Tema", message: "Mensaje" },
        submit: "Enviar",
        placeholderNotice: "El formulario de soporte aún no está conectado."
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
