# Dr. Felipe Machado — demonstração

Landing page local em React + TypeScript + Vite. Sem backend e sem coleta de dados.

## Abrir

No PowerShell, na pasta `C:\DR-FELIPE`:

```powershell
npm.cmd install --cache .npm-cache
npm.cmd run dev
```

Abra o endereço exibido pelo Vite. Para gerar a versão de distribuição: `npm.cmd run build`. O resultado fica em `dist/`.

## Implementado

- Identidade preto, vinho, dourado e marfim; retrato transparente e cópias WebP.
- ES/PT com detecção do navegador, preferência persistida, metadados e WhatsApp localizados.
- Tratamentos facial, corporal e vascular com abas acessíveis.
- Apresentação, galeria de três imagens inteiras, modal nativo com foco contido, Escape, setas e retorno do foco.
- Três vídeos MP4 revisados visualmente, capas extraídas dos próprios vídeos, controles, sem autoplay e reprodução única.
- Três depoimentos transcritos, sem identificadores dos prints, traduções sinalizadas.
- Jornada, FAQ, contato e identificação como demonstração; sem endereço, credenciais ou preços inventados.
- Partículas discretas, entrada do título, animação de entrada por seção e movimento reduzido.

## Mapeamento das mídias

| Original em images-makes | Uso / cópia pública |
|---|---|
| imagem-dr-felipe.png | Retrato com alpha → portrait.webp |
| procedimento1.jpg | Comparação de perfil masculino → result-1.webp |
| procedimento2.jpg | Dois perfis femininos sem cronologia identificada → result-2.webp |
| procedimento3.jpg | Comparação com rótulos originais → result-3.webp |
| Feedback2.png | Primeiro trecho PT do briefing |
| Feedback3.png | Segundo trecho PT do briefing |
| Feedback1.png | Terceiro trecho ES do briefing |
| video1.mp4 | Vídeo de preenchimento de glúteos, 720×1280, aproximadamente 18s |
| video2.mp4 | Vídeo de harmonização facial, 720×1280, aproximadamente 18s |
| video3.mp4 | Vídeo de estética facial, 720×1280, aproximadamente 27s |

Os originais foram preservados. Os prints brutos não estão em public/ nem na distribuição. Nenhuma alteração estética foi aplicada às comparações. As capas são quadros dos próprios vídeos.

## Substituições e pendências

O arquivo `Texto colado(1).txt` e a gravação da animação de referência não estão nesta pasta. A tentativa de obter as fontes oficiais de AnimatedContent e DepthCarousel não retornou os arquivos. Foram implementadas alternativas próprias em CSS/React, sem copiar código da biblioteca: partículas CSS, revelação com IntersectionObserver e carrossel CSS com perspectiva. Não há dependência de WebGL.

Antes de publicação oficial, confirmar autorização para imagens, vídeos e relatos; oferta e nomes dos tratamentos; cronologia das comparações; telefone, vínculo com Clínica Única, endereço, horários, registro e biografia. Os vídeos mantêm textos e áudio originais, sem tradução automática. Fontes tipográficas carregam via Google Fonts com alternativas locais Georgia/Arial.

Esta demonstração não foi publicada nem enviada ao profissional. `dist/` é o pacote estático para revisão. Não servir a raiz do projeto como pacote público, pois contém os originais privados.

## Verificação

`npm.cmd test` valida resolução do idioma e mensagem WhatsApp. `npm.cmd run test:e2e` usa Chrome instalado e verifica idiomas, armazenamento indisponível, galeria, FAQ, menu, movimento reduzido, larguras 360/390/768/1440 e reprodução única de vídeo. `npm.cmd run build` valida TypeScript e gera a distribuição.

## Refinamento das interações

Tratamentos agora expandem explicações ES/PT na própria lista, com controle por teclado, um item aberto por vez e CTA. Os textos informativos estão em `src/treatment-details.ts` e exigem revisão profissional antes de publicação oficial.

Entrada e saída dos grupos acompanham a rolagem (CSS view timeline, com fallback estático legível). Título: 1,2s; acordeões: aproximadamente 0,5s; controles: 0,2–0,35s; galeria: 0,65s. Movimento reduzido remove esses efeitos. Partículas têm brilho ampliado na abertura e no contato, pausam fora da tela/aba oculta e não interceptam cliques.

Fontes e decisões editoriais: `docs/ajustes-interacao.md`.
