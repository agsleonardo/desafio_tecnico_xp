
# Desafio Técnico XP

Este projeto foi desenvolvido para etapa de Desafio Técnico do processo seletivo dos alunos da Turma XP da Trybe.

Conforme o documento de especificação, a idéia era desenvolver uma aplicação que simulasse
ao máximo a realidade do dia a dia da XP.

Além das funcionalidades já definidas, para construção da solução decidi considerar alguns (de vários outros) pontos,
não exigidos ou abordados na ementa, mas que são importantes para o contexto.

Dentre os pontos, o fato da XP possuir mais de 3MM de clientes e mais de 715Bi sob gestão, pressupõe o alto volume
de requisições na aplicação.

Tendo isso em vista, considerando sempre o foco no cliente e na sua melhor experiência, é preciso garantir
o máximo possível disponibilidade e desempenho.

Por isso, decidi escolher uma arquitetura de microserviços, onde cada 'funcionalidade' ou módulo está encapsulado
e tem sua própria infra, não 'dependendo' de qualquer outro.

Isso garante a 'facilidade' na manutenção, mitiga o impacto de incidentes, facilita a escalabilidade horizontal,
facilita a integração e na expansão ou incremento de novas features.

# Desafios

- A dificuldade em travar o event loop em caso de multiplas chamadas assincronas
no mesmo end point, uma vez que não consegui em tempo hábil aprender e implementar uma solução de fila
ou orquestração K8s para expansão horizontal e balanciamento de carga.

- Considerando que estou usando um monorepo, usar a mesma lib do nível acima para o build dos microserviços, não precisando 'duplicar' o pacote
onde eles são comuns, como nodemon, express e eslint por exemplo.

# Aprendizados

- Precisava de uma forma para colocar todos os servidores no ar ao mesmo tempo, 
uma vez que cada um estava em uma pasta. Encontrei uma biblioteca para fazer a gestão
dos comandos assincronamente.

- Realizar um projeto estruturado em microserviços (e ainda funciona como o esperado). Este é o primeiro :D.

- Nunca havia lidado com Swagger. Foi muito bom conhecer a ferramenta e explorar suas funcionalidades. Realmente, ajuda muito com a documentação, para futuras manutenções e para consulta para construção do frontend.

- Nunca havia lidado com proxys em node, apenas middlewares de validação. Achei sensacional e experiência de conhecer e implementar um proxy como API Gateway para correto roteamento das requisições e integração dos microserviços.

# Rodando localmente

Instale as dependências, na pasta raiz.
```bash
  npm install
```

Inicie o servidor
```bash
  npm run start
```

# Rodando com Docker


```bash
  docker-compose up
```