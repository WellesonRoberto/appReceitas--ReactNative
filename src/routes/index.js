//Routers é o arquivo de configuração de navegação páginas do App (Home, Favoritos, Search, Detalhes, etc)

//Criando botão de navegação (Home e Favorites)
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StackRoutes } from "./stackroutes";
import { Favorites } from "../pages/favorites";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator // barra onde fica o Home e o Favorites
      screenOptions={{
        headerShown: false, // Tirar o header (Page Homer e Page Favorites)
        tabBarHideOnKeyboard: true, // Esconder a tab (home, favorites) quando o teclado aparecer
        tabBarShowLabel: false, //Tira o nome, só deixando o ícone (Home e Favorites)
        tabBarActiveTintColor: "#121212", //Quando o ícone estiver ativo, mudar para a cor #121212(cinza)

        tabBarStyle: {
          backgroundColor: "#FFF", // Mudando a cor de fundo pra branco
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen // Home
        name="HomeTab"
        component={StackRoutes} //Reinderiza o StackRoutes, onde irá ter as opções Home, Detail e Searh para selecionar.
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              // focused = foco na tela
              return <Ionicons name="home" color="#000" size={size} />;
            }

            return <Ionicons name="home-outline" color={color} size={size} />;
            // Se a tab bar não estiver selecionada, ela mudará de cor
          },
        }}
      />
      <Tab.Screen // Favorite
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="heart" color="#FF4141" size={size} />;
            }
            return <Ionicons name="heart-outline" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
