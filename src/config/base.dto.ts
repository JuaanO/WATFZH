import { IsDate, IsOptional, IsUUID } from "class-validator"

export class baseDTO  {

    @IsUUID()
    @IsOptional()
    Id!: string 

    @IsDate()
    @IsOptional()
    createdAt!: Date

    @IsDate()
    @IsOptional()
    updatedAt!: Date
}