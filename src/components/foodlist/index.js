import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native"; // Manipula a navegação das páginas

export function FoodList({ data }) {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Detail", { data: data }); //Navega para a vaga de detalhes. O { data: data } vai passar o itens para a tela os detalhes de cada item.
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={handleNavigate} //onPress = evento de toque/clique na imagem/container
    >
      <Image source={{ uri: data.cover }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>
          {data.total_ingredientes} ingredientes | {data.time} min
        </Text>
      </View>
      <LinearGradient
        style={styles.gradient}
        colors={["transparent", "rgba(0,0,0,0.70)", "rgba(0,0,0,0.95)"]} //Colocando o efeito gradiente na imagem, utilizando 3 cores (do mais claro ao mais escuro)
      />
    </TouchableOpacity>
    //activeOpacity={0.8} --> diminui/aumenta a opacidade
    //uri: data.cover --> a url da imagem no arquivo db.json
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 14,
  },
  info: {
    position: "absolute", // A posição no texto fica sobre a imagem
    bottom: 14, // A posição fica na parte inferior
    left: 14, // A posição se distancia da esquerda
    zIndex: 99, //Garante que o texto fique sempre sobre a imagem, não atrás
  },
  name: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  description: {
    color: "#FFF",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%", //Tamanho do gradiente, posicionado quase na metade da imagem
    borderRadius: 14,
    zIndex: 1,
    backgroundColor: "transparent",
  },
});
