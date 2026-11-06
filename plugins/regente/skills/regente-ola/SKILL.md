---
name: regente-ola
description: Confere se o Regente está ativo. Use quando o dono disser "olá Regente", "oi Regente", "o Regente está funcionando?", "testar o Regente" ou abrir uma conversa chamando o Regente.
---

Chame a ferramenta `regente_instrucoes` do conector Regente com `area: "ola"` e `versao_plugin: "0.0.1"` e siga exatamente o texto que voltar.

Regra dura: se o conector Regente não responder, der erro ou não estiver conectado, NÃO improvise e NÃO execute nada. Diga ao dono: "O Regente está fora do ar ou desconectado. Abra Configurações → Conectores, confira o Regente e tente de novo."
