import { api } from "@/lib/api";

export class UsersService {
  async findOne(id: string) {
    return await api.get(`/users/${id}`);
  }
}

export const USERS_SERVICE = new UsersService();