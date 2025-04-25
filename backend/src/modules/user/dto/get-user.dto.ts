import { Expose } from "class-transformer";

export class GetUserDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  imageUrl: string;

  @Expose()
  username: string;
}