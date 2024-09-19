import Product from "../../models/Product";
import {initMongoose} from "../../lib/mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Conectando ao MongoDB
      await initMongoose();

      // Limpando a coleção de produtos
      await Product.deleteMany({});

   

// Dados para popular o banco de dados
const products = [
  // Categoria: Pizza
  {
    name: "Pizza Margherita",
    category: "Pizza",
    description: "Clássica pizza Margherita com molho de tomate, mozzarella e manjericão.",
    ingredients: ["Tomate", "Mozzarella", "Manjericão", "Azeite", "Sal", "Pimenta"],
    price: 49.99,
    picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pizza_Margherita%2C_Stara_Zagora%2C_Bulgaria.jpg/800px-Pizza_Margherita%2C_Stara_Zagora%2C_Bulgaria.jpg?20210823164622" },
  {
    name: "Pizza Pepperoni",
    category: "Pizza",
    description: "Pizza com molho de tomate, mozzarella e fatias de pepperoni.",
    ingredients: ["Tomate", "Mozzarella", "Pepperoni", "Azeite", "Sal"],
    price: 54.99,
    picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pizza_from_Round_Table_Pizza_-_January_2023_-_Sarah_Stierch_02.jpg/640px-Pizza_from_Round_Table_Pizza_-_January_2023_-_Sarah_Stierch_02.jpg"},
  {
    name: "Pizza Quattro Stagioni",
    category: "Pizza",
    description: "Pizza com quatro coberturas distintas: presunto, cogumelos, alcachofras e azeitonas.",
    ingredients: ["Tomate", "Mozzarella", "Presunto", "Cogumelos", "Alcachofras", "Azeitonas"],
    price: 59.99,
    picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pizza_quattro_stagioni.jpg/640px-Pizza_quattro_stagioni.jpg"
  },
  {
    name: "Pizza Hawaiana",
    category: "Pizza",
    description: "Pizza com molho de tomate, mozzarella, presunto e abacaxi.",
    ingredients: ["Tomate", "Mozzarella", "Presunto", "Abacaxi"],
    price: 55.99,
    picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Hawaiian_pizza_image.jpg/640px-Hawaiian_pizza_image.jpg"
  },
  {
    name: "Pizza Calabresa",
    category: "Pizza",
    description: "Pizza com molho de tomate, mozzarella e calabresa.",
    ingredients: ["Tomate", "Mozzarella", "Calabresa", "Cebola"],
    price: 52.99,
    picture: "https://almadossabores.com/wp-content/uploads/2023/08/Pizza-de-Calabresa-1.webp"
  },
  {
    name: "Pizza Veggie",
    category: "Pizza",
    description: "Pizza vegetariana com molho de tomate e vegetais variados.",
    ingredients: ["Tomate", "Mozzarella", "Pimentão", "Brócolis", "Cebola", "Azeitonas"],
    price: 49.99,
    picture: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM3Mjc1Mi1pbWFnZS1rd3Z5MGNjOC1rd3Z5b2g0by5qcGc.jpg"
  },
  {
    name: "Pizza Marguerita com Tomate Seco",
    category: "Pizza",
    description: "Pizza Margherita com tomate seco adicionado.",
    ingredients: ["Tomate", "Mozzarella", "Tomate Seco", "Manjericão"],
    price: 57.99,
    picture: "https://fermento.poa.br/wp-content/uploads/2018/01/margueria-de-tomate-seco.jpg"
  },
  {
    name: "Pizza 4 Queijos",
    category: "Pizza",
    description: "Pizza com quatro tipos de queijos.",
    ingredients: ["Tomate", "Mozzarella", "Parmesão", "Gorgonzola", "Fontina"],
    price: 62.99,
    picture: "https://3delicias.seupedidocerto.com.br/_core/_uploads/253/2024/05/1200110524bgjaekjjd9.jpeg"
  },
  {
    name: "Pizza Portuguesa",
    category: "Pizza",
    description: "Pizza com presunto, queijo, ovos e azeitonas.",
    ingredients: ["Tomate", "Mozzarella", "Presunto", "Ovo", "Azeitonas"],
    price: 59.99,
    picture: "https://www.ogastronomo.com.br/upload/389528334-curiosidades-sobre-a-pizza-portuguesa.jpg"
  },

  // Categoria: Burgers
  {
    name: "Cheeseburger",
    category: "Burgers",
    description: "Hambúrguer clássico com queijo cheddar, alface, tomate e maionese.",
    ingredients: ["Carne de Búfalo", "Queijo Cheddar", "Alface", "Tomate", "Maionese"],
    price: 29.99,
    picture: "https://master.restaurantemadero.com.br/assets/site/images/MDR_Cheeseburger-2.jpg"
  },
  {
    name: "Bacon Burger",
    category: "Burgers",
    description: "Hambúrguer com bacon crocante, queijo cheddar e molho barbecue.",
    ingredients: ["Carne de Búfalo", "Bacon", "Queijo Cheddar", "Molho Barbecue"],
    price: 34.99,
    picture: "https://potatorolls.com/wp-content/uploads/Maple-Bacon-Burger3-960x640.jpg"
  },
  {
    name: "Veggie Burger",
    category: "Burgers",
    description: "Hambúrguer vegetariano com falafel, alface e molho tzatziki.",
    ingredients: ["Falafel", "Alface", "Tomate", "Molho Tzatziki"],
    price: 32.99,
    picture: "https://www.eatingwell.com/thmb/Clm50Llj-uQGfbLUGnevTY0mzWU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6683924-cab8a11ae8c24c50b48aae8ed95049e6.jpg"
  },
  {
    name: "Barbecue Burger",
    category: "Burgers",
    description: "Hambúrguer com molho barbecue, cebola caramelizada e queijo provolone.",
    ingredients: ["Carne de Búfalo", "Molho Barbecue", "Cebola Caramelizada", "Queijo Provolone"],
    price: 36.99,
    picture: "https://bsstatic2.mrjack.es/wp-content/uploads/2020/09/hamburguesa-bbq-cab.jpg"
  },
  {
    name: "Mushroom Swiss Burger",
    category: "Burgers",
    description: "Hambúrguer com cogumelos salteados e queijo suíço.",
    ingredients: ["Carne de Búfalo", "Cogumelos", "Queijo Suíço", "Maionese"],
    price: 33.99,
    picture: "https://d2lswn7b0fl4u2.cloudfront.net/photos/pg-mushroom-swiss-burger-1612796532.jpg"
  },
  {
    name: "Chicken Burger",
    category: "Burgers",
    description: "Hambúrguer de frango grelhado com alface, tomate e molho de mostarda e mel.",
    ingredients: ["Peito de Frango", "Alface", "Tomate", "Molho de Mostarda e Mel"],
    price: 31.99,
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf0bgGTIo0HkPMov744FT5T4EYED9wgB9xFQ&s"
  },
  {
    name: "Double Cheeseburger",
    category: "Burgers",
    description: "Dois hambúrgueres com queijo cheddar, alface e tomate.",
    ingredients: ["Carne de Búfalo", "Queijo Cheddar", "Alface", "Tomate", "Maionese"],
    price: 39.99,
    picture: "https://i.pinimg.com/736x/1e/65/4f/1e654fac595d426d7ffffccd754b5977.jpg"
  },
  {
    name: "Spicy Chicken Burger",
    category: "Burgers",
    description: "Hambúrguer de frango picante com molho de pimenta e cebola roxa.",
    ingredients: ["Peito de Frango Picante", "Molho de Pimenta", "Cebola Roxa"],
    price: 34.99,
    picture: "https://realfood.tesco.com/media/images/RFO-1400x919-SpicyChickenBurger-98fc9913-fd2d-4559-b047-086ff4871a01-0-1400x919.jpg"
  },
  
  // Categoria: Saladas
  {
    name: "Caesar Salad",
    category: "Salads",
    description: "Salada Caesar com alface romana, croutons e molho Caesar.",
    ingredients: ["Alface Romana", "Croutons", "Molho Caesar", "Queijo Parmesão"],
    price: 24.99,
    picture: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/easy_caesar_salad_64317_16x9.jpg"
  },
  {
    name: "Greek Salad",
    category: "Salads",
    description: "Salada grega com tomate, pepino, azeitonas e queijo feta.",
    ingredients: ["Tomate", "Pepino", "Azeitonas", "Queijo Feta", "Cebola Roxa"],
    price: 26.99,
    picture: "https://hips.hearstapps.com/hmg-prod/images/greek-salad-index-642f292397bbf.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*"
  },
  {
    name: "Garden Salad",
    category: "Salads",
    description: "Salada de jardim com uma variedade de vegetais frescos.",
    ingredients: ["Alface", "Tomate", "Pepino", "Cenoura", "Vinagrete"],
    price: 22.99,
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Y7JfE8O2eGkfp5aFUHEK6IqqLWXhbeYywQ&s"
  },
  {
    name: "Cobb Salad",
    category: "Salads",
    description: "Salada Cobb com peito de frango grelhado, bacon, ovos e queijo azul.",
    ingredients: ["Peito de Frango", "Bacon", "Ovos", "Queijo Azul", "Abacate"],
    price: 28.99,
    picture: "https://www.allrecipes.com/thmb/lUCXnzWTl9WOQ9NRAT08hA4O2lE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14415-cobb-salad-DDMFS-4x3-608ba9c5768b49079eb75fe9a9898307.jpg"
  },
  {
    name: "Chicken Salad",
    category: "Salads",
    description: "Salada de frango com peito de frango, maçã e nozes.",
    ingredients: ["Peito de Frango", "Maçã", "Nozes", "Alface", "Molho de Iogurte"],
    price: 27.99,
    picture: "https://assets.epicurious.com/photos/64a845e67799ee8651e4fb8f/1:1/w_2560%2Cc_limit/AshaGrilledChickenSalad_RECIPE_070523_56498.jpg"
  },
  {
    name: "Quinoa Salad",
    category: "Salads",
    description: "Salada de quinoa com vegetais e molho de limão.",
    ingredients: ["Quinoa", "Tomate", "Pepino", "Cebola Roxa", "Molho de Limão"],
    price: 29.99,
    picture: "https://static01.nyt.com/images/2024/01/04/multimedia/AS-quinoa-salad-vclq/AS-quinoa-salad-vclq-superJumbo.jpg"
  },
  {
    name: "Caprese Salad",
    category: "Salads",
    description: "Salada Caprese com tomate, mozzarella e manjericão.",
    ingredients: ["Tomate", "Mozzarella", "Manjericão", "Azeite", "Sal"],
    price: 24.99,
    picture: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/07/Caprese-Salad-main-1.jpg"
  },
  {
    name: "Spinach Salad",
    category: "Salads",
    description: "Salada de espinafre com morangos e nozes.",
    ingredients: ["Espinafre", "Morangos", "Nozes", "Queijo de Cabra"],
    price: 27.99,
    picture: "https://cdn.loveandlemons.com/wp-content/uploads/2023/11/spinach-salad.jpg"
  },

  // Categoria: Bebidas
  {
    name: "Coca-Cola",
    category: "Drinks",
    description: "Refrigerante Coca-Cola 2L.",
    ingredients: ["Água Carbonatada", "Açúcar", "Caramelo", "Cafeína"],
    price: 6.99,
    picture: "https://coopsp.vtexassets.com/arquivos/ids/224479/7894900027013.jpg?v=637919585207130000"
  },
  {
    name: "Pepsi",
    category: "Drinks",
    description: "Refrigerante Pepsi 2L.",
    ingredients: ["Água Carbonatada", "Açúcar", "Caramelo", "Cafeína"],
    price: 6.99,
    picture: "https://superprix.vteximg.com.br/arquivos/ids/203553-600-600/d416af9646f567ce75a1006891b73cdf_refrigerante-pepsi-2l_lett_1.jpg?v=637695819528930000"
  },
  {
    name: "Sprite",
    category: "Drinks",
    description: "Refrigerante Sprite com sabor de limão sem açúcar 2L.",
    ingredients: ["Água Carbonatada", "Sem Açúcar", "Ácido Cítrico", "Aromatizantes"],
    price: 6.99,
    picture: "https://superprix.vteximg.com.br/arquivos/ids/213241-600-600/548391_1.jpg?v=638187332094900000"
  },
  {
    name: "Fanta",
    category: "Drinks",
    description: "Refrigerante Fanta com sabor de laranja 2L.",
    ingredients: ["Água Carbonatada", "Açúcar", "Sabor de Laranja", "Ácido Cítrico"],
    price: 6.99,
    picture: "https://muffatosupermercados.vtexassets.com/arquivos/ids/368290/7894900031515.jpg?v=638309806016000000"
  },
  {
    name: "Água Mineral com Gás",
    category: "Drinks",
    description: "Água mineral natural com Gás 1,5L.",
    ingredients: ["Água"],
    price: 8.99,
    picture: "https://cdn.awsli.com.br/2500x2500/2595/2595005/produto/259387701/agua-mineral-1-5l-com-g-s-2o7wv65qig.jpg"
  },
  {
    name: "Suco de Laranja",
    category: "Drinks",
    description: "Um copo de Suco natural de laranja.",
    ingredients: ["Laranja", "Água", "Açúcar"],
    price: 8.99,
    picture: "https://www.citrosuco.com.br/wp-content/uploads/2022/02/THUMB-05.png"
  },
  {
    name: "Cerveja Lager",
    category: "Drinks",
    description: "Cerveja Lager gelada latinha.",
    ingredients: ["Água", "Malte", "Lúpulo", "Levedura"],
    price: 9.99,
    picture: "https://images.tcdn.com.br/img/img_prod/1047279/cerveja_american_lager_165_1_3f3e33c7d004f4968692ca882aceeabc.jpg"
  },
  {
    name: "Vinho Tinto",
    category: "Drinks",
    description: "Vinho tinto de alta qualidade 1L.",
    ingredients: ["Uvas", "Água", "Álcool"],
    price: 49.99,
    picture: "https://dcdn.mitiendanube.com/stores/002/905/426/products/329350-vinho-pergola-tinto-suave-1l-f853af4206f1871fec16970676491880-640-0.jpg"
  }
];


      // Inserindo os produtos no banco de dados
      await Product.insertMany(products);

      res.status(200).json({ message: "Produtos inseridos com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao popular produtos" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
