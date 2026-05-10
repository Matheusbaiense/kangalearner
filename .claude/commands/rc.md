# Remote Connect — conectar ao Claude Code local

Ajuda o usuário a conectar esta sessão web ao Claude Code rodando na máquina local.

## O que fazer quando este comando for invocado

1. Verifique se existe o arquivo `.claude/rc-config.json` no projeto.
   - Se existir, leia as configurações de conexão armazenadas e exiba-as.
   - Se não existir, siga o fluxo de configuração abaixo.

2. **Fluxo de configuração (primeira vez):**
   - Pergunte ao usuário o host/IP da máquina local (ex: `localhost`, `192.168.x.x` ou hostname)
   - Pergunte a porta (padrão: `3000`)
   - Salve em `.claude/rc-config.json` (este arquivo está no `.gitignore`)
   - Exiba as instruções para o usuário iniciar o servidor na máquina local:

     ```bash
     # Rodar na máquina local para iniciar o servidor Claude Code
     claude serve --port 3000
     ```

3. **Conectar:**
   - Após o usuário confirmar que o servidor está rodando localmente, exiba o comando de conexão ou a URL correspondente.
   - Se o usuário estiver atrás de NAT/firewall, sugira usar `ngrok` ou `cloudflared tunnel` para expor a porta:

     ```bash
     # Alternativa com túnel
     ngrok http 3000
     # ou
     cloudflared tunnel --url http://localhost:3000
     ```

4. **Verificação de conexão:**
   - Após conectar, confirme ao usuário que a sessão está ativa e qual diretório de trabalho está sendo usado na máquina remota.

## Notas
- O arquivo `.claude/rc-config.json` **não deve ser commitado** (adicionar ao `.gitignore`).
- O comando `claude serve` requer Claude Code instalado na máquina local (`npm i -g @anthropic-ai/claude-code` ou via brew).
