//useEffect = quando abrir a aba fav, irá buscar a lista fav
//useState = irá armazenar a lista dentro desse estado, para assim, mostrar na tela
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native"; //foco na tela selecionada

import { FoodList } from "../../components/foodlist";

import { getFavorites } from "../../utils/storage";

export function Favorites() {
  //Criando o estado (useState)
  const [receipes, setReceipes] = useState([]); // começa com uma lista vazia ([])
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getReceipes() {
      const result = await getFavorites("@appreceitas");
      if (isActive) {
        setReceipes(result);
      }
    }
    if (isActive) {
      getReceipes();
    }

    return () => {
      console.log("Saiu da tela foi bb?");
    };
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receitas Favorites</Text>
      {receipes.length === 0 && (
        <Text>Você ainda não tem nenhuma receita salva.</Text>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 14 }}
        data={receipes} //data = pega os dados de uma determinada lista. Nesse caso, receipes (que é onde está os dados da lista)
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14, // Espaçamento na esquerda
    paddingEnd: 14, //Espaçamento na direita
    paddingTop: 36, //Espaçamento em cima
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 25,
  },
});
