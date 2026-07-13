# Manual do ars_ambulancejob

## Introdução
O ars_ambulancejob é um trabalho de ambulância avançado para FiveM com sistema de morte integrado, ferimentos realistas, macas, paramédicos NPC e suporte a ESX e QBCore.

## Funcionalidades Principais
- Hospitais ilimitados com garagem, farmácia, vestiários e menu de chefe próprios
- Sistema de morte integrado com camas de respawn e status salvo
- Sistema de ferimentos que exigem itens específicos para cura
- Paramédicos NPC que curam jogadores automaticamente
- Garagens de serviço com geração de veículos e livrarias
- Sistema de macas utilizáveis e transportáveis em ambulâncias
- Itens médicos: bandagem, analgésico, adrenalina com efeitos únicos
- Bolsa médica (ox_inventory) para itens de emergência
- Integração com ox_target/qb-target
- Menu de chefe para gerenciar funcionários e salários
- Comandos /911, /revive, /heal
- Registro de mortes salvo no banco de dados
- Otimizado: 0.0ms idle resmon

## Dependências
| Dependência | Obrigatório | Notas |
|------------|----------|-------|
| ox_lib | Sim | UI, notificações, zonas |
| ox_inventory | Sim | Bolsa médica, lojas, metadata de itens |
| ox_target / qb-target | Sim | Interações com jogadores |
| ESX / QBCore | Sim | Detectado automaticamente |
| qb-phone | Não | Para notificações de dispatch do 911 |

## Configuração
### Configurações Principais (`config.lua`)
```lua
Config = {
    emsJobs = { 'ambulance' },
    useOxInventory = true,
    removeItemsOnRespawn = false,
    keepItemsOnRespawn = { 'phone', 'id_card' },
    debug = false,
    clothingScript = true,
}
```

### Definição de Hospital (`data/hospitals.lua`)
```lua
{
    label = "Hospital Pillbox",
    zone = { pos = vector3(307.13, -595.05, 43.28), size = vector3(40, 40, 20) },
    blip = { enable = true, label = "Hospital", sprite = 61, color = 23, scale = 0.8 },
    garage = {
        coords = vector3(290.0, -580.0, 43.0),
        spawn = vector3(295.0, -575.0, 43.0),
    },
    pharmacy = {
        { label = "Farmácia", items = { { name = 'bandage', price = 50 } } }
    },
    clothes = { male = {...}, female = {...} }
}
```

## Comandos
| Comando | Descrição | Permissão |
|----------|-------------|-------------|
| `/911 [mensagem]` | Enviar chamada de emergência | Todos |
| `/revive [id]` | Reviver jogador específico | Trabalho EMS |
| `/revive [raio]` | Reviver todos em um raio | Trabalho EMS |
| `/heal [id]` | Curar jogador específico | Trabalho EMS |
| `/heal [raio]` | Curar todos em um raio | Trabalho EMS |

## Eventos
### Servidor
| Evento | Parâmetros | Descrição |
|--------|-------------|-------------|
| `ars_ambulancejob:updateDeathStatus` | `death = { isDead, weapon }` | Atualiza status de morte |
| `ars_ambulancejob:revivePlayer` | `data = { targetServerId }` | Revive jogador |
| `ars_ambulancejob:healPlayer` | `data = { targetServerId, injury? }` | Cura jogador |
| `ars_ambulancejob:createDistressCall` | `data = { msg, gps, location }` | Cria chamada 911 |
| `ars_ambulancejob:removAddItem` | `data = { toggle, item, quantity }` | Adiciona/remove item |
| `ars_ambulancejob:useItem` | `data = { item, value }` | Usa item médico |
| `ars_ambulancejob:reviveWithAdrenaline` | `targetPlayerId` | Revive com adrenalina |

### Cliente
| Evento | Parâmetros | Descrição |
|--------|-------------|-------------|
| `ars_ambulancejob:healPlayer` | `data` | Reproduz animação de cura |
| `ars_ambulancejob:putOnStretcher` | `data = { target, toggle }` | Coloca na maca |
| `ars_ambulancejob:togglePatientFromVehicle` | `data = { target, vehicle }` | Carrega/descarrega do veículo |

## Exports
### Servidor
| Export | Descrição |
|--------|-------------|
| `revivePlayer(source, target)` | Revive jogador |
| `healPlayer(source, target)` | Cura jogador |
| `isDead(target)` | Verifica se jogador está morto |
| `getDeathStatus(target)` | Obtém dados de morte |

### Cliente
| Export | Descrição |
|--------|-------------|
| `bandage(data, slot)` | Usa bandagem |
| `analgesic(data, slot)` | Usa analgésico |
| `isDead()` | Verifica se jogador local está morto |

## Solução de Problemas
- **Itens não funcionam**: Certifique-se de que o ox_inventory está iniciado antes do ars_ambulancejob.
- **Target não aparece**: Verifique se o ox_target ou qb-target está instalado e configurado.
- **Hospitais não carregam**: Confira se o `data/hospitals.lua` está configurado corretamente com coordenadas válidas.
