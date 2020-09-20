import express, {NextFunction, Request, Response} from "express";
import {EntityManager, getManager, Repository} from "typeorm";
import {User, UserData} from "../entities/user";
import {Gender} from "../entities/common";
import {IsDefined, IsEmail, IsUUID, MinLength, validate} from "class-validator";
import {defaultFromNetwork, validateMessage} from "./utilities";
import {classToClass, Expose, plainToClass} from "class-transformer";


declare global {
    namespace Express {
        export interface Request {
            repository: any
        }
    }
}

export class UserMessage implements UserData {

    @Expose() @IsDefined({groups: ["PUT"]}) @IsUUID("all", {groups: ["PUT"]})
    id: string

    @IsEmail({
        allow_utf8_local_part: true
    }, {groups: ["PUT", "POST"]})
    @IsDefined({groups: ["PUT", "POST"]})
    @Expose()
    email: string;

    @IsDefined({groups: ["PUT", "POST"]})
    @Expose()
    gender: Gender;

    @IsDefined({groups: ["PUT", "POST"]})
    @MinLength(4, {groups: ["PUT", "POST"]})
    @Expose()
    name: string;

    @MinLength(4, {
        groups: ["POST"]
    })
    @Expose()
    password: string

    static fromNetwork(s: string | any) {
        const value = defaultFromNetwork(s, UserMessage)
        if (value.id == undefined) delete value.id
        return value;
    }

    static fromEntity(user: User) {
        return plainToClass(UserMessage, user, {
            excludeExtraneousValues: true
        })
    }
}

export interface TypedRequest<E, M> extends Request {

    repository: Repository<E>
    body: M
}

export function createRepository(manager: EntityManager) {
    return (req: Request, res: Response, next: NextFunction) => {
        req.repository = manager.getRepository(User)
        next()
    };
}


export function createUserResource(manager: EntityManager) {
    const userRouter = express.Router()
    userRouter.use(createRepository(manager))
    userRouter.use(validateMessage((s) => UserMessage.fromNetwork(s)))
    userRouter
        .get('/', getUsers)
        .get("/:id", getUser)
        .post("/", createUser);
    return userRouter
}

export async function getUsers(request: TypedRequest<User, UserMessage>, response: Response) {
    // get a post repository to perform operations with post
    const userRepository = getManager().getRepository(User);

    // load a post by a given post id
    const user = await userRepository.find();

    // return loaded user
    response.send(user);
}

export async function getUser(request: TypedRequest<User, UserMessage>, response: Response) {
    // get a post repository to perform operations with post
    const userRepository = getManager().getRepository(User);

    // load a post by a given post id
    const user = await userRepository.find();

    // return loaded user
    response.send(user);
}

export async function createUser(req: TypedRequest<User, UserMessage>, res: Response) {

    // get a post repository to perform operations with post
    const userRepository = getManager().getRepository(User);

    // load a post by a given post id
    let entity = User.newUser(req.body);
    const user = await userRepository.save(entity);

    // return loaded user
    res.status(201).send(UserMessage.fromEntity(user));
}
