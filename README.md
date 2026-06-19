# Pipeline de Integração Contínua com GitHub Actions

## Objetivo

Implementar uma pipeline de Integração Contínua (CI) para um projeto JavaScript com testes automatizados, validação de qualidade de código e geração de relatórios.

A solução utiliza GitHub Actions para executar verificações automáticas em diferentes cenários, garantindo que alterações no código mantenham os padrões de qualidade estabelecidos pelo projeto.

---

# Tecnologias Utilizadas

* GitHub Actions
* Node.js
* Jest
* jest-junit
* ESLint
* Prettier

---

# Funcionalidades Implementadas

## 1. Execução por Push

A pipeline é executada automaticamente sempre que ocorre um push nas branches configuradas:

```yaml
push:
  branches:
    - main
    - develop
    - feature/**
```

Benefício:

* Validação automática das alterações enviadas ao repositório.

---

## 2. Execução Manual

A execução manual é disponibilizada através do evento:

```yaml
workflow_dispatch:
```

No GitHub:

```text
Actions
└── CI Pipeline
    └── Run workflow
```

Benefício:

* Permite validar o projeto sob demanda sem necessidade de realizar um commit.

---

## 3. Execução Agendada

A pipeline também é executada automaticamente todos os dias às 03:00 UTC:

```yaml
schedule:
  - cron: '0 3 * * *'
```

Benefício:

* Detecta falhas causadas por mudanças em dependências externas ou ambiente de execução.

---

# Arquitetura da Pipeline

A pipeline foi dividida em múltiplos jobs seguindo o princípio de separação de responsabilidades.

```text
format ──┐
          ├── tests ──► summary
lint ─────┘
```

---

# Jobs da Pipeline

## Job: Format

Responsável por validar a formatação do código utilizando Prettier.

Comando executado:

```bash
npm run format:check
```

Objetivo:

* Garantir padronização visual do código.
* Evitar divergências de estilo entre desenvolvedores.

---

## Job: Lint

Responsável pela análise estática utilizando ESLint.

Comando executado:

```bash
npm run lint
```

Objetivo:

* Detectar erros de sintaxe.
* Identificar más práticas de desenvolvimento.
* Aplicar padrões de qualidade definidos pelo projeto.

---

## Job: Tests

Executado apenas após a conclusão dos jobs de formatação e lint.

Dependências:

```yaml
needs:
  - format
  - lint
```

Comando executado:

```bash
npm run test:ci
```

Objetivo:

* Executar os testes automatizados.
* Gerar cobertura de código.
* Produzir relatórios de execução.

---

## Job: Summary

Responsável por gerar um resumo da execução da pipeline utilizando o GitHub Step Summary.

Objetivo:

* Facilitar a visualização dos resultados diretamente na execução do workflow.

---

# Cobertura de Testes

A cobertura é gerada automaticamente pelo Jest.

Configuração recomendada:

```json
{
  "jest": {
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

Caso a cobertura fique abaixo dos limites definidos, a pipeline será interrompida com falha.

---

# Relatórios Gerados

## Relatório de Testes

Gerado através do plugin:

```bash
jest-junit
```

Arquivo:

```text
test-results/junit.xml
```

Formato:

* JUnit XML

Objetivo:

* Integração com ferramentas de qualidade.
* Histórico de execuções.

---

## Relatório de Cobertura

Gerado automaticamente pelo Jest.

Diretório:

```text
coverage/
```

Conteúdo:

```text
coverage/
├── lcov-report/
├── coverage-final.json
└── lcov.info
```

Objetivo:

* Medir o percentual de código coberto por testes automatizados.

---

# Publicação de Artefatos

Os relatórios são armazenados como artefatos da execução utilizando:

```yaml
uses: actions/upload-artifact@v4
```

Artefatos publicados:

| Artefato        | Conteúdo             |
| --------------- | -------------------- |
| test-report     | Resultado dos testes |
| coverage-report | Cobertura de código  |

---

# Como Acessar os Relatórios

1. Acesse o repositório no GitHub.
2. Clique na aba **Actions**.
3. Selecione uma execução da pipeline.
4. Navegue até a seção **Artifacts**.
5. Faça download dos artefatos desejados.

---

# Fluxo Completo da Execução

```text
Push / Manual / Schedule
            │
            ▼
      Checkout Código
            │
            ▼
     ┌─────────────┐
     │   Format    │
     └─────────────┘
            │
            ▼
     ┌─────────────┐
     │    Lint     │
     └─────────────┘
            │
            ▼
     ┌─────────────┐
     │    Tests    │
     │             │
     │ - Jest      │
     │ - Coverage  │
     │ - JUnit XML │
     └─────────────┘
            │
            ▼
     ┌─────────────┐
     │   Summary   │
     └─────────────┘
            │
            ▼
      Publicação de
        Artefatos
```

---

# Benefícios da Solução

## Integração Contínua

Executa validações automaticamente sempre que novas alterações são enviadas ao repositório.

## Qualidade de Código

Garante conformidade com padrões de desenvolvimento através do ESLint e Prettier.

## Confiabilidade

Executa testes automatizados e monitora a cobertura do código.

## Rastreabilidade

Mantém histórico completo dos resultados por meio dos artefatos publicados.

## Escalabilidade

A arquitetura baseada em múltiplos jobs facilita futuras expansões da pipeline, como:

* SonarQube
* SAST
* Testes E2E
* Build Docker
* Deploy automatizado

---

# Resultado Esperado

Ao final de cada execução a pipeline deve:

* Validar a formatação do código.
* Executar análise estática.
* Executar testes automatizados.
* Gerar relatório JUnit.
* Gerar cobertura de testes.
* Publicar relatórios como artefatos.
* Disponibilizar um resumo da execução no GitHub Actions.

Dessa forma, a solução atende aos requisitos de Integração Contínua, automação de testes, qualidade de código e rastreabilidade dos resultados.
