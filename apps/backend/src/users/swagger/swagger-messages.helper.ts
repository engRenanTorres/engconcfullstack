import { MessagesHelper } from "../../helpers/message.helper";

export const UsersMsgSwagger = {
  ALL_200: "Todos usuários listados com sucesso.",
  ALL_SUMMARY: "Lista todos os usuários.",
  CREATE_200: "Usuário criado com sucesso.",
  CREATE_400: "Dados inválidos. Ex." + MessagesHelper.PASSWORD_VALID,
  CREATE_409: "Email já existe.",
  CREATE_SUMMARY: "Cria novo usuário",
  FIND_USER_200: "Lista todos os usuários.",
  FIND_USER_SUMMARY: "Busca usuário por Id",
  UPDATE_200: "Usuário atulizado com sucesso.",
  UPDATE_SUMMARY: "Atualiza os dados do usuário. Buscando pelo email.",
  USER_NOT_FOUND: "Usuário não encontrado.",
  REMOVE_200: "Usuário removido com successo.",
  REMOVE_SUMMARY: "Remove o usuário, buscando pelo email",
};
