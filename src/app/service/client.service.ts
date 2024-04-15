import { Injectable } from '@angular/core';
import { createClient } from '@libsql/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }


  private client = createClient({
    url: "libsql://from-your-home-to-the-world-tommyyoliver.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI5NTE4ODEsImlkIjoiMDM3ZjlmZTMtOThjZi00MTY1LWJjOWEtNmUyNGZjNDBiODUxIn0.7qafj0HDVilOiDHODzlFwf6U5QPbB7sGbB5evDC9AUxL4i5cxfVPfefoaS3jqTPcZaRjj764iePuJujFyVoSAw",
  })

  async addNewUser(username: string, password: string) {
    await this.client.execute({
      sql: "INSERT INTO User(user_name, user_password) VALUES (?, ?);",
      args: [username, password]
    })
  }

  async getAllUsers() {
    try {
      const results = await this.client.execute({
        sql: "SELECT user_id, user_name, user_password FROM User;",
        args: []
      })
      return results;
    } catch (err) {
      console.error("ERROR fetching users, ", err);
      throw err;
    }
  }

  async getUser(username: string) {
    try {
      const results = this.client.execute({
        sql: "SELECT user_id, user_name FROM User WHERE user_name == ?",
        args: [username]
      })
      return results;
    } catch (err) {
      console.error("ERROR fetching users, ", err);
      throw err;
    }
  }

  async addNewMessage(message: string, messageDate: string, id: number) {
    try {
      await this.client.execute({
        sql: "INSERT INTO Message(message_text, message_date, user_id) VALUES (?, ?, ?);",
        args: [message, messageDate, id]
      })
    } catch (err) {
      console.error("ERROR post message, ", err);
      throw err;
    }
  }

  async getAllMessage() {
    try {
      const results = await this.client.execute({
        sql: "SELECT user_name, message_text, message_date FROM User, Message WHERE User.user_id == Message.user_id ORDER BY message_date DESC",
        args: []
      })
      return results;
    } catch (err) {
      console.error("ERROR post message, ", err);
      throw err;
    }
  }
}
