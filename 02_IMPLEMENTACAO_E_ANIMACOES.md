# Implementação e critérios de qualidade

## Plataforma proposta
React + TypeScript + Vite, CSS responsivo, conteúdo separado por idioma e componentes reutilizáveis. Se houver projeto existente, preservar sua stack e convenções. Não adicionar backend para esta demonstração.

## Idiomas
Espanhol é o padrão. Ordem de resolução: preferência manual válida salva em localStorage > primeiro idioma suportado da lista navigator.languages > espanhol. Considerar pt e pt-* como português; es e es-* como espanhol. Em falha de armazenamento, manter troca em memória. Não usar IP ou pedir localização. Se houver renderização no servidor, resolver no cliente sem erros de hidratação. Evitar exibir os dois idiomas alternadamente durante a carga.
Seletor textual ES | PT acessível no cabeçalho e menu móvel. Trocar toda a interface sem recarregar, mantendo seção atual. Atualizar html lang, título e descrição da página, alt, rótulos de acessibilidade e mensagens de WhatsApp. Persistir escolha manual e não sobrescrever na próxima visita. Não traduzir imagens ou áudio automaticamente; identificar traduções de depoimentos.

## Animações
### Abertura inspirada na gravação
Título aparece uma vez ao carregar: perspectiva e rotação no eixo X discretas, deslocamento vertical, opacidade e desfoque progressivamente reduzidos. Proposta de ajuste: 900–1100 ms; rotateX de aproximadamente -60 graus a 0, translateY de 28 px a 0, blur de 8 px a 0. Ajustar após comparação visual com gravação, sem afirmar equivalência exata. Foto não deve ser deformada. Texto precisa ficar imediatamente legível quando JavaScript ou animações estiverem indisponíveis.
### Particles — React Bits
Usar fonte completa e CSS de Texto colado(1).txt. Dourado suave em fundo vinho/preto apenas na abertura, atrás da foto e dos textos. Proposta: 60–100 partículas no desktop, 25–40 no celular; movimento lento, brilho e opacidade baixos; sem linhas de conexão e sem explosão ao clicar. Parallax só para mouse. Não interceptar cliques dos botões. Pausar fora da tela e com aba oculta; fallback estático em falha de WebGL.
### DepthCarousel — React Bits
Usar na galeria. Há apenas exemplo de uso; obter e conferir fonte, CSS, dependências e licença antes de integrar. Não assumir que existe pacote npm com esse nome. Três imagens, sem duplicar conteúdo para preencher cinco cards. Desktop com profundidade moderada e card central nítido; imagens inteiras usando object-fit: contain. Mobile com um card principal, toque/deslize e botões. Evitar autoplay por padrão para permitir inspeção; se habilitado, oferecer pausa e pausar em foco, hover, interação e modal aberto. Não recortar artificialmente comparações existentes para criar slider antes/depois.
### AnimatedContent — React Bits
Há exemplo de uso; obter fonte e dependências. Aplicar a títulos e grupos ao entrar na tela, uma vez. Distância proposta 24–40 px, duração 0,6–0,8 s, blur 4–6 px, stagger 0,06–0,08 s. Evitar distância de 160 px em telas pequenas. Não esconder conteúdo permanentemente se observador ou biblioteca falhar.
### Movimento reduzido
Respeitar prefers-reduced-motion: remover giros, deslocamentos e autoplay, congelar ou ocultar partículas decorativas e mostrar conteúdo diretamente.

## Vídeos e galeria
Reels com poster, controls, playsInline e preload=none ou metadata. Sem som automático e sem três vídeos tocando juntos. Pausar o anterior ao iniciar outro e ao fechar modal. Reservar proporção 9:16 para evitar saltos. Não usar a gravação de referência como Reel do médico. Enquanto os três vídeos não chegarem, omitir a seção pública.
Modal de imagem com fechar, Escape, foco contido e retorno do foco ao acionador. Disponibilizar botões acessíveis além de gestos.

## Qualidade
Otimizar cópias de assets para WebP/AVIF, mantendo originais. Retrato com transparência preservada. Definir largura/altura e lazy loading abaixo da dobra. Não alterar o conteúdo clínico das imagens. Não instalar bibliotecas extras sem necessidade.

## Verificação
- Conferir 360, 390, 768 e 1440 px sem rolagem horizontal.
- Teclado: menu, idiomas, galeria, FAQ e modais.
- Português no navegador abre PT; espanhol abre ES; idioma não suportado abre ES; preferência manual prevalece após recarga.
- Armazenamento bloqueado não causa erro.
- Todas as chamadas WhatsApp usam o telefone correto e texto no idioma ativo, codificado com encodeURIComponent.
- Imagens inteiras, vídeo único em reprodução e Escape funcionando.
- Movimento reduzido e falha de WebGL mantêm site utilizável.
- Build sem erro e console sem erros relevantes; conferir contraste e foco visível.
