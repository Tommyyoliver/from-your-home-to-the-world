import { createClient } from "@libsql/client";
import { config } from "./config";

const client = createClient({
  url: config.DATABASE_URL,
  authToken: config.DATABASE_AUTH_TOKEN,
})

export const addNewUser = async (username: string, password: string) => {
  await client.execute({
    sql: "INSERT INTO User(user_name, user_password) VALUES (?, ?);",
    args: [username, password]
  })
}

export const getAllUsers = async () => {
  try {
    const results = await client.execute({
      sql: "SELECT user_id, user_name, user_password FROM User;",
      args: []
    })
    return results;
  } catch (err) {
    console.error("ERROR fetching users, ", err);
    throw err;
  }
}

export const getUser = async (username: string) => {
  try {
    const results = client.execute({
      sql: "SELECT user_id, user_name FROM User WHERE user_name == ?",
      args: [username]
    })
    return results;
  } catch (err) {
    console.error("ERROR fetching users, ", err);
    throw err;
  }
}

export const addNewMessage = async (message: string, messageDate: string, id: number) => {
  try {
    await client.execute({
      sql: "INSERT INTO Message(message_text, message_date, user_id) VALUES (?, ?, ?);",
      args: [message, messageDate, id]
    })
  } catch (err) {
    console.error("ERROR post message, ", err);
    throw err;
  }
}

export const getAllMessage = async () => {
  try {
    const results = await client.execute({
      sql: "SELECT user_name, message_text, message_date FROM User, Message WHERE User.user_id == Message.user_id ORDER BY message_date DESC",
      args: []
    })
    return results;
  } catch (err) {
    console.error("ERROR post message, ", err);
    throw err;
  }
}
