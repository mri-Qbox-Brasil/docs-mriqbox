# mri_Qhud — Manual

HUD completo para QBox: status do jogador, painel do veículo, bússola com nomes de rua, minimapa quadrado, sistema de stress e menu de personalização por jogador.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Configuração](#configuração)
5. [Comandos](#comandos)
6. [Menu do HUD](#menu-do-hud)
7. [Sistema de stress](#sistema-de-stress)
8. [Minimapa quadrado](#minimapa-quadrado)
9. [Integrações](#integrações)
10. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
11. [Localização](#localização)
12. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qbx_core` | Sim | Framework base. Usa `exports.qbx_core:GetPlayer`, `Notify`, `QBX.PlayerData`, `qbx.entityStateHandler` e os módulos `lib.lua` e `playerdata.lua` |
| `ox_lib` | Sim | `lib.addCommand`, `lib.callback` e locale |
| `interact-sound` | Não | Sons do menu, do reset e do alerta de combustível (`InteractSound_SV:PlayOnSource`). Sem ele, o HUD funciona em silêncio |
| `ps-buffs` | Não | Exibe buffs e enhancements no HUD. O nome do recurso vem de `Config.Buffs` |

O HUD não escreve no banco diretamente, mas depende de `Player.Functions.SetMetaData('stress', ...)` do `qbx_core` para persistir o stress.

---

## Instalação

1. Copie a pasta `mri_Qhud` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qhud
   ```
3. **Remova ou desabilite o `qb-hud` / `ps-hud`** — os dois registram os mesmos eventos (`hud:client:UpdateNeeds`, `hud:client:UpdateStress`, `hud:client:ShowAccounts`, `hud:client:OnMoneyChange`) e o mesmo comando `/resethud`, e não podem rodar juntos.
4. Não há SQL a importar.

---

## Permissões (ACE)

Apenas o comando `/dev` é restrito.

```
add_ace group.admin command.dev allow
```

---

## Configuração

Arquivo `config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.OpenMenu` | string | Sim | Tecla padrão que abre o menu do HUD. Padrão: `I`. O jogador pode remapear nas configurações do FiveM |
| `Config.UseMPH` | bool | Sim | `true` calcula a velocidade em MPH, `false` em KPH. O texto da unidade exibido na tela vem do `html/styles.css` e precisa ser trocado junto |
| `Config.DisableStress` | bool | Sim | Desliga completamente o ganho de stress no servidor |
| `Config.DisablePoliceStress` | bool | Sim | Quando `true`, jogadores com job do tipo `leo` não ganham stress |
| `Config.StressChance` | number (0–1) | Sim | Chance de ganhar stress ao disparar uma arma. Padrão: `0.1` (10%) |
| `Config.MinimumStress` | number | Sim | Nível de stress a partir do qual a tela começa a borrar. Padrão: `50` |
| `Config.MinimumSpeed` | number | Sim | Velocidade acima da qual se ganha stress **com** cinto |
| `Config.MinimumSpeedUnbuckled` | number | Sim | Velocidade acima da qual se ganha stress **sem** cinto |
| `Config.Buffs` | string | Sim | Nome do recurso de buffs consultado via export. Padrão: `ps-buffs` |
| `Config.WhitelistedWeaponArmed` | lista de hashes | Sim | Armas que **não** ativam o indicador de "armado" no HUD (latas, corpo a corpo, arremessáveis) |
| `Config.WhitelistedWeaponStress` | lista de hashes | Sim | Armas que não geram stress ao disparar |
| `Config.FuelBlacklist` | lista de strings | Sim | Modelos elétricos/sem tanque que não disparam o alerta de combustível baixo |
| `Config.Intensity.blur` | tabela | Sim | Faixas de stress (`min`/`max`) e a `intensity` do blur de tela em cada uma |
| `Config.EffectInterval` | tabela | Sim | Faixas de stress e o intervalo (`timeout`, em ms) entre os efeitos de tela. Quanto maior o stress, menor o intervalo |
| `Config.Menu` | tabela | Sim | Valores **padrão** dos toggles do menu, usados no primeiro acesso e ao resetar. Veja [Menu do HUD](#menu-do-hud) |

> As rotinas de ganho de stress por velocidade e por disparo estão comentadas no `client.lua` desta versão. `Config.StressChance`, `Config.MinimumSpeed`, `Config.MinimumSpeedUnbuckled` e `Config.WhitelistedWeaponStress` só voltam a ter efeito se esses blocos forem reativados; o stress continua chegando normalmente de outros recursos que disparem `hud:server:GainStress`.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/menu` | Todos | Abre o menu do HUD. Também ligado à tecla de `Config.OpenMenu` via `RegisterKeyMapping` |
| `/resethud` | Todos | Reinicia a renderização do HUD (útil quando algum elemento some ou trava) |
| `/cash` | Todos | Mostra o saldo em dinheiro na tela |
| `/bank` | Todos | Mostra o saldo bancário na tela |
| `/dev` | `group.admin` | Liga/desliga o modo desenvolvedor no HUD (dispara `qb-admin:client:ToggleDevmode`) |

---

## Menu do HUD

Aberto com `/menu` ou a tecla configurada. Cada toggle é salvo no KVP local `hudSettings` e recarregado no login e no start do recurso — as preferências são de cada jogador, não do servidor. O reset volta tudo para os valores de `Config.Menu`, buscados do servidor pelo callback `hud:server:getMenu`.

| Opção | Padrão | Efeito |
|---|---|---|
| `isOutMapChecked` | `false` | Mostra o minimapa fora do veículo |
| `isHideMapChecked` | `false` | Esconde o minimapa por completo |
| `isMapNotifChecked` | `true` | Notifica ao carregar o minimapa quadrado |
| `isOutCompassChecked` | `false` | Mostra a bússola fora do veículo |
| `isCompassFollowChecked` | `true` | A bússola segue a câmera em vez do heading do personagem |
| `isCompassShowChecked` | `true` | Exibe a barra da bússola |
| `isShowStreetsChecked` | `true` | Exibe os nomes das ruas na bússola |
| `isPointerShowChecked` | `true` | Exibe o ponteiro central da bússola |
| `isDegreesShowChecked` | `true` | Exibe o valor em graus |
| `isChangeCompassFPSChecked` | `true` | Atualiza a bússola a cada 50 ms em vez de todo frame (economia de FPS) |
| `isChangeFPSChecked` | `true` | Atualiza o HUD a cada 500 ms em vez de 50 ms (modo "Optimized" x "Synced") |
| `isDynamicHealthChecked` | `true` | O anel de vida só aparece quando não está cheio |
| `isDynamicArmorChecked` | `true` | Idem para o colete |
| `isDynamicHungerChecked` | `true` | Idem para a fome |
| `isDynamicThirstChecked` | `true` | Idem para a sede |
| `isDynamicStressChecked` | `true` | Idem para o stress |
| `isDynamicOxygenChecked` | `true` | Idem para o oxigênio/estamina |
| `isDynamicEngineChecked` | `true` | Idem para a saúde do motor |
| `isDynamicNitroChecked` | `true` | Idem para o nitro |
| `isLowFuelChecked` | `true` | Alerta sonoro e notificação com o tanque em 20% ou menos, repetindo a cada 1 minuto |
| `isCineamticModeChecked` | `false` | Modo cinematográfico: barras pretas e HUD oculto |
| `isCinematicNotifChecked` | `true` | Notifica ao entrar/sair do modo cinematográfico |
| `isOpenMenuSoundsChecked` | `true` | Som ao abrir/fechar o menu |
| `isResetSoundsChecked` | `true` | Som ao resetar as configurações |
| `isListSoundsChecked` | `true` | Som ao marcar/desmarcar um item da lista |

O anel de oxigênio mostra a estamina de corrida em terra e o ar restante debaixo d'água.

---

## Sistema de stress

O stress fica no metadata `stress` do personagem (`qbx_core`), de 0 a 100.

- Outros recursos aumentam ou reduzem o valor com os eventos `hud:server:GainStress` e `hud:server:RelieveStress`.
- `Config.DisableStress = true` bloqueia todo ganho; `Config.DisablePoliceStress = true` isenta jobs do tipo `leo`.
- Acima de `Config.MinimumStress`, a tela borra periodicamente. A intensidade do blur vem de `Config.Intensity.blur` e o intervalo entre os episódios vem de `Config.EffectInterval` — ambos escalonados por faixa de stress.
- Com stress em 100, além do blur o personagem cai em ragdoll e a tela pisca em fade de 2 a 4 vezes.

---

## Minimapa quadrado

O recurso substitui as texturas nativas do radar (dicionário `squaremap`), reposiciona o minimapa e corrige o offset em monitores mais largos que 16:9. O carregamento acontece no login e sempre que as configurações são recarregadas, pelo evento `hud:client:LoadMap`. O scaleform vem de `stream/minimap.gfx`.

O blip do norte é ocultado e o zoom do radar é fixado em 1000.

---

## Integrações

### ps-buffs

Se o recurso indicado em `Config.Buffs` (padrão `ps-buffs`) estiver iniciado, o HUD chama `exports[Config.Buffs]:GetBuffNUIData()` no login e ao resetar o HUD, e exibe os buffs ativos. Atualizações em runtime chegam pelos eventos `hud:client:BuffEffect` e `hud:client:EnhancementEffect`.

### interact-sound

Todos os sons (abrir/fechar menu, reset, clique nos toggles, alerta de combustível) passam por `TriggerServerEvent("InteractSound_SV:PlayOnSource", ...)`. Sem o recurso, os toggles de som do menu não têm efeito prático.

### Cinto e piloto automático

O HUD apenas escuta `seatbelt:client:ToggleSeatbelt` e `seatbelt:client:ToggleCruise` — quem controla o cinto e o cruise control é outro recurso (tipicamente o `smallresources`). O status do arnês é lido do statebag `LocalPlayer.state.seatbelt`.

### Nitro

Além do evento `hud:client:UpdateNitrous`, o HUD acompanha os statebags de entidade `nitro` e `nitroFlames` do veículo, comparando a placa para ignorar veículos de outros jogadores.

### Voz e rádio

Os indicadores de voz e rádio leem `LocalPlayer.state.proximity.distance` e `LocalPlayer.state.radioChannel`, preenchidos pelo recurso de voz/rádio do servidor.

---

## Entrypoints para outros recursos

O recurso não expõe exports. A superfície pública são eventos.

### Stress

```lua
-- do client de outro recurso
TriggerServerEvent('hud:server:GainStress', 5)
TriggerServerEvent('hud:server:RelieveStress', 10)
```

### Status do jogador e do veículo

```lua
-- servidor -> client
TriggerClientEvent('hud:client:UpdateNeeds', src, hunger, thirst)  -- 0 a 100
TriggerClientEvent('hud:client:UpdateStress', src, stress)         -- 0 a 100
TriggerClientEvent('hud:client:EngineHealth', src, engineHealth)
TriggerClientEvent('hud:client:UpdateNitrous', src, hasNitro, nitroLevel, isActive)
TriggerClientEvent('hud:client:UpdateHarness', src, harnessHp)
```

### Dinheiro

```lua
-- mostra o saldo na tela: type = 'cash' | 'bank'
TriggerClientEvent('hud:client:ShowAccounts', src, 'cash', amount)

-- animação de ganho/perda: isMinus = true para saída
TriggerClientEvent('hud:client:OnMoneyChange', src, 'cash', amount, isMinus)
```

### Toggles do HUD

```lua
TriggerEvent('hud:client:ToggleAirHud')        -- altímetro (helicóptero/avião)
TriggerEvent('hud:client:ToggleShowSeatbelt')  -- indicador de cinto
TriggerEvent('hud:client:LoadMap')             -- recarrega o minimapa quadrado
TriggerEvent('hud:client:resetStorage')        -- volta as configurações para o padrão do servidor
```

### Buffs

```lua
TriggerClientEvent('hud:client:BuffEffect', src, {
    buffName = 'strength',
    display = true,
    iconName = 'dumbbell',
    iconColor = '#00E699',
    progressValue = 80,
    progressColor = '#00E699',
})

TriggerClientEvent('hud:client:EnhancementEffect', src, {
    enhancementName = 'nightvision',
    display = true,
    iconColor = '#00E699',
})
```

### Callback

```lua
-- retorna a tabela Config.Menu (valores padrão dos toggles)
local defaults = lib.callback.await('hud:server:getMenu', false)
```

---

## Localização

As notificações são traduzidas via `ox_lib` locale. Os arquivos usados são os `locales/*.json` declarados no `fxmanifest`:

`ar`, `cs`, `da`, `de`, `en`, `es`, `fa`, `fi`, `fr`, `pt-br`

O locale ativo é definido pela convar `ox:locale` no `server.cfg`:

```
setr ox:locale "pt-br"
```

Os arquivos `.lua` em `locales/` são do sistema de tradução antigo (qb-core) e não são carregados pelo `fxmanifest` atual.

---

## Estrutura de arquivos

```
mri_Qhud/
├── client.lua              — loops de HUD, veículo e bússola, menu NUI, stress, minimapa, KVP das configurações
├── server.lua              — comandos /cash, /bank, /dev, eventos de stress e callback hud:server:getMenu
├── config.lua              — todas as opções (stress, velocidade, blacklists, padrões do menu)
├── html/
│   ├── index.html          — markup do HUD e do menu
│   ├── app.js              — lógica da NUI (status, veículo, bússola, dinheiro, buffs)
│   ├── styles.css          — estilos do HUD (contém o texto da unidade de velocidade)
│   ├── responsive.css      — ajustes por resolução
│   └── fa/                 — Font Awesome (ícones do HUD)
├── locales/
│   ├── *.json              — 10 idiomas usados via ox_lib locale
│   └── *.lua               — traduções legadas (não carregadas)
├── img/logo.png            — logo exibida no menu
├── stream/minimap.gfx      — scaleform do minimapa quadrado
└── fxmanifest.lua
```
