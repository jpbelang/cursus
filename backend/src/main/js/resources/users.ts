import express, {NextFunction, Request, Response} from "express";
import {EntityManager, getManager, Repository} from "typeorm";
import {User, UserData} from "../entities/user";
import {Gender} from "../entities/common";
import {IsDefined, IsEmail, IsUUID, MinLength} from "class-validator";
import {defaultFromNetwork} from "./utilities";
import {Expose, plainToClass} from "class-transformer";
import {expressValidator, RestValidationTags} from "./express";


declare global {
    namespace Express {
        export interface Request {
            repository: any
        }
    }
}

export class UserMessage implements UserData {

    @Expose()
    @IsDefined({groups: RestValidationTags.update()})
    @IsUUID("all", {groups: RestValidationTags.update()})
    id: string

    @IsEmail({
        allow_utf8_local_part: true
    }, {groups: RestValidationTags.any()})
    @IsDefined({groups: RestValidationTags.any()})
    @Expose()
    email: string;

    @IsDefined({groups: RestValidationTags.any()})
    @Expose()
    gender: Gender;

    @IsDefined({groups: RestValidationTags.any()})
    @MinLength(4, {groups: RestValidationTags.any()})
    @Expose()
    name: string;

    @MinLength(4, {
        groups: RestValidationTags.create()
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
    userRouter.use( expressValidator((x) => UserMessage.fromNetwork(x)) )

    userRouter
        .get('/', getUsers)
        .get("/:id", getUser)
        .post("/", createUser)
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
