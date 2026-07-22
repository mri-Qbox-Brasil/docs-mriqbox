# mri_Qadmin — Manual

Painel de administração para servidores QBCore/Qbox: jogadores, veículos, itens, permissões por grupo, staff chat, logs, mapa e telas ao vivo, navegador de recursos e uma arquitetura de plugins para outros recursos se plugarem ao painel.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Configuração](#configuração)
5. [Comandos](#comandos)
6. [Teclas](#teclas)
7. [Painel — abas](#painel--abas)
8. [Grupos e Master Admin](#grupos-e-master-admin)
9. [Logs](#logs)
10. [Navegador de recursos](#navegador-de-recursos)
11. [Telas ao vivo (WebRTC)](#telas-ao-vivo-webrtc)
12. [Ações customizadas](#ações-customizadas)
13. [Plugins](#plugins)
14. [Banco de dados](#banco-de-dados)
15. [Integrações](#integrações)
16. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
17. [Localização](#localização)
18. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Declarado em `dependencies`. Comandos, callbacks, keybinds, locale, ACE (`lib.addAce`/`lib.addPrincipal`) |
| `oxmysql` | Sim | Declarado em `dependencies`. Grupos, permissões, logs, chat, settings, ações |
| `qb-core` / `qbx_core` | Sim | `exports['qb-core']:GetCoreObject()` é chamado em vários arquivos do servidor. Fonte de jogadores, jobs, gangues, dinheiro e metadata |
| `ox_inventory` | Não | Detectado automaticamente. Alternativas: `ps-inventory`, `lj-inventory`, `qb-inventory` (padrão) |
| `cdn-fuel` | Não | Configurável em `Config.Fuel`. Alternativas: `ps-fuel`, `LegacyFuel`, `ox_fuel` |
| `qbx_vehicleshop` | Não | Necessário para o sistema de estoque quando `Config.Dealership = "mri"` |
| `mri_Qsignaling` | Não | Só quando `Config.SignalingProvider = "websocket"` (telas ao vivo) |

---

## Instalação

1. Copie a pasta `mri_Qadmin` para `resources/`.
2. Adicione ao `server.cfg`, depois de `ox_lib`, `oxmysql` e do framework:
   ```
   ensure mri_Qadmin
   ```
3. **SQL** — as tabelas são criadas automaticamente no start (`server/db.lua` lê e executa o `database.sql`). Importar na mão é opcional.
4. **Primeiro acesso** — nenhum jogador tem acesso ao painel por padrão. Pelo console do servidor, promova alguém a Master Admin:
   ```
   mri_qadmin.setmaster 1
   ```
   O Master Admin ignora todas as checagens e consegue abrir o painel para criar os grupos definitivos.
5. **Escrita em outros recursos** (opcional) — para o navegador de arquivos poder salvar em recursos de terceiros, libere cada um no `server.cfg`:
   ```
   add_filesystem_permission mri_Qadmin write <nome_do_resource>
   ```
   Veja [Navegador de recursos](#navegador-de-recursos).
6. **Patch do ox_lib** (opcional) — para que logs de outros recursos feitos com `lib.logger` apareçam no painel, aplique o patch descrito em [OX_LIB_PATCH.md](OX_LIB_PATCH.md).

---

## Permissões (ACE)

Todas as permissões nativas usam o prefixo `qadmin.`. O servidor é a única fonte de verdade: as definições vivem em `server/permissions.lua` e são enviadas para a NUI, que apenas renderiza o que recebe.

| Prefixo | Finalidade |
|---|---|
| `qadmin.open` | Abrir o painel. É o valor padrão de `Config.OpenPanelPerms` |
| `qadmin.master` | Bypass total — ignora todas as checagens |
| `qadmin.page.*` | Acesso a cada aba (`qadmin.page.players`, `qadmin.page.vehicles`, …) |
| `qadmin.action.*` | Cada ação executável dentro das abas (`qadmin.action.noclip`, `qadmin.action.ban`, …) |
| `qadmin.commands` | Acesso à lista de comandos |

A referência completa, permissão por permissão, está em [PERMISSIONS.md](PERMISSIONS.md).

Na prática, as permissões não são escritas no `server.cfg`: elas são atribuídas a **grupos** pelo próprio painel, gravadas no banco e reaplicadas com `lib.addAce` a cada start. Um grupo pode ser vinculado a principals do FiveM (`group.admin`, `job.police`, `gang.ballas`) para herança automática, ou a personagens específicos (`char:<citizenid>`).

---

## Configuração

Arquivo: `shared/config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Fuel` | string | Sim | Recurso de combustível: `cdn-fuel`, `ps-fuel`, `LegacyFuel` ou `ox_fuel` |
| `Config.Dealership` | string | Sim | Concessionária: `mri` (estoque via `qbx_vehicleshop`), `ps-dealerships` ou `none` |
| `Config.Inventory` | string | — | **Detectado automaticamente** no start e a cada start de inventário. Ordem: `ox_inventory` → `ps-inventory` → `lj-inventory` → `qb-inventory` (padrão) |
| `Config.OpenPanelPerms` | array | Sim | Permissões que liberam a abertura do painel. Padrão: `{ 'qadmin.open' }` |
| `Config.RenewedPhone` | bool | Não | Ative se usar o qb-phone do Renewed (multijob) |
| `Config.SupportedLanguages` | array | Sim | Idiomas oferecidos na UI. Padrão: `pt-br`, `en`, `es` |
| `Config.Keybindings` | bool | Não | Liga/desliga as duas keybinds do recurso |
| `Config.AdminKey` | string | Não | Tecla que abre o painel. Padrão: `0` |
| `Config.NoclipKey` | string | Não | Tecla que alterna o noclip. Padrão: `9` |
| `Config.PrintLevel` | string | Não | Verbosidade do console: `none`, `error`, `warn`, `info`, `verbose` ou `debug` |
| `Config.QBCoreAutoSync` | bool | Não | Promove automaticamente quem tem rank `admin`/`god` no QBCore para o grupo `admin` do painel |
| `Config.QBNotify` | bool | Não | Usa `QBCore.Functions.Notify` nas notificações |
| `Config.InternalNotify` | bool | Não | Usa o sistema de notificação interno do painel |
| `Config.DefaultGarage` | string | Não | Garagem usada ao dar um veículo permanente. Padrão: `Pillbox Garage Parking` |
| `Config.VehicleImages` | string | Não | URL base para as imagens de veículos. Vazio usa o padrão |
| `Config.MapBaseUrl` | string | Não | URL base dos tiles do mapa ao vivo |
| `Config.SignalingProvider` | string | Não | Backend das telas ao vivo: `fivem-native`, `websocket` ou `cloudflare-sfu` |
| `Config.WebRTCUrl` | string | Não | URL WebSocket. Só usada com `SignalingProvider = "websocket"` |
| `Config.Actions` | tabela | Não | Ações customizadas genéricas — ver [Ações customizadas](#ações-customizadas) |
| `Config.PlayerActions` | tabela | Não | Ações customizadas exibidas no contexto de um jogador |
| `Config.OtherActions` | tabela | Não | Demais ações customizadas |
| `Config.Logs` | tabela | Sim | Configuração de logs — ver [Logs](#logs) |
| `Config.Descriptions` | tabela | — | Chaves de locale usadas como descrição de cada campo na aba Configurações |
| `Config.Options` | tabela | — | Valores possíveis dos campos `select` da aba Configurações |

Boa parte desses campos também é editável pela aba **Configurações** do painel, sem restart — os valores alterados ali são gravados na tabela `mri_qadmin_settings` e passam a ter precedência sobre o arquivo.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/adm` | `qadmin.open` | Abre o painel |
| `/nc` | `qadmin.action.noclip` | Alterna o noclip |
| `/vector2`, `/vec2` | `qadmin.action.toggle_coords` | Copia a posição atual como `vector2` |
| `/vector3`, `/vec3` | `qadmin.action.toggle_coords` | Copia a posição atual como `vector3` |
| `/vector4`, `/vec4` | `qadmin.action.toggle_coords` | Copia a posição atual como `vector4` (com heading) |
| `/heading` | `qadmin.action.toggle_coords` | Copia o heading atual |
| `/setammo` | `qadmin.action.set_ammo` | Define 999 de munição na arma equipada |
| `mri_qadmin.setmaster <alvo>` | Console | Concede Master Admin. Aceita ID online, `license` ou `license2` |
| `mri_qadmin.removemaster <alvo>` | Console | Revoga Master Admin |
| `mri_qadmin.purgemasters` | Console | Remove todos os Master Admins do banco e da sessão |
| `mri_qadmin.debugperms <id>` | Console | Imprime o diagnóstico de permissões de um jogador |
| `mri_qadmin.inspectdb` | Console | Inspeciona as tabelas de permissão em busca de linhas escondidas |

Os cinco comandos `mri_qadmin.*` só respondem quando `source == 0`, ou seja, **apenas pelo console** do servidor — não há como executá-los pelo chat, mesmo sendo admin.

---

## Teclas

| Tecla (padrão) | Ação |
|---|---|
| `0` (`Config.AdminKey`) | Executa `/adm` — abre o painel |
| `9` (`Config.NoclipKey`) | Executa `/nc` — alterna o noclip |

As duas são keybinds do `ox_lib` (`mri:toogleAdmin` e `mri:toogleNoclip`), reatribuíveis pelo jogador nas configurações do FiveM. `Config.Keybindings = false` desativa as duas.

---

## Painel — abas

Cada aba é gated por sua própria permissão `qadmin.page.*` e cada ação dentro dela por uma `qadmin.action.*`.

| Aba | Permissão | Conteúdo |
|---|---|---|
| Dashboard | `qadmin.page.dashboard` | Visão geral: jogadores online, uptime, estatísticas financeiras (exige `qadmin.action.info_admin`), anúncios e controle do chat |
| Jogadores | `qadmin.page.players` | Lista de online e offline, com busca, filtros e paginação. Identifiers, vitais, inventário, coordenadas e bucket; teleporte (ir, trazer, voltar, para coordenada/local); moderação (matar, expulsar, advertir, banir, desbanir, algemar, congelar, silenciar, embriagar); personagem (job/gangue, dinheiro, model do ped, roupas, inventário) |
| Veículos | `qadmin.page.vehicles` | Estoque e spawn. Spawnar temporário, dar permanente, deletar, consertar, abastecer, modificar, trocar placa, alterar estoque |
| Itens | `qadmin.page.items` | Base de itens com spawn direto no inventário de qualquer jogador online |
| Staff Chat | `qadmin.page.staffchat` | Chat interno da equipe, com menções `@[Nome]` e alerta para o mencionado |
| Grupos | `qadmin.page.groups` | Vínculo de personagens e principals a grupos |
| Permissões | `qadmin.page.permissions` | Editor de grupos: categorias e checkboxes vindas do servidor, vinculação de principals e wizard de criação |
| Comandos | `qadmin.page.commands` | Lista de comandos disponíveis para o jogador |
| Ações | `qadmin.page.actions` | Ações customizadas (ver seção própria) |
| Recursos | `qadmin.page.resources` | Start/stop/restart de recursos e navegador de arquivos |
| Configurações | `qadmin.page.settings` | Editor visual das opções do `Config`, sem editar arquivo |
| Mapa ao Vivo | `qadmin.page.livemap` | Posição de todos os jogadores em tempo real, com filtros |
| Telas ao Vivo | `qadmin.page.livescreens` | Transmissão da tela dos jogadores via WebRTC |
| Dev Mode | `qadmin.page.devmode` | Coordenadas na tela, blips de jogadores, scanner de entidades próximas, laser, modo mock |

---

## Grupos e Master Admin

### Grupos

Um grupo (`mri_qadmin_groups`) é um conjunto de permissões (`mri_qadmin_group_permissions`) com um label. As permissões do grupo são aplicadas como ACE via `lib.addAce` a cada start do recurso.

Um grupo pode ser alcançado de três formas:

- **Principal do FiveM** — vinculando o grupo a `group.admin`, `job.police`, `gang.ballas` etc.
- **Personagem** — vinculando um `citizenid` diretamente (`mri_qadmin_character_groups`).
- **QBCoreAutoSync** — com `Config.QBCoreAutoSync = true`, quem tem rank `admin` ou `god` no QBCore entra automaticamente no grupo `admin` do painel.

### Master Admin

Status especial, concedido **só pelo console**, que ignora toda checagem de permissão. Fica gravado em `mri_qadmin_masters` (por license) e é reaplicado como ACE a cada start.

```
mri_qadmin.setmaster 1                  # por ID online
mri_qadmin.setmaster license:abcd1234   # por license
mri_qadmin.removemaster 1
mri_qadmin.purgemasters                 # limpa todos do banco
```

Use para o primeiro acesso e para recuperação — não como cargo do dia a dia.

---

## Logs

O painel centraliza os logs do servidor. Cada log tem `resource`, `category`, `level`, `message` e um `data` opcional, e pode ir para três destinos ao mesmo tempo: buffer em memória (exibição instantânea), banco (`mri_qadmin_logs`) e webhook do Discord.

```lua
Config.Logs = {
    Webhooks = {
        players     = "",   -- bans, kicks, revives
        bans        = "",
        inventory   = "",
        vehicles    = "",
        money       = "",
        server      = "",   -- clima, hora, anúncios
        permissions = "",
        chat        = "",
        system      = "",
        Fallback    = "",   -- recebe as categorias sem webhook próprio
    },
    ForwardEvent    = "",           -- evento de servidor disparado a cada log ("" desativa)
    DBEnabled       = true,
    MaxMemory       = 500,          -- quantidade de logs mantidos em memória
    ResourceMode    = 'blacklist',  -- 'blacklist' | 'whitelist'
    ResourceEntries = {},           -- { name = 'meu_resource', db = true, discord = false, relay = true }
    Categories      = { … },        -- id + label das categorias exibidas no painel
}
```

| Campo | Descrição |
|---|---|
| `Webhooks.<categoria>` | URL do webhook do Discord da categoria. Vazio desativa o envio daquela categoria |
| `Webhooks.Fallback` | Recebe as categorias que não têm webhook próprio |
| `ForwardEvent` | Nome de um evento de servidor disparado a cada log — permite que outro recurso consuma o fluxo |
| `DBEnabled` | Persiste os logs em `mri_qadmin_logs` |
| `MaxMemory` | Tamanho do buffer em memória (os N logs mais recentes) |
| `ResourceMode` | `blacklist`: recursos não listados passam. `whitelist`: só os listados são processados |
| `ResourceEntries` | Override por recurso — permite decidir, por recurso, se vai para o banco, para o Discord e para o `ForwardEvent` |
| `Categories` | `id` (precisa bater com a categoria usada no `AddLog`) e `label` exibido no painel |

As categorias e destinos também são editáveis em runtime pela aba de configurações de logs; o que for salvo lá tem precedência sobre o `Config` (arquivo `logs_settings.json`).

Para receber logs de recursos que usam `lib.logger` do `ox_lib`, aplique o patch de [OX_LIB_PATCH.md](OX_LIB_PATCH.md). Detalhes do formato em [LOGS.md](LOGS.md).

---

## Navegador de recursos

A aba Recursos lista todos os recursos do servidor, permite start/stop/restart e traz um navegador de arquivos: explorar pastas, abrir e editar arquivos de texto, criar e excluir arquivos e pastas.

**Escrita e o sandbox do FiveM.** Desde os artifacts > 25770, o FiveM bloqueia a escrita de um recurso nos arquivos de **outro** recurso. Na prática:

- **Leitura e navegação funcionam em todos os recursos.**
- **Salvar, criar e excluir** só funcionam nos arquivos do próprio `mri_Qadmin` ou em recursos liberados explicitamente:
  ```
  add_filesystem_permission mri_Qadmin write <nome_do_resource>
  ```
  Uma linha por recurso — o FiveM não aceita wildcard. Depois de adicionar, **reinicie o `mri_Qadmin`** para reavaliar.

Quando o recurso não é gravável, o painel mostra um aviso de "somente leitura" com a linha exata a colar no `server.cfg` e desabilita os controles de escrita. A exclusão exige `qadmin.action.change_resource` **e** `qadmin.action.resource_delete`.

---

## Telas ao vivo (WebRTC)

Transmissão da tela de um jogador para o painel, para monitoramento. O backend de sinalização é escolhido em `Config.SignalingProvider`:

| Valor | Como funciona |
|---|---|
| `fivem-native` | Sinalização pelos próprios eventos do FiveM. Padrão, não exige nada extra |
| `websocket` | Usa um servidor de sinalização externo. Requer `Config.WebRTCUrl` apontando para o `mri_Qsignaling` (porta 3002 por padrão) |
| `cloudflare-sfu` | Usa o SFU da Cloudflare |

---

## Ações customizadas

`Config.Actions`, `Config.PlayerActions` e `Config.OtherActions` permitem declarar botões próprios no painel, que disparam eventos ou comandos. As ações padrão ficam em `data/default_actions.lua` (carregado via `LoadResourceFile`) e as criadas pelo painel são persistidas em `mri_qadmin_actions`.

O servidor valida o payload de cada ação antes de executá-la — só eventos explicitamente permitidos passam.

---

## Plugins

Outros recursos podem registrar uma aba própria no sidebar do painel e adicionar suas permissões ao editor de grupos.

```lua
-- no server-side do plugin (ex.: mri_Qspawn/server/main.lua)
exports['mri_Qadmin']:RegisterPlugin({
    id            = 'spawns',                  -- slug lógico do plugin
    label         = 'Spawns',
    icon          = 'car',                     -- ícone lucide-react
    resource      = 'mri_Qspawn',              -- NOME DO RESOURCE (monta a URL cfx-nui-<resource>)
    htmlPath      = 'web/build/index.html',    -- opcional
    requiredPerms = { 'mri_Qspawn.admin', 'command' },
    permDefs      = {                          -- opcional: metadados por permissão
        { id = 'mri_Qspawn.admin', label = 'Administrador', desc = 'Acesso total ao painel de spawns' },
    },
    description   = 'Gerenciador de spawns',
})
```

- `id` e `resource` são coisas diferentes: `id` é o slug do plugin, `resource` é o nome do recurso usado para montar a URL do iframe.
- A visibilidade é **OR**: o plugin aparece para quem tiver **qualquer uma** das `requiredPerms`. Sem `requiredPerms`, aparece para todos.
- A checagem usa `HasPerms`, então honra o Master Admin e os principals estendidos (`char:`, `job.`, `gang.`).
- Permissões válidas das `requiredPerms` (as que têm ponto e não são built-ins do FiveM, como `command`) entram automaticamente no editor de grupos, em uma categoria com o nome do plugin.
- Quando o recurso do plugin para, o Qadmin o remove do registry automaticamente.

Para registrar apenas permissões, sem aba no painel, use `RegisterPermissions` (ver [Entrypoints](#entrypoints-para-outros-recursos)).

---

## Banco de dados

Tabelas criadas automaticamente no start:

| Tabela | Conteúdo |
|---|---|
| `mri_qadmin_groups` | Grupos de permissão (`id`, `label`, `description`) |
| `mri_qadmin_group_permissions` | Permissões de cada grupo |
| `mri_qadmin_known_permissions` | Whitelist durável das permissões registradas por plugins — evita que um restart apague do banco permissões de plugin parado |
| `mri_qadmin_character_groups` | Vínculo `citizenid` ↔ grupo |
| `mri_qadmin_masters` | Licenses com bypass total |
| `mri_qadmin_chat` | Histórico do staff chat |
| `mri_qadmin_settings` | Configurações alteradas pelo painel (têm precedência sobre o `Config`) |
| `mri_qadmin_actions` | Ações customizadas criadas pelo painel |
| `mri_qadmin_logs` | Logs persistidos |
| `mri_qadmin_wall_colors` | Cor do ESP/wallhack por principal |
| `player_warns` | Advertências aplicadas a jogadores |

---

## Integrações

### qb-core / qbx_core

Framework base. Jogadores online e offline, jobs, gangues, dinheiro, metadata e notificações. Com `Config.QBCoreAutoSync = true`, ranks `admin`/`god` do QBCore viram membros do grupo `admin` do painel automaticamente.

### Inventário

Detectado sozinho no start (`ox_inventory`, `ps-inventory`, `lj-inventory` ou `qb-inventory`) e reavaliado sempre que um deles inicia. Sustenta a aba Itens e as ações de inventário na aba Jogadores.

### Combustível

`Config.Fuel` define qual recurso é chamado ao abastecer um veículo pelo painel: `cdn-fuel`, `ps-fuel`, `LegacyFuel` ou `ox_fuel`.

### Concessionária

Com `Config.Dealership = "mri"`, a aba Veículos gerencia o estoque do `qbx_vehicleshop`. `ps-dealerships` e `none` também são aceitos.

### mri_Qsignaling

Servidor de sinalização das telas ao vivo quando `Config.SignalingProvider = "websocket"`. O endereço vai em `Config.WebRTCUrl`.

### ox_lib (logger)

Com o patch de [OX_LIB_PATCH.md](OX_LIB_PATCH.md), qualquer recurso que use `lib.logger` com o serviço `qadmin` passa a mandar seus logs para o painel, sem precisar chamar `AddLog` diretamente.

---

## Entrypoints para outros recursos

### `RegisterPlugin` / `UnregisterPlugin` — servidor

Registram e removem uma aba do painel. Ver [Plugins](#plugins).

```lua
exports['mri_Qadmin']:RegisterPlugin({ id = 'spawns', label = 'Spawns', resource = 'mri_Qspawn', ... })
exports['mri_Qadmin']:UnregisterPlugin('spawns')
```

### `RegisterPermissions` — servidor

Adiciona permissões ao editor de grupos sem registrar uma aba. A categoria é opcional; se não existir, é criada.

```lua
exports['mri_Qadmin']:RegisterPermissions({
    { id = 'meu_resource.admin', label = 'Administrador', desc = 'Acesso total' },
    { id = 'meu_resource.view',  label = 'Visualizar' },
}, { id = 'meu_resource', label = 'Meu Resource' })
```

### `AddLog` — servidor

Envia um log para o painel (memória, banco e Discord, conforme o `Config.Logs`).

```lua
exports['mri_Qadmin']:AddLog(
    'meu_resource',   -- resource
    'players',        -- category (precisa existir em Config.Logs.Categories)
    'info',           -- level
    'Mensagem do log',
    { extra = 'dados opcionais' },
    source            -- opcional: admin responsável
)
```

Equivalente por evento, para quem não quer depender do export:

```lua
TriggerEvent('mri_Qadmin:server:AddLog', resource, category, level, message, data, source)
```

### `HasPerms` / `CheckPerms` — servidor

`HasPerms` é o predicado silencioso; `CheckPerms` é o gate que **notifica o jogador** ao negar. Os dois aceitam uma permissão ou uma lista.

```lua
if not exports['mri_Qadmin']:HasPerms(source, 'qadmin.action.ban') then return end
if not exports['mri_Qadmin']:CheckPerms(source, { 'meu_resource.admin', 'command' }) then return end
```

Os dois honram o Master Admin e conferem também contra os identifiers do jogador, o que contorna o atraso de cache do `IsPlayerAceAllowed` nativo.

### `IsPlayerInPrincipal` — servidor

Verifica se qualquer identifier do jogador pertence a um principal.

```lua
local ehAdmin = exports['mri_Qadmin']:IsPlayerInPrincipal(source, 'group.admin')
```

### `GeneratePlate` — servidor

Gera uma placa no formato `AA AA 000`, garantindo que ainda não exista no banco.

```lua
local plate = exports['mri_Qadmin']:GeneratePlate()
```

### `ToggleUI` / `OpenUI` / `IsMenuVisible` — cliente

Controlam a NUI do painel a partir de outro recurso.

```lua
exports['mri_Qadmin']:OpenUI()
exports['mri_Qadmin']:ToggleUI(false)
local aberto = exports['mri_Qadmin']:IsMenuVisible()
```

> `GetActions` está declarado no bloco `exports` do `fxmanifest.lua`, mas **não existe função global correspondente** — chamá-lo falha. Os dados de ações são obtidos pelo callback `mri_Qadmin:callback:GetActions`.

### Eventos server → client

| Evento | Descrição |
|---|---|
| `mri_Qadmin:client:OpenUI` | Força a abertura do painel no cliente |
| `mri_Qadmin:client:pluginsUpdated` | Lista de plugins visíveis para aquele jogador (já filtrada por permissão) |

---

## Localização

As strings do recurso e da UI são traduzidas via `ox_lib` locale (`ox_lib "locale"` no `fxmanifest.lua`). Os arquivos ficam em `locales/`:

- `pt-br.json` — português do Brasil
- `en.json` — inglês
- `es.json` — espanhol

O locale ativo vem da convar do `ox_lib`:

```
setr ox:locale "pt-br"
```

Os idiomas oferecidos na UI são os listados em `Config.SupportedLanguages`. Para adicionar um novo, crie `locales/<codigo>.json` seguindo a estrutura dos existentes, adicione a entrada em `Config.SupportedLanguages` e reinicie o recurso.

---

## Estrutura de arquivos

```
mri_Qadmin/
├── client/
│   ├── main.lua              — bootstrap da NUI e roteamento de callbacks
│   ├── utils.lua             — ToggleUI/OpenUI/IsMenuVisible, CheckPerms via callback
│   ├── data.lua              — cache dos dados sincronizados do servidor
│   ├── chat.lua              — staff chat
│   ├── inventory.lua         — abertura e leitura de inventários
│   ├── misc.lua              — keybinds do painel e do noclip
│   ├── notify.lua            — notificações internas
│   ├── noclip.lua            — noclip
│   ├── players.lua           — vitais, coordenadas e ações sobre jogadores
│   ├── spectate.lua          — espectar jogador
│   ├── teleport.lua          — teleportes
│   ├── toggle_laser.lua      — laser (dev mode)
│   ├── troll.lua             — ações de troll
│   ├── vehicles.lua          — spawn, conserto, mods e placa
│   ├── wall.lua              — ESP/wallhack
│   ├── world.lua             — clima e hora
│   ├── key_capture.lua       — captura de tecla para as configurações
│   ├── nearby_scanner.lua    — scanner de entidades próximas (dev mode)
│   ├── logs.lua              — logs no cliente
│   ├── webrtc.lua            — captura e envio da tela (telas ao vivo)
│   └── plugins.lua           — recebe a lista de plugins visíveis
├── server/
│   ├── db.lua                — cria as tabelas lendo o database.sql
│   ├── main.lua              — inicialização e core object
│   ├── utils.lua             — HasPerms, CheckPerms, IsPlayerInPrincipal, GeneratePlate
│   ├── permissions.lua       — definições de permissão, ACE, Master Admin, RegisterPermissions
│   ├── groups.lua            — CRUD de grupos e vínculos
│   ├── data_sync.lua         — envia definições e dados para a NUI
│   ├── logs.lua              — buffer, banco, webhooks, AddLog
│   ├── chat.lua              — staff chat e menções
│   ├── commands.lua          — comandos do painel
│   ├── players.lua           — moderação, teleporte, dinheiro, job/gangue
│   ├── inventory.lua         — operações de inventário
│   ├── inventory_callback.lua— callbacks de inventário para a NUI
│   ├── items.lua             — base de itens
│   ├── vehicle.lua           — estoque, spawn e ações de veículo
│   ├── locations.lua         — locais de teleporte
│   ├── peds.lua              — troca de model
│   ├── actions.lua           — ações customizadas e validação de payload
│   ├── settings.lua          — configurações editáveis pelo painel
│   ├── resources.lua         — start/stop/restart e gate de escrita do sandbox
│   ├── resource_fs.js        — navegação no filesystem dos recursos
│   ├── server_data.lua       — dados gerais do servidor
│   ├── spectate.lua          — espectar
│   ├── teleport.lua          — teleporte
│   ├── trolls.lua            — trolls
│   ├── wall.lua              — cores do ESP por principal
│   ├── key_manager.lua       — keybinds
│   ├── webrtc.lua            — sinalização das telas ao vivo
│   ├── updates.lua           — verificação de atualização
│   └── plugins.lua           — registry de plugins (RegisterPlugin/UnregisterPlugin)
├── shared/
│   └── config.lua            — Config, detecção de inventário, Debug e Notify
├── data/
│   ├── default_actions.lua   — ações padrão (lidas via LoadResourceFile)
│   ├── object.lua            — hash → nome de objeto (usado pelo scanner e pelo laser)
│   ├── ped.lua               — lista de peds
│   └── weapons.lua           — lista de armas
├── locales/
│   ├── pt-br.json
│   ├── en.json
│   └── es.json
├── web/build/                — UI compilada (ui_page) + tiles do mapa
├── database.sql              — todas as tabelas do recurso
├── PERMISSIONS.md            — referência completa de permissões
├── LOGS.md                   — formato e categorias de log
├── OX_LIB_PATCH.md           — patch do lib.logger para integrar logs de terceiros
└── fxmanifest.lua
```
