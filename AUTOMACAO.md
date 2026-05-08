# Automação de Atualização de Documentação

Este guia explica como automatizar a atualização da documentação quando um README é alterado em qualquer repositório.

## Como funciona

1. O repositório `docs-mriqbox` agora escuta eventos `repository_dispatch` do tipo `update-readme`
2. Quando um repositório altera seu README, ele envia um evento para `docs-mriqbox`
3. O `docs-mriqbox` baixa apenas o README atualizado e faz commit/push automaticamente

## Configuração nos repositórios de recursos

### 1. Criar um Personal Access Token (PAT)

No GitHub, vá em Settings > Developer settings > Personal access tokens > Tokens (classic):
- Generate new token (classic)
- Nome: `docs-mriqbox-update`
- Expiração: No expiration (ou conforme sua política)
- Permissões: `repo` (acesso a repositórios privados) ou `public_repo` (apenas públicos)
- Copie o token gerado

### 2. Adicionar o token como secret no repositório de recursos

No repositório que terá o README atualizado (ex: `mri_Qmenu`):
- Settings > Secrets and variables > Actions
- New repository secret
- Name: `DOCS_REPO_TOKEN`
- Value: (cole o PAT criado no passo 1)

### 3. Adicionar o workflow no repositório de recursos

Crie o arquivo `.github/workflows/notify-docs.yml` no repositório de recursos:

```yaml
name: Notify Docs Update

# Este workflow deve ser adicionado aos repositórios que querem notificar a documentação
# Copie este arquivo para .github/workflows/update-docs.yml no repositório desejado

on:
  push:
    branches: [main, master]
    paths:
      - MANUAL.md  # Só dispara quando o MANUAL for alterado
  workflow_dispatch:  # Permite execução manual

env:
  FRIENDLY_NAME: "Nome Amigável Aqui"  # ⚠️ Altere para o nome que aparecerá na sidebar

jobs:
  notify-docs:
    name: Notify Documentation Repo
    runs-on: ubuntu-latest
    steps:
      - name: Disparar atualização na documentação
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.GH_TOKEN }}  # PAT com acesso ao repo da documentação
          repository: mri-Qbox-Brasil/docs-mriqbox  # Ajuste conforme necessário
          event-type: update-manual
          client-payload: '{"org": "mri-Qbox-Brasil", "repo": "${{ github.event.repository.name }}", "name": "${{ env.FRIENDLY_NAME }}"}'

```

### 4. Repetir para todos os repositórios

Adicione o workflow acima em cada repositório que deve publicar documentação. Não é necessário cadastrar o repositório em nenhuma lista — o processo é 100% automático.

## Fluxo atual vs Novo fluxo

### Antes (manual):
1. Alterar README no repositório de recursos → commit/push
2. Alterar algo no `docs-mriqbox` ou esperar o cron job diário
3. Workflow baixa TODOS os READMEs novamente

### Agora (automático):
1. Alterar `MANUAL.md` no repositório de recursos → commit/push
2. Workflow no repositório de recursos dispara evento automaticamente
3. `docs-mriqbox` recebe o evento e baixa APENAS aquele `MANUAL.md`
4. Commit e push automático no `docs-mriqbox`

## Troubleshooting

### O evento não está disparando
- Verifique se o secret `DOCS_REPO_TOKEN` está configurado corretamente
- Verifique se o PAT tem as permissões necessárias
- Confira se o arquivo `.github/workflows/notify-docs.yml` está na branch correta (main/master)

### O docs-mriqbox não está recebendo o evento
- Verifique os logs do workflow `notify-docs` no repositório de recursos
- Confira se o `repository` no campo `repository-dispatch` está correto
- Verifique se o `event-type` é exatamente `update-manual`
