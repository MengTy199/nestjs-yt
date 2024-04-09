import { EntityManager } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../shared/repository.abstract";


@Injectable()
export class UserRepository extends AbstractRepository<User> {
    constructor(
        protected readonly entityManager: EntityManager){
            super(User, entityManager)
        }
}