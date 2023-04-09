// O App.js é o primeiro arquivo que é chamado quando o app é rodado.

import "react-native-gesture-handler";
/* Importando componentes: 
View: Espação em branco na tela; caixinha em branco
Text: Escrever textos
StyleSheet: Criar grupos de estilos, estilizar as interfaces
) */
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";

export default function App() {
  // Criando o componente ''App''
  return (
    // Renderizando o componente
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
//Criando o grupo de estilo
