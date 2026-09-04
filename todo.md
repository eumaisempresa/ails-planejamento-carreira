# AILs Planejamento de Carreira — Plano de Trabalho

> **Status atual:** caso fundador definido: evolução pessoal do usuário, usando a planilha e a apresentação existentes como primeira fonte de verdade funcional.

## Descoberta e modelagem

- [x] Catalogar a planilha e a apresentação de evolução pessoal.
- [x] Separar o caso fundador da biblioteca oficial de competências e diagnósticos.
- [x] Registrar a Arquitetura Oficial do EU+ e o Framework Consolidado como referências normativas.
- [ ] Incorporar os quatro documentos institucionais restantes.
- [ ] Consolidar conflitos, versões, conceitos e regras metodológicas.

## Núcleo funcional

- [ ] Definir jornada mínima: evolução pessoal, evidências, análise, revisão e apresentação.
- [ ] Definir campos declarados pelo usuário, campos calculados e campos sugeridos pela IA.
- [ ] Definir contrato mínimo versionado entre frontend, Apps Script, Sheets e Gemini.
- [ ] Definir payloads de leitura, gravação, análise e geração da apresentação.
- [ ] Definir critérios de evidência, score, gap, confiança e revisão humana.

## Dados e integração

- [ ] Criar modelo inicial de abas para avaliações, respostas, evidências, competências, análises, PDI e apresentações.
- [x] Gerar Apps Script idempotente para criar abas e cabeçalhos da planilha informada.
- [ ] Validar por inspeção de código que o script não apaga dados e suporta execução repetida; falta validação dentro da sua planilha após colagem.
- [x] Confirmar que as abas foram criadas e que a implantação responde aos endpoints health e schema.
- [x] Corrigir erro atual: função doGet existia no editor, mas não era reconhecida pela implantação publicada; a versão foi atualizada.
- [x] Confirmar que a implantação usada pela URL aponta para a versão correta do projeto.
- [x] Confirmar que o editor contém a função doGet(e).
- [x] Confirmar que o mesmo projeto publicado contém AILS, AILS.SHEETS e jsonResponse_.
- [x] Definir chaves, tipos de campo, estados e relacionamentos da planilha operacional.
- [ ] Definir quais abas são editáveis pelo usuário, pelo Apps Script e somente para consulta.
- [ ] Manter o Gemini atrás do Apps Script, com a chave nas propriedades do script.
- [ ] Preparar adaptadores para as bibliotecas futuras de competências, diagnósticos, evidências e PDI.
- [ ] Definir logs, idempotência, permissões, backup, recuperação e limites de quota.
- [ ] Executar teste controlado de leitura e gravação de uma avaliação de validação.
- [x] Configurar o ID da planilha e documentar a URL de implantação sem expor a chave Gemini.

## Implementação

- [ ] Construir o primeiro ciclo: evolução pessoal → evidência → análise → apresentação no frontend.
- [x] Construir frontend mínimo antes do teste real de dados.
- [ ] Conectar formulário, salvamento, leitura e apresentação ao Apps Script publicado.
- [ ] Construir frontend inicial com experiência executiva, revisão humana e dados reais do caso fundador.
- [x] Definir jornada visual: início, trajetória, evidências, revisão e apresentação.
- [ ] Gerar apresentação navegável diretamente no frontend.
- [ ] Preservar extensões para aderência, benchmark, LinkedIn e evolução histórica.

## Validação e expansão

- [x] Validar visualmente a navegação inicial, responsividade estrutural, acessibilidade básica e clareza dos resultados.
- [ ] Testar o fluxo de erro, reprocessamento e versionamento.
- [ ] Documentar o caso fundador e as decisões arquiteturais.
- [ ] Definir a próxima funcionalidade após a validação do núcleo.
