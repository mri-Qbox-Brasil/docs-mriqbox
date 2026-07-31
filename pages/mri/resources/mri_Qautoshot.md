# mri_Qautoshot — Manual

Estúdio de captura de imagens de assets 3D (veículos, objetos e peds), operado pela aba **Estúdio** do `mri_Qadmin`.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Como funciona o estúdio](#como-funciona-o-estúdio)
4. [Configuração](#configuração)
5. [Comandos](#comandos)
6. [Saída das imagens](#saída-das-imagens)
7. [Solução de problemas](#solução-de-problemas)
8. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | comandos, notify, `requestModel` |
| `qbx_core` | Sim | framework base |
| `oxmysql` | Sim | persistência (a partir da Fase 3) |
| `mri_Qadmin` | Não | sem ele o plugin não aparece no painel; o `/autoshot` continua funcionando |
| `screencapture` **ou** `screenshot-basic` | Sim | pelo menos um precisa estar rodando |

> `screencapture` é preferido por aceitar `maxWidth`/`maxHeight`: o cliente manda a imagem já reduzida, em vez do full-res do monitor do operador — que é a causa da qualidade inconsistente entre operadores em soluções antigas.

---

## Instalação

1. Copie para `resources/[mri]/mri_Qautoshot`. O bracket já é carregado por `ensure [mri]`, então **não adicione um `ensure` próprio** — linha duplicada causa start duplo.
2. Builde a NUI:
   ```bash
   cd web && pnpm install && pnpm build
   ```
3. Reinicie o servidor (ou `refresh; ensure mri_Qautoshot`).

---

## Como funciona o estúdio

O operador é movido para `vec3(0, 0, -150)` num routing bucket dedicado. Nessa altura não existe geometria nenhuma, então nada do mundo pode aparecer atrás do asset.

O fundo **não** é MLO, IPL nem prop: é uma caixa fechada de 6 faces desenhada por frame com `DrawPoly`, centrada no asset e dimensionada pelo bounding box dele.

A escolha de `DrawPoly` é deliberada. Ele renderiza **cor chapada, sem receber luz nem sombra**, então o fundo sai matematicamente uniforme — exatamente o que o chroma key precisa. Um prop texturizado receberia sombra e o verde deixaria de ser uma cor só, degradando o recorte. Como consequência, o asset também não seria iluminado por nada, então a luz vem separada, de `DrawLightWithRange`, com offsets que escalam pelo raio do modelo.

A câmera calcula a distância a partir do raio da esfera envolvente do modelo e do FOV, e orbita **relativa ao heading da entidade**. Isso resolve dois problemas comuns: enquadramento que muda quando o heading do estúdio muda, e altura de câmera fixa que faz moto e ônibus saírem em escalas diferentes.

Ao sair, tudo que foi alterado é revertido — clima, relógio, câmera idle, HUD, colisão, visibilidade e o routing bucket. A volta pré-carrega a colisão do destino; sem isso o player cai pelo mapa ao voltar de -150Z.

---

## Configuração

Tudo em `shared/config.lua`:

| Chave | O que controla |
|---|---|
| `Config.Studio` | coordenadas do estúdio, heading, routing bucket |
| `Config.Backdrop.colors` | cores de chroma disponíveis (verde, magenta, azul) |
| `Config.Backdrop.box` | dimensões mínimas da caixa por tipo de asset |
| `Config.Lights` | luzes de estúdio (offset relativo, alcance, intensidade) |
| `Config.Camera` | FOV, ângulo de órbita, fator de altura, margem de enquadramento |
| `Config.Output` | diretório, formato e dimensões da saída |
| `Config.Capture` | backends, backpressure e timeouts |

> O verde padrão é `0,177,64`, não verde puro. Verde de chroma real satura menos e gera menos spill nas bordas metálicas.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/autoshot` | `mri_Qautoshot.admin` | abre o estúdio em modo standalone |

A permissão `mri_Qautoshot.admin` é criada automaticamente no grupo `god` quando o plugin se registra pela primeira vez.

---

## Saída das imagens

`data/images/<assetType>/<assetKey>.<ext>` — ex.: `data/images/vehicle/adder.png`.

Servido por `https://cfx-nui-mri_Qautoshot/data/images/vehicle/adder.png`.

> O FiveM indexa o bloco `files` do fxmanifest no **start** do resource. Imagem nova só fica servível por URL depois do próximo start — por isso a UI usa o retorno da captura para o preview imediato.

As imagens não são versionadas em git; ver [data/README.md](data/README.md).

---

## Solução de problemas

**O card "Estúdio" não aparece no painel.**
O gate é server-side: quem não tem a permissão nem recebe o manifest. Confira se o seu grupo tem `mri_Qautoshot.admin`. Se o `mri_Qadmin` reiniciou, o plugin se re-registra sozinho pelo evento `pluginsReady`.

**"Plugin indisponível" depois de 10s.**
O host não recebeu o `mri-plugin/ready`. Quase sempre é build ausente: confira se `web/build/index.html` existe.

**A foto sai com o painel do Qadmin dentro dela.**
O screenshot lê o framebuffer inteiro. A UI pede ao host para esconder o painel antes de disparar; se você abriu por outro caminho, feche o painel antes.

**A foto sai escura.**
O estúdio força `EXTRASUNNY` ao meio-dia justamente para evitar isso. Se persistir, ajuste `Config.Lights`.

**O relógio do jogo ficou estranho depois de capturar.**
Não deveria — `Studio.exit()` reverte o override. Se acontecer, verifique se outro resource de clima está reaplicando por cima.

---

## Estrutura de arquivos

```
client/
  backdrop.lua   cyclorama DrawPoly + luzes
  camera.lua     enquadramento por bounding box
  studio.lua     sessão: isolamento e restauração do mundo
  vehicle.lua    spawn e normalização do veículo
  capture.lua    orquestração da sessão + ACK
  nui.lua        callbacks NUI
server/
  capture.lua      ciclo da captura, routing bucket, validação
  processor.js     captura via backend + gravação em disco
  mri_qadmin.lua   registro do plugin
  permissions.lua  HasStudioAccess
  commands.lua     /autoshot
shared/config.lua
web/               NUI React + @mriqbox/ui-kit
data/images/       saída
```

---

## Créditos

A técnica do cyclorama de `DrawPoly` e da máscara de chroma na cabeça foi portada do [uz_AutoShot](https://uz-scripts.com/scripts/uz-autoshot) (UZ Scripts), Apache-2.0.
