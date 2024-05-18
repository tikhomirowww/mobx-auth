import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import $api, { API_URL } from "../http";
import UserService from "../services/UserService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  users = [] as IUser[];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const { data } = await AuthService.login(email, password);
      localStorage.setItem("token", data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }

  async register(email: string, password: string) {
    try {
      const { data } = await AuthService.register(email, password);
      localStorage.setItem("token", data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const { data } = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    } catch (error: any) {
      console.log(error.response?.data.message);
    } finally {
      this.setLoading(false);
    }
  }

  async getUsers() {
    this.setLoading(true);
    try {
      const { data } = await UserService.getUsers();
      this.setUsers(data);
    } catch (error: any) {
      console.log(error.response?.data.message);
    } finally {
      this.setLoading(false);
    }
  }
}
