# Regente: plugin (casca pública)

Este repositório é só a **casca** do plugin Regente: gatilhos e uma linha por função. O método (as instruções de cada área) mora no servidor do Regente e só é entregue com licença ativa.

## Instalar (quando o repositório for publicado)

```
/plugin install regente --marketplace wanderwagner-dot/regente-plugin
```

No claude.ai / Cowork: Personalizar → Plugins → adicionar marketplace pelo endereço do repositório → instalar "Regente" → conectar o Regente com o código da licença.

## Estrutura

```
.claude-plugin/marketplace.json      catálogo (marketplace) com 1 plugin
plugins/regente/
  .claude-plugin/plugin.json         manifesto (nome, versão 0.0.1)
  .mcp.json                          conector remoto do servidor Regente (HTTP + login por código de licença)
  skills/regente-ola/SKILL.md        skill fina: "olá Regente"
  commands/fila.md                   comando /regente:fila
  agents/conferente-teste.md         agente Conferente de teste
.github/workflows/validar.yml        validação do plugin + varredura de segredos + checagem da casca
```

## Regras desta casca

- Nenhum texto do método, nenhum segredo, nenhum dado de cliente.
- Sem pasta `bin/` (o claude.ai e o Cowork não instalam plugin com `bin/`).
- A versão em `plugin.json` é a mesma citada nas skills, no comando e no agente (`versao_plugin`). A checagem automática confere.

## Validar localmente

```
claude plugin validate .
claude plugin validate ./plugins/regente
node .github/scripts/verificar-casca.mjs
```

O endereço do conector (`.mcp.json`) é um marcador até o servidor ser publicado (cartão S0-00).
