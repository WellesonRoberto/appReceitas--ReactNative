//Arquivo para auxiliar para os métodos de salvar, alterar ou excluir uma receita

import AsyncStorage from "@react-native-async-storage/async-storage";

//Buscar os favoritos
//Salvar um novo favorito
//Remover um favorito

export async function getFavorites(key) {
  //key = chave pra identificar no AsyncStorage
  //Irá buscar os item e colocar nos favorites
  const favorites = await AsyncStorage.getItem(key);
  //JSON.parse = Analisa os dados de uma string JSON e converte em onjetos estruturados(lista)
  return JSON.parse(favorites) || []; // Caso não tenha nada nos favorites (||) retorna uma lista vazia []
}

export async function saveFavorite(key, newItem) {
  //newItem = o item que irá ser salvo
  let myFavorites = await getFavorites(key);

  let hasItem = myFavorites.some((item) => item.id === newItem.id); //some= verifica se existe alguma coisa no array que foi passada pela condição some(condião)
  if (hasItem) {
    console.log("item ja add");
    return;
  }
  myFavorites.push(newItem); //Adicionar novo item no array

  await AsyncStorage.setItem(key, JSON.stringify(myFavorites)); //JSON.stringify = converte pra uma string ()
  console.log("SALVOOOOOO");
}

export async function removeItem(id) {
  let receipes = await getFavorites("@appreceitas");

  let myFavorites = receipes.filter((item) => {
    //Filter = filtra todos os itens da lista
    return item.id !== id; //Retorna todos os itens que são diferentes do comando acima
  });

  await AsyncStorage.setItem("@appreceitas", JSON.stringify(myFavorites));
  console.log("DELETADOOO");
  return myFavorites;
}

export async function isFavorite(receipe) {
  let myReceipes = await getFavorites("@appreceitas");

  const favorite = myReceipes.find((item) => item.id === receipe.id); //Vai verificar na lista se item está ou não nos favoritos

  //Se estiver na lista favoritos, retornar true. Se não, falso
  if (favorite) {
    return true;
  }
  return false;
}
