// Checagem da casca do plugin Regente (roda no GitHub Actions e localmente).
// 1) sem pasta bin/; 2) versão igual em plugin.json e nos arquivos que chamam o servidor;
// 3) casca fina: cada skill/comando/agente curto, sem texto do método; 4) conector só https.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RAIZ = join(import.meta.dirname, '..', '..');
const PLUGIN = join(RAIZ, 'plugins', 'regente');
const LIMITE_PALAVRAS = 180; // casca fina: corpo curto
const erros = [];

function arquivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? arquivos(p) : [p];
  });
}

if (existsSync(join(PLUGIN, 'bin'))) erros.push('pasta bin/ impede a instalação no claude.ai e no Cowork');

const versao = JSON.parse(readFileSync(join(PLUGIN, '.claude-plugin', 'plugin.json'), 'utf8')).version;
const casca = arquivos(PLUGIN).filter((f) => f.endsWith('.md'));
for (const f of casca) {
  const texto = readFileSync(f, 'utf8');
  const corpo = texto.replace(/^---[\s\S]*?---/, '');
  const palavras = corpo.split(/\s+/).filter(Boolean).length;
  if (palavras > LIMITE_PALAVRAS) erros.push(`${f}: ${palavras} palavras (casca fina até ${LIMITE_PALAVRAS})`);
  for (const m of texto.matchAll(/versao_plugin: "([^"]+)"/g)) {
    if (m[1] !== versao) erros.push(`${f}: versao_plugin "${m[1]}" diferente de plugin.json "${versao}"`);
  }
  if (/regente_instrucoes/.test(texto) && !/não (improvise|execute|leia)/i.test(texto)) {
    erros.push(`${f}: falta a regra dura "sem resposta do servidor, não execute"`);
  }
}

const mcp = JSON.parse(readFileSync(join(PLUGIN, '.mcp.json'), 'utf8'));
for (const [nome, s] of Object.entries(mcp.mcpServers ?? {})) {
  if (s.type !== 'http' || !String(s.url).startsWith('https://')) erros.push(`conector ${nome}: precisa ser http com https://`);
  if (s.headers) erros.push(`conector ${nome}: sem cabeçalhos fixos (credencial nunca no plugin)`);
}

if (erros.length) {
  console.error('Casca do plugin REPROVADA:\n- ' + erros.join('\n- '));
  process.exit(1);
}
console.log(`Casca do plugin OK (versão ${versao}, ${casca.length} arquivos .md conferidos).`);
