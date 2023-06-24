
## Requisitos funcionais

A url base da API é 'https://games-test-api-81e9fb0d564a.herokuapp.com/api'

- O projeto deve ser feito usando React ou Next.JS
- Obter a lista de jogos em `/data`
- Apresentar um loader enquanto os dados são obtidos
- Apresentar os jogos em três colunas (no computador)
- Em cada card apresentar o título e imagem pelo ao menos
- Lidar com a responsividade, para que fique bem apresentado no computador, tablets ou celular
- Quando a API retornar o `status code` 500, 502, 503, 504, 507, 508 ou 509 apresentar ao usuário `O servidor fahou em responder, tente recarregar a página`
- Caso a API retorne outros erros, apresentar `O servidor não conseguirá responder por agora, tente voltar novamente mais tarde`
- Ao realizar uma chamada, não esperar mais que 5 segundos pelo retorno. Se os dados demorarem mais de 5 segundos para retornar apresentar `O servidor demorou para responder, tente mais tarde`
- Sempre que apresentar uma mensagem para o usuário, ou tiver os dados em mãos para apresentar, ocultar o loader
- Incluir um campo de busca, que permite localizar jogos pelo título, com busca case insensitive
- Uma vez que tenha os dados em mãos, veja quais `genre` foram retornados e permita ao usuário selecionar um deles, e então filtre para exibir apenas jogos do gênero selecionado

- o site foi feito usando ReactJS(vite)
- fiz a postagem usando vercel abaixo o site.
- https://projeto-appmaster.vercel.app/

- Primeira imagem do site 
- ![image](https://github.com/juliout/projeto-appmaster/assets/81329552/deede8aa-12e5-4e03-aeca-15e52b2be94b)
- 
- segunda imagem , com os filtros abertos
- ![image](https://github.com/juliout/projeto-appmaster/assets/81329552/e3b4dbd4-aa02-4cb6-a532-c827276144a0)
