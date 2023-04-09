import { useState, useEffect } from "react";
//useState = Pega o valor que é digitado no input(campo de pesquisa) e chamar a funcionalidade de abrir a tela de search.
//useEffect = Um efeito colateral na aplicação. Vai buscar toda a lista de receitas quando carregar o app
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView, //Área segura pra está usando IOS(vai garantir que a interface vai ficar abaixo da statusBar)
  TextInput, //Importa a área que vai ficar em volta da <View style={styles.form}>
  TouchableOpacity, //Botão clicável que irá ficar dentro no input.
  FlatList, // Componente pra criar listagens que tenham performances
} from "react-native";

//As importações dentro de {} porque o export aconteceu diretamente (padrão). Quando está sem {} foi porque aconteceu um export default (só pode ter um export default por arquivo)
import { Ionicons } from "@expo/vector-icons";
import { Logo } from "../../components/logo";
import api from "../../services/api";
import { FoodList } from "../../components/foodlist";

import { useNavigation } from "@react-navigation/native";

import { Text as MotiText } from "moti";

export function Home() {
  //inputValue: Acessa o valor
  //setInputValue: Função que irá trocar o valor que estiver dentro no inputValue

  const [inputValue, setInputValue] = useState(""); // valor inicial do userState começa vazio
  const [foods, setFoods] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    //Quando é carregado o app, vai executar o que está dentro da função anônima ()=>{}. A array [] vazia só vai ser executado quando o app for carregado.

    async function fetchApi() {
      // async = assíncrono. A transmissão de dados são transmistidos intermitentemente em um fluxo estável (nesse caso em 180ms).
      // Buscar a lista de receitas
      const response = await api.get("/foods");
      setFoods(response.data); // coloca a lista de receitas dentro da useState
    }
    // A variável 'response' criada para armazenar a resposta no api. o get é uma requisição onde vai buscar, listar uma aquisiçã (nesse caso a lista de receitas)
    fetchApi();
  }, []);

  function handleSearch() {
    if (!inputValue) return; //Se não estiver um inputValue, vai retornar (porque vai estar vazio)

    let input = inputValue;
    setInputValue("");
    navigation.navigate("Search", { name: input });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          delay: 100,
          type: "timing",
          duration: 650,
        }}
      >
        Encontre a receita
      </MotiText>
      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 20,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          delay: 500,
          type: "timing",
          duration: 950,
        }}
      >
        que combina com você!
      </MotiText>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da comida..."
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)} // Pega o valor digitado e joga dinamicamente para o useState("")
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4CBE6C" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods} //propriede que está a lista, o array.
        keyExtractor={(item) => String(item.id)} //Fornece a cada item da lista um identificador
        renderItem={({ item }) => <FoodList data={item} />} //Onde vai renderizar cada componente
        showsVerticalScrollIndicator={false} //Tira a barra de rolagem
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que a interface pegue o tamanho inteiro da tela
    backgroundColor: "#F3F9FF",
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e0e0e",
  },
  form: {
    width: "100%",
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    //padding: espaçamento interno, tanto na esquerca como direita
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row", // Alinha os itens em linha (lado a lado)
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    maxWidth: "90%",
    height: 54,
  },
});
