# Manual do bob74_ipl

## Introdução
O bob74_ipl é o carregador de IPL definitivo para FiveM, responsável por corrigir buracos no mapa, carregar interiores faltantes e permitir a personalização de todos os interiores de DLC do GTA V e GTA Online.

## Funcionalidades Principais
- Correção de buracos no mapa (Zancudo, pontes, etc.)
- Carregamento de interiores do GTA V single-player (Michael, Franklin, Trevor, etc.)
- Suporte a apartamentos GTA Online (alto, médio e baixo padrão)
- Personalização de escritórios CEO, clubhouses de motoclubes, garagens Import/Export
- Suporte a todos os DLCs: High Life, Heists, Executives, Bikers, Gunrunning, Smuggler's Run, Doomsday, After Hours, Diamond Casino, Cayo Perico, Tuners, The Contract, Drug Wars, Mercenaries, Chop Shop, Bottom Dollar Bounties, Agents of Sabotage, Money Fronts, A Safehouse in the Hills

## Dependências
Nenhuma. É um recurso standalone, mas requer a build do jogo correspondente para DLCs específicos (ex: build 2060+ para Diamond Casino).

## Configuração
Toda configuração é feita editando os arquivos de DLC correspondentes. Exemplo para apartamento GTA Online:

```lua
-- gta_online/apartment_hi_1.lua
GTAOApartmentHi1 = {
    Enable = function()
        EnableIpl({ "apa_v_mp_h_01_c" })
    end,
    LoadDefault = function()
        GTAOApartmentHi1.Enable()
        GTAOApartmentHi1.Style.Set(4)          -- Estilo 4
        GTAOApartmentHi1.Numbering.Set(0)      -- Numeração 0
        GTAOApartmentHi1.WallFloor.Set(0, 0)   -- Parede 0, Piso 0
        GTAOApartmentHi1.TVScreen.Set(0)       -- Tela de TV 0
    end,
}
```

Exemplo para personalizar escritório CEO:

```lua
-- dlc_finance/office1.lua
FinanceOffice1 = {
    LoadDefault = function()
        FinanceOffice1.Enable()
        FinanceOffice1.Style.Set(2)           -- Estilo moderno
        FinanceOffice1.Wall.Set(3)            -- Cor da parede 3
        FinanceOffice1.Floor.Set(1)           -- Estilo do piso 1
        FinanceOffice1.Safe.Set(1, 1)        -- Modelo do cofre 1, variante 1
    end,
}
```

## Objetos de Interior Disponíveis
Os objetos de interior são expostos globalmente e podem ser acessados de outros recursos:

| Objeto | Descrição |
|--------|-------------|
| `Michael` | Casa do Michael |
| `Franklin` | Casa do Franklin |
| `TrevorsTrailer` | Trailer do Trevor |
| `PillboxHospital` | Hospital Pillbox |
| `GTAOApartmentHi1` – `8` | Apartamentos de alto padrão |
| `FinanceOffice1` – `4` | Escritórios CEO |
| `BikerCocaine` – `WeedFarm` | Negócios de motoclubes |
| `ImportCEOGarage1` – `4` | Garagens Import/Export |
| `GunrunningBunker` | Bunker Gunrunning |
| `DoomsdayFacility` | Facility |
| `DiamondCasino` | Diamond Casino |
| `DiamondPenthouse` | Penthouse |
| `CayoPericoBase` | Cayo Perico |
| ... | Consulte a wiki para lista completa |

## Exemplo de Personalização Externa
```lua
AddEventHandler('onResourceStart', function(resourceName)
    if resourceName == 'bob74_ipl' then
        Citizen.Wait(1000)
        -- Personalizar Penthouse do Diamond Casino
        DiamondPenthouse.Enable()
        DiamondPenthouse.Wall.Set(2)
        DiamondPenthouse.Floor.Set(1)
        DiamondPenthouse.Ceiling.Set(0)
    end
end)
```

## Comandos
Nenhum comando necessário. Todo carregamento é automático baseado no número de build do jogo.

## Solução de Problemas
- **Interiores de DLC não carregam**: Certifique-se de que o `sv_enforceGameBuild` está definido para a build correspondente no `server.cfg` (ex: `set sv_enforceGameBuild 3717` para o DLC mais recente).
- **Erro ao carregar IPL**: Verifique se o arquivo de DLC correspondente não foi editado incorretamente.
- **Interiores não personalizados**: Aguarde 1 segundo após o início do recurso bob74_ipl para aplicar personalizações externas.
