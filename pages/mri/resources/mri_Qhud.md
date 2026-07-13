# mri_Qhud - Manual Funcional

HUD moderno para Qbox Framework com indicadores de status do jogador, veículo, bússola, minimap quadrado e sistema de stress.

## O que o recurso faz

O mri_Qhud exibe uma interface heads-up display (HUD) persistente durante o gameplay, mostrando indicadores circulares de status do jogador (vida, colete, fome, sede, stress, oxigênio), HUD do veículo (velocímetro, combustível, altitude, saúde do motor, NOS, cruise control), bússola completa com direções cardinais e nomes de ruas, além de minimap quadrado com texturas customizadas.

## Funcionalidades principais

- **Status do jogador**: Indicadores circulares para vida, colete, fome, sede, stress, oxigênio
- **HUD do veículo**: Velocímetro, combustível, altitude, saúde do motor, NOS, cruise control
- **Bússola completa**: Direções cardinais, nomes de ruas, indicador de graus
- **Minimap quadrado**: Texturas customizadas para minimap square (80 arquivos no stream/)
- **Money HUD**: Display de cash/bank com animações de mudança (+/-)
- **Sistema de stress**: Blur de tela, ragdoll/fall em níveis altos
- **Modo cinematográfico**: Barras pretas com animação suave
- **Settings menu**: Painel NUI com toggles para todos os elementos
- **PS-Buffs integration**: Display de buffs/enhancements externos
- **Alerta de combustível baixo**: Som + notificação em 20%

## Como funciona

1. Ao carregar o jogador (`QBCore:Client:OnPlayerLoaded`), o HUD inicializa e carrega settings persistidos
2. Loop contínuo atualiza indicadores baseados no estado do jogador/veículo
3. Eventos recebidos atualizam fome, sede, stress, NOS, etc.
4. Settings são persistidos via KVP (`GetResourceKvpString`/`SetResourceKvp`) + `localStorage`
5. NUI Vue.js apps gerenciam display de cada componente (money, player, vehicle, compass)

## Configurações disponíveis (config.lua)

### Opções gerais
| Opção | Padrão | Descrição |
|-------|---------|-----------|
| `Config.OpenMenu` | `'I'` | Tecla para abrir settings menu |
| `Config.StressChance` | `0.1` | 10% chance de stress por tiro |
| `Config.UseMPH` | `false` | MPH (true) ou KPH (false) |
| `Config.MinimumStress` | `50` | Stress mínimo para screen shaking |
| `Config.MinimumSpeedUnbuckled` | `50` | Velocidade causando stress sem cinto |
| `Config.MinimumSpeed` | `100` | Velocidade causando stress com cinto |
| `Config.DisablePoliceStress` | `true` | Desabilitar stress para LEO |
| `Config.DisableStress` | `false` | Desabilitar stress completamente |
| `Config.Buffs` | `'ps-buffs'` | Nome do resource de buffs |

### Settings Menu (Config.Menu)
Todos os toggles abaixo são configuráveis pelo jogador via tecla I:

| Setting | Padrão | Descrição |
|---------|---------|-----------|
| `isOutMapChecked` | `false` | Minimap a pé |
| `isOutCompassChecked` | `false` | Bússola a pé |
| `isCompassFollowChecked` | `true` | Bússola segue câmera |
| `isOpenMenuSoundsChecked` | `true` | Sons do menu |
| `isResetSoundsChecked` | `true` | Sons de reset |
| `isListSoundsChecked` | `true` | Sons de checklist |
| `isMapNotifChecked` | `true` | Notificações do mapa |
| `isLowFuelChecked` | `true` | Alerta combustível baixo |
| `isCinematicNotifChecked` | `true` | Notificações modo cinematic |
| `isDynamicHealthChecked` | `true` | Vida dinâmica |
| `isDynamicArmorChecked` | `true` | Colete dinâmico |
| `isDynamicHungerChecked` | `true` | Fome dinâmica |
| `isDynamicThirstChecked` | `true` | Sede dinâmica |
| `isDynamicStressChecked` | `true` | Stress dinâmico |
| `isDynamicOxygenChecked` | `true` | Oxigênio dinâmico |
| `isDynamicEngineChecked` | `true` | Motor dinâmico |
| `isDynamicNitroChecked` | `true` | Nitro dinâmico |
| `isChangeFPSChecked` | `true` | Modo FPS do velocímetro |
| `isHideMapChecked` | `false` | Esconder minimap |
| `isCompassShowChecked` | `true` | Mostrar bússola |
| `isShowStreetsChecked` | `true` | Nomes de ruas |
| `isPointerShowChecked` | `true` | Indicador da bússola |
| `isDegreesShowChecked` | `true` | Graus da bússola |
| `isCineamticModeChecked` | `false` | Modo cinematográfico |

## Controles

| Tecla | Ação |
|-------|------|
| **I** | Abrir settings menu |

## Comandos

| Comando | Restrito | Descrição |
|---------|----------|-----------|
| `/cash` | Não | Mostrar saldo cash |
| `/bank` | Não | Mostrar saldo bank |
| `/dev` | Admin | Toggle dev mode |

## Eventos

### Client (recebidos)
| Evento | Descrição |
|--------|-----------|
| `QBCore:Client:OnPlayerLoaded` | Carregar HUD, settings, buff data |
| `QBCore:Client:OnPlayerUnload` | Limpar dados do jogador |
| `hud:client:UpdateNeeds` | Atualizar fome/sede |
| `hud:client:UpdateStress` | Atualizar stress |
| `hud:client:ToggleShowSeatbelt` | Toggle seatbelt display |
| `hud:client:UpdateNitrous` | Atualizar NOS |
| `hud:client:UpdateHarness` | Atualizar HP do harness |
| `hud:client:EngineHealth` | Atualizar saúde do motor |
| `hud:client:BuffEffect` | Display buff progress |
| `hud:client:EnhancementEffect` | Display enhancement icon |
| `hud:client:ShowAccounts` | Popup cash/bank |
| `hud:client:OnMoneyChange` | Animação de mudança de dinheiro |
| `hud:client:ToggleHealth` | Toggle dynamic health |
| `qb-admin:client:ToggleDevmode` | Toggle dev mode |

### Server (recebidos)
| Evento | Descrição |
|--------|-----------|
| `hud:server:GainStress` | Aumentar stress do jogador |
| `hud:server:RelieveStress` | Diminuir stress do jogador |

## NUI Callbacks

| Callback | Descrição |
|----------|-----------|
| `closeMenu` | Fechar settings menu |
| `restartHud` | Restartar HUD |
| `resetStorage` | Resetar settings para padrão |
| `openMenuSounds` | Toggle sons do menu |
| `dynamicHealth` | Toggle vida dinâmica |
| `dynamicArmor` | Toggle colete dinâmico |
| `dynamicHunger` | Toggle fome dinâmica |
| `dynamicThirst` | Toggle sede dinâmica |
| `dynamicStress` | Toggle stress dinâmico |
| `dynamicOxygen` | Toggle oxigênio dinâmico |
| `dynamicEngine` | Toggle motor dinâmico |
| `dynamicNitro` | Toggle nitro dinâmico |
| `changeFPS` | Toggle FPS do velocímetro |
| `HideMap` | Toggle visibilidade do minimap |
| `showCompassBase` | Toggle base da bússola |
| `showStreetsNames` | Toggle nomes de ruas |
| `showPointerIndex` | Toggle indicador da bússola |
| `showDegreesNum` | Toggle graus |
| `cinematicMode` | Toggle modo cinematográfico |

## Indicadores de Status

| Indicador | Ícone | Descrição |
|-----------|-------|-----------|
| Health | `heart-pulse` | Vida do jogador |
| Armor | `shield` | Colete |
| Hunger | `bowl-food` | Fome |
| Thirst | `bottle-water` | Sede |
| Stress | `brain` | Stress |
| Oxygen | `lungs` | Oxigênio (submerso) |
| Armed | `stream` | Indicador de armado |
| Parachute | `parachute-box` | Paraquedas |
| Harness | `user-slash` | Harness |
| Cruise | `tachometer-alt` | Cruise control |
| NOS | `rocket` | Nitrous |
| Dev | `terminal` | Dev mode |

## NUI Components (Vue.js + Quasar)

4 Vue apps independentes:
1. **`app`** (`#menu`) — Settings menu com tabs, checkboxes, toggles
2. **`moneyHud`** (`#money-container`) — Cash/bank com slide-fade animations
3. **`playerHud`** (`#ui-container`) — Status radials com show/hide dinâmico
4. **`vehHud`** (`#veh-container`) — Velocidade, combustível, altitude, motor
5. **`baseplateHud`** (`#baseplate-container`) — Bússola SVG com direções cardinais

### Stack
- **Vue.js 3** (CDN)
- **Quasar 2** (CDN)
- **jQuery 3.7** (CDN)
- **FontAwesome 6.6** (CDN + local)
- **Google Fonts** — Robbery + Material Icons

## Integração com outros recursos MRI

### Obrigatórias
- `ox_lib` — Locale system, comandos, callbacks
- `qbx_core` — Player data, notificações
- `InteractSound` — Sons do menu

### Opcionais
- `ps-buffs` — Integração de buffs/enhancements (configurável em `Config.Buffs`)

## Exemplos práticos

### Atualizar fome/sede via evento
```lua
TriggerEvent('hud:client:UpdateNeeds', hunger, thirst)
```

### Adicionar stress via servidor
```lua
TriggerEvent('hud:server:GainStress', source, 10) -- adiciona 10 de stress
```

### Atualizar NOS via evento
```lua
TriggerEvent('hud:client:UpdateNitrous', true, 100) -- NOS ativo com 100%
```

### Mostrar mudança de dinheiro
```lua
TriggerEvent('hud:client:OnMoneyChange', 'cash', 500, 'add')
```

## Solução de problemas

- **HUD não aparece**: Verifique se o jogador carregou completamente (`OnPlayerLoaded`)
- **Settings não persistem**: O sistema usa KVP + localStorage como backup
- **Stress não aumenta**: Stress por tiro/velocidade está comentado; use evento `hud:server:GainStress`
- **Combustível baixo não alerta**: Verificação em ≤20% a cada 60 segundos; veículos elétricos são ignorados
- **Minimap não é quadrado**: Confirme que os 80 arquivos de textura estão no `stream/`
- **Comando /engine não funciona**: Está comentado no código (tecla G)
- **Alerta de combustível em veículo elétrico**: 19 veículos elétricos estão na blacklist
