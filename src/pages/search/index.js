import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../../services/api"; //Quando clicar em buscar, verificar se a palavra tem no api
import { FoodList } from "../../components/foodlist";

export function Search() {
  const route = useRoute();
  const [receipes, setReceipes] = useState([]);

  useEffect(() => {
    async function fetchReceipes() {
      const response = await api.get(`/foods?name_like=${route.params?.name}`); // /foods?name é a rota onde chegará na palavra desejada. route.params?.name é a lista de palavras do app
      setReceipes(response.data);
    }
    fetchReceipes();
  }, [route.params?.name]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={receipes} //data = pega os dados de uma determinada lista. Nesse caso, receipes (que é onde está os dados da lista)
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
        ListEmptyComponent={() => (
          <Text style={styles.text}>Não encontramos o item.</Text>
        )} //Quando a palava não existir na lista, retornar um text
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  text: {
    fontSize: 20,
  },
});
