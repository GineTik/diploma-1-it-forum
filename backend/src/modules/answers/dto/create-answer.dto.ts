import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    postId: number;
}
