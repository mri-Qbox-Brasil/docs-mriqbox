# Manual do qbx_smallresources

Coleção de pequenos scripts utilitários para o Qbox — pacote de funcionalidades menores essenciais e melhorias de qualidade de vida.

> ⚠️ **AVISO: Este recurso está descontinuado** e será desconstruído em futuras versões. Nenhum novo código será adicionado.

## Funcionalidades por Script

### 🍔 qbx_consumables
**Consumíveis e efeitos de drogas**
- Comer/beber alimentos, bebidas e drogas
- Itens suportados: sanduíche, água, cerveja, vodka, etc.
- Efeitos visuais e de status pelo uso de drogas
- Atualiza fome, sede e estresse

**Configuração** (`qbx_consumables/config.json`):
```json
{
    "sandwich": {
        "type": "food",
        "hunger": 30,
        "thirst": 0,
        "stress": -5,
        "duration": 5000
    },
    "water_bottle": {
        "type": "drink",
        "hunger": 0,
        "thirst": 40,
        "stress": -10,
        "duration": 3000
    }
}
```

### 🚫 qbx_entitiesblacklist
**Remoção de quedas de armas**
- Remove quedas de armas padrão do GTA
- Limpa o mapa de itens indesejados

### 🚗 qbx_removeentities
**Controle de spawns e procurado**
- Remove spawns de veículos padrão do GTA (aviões, helicópteros, emergência)
- Remove sistema de procurado padrão do GTA
- Limpa entidades indesejadas do mapa

### 🚨 qbx_disableservices
**Remoção de NPCs de emergência**
- Remove NPCs de serviço de emergência padrão do GTA
- Limpa ambulâncias, policiais e bombeiros AI

### 🎯 qbx_weaponanimation
**Animações de arma**
- Animações de sacar/guardar armas
- Transições suaves entre combat e holster

### 📍 qbx_teleports
**Teletransportes**
- Criar marcadores de teletransporte entre locais
- Configuração via `qbx_teleports/config.json`

**Configuração** (`qbx_teleports/config.json`):
```json
{
    "teleports": [
        {
            "from": {"x": 306.96, "y": -601.33, "z": 43.28},
            "to": {"x": 1847.29, "y": 3676.73, "z": 33.68},
            "name": "Hospital para Sandy"
        }
    ]
}
```

### 🎯 qbx_recoils
**Recuo de arma**
- Recuo realista específico para cada arma
- Configuração via `qbx_recoils/config.json`

**Configuração** (`qbx_recoils/config.json`):
```json
{
    "WEAPON_PISTOL": 2.5,
    "WEAPON_CARBINERIFLE": 3.0,
    "WEAPON_SNIPERRIFLE": 1.5
}
```

### 🏃 qbx_tackle
**Derrubar**
- Derrubar jogadores correndo
- Tecla: `E` enquanto corre

### 🔫 qbx_itempickup
**Coleta de itens**
- Comportamentos personalizados de coleta
- Munição infinita para extintor e galão de gasolina

### 🖥️ qbx_hudcomponents
**Componentes de HUD**
- Remove HUDs padrão do GTA (roda de armas, dinheiro, etc.)
- Limpa a interface para HUD customizada

### 🚗 qbx_vehicleradio
**Rádio do veículo**
- Configurar estações de rádio do veículo
- Configuração via `qbx_vehicleradio/config.json`

### 🚗 qbx_vehiclepush
**Empurrar veículo**
- Empurrar veículos quebrados/sem combustível
- Auxílio em situações de emergência

### 🅿️ qbx_noshuff
**Sem shuffle**
- Desativa o embaralhamento de assento
- Mantém o jogador no mesmo assento

### 🚗 qbx_flipvehicle
**Virar veículo**
- Virar veículos capotados
- Recuperação de veículos acidentados

### 🎮 qbx_crouch
**Agachar**
- Alternar agachar com atalho
- Tecla: `Z` ou tecla personalizada

### 😵 qbx_stun
**Atordoar**
- Atordoa jogadores com certas ações
- Efeitos visuais e controle

### 🎮 qbx_afk
**Kick AFK**
- Expulsa automaticamente jogadores AFK
- Limpa servidor de inativos

### 🚫 qbx_ignore
**Zonas de ignorar**
- Define zonas onde certas funcionalidades estão desativadas
- Configuração por zona

## Keybindings

| Tecla | Recurso | Descrição |
|----------|-----------|-------------|
| `E` | qbx_tackle | Derrubar jogador próximo enquanto corre |
| `Z` ou Personalizada | qbx_crouch | Alternar posição de agachado |

## Estrutura de Arquivos

```
qbx_smallresources/
├── qbx_consumables/       # Comida, bebida, drogas
├── qbx_tackle/           # Derrubar jogadores
├── qbx_teleports/        # Teletransportes
├── qbx_recoils/          # Recuo de armas
├── qbx_vehicleradio/     # Rádio do veículo
├── qbx_vehiclepush/      # Empurrar veículos
├── qbx_flipvehicle/      # Virar veículos
├── qbx_crouch/           # Agachar
├── qbx_stun/             # Atordoar
├── qbx_noshuff/          # Sem shuffle
├── qbx_hudcomponents/    # Remover HUD
├── qbx_disableservices/  # Remover NPCs
├── qbx_removeentities/   # Remover spawns
├── qbx_entitiesblacklist/ # Blacklist entidades
├── qbx_itempickup/       # Coleta de itens
├── qbx_editor/           # Utilitários editor
├── qbx_afk/              # Kick AFK
└── qbx_ignore/           # Zonas ignorar
```

## Dependências

| Dependência | Versão Mínima | Obrigatória |
|------------|-------------------|----------|
| ox_lib | - | ✅ |
| qbx_core | - | ✅ |

## Uso

Cada sub-recurso é carregado automaticamente via padrão curinga no fxmanifest.lua:
```lua
client_scripts {
    '**/client.lua'
}
server_scripts {
    '**/server.lua'
}
```

## Desativação de Funcionalidades

Para desativar uma funcionalidade específica:
1. Renomeie a pasta (ex: `qbx_tackle` → `_qbx_tackle`)
2. Ou remova a pasta completamente
3. Reinicie o recurso

## Solução de Problemas

### Funcionalidade não funciona
- Verifique se a pasta existe e está nomeada corretamente
- Confirme que o arquivo client.lua ou server.lua existe
- Verifique os logs do console para erros

### Conflito com outros recursos
- Verifique se outro recurso não está sobrepondo a funcionalidade
- Desative temporariamente para testar
- Ajuste a ordem no server.cfg se necessário

### Configuração não aplica
- Verifique o arquivo config.json da funcionalidade específica
- Confirme que o JSON está formatado corretamente
- Reinicie o recurso após alterações

### Recursos de HUD conflitando
- qbx_hudcomponents remove HUDs padrão
- Desative se usar uma interface personalizada que dependa deles
- Verifique sobreposição com outros recursos de HUD
