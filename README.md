## Requisitos funcionais

-  primeiramente gostaria de agradecer pela oportunidade, e pedir desculpas por alguns erros de criação e mais facil vizualização do projeto e dos componentes; tem algumas coisas que eu poderia melhorar, porem tive alguns problemas pessoais e não pude fazer uma forma mais clara. mas fiz tudo que foi pedido. Obrigado novamente, até...

A url base da API é 'https://games-test-api-81e9fb0d564a.herokuapp.com/api'

-  O projeto deve ser feito usando React ou Next.JS
-  Obter a lista de jogos em `/data`
-  Apresentar um loader enquanto os dados são obtidos
-  Apresentar os jogos em três colunas (no computador)
-  Em cada card apresentar o título e imagem pelo ao menos
-  Lidar com a responsividade, para que fique bem apresentado no computador, tablets ou celular
-  Quando a API retornar o `status code` 500, 502, 503, 504, 507, 508 ou 509 apresentar ao usuário `O servidor fahou em responder, tente recarregar a página`
-  Caso a API retorne outros erros, apresentar `O servidor não conseguirá responder por agora, tente voltar novamente mais tarde`
-  Ao realizar uma chamada, não esperar mais que 5 segundos pelo retorno. Se os dados demorarem mais de 5 segundos para retornar apresentar `O servidor demorou para responder, tente mais tarde`
-  Sempre que apresentar uma mensagem para o usuário, ou tiver os dados em mãos para apresentar, ocultar o loader
-  Incluir um campo de busca, que permite localizar jogos pelo título, com busca case insensitive
-  Uma vez que tenha os dados em mãos, veja quais `genre` foram retornados e permita ao usuário selecionar um deles, e então filtre para exibir apenas jogos do gênero selecionado

👉 Item que foi atualizado, para ficar mais claro

-  Utilizar Firebase para realizar autenticação usando email/senha
-  Ter um 🩶 para o usuário favoritar o jogo diretamente na lista, ficando vermelho quando marcado
-  Salvar no firebase os jogos favoritos do usuário, no realtime ou firestore
-  Ter um botão “Favoritos” que apresenta apenas jogos favoritados, permitindo ainda buscar e filtrar estes jogos. Pode ser na própria lista já apresentada ou em uma separada se preferir.
-  Ao lado do coração, ter ★★★★ para o usuário avaliar o jogo, podendo marcar de uma em uma. Ou seja, ele pode escolher 1, 2, 3 ou as 4.
-  Ter uma forma de ordenar por avaliação, vendo os melhores (ou piores) primeiro, clicando novamente para inverter a ordem.
-  Ao carregar a interface, deixar o ❤️ vermelho para os itens favoritos e as ⭐️ amarelas nos itens avaliados
-  Ao acessar sem estar autenticado, os ícones 🩶 e ★ deverão estar visíveis, mas ao clicar irá solicitar a autenticação
-  👉 Ao obter os jogos da API e os dados do firebase, apresentar. Manter o loading para os jogos. Não precisa de loading enquanto espera o firebase, até porque o firebase devolverá os dados mais rapidamente e pode ser complicado “esperar o firebase” se estiver “escutando o firebase”.
-  A autenticação deve acontecer na rota `/auth/` do frontend, usando o provedor “E-mail/senha” do firebase, onde o usuário poderá criar uma conta ou acessar a conta já existente (se mantendo apenas nesta rota)
-  Escolher um item para aplicar uma animação com CSS, pode ser ao favoritar, ou avaliar, ou quando os itens surgirem
-  Publicar seu projeto online para testarmos (na mesma url de antes)

-  o site foi feito usando ReactJS(vite)
-  fiz a postagem usando vercel abaixo o site.
-  https://projeto-appmaster.vercel.app/

-  Primeira imagem do site
-  ![image](https://github.com/juliout/projeto-appmaster/assets/81329552/5051bf29-a899-4207-937d-03e96dd42119)

-  segunda imagem , com os filtros abertos
   ![image](https://github.com/juliout/projeto-appmaster/assets/81329552/20105ec9-4ea1-460e-b456-618af3c808c7)

-pagina de likeds
![image](https://github.com/juliout/projeto-appmaster/assets/81329552/af440d42-fc4d-4e74-b47a-5f13d93431cc)
