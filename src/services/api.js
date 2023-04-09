import axios from "axios";

/* 
//Rodar com IPV4: json-server --watch -d 180 --host 192.168.1.4 db.json
*/

const api = axios.create({
  baseURL: "http://192.168.1.3:3000/", // A URL pra fazer aquisição
});

export default api; // Exportando a configuração "axios.create" para conseguir importar em qualquer arquivo e utilizar
