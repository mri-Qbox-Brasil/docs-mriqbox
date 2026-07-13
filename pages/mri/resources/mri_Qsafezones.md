# MANUAL - mri_Qsafezones

## O que o recurso faz
Sistema de zonas seguras (greenzones) para FiveM, criando áreas no mapa onde combate, dano e uso de armas são desabilitados, com indicadores visuais via blips e markers.

## Funcionalidades principais
- Criação de múltiplas zonas seguras configuráveis
- Desabilitação de combate e/ou armas dentro do raio da zona
- Indicadores visuais: blips no mapa e markers no mundo
- Regras configuráveis por zona (permitir veículos, desabilitar armas, etc.)
- Controle de permissões para quem pode entrar/sair das zonas

## Como funciona (fluxo de trabalho)
1. Zonas são configuradas no `config.lua` com centro, raio, regras e blip
2. O client verifica constantemente a posição do jogador em relação às zonas
3. Ao entrar em uma zona segura, o client desabilita combate, armas ou dano conforme configuração
4. Blips são exibidos no mapa para todas as zonas configuradas
5. O server reforça as regras para evitar bypass de client

## Opções de configuração disponíveis
Configurações por zona em `config.lua`:
| Opção | Tipo | Descrição |
|-------|------|-----------|
| `name` | string | Nome da zona segura |
| `center` | vector3 | Coordenadas do centro da zona |
| `radius` | number | Raio da zona em metros |
| `disableCombat` | boolean | Desabilita combate dentro da zona |
| `disableWeapons` | boolean | Desabilita uso de armas dentro da zona |
| `allowVehicles` | boolean | Permite veículos dentro da zona |
| `blip` | table | Configuração do blip (sprite, cor, escala) |

## Comandos disponíveis
Nenhum comando de jogo disponível (configuração via `config.lua`)

## Eventos que dispara/ouve
Eventos de verificação de posição do jogador (internos ao resource)

## Exports que fornece/consome
Nenhum export documentado (lógica interna de verificação de zona)

## Integração com outros recursos MRI Qbox
- `ox_lib`: Utilizado para detecção de zonas e notificações
- `qbx_core`: Framework principal para dados do jogador

## Casos de uso / exemplos práticos
- Criar zona segura no hospital onde combate e armas são desabilitados
- Configurar zona segura na prefeitura com blip no mapa
- Desabilitar armas apenas na zona da delegacia, permitindo combate corpo a corpo
- Permitir veículos apenas em zona segura de estacionamento

## Dicas de solução de problemas
- Zona não funciona: Verifique se o raio e centro da zona estão configurados corretamente
- Blip não aparece: Confirme as configurações de sprite e cor do blip
- Combate não desabilita: Verifique se `disableCombat` está definido como `true` no config
- Erro de detecção de zona: Confirme que o `ox_lib` está ativo e atualizado