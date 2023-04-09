import { Text, StyleSheet } from "react-native";

import { View } from "moti";

export function Logo() {
  return (
    <View
      style={styles.logoArea}
      from={{
        opacity: 0,
        translateX: -50,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      transition={{
        type: "spring",
        duration: 1000,
      }}
    >
      <Text style={styles.logo}>Receita Fácil</Text>
    </View>
  );
}

//Criando grupos de estilos/estilizando as interfaces
const styles = StyleSheet.create({
  logoArea: {
    backgroundColor: "#4CBE6C",
    alignSelf: "flex-start", // Alinha o backgroundColor para o tamanho do texto
    padding: 8,
    paddingLeft: 16,
    paddingRight: 20,
    //Formantando as bordas
    borderTopRightRadius: 8,
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginBottom: 8,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});
