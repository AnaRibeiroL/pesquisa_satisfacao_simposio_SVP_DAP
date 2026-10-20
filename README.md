# Pesquisa de Satisfação – Simpósio Seção de Veteranos e Pensionistas (SVP / DAP 2026)

Aplicação web oficial de pesquisa de satisfação institucional e consolidação estatística desenvolvida para o **Simpósio da Seção de Veteranos e Pensionistas da Diretoria de Assistência ao Pessoal (DAP / DGP)**, realizado no Auditório do Comando Militar do Planalto (CMP), Brasília - DF, de 19 a 22 de outubro de 2026.

---

## 🌐 Link Público da Aplicação em Produção

Acesse e responda à pesquisa diretamente pelo link público oficial:  
👉 **https://anaribeirol.github.io/pesquisa_satisfacao_simposio_SVP_DAP/**

---

## 📋 Estrutura das Seções da Pesquisa

1. **Seção 01: Identificação & Perfil Institucional (Opcional)**
   - Posto/Graduação ou Cargo (com atalhos rápidos)
   - Organização Militar (OM) / RM de Origem
   - Região Militar (1ª a 12ª RM e DAP/DGP)
   - Tempo de atuação no atendimento a Veteranos e Pensionistas
   - Primeira participação no Simpósio ou edições anteriores

2. **Seção 02: Avaliação da Logística e Infraestrutura (Escala 1 a 5)**
   - Período em que o Simpósio foi realizado
   - Duração do Simpósio
   - Organização geral e infraestrutura (Auditório CMP)
   - Deslocamento do Hotel de Trânsito (HT) para o Local do Evento
   - Recepção, credenciamento e apoio da equipe organizadora
   - Qualidade dos Coffee Breaks e refeições de confraternização
   - Recursos audiovisuais, climatização e acústica do Auditório CMP

3. **Seção 03: Avaliação da Programação e Instruções (Escala 1 a 5)**
   - Tempos destinados às instruções e palestras
   - Relevância dos temas abordados na programação
   - Qualidade técnica e didática das palestras apresentadas
   - Espaço destinado para dúvidas e debates com a plenária
   - Clareza nas orientações sobre legislação, normas e sistemas de pensões
   - Qualidade técnica e utilidade dos materiais de apoio / slides

4. **Seção 04: Opinião em Caráter Geral sobre o Simpósio (Escala 1 a 5 + Texto)**
   - Avaliação geral em relação às expectativas institucionais
   - Contribuição do Simpósio para a integração entre as Seções e a Diretoria (DAP)
   - Grau de aplicabilidade prática dos conhecimentos no retorno à OM/RM
   - Cumprimento dos horários e pontualidade do cronograma
   - Comentários gerais sobre o evento (texto longo)

5. **Seção 05: Considerações Finais e Contribuições para 2027**
   - Principais pontos fortes do Simpósio DAP 2026
   - Sugestões de melhoria apontadas para os próximos eventos
   - Sugestões de temas para o Simpósio de 2027
   - Inovações e boas práticas da sua RM para compartilhar na próxima edição
   - Sugestões de oficinas práticas e estudos de caso

---

## 🚀 Recursos do Sistema

- **Dois Modos de Resposta:** Passo a Passo com barra de progresso ou Página Única contínua.
- **Salvamento Automático de Rascunho:** As respostas são salvas no navegador para evitar perdas acidentais.
- **Comprovante Institucional com Protocolo:** Ao concluir, gera comprovante com número de protocolo (ex: `DAP-2026-0895`) e opção de impressão/salvar em PDF.
- **Painel Executivo de Resultados (Dashboard):**
  - Médias por dimensão e por pergunta;
  - Representatividade gráfica das 12 Regiões Militares;
  - Compilação dos temas sugeridos para 2027;
  - Tabela com respostas individuais;
  - Exportação completa para **Planilha CSV (Excel)** e **JSON**.
- **Gerador de QR Code Integrado:** Botão para projeção no telão do Auditório CMP e impressão de cartazes em folha A4.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Persistência:** Local Storage + planilha central no Google Sheets (ver `planilha/LEIA-ME.md`)
- **Identidade Visual:** Tipografia *Cinzel* e *Plus Jakarta Sans*, cores oficiais do Exército Brasileiro

---

## 💻 Como Rodar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/AnaRibeiroL/pesquisa_satisfacao_simposio_SVP_DAP.git

# 2. Entrar na pasta
cd pesquisa_satisfacao_simposio_SVP_DAP

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse em: `http://localhost:3000`

---

## 🚀 Publicação (GitHub Pages)

Em **Settings > Pages**, escolha **Source: GitHub Actions**. A cada push na `main` o workflow compila e publica o site.

---

## 🏛️ Realização

- **Diretoria de Assistência ao Pessoal (DAP)**
- **Departamento-Geral do Pessoal (DGP)**
- **Comando Militar do Planalto (CMP)**
- **Exército Brasileiro**
