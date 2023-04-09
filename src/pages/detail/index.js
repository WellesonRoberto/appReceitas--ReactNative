import { useLayoutEffect, useState } from "react"; //Só vai renderizar na tela após executado
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Share,
} from "react-native";

import { VideoView } from "../../components/video";

import {
  isFavorite,
  saveFavorite,
  removeItem,
  getFavorite,
} from "../../utils/storage";

//Pressable = botão clicável
//ScrollView = ativa o scroll da página
import { useRoute, useNavigation } from "@react-navigation/native"; //Recebe os detalhes enviados por navigation.navigate
import { Entypo, AntDesign, Feather } from "@expo/vector-icons"; //Biblioteca de ícones
import { Ingredients } from "../../components/ingredients";
import { Instructions } from "../../components/instructions";
export function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const [showVideo, setShowVideo] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const receipeFavorite = await isFavorite(route, params?.data);
      setFavorite(receipeFavorite);
    }
    getStatusFavorites;

    navigation.setOptions({
      //setOptions muda opções
      title: route.params?.data
        ? route.params?.data.name
        : "Detalhes da receita",
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteReceipe(route.params?.data)}>
          {favorite ? ( //Se tiver salvo na lista preencher o coração, caso não estiver, deixar vazio
            <Entypo name="heart" size={28} color="#FF4141" />
          ) : (
            <Entypo name="heart-outlined" size={28} color="#FF4141" />
          )}
        </Pressable>
      ),
      //Se não tiver nada dentro de 'data', irá colocar detalher na receita
    });
  }, [navigation, route.params?.data, favorite]);

  async function handleFavoriteReceipe(receipe) {
    //Função para favotirar um item
    if (favorite) {
      await removeItem(receipe.id);
      setFavorite(false);
    } else {
      await saveFavorite("@appreceitas", receipe);
      setFavorite(true);
    }
  }

  function handleOpenvideo() {
    setShowVideo(true);
  }

  async function shareReceipe() {
    try {
      await Share.share({
        url: "https://sujeitoprogramador.com",
        message: `Receita: ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}\nVi lá no app Receita fácil}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 14 }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={handleOpenvideo}>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={70} color="#FAFAFA" />
        </View>
        <Image
          source={{ uri: route.params?.data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientesText}>
            Ingredientes ({route.params?.data.total_ingredients})
          </Text>
        </View>
        <Pressable onPress={shareReceipe}>
          <Feather name="share-2" size={25} color="#121212" />
        </Pressable>
      </View>

      {route.params?.data.ingredients.map((item) => (
        <Ingredients key={item.id} data={item} />
      ))}

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de preparo</Text>
        <Feather name="arrow-down" size={25} color="#FFF" />
      </View>

      {route.params?.data.instructions.map(
        (
          item,
          index //index vai ver a posição e vai criar um indicador
        ) => (
          <Instructions key={item.id} data={item} index={index} />
        )
      )}

      <Modal visible={showVideo} animationType="slide">
        <VideoView
          handleClose={() => setShowVideo(false)}
          videoUrl={route.params?.data.video}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3f9ff",
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14,
  },
  cover: {
    height: 200,
    borderRadius: 14,
    width: "100%",
  },
  playIcon: {
    position: "absolute",
    zIndex: 9,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // centralizar o ícone
    alignItems: "center", // Alinha no horinzontal
    justifyContent: "center", // Alinha na vertical
  },
  title: {
    fontSize: 22,
    marginTop: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  ingredientesText: {
    marginBottom: 14,
    fontSize: 16,
  },
  headerDetails: {
    flexDirection: "row", //Muda a direção em linha(row)
    justifyContent: "space-between", //Espaçamento entre os itens(space-between)
    alignItems: "center",
    marginBottom: 14,
  },
  instructionsArea: {
    backgroundColor: "#4cbe6c",
    flexDirection: "row",
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#FFF",
    marginRight: 8,
  },
});
