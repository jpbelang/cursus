import express, {NextFunction, Request, Response} from "express";
import {EntityManager, getManager, Repository} from "typeorm";
import {User} from "../entities/user";


declare global {
    namespace Express {
        export interface Request {
            repository: any
        }
    }
}

export interface TypedRequest<T> extends Request {

    repository: Repository<T>
}

export function createUserResource(manager: EntityManager) {
    const userRouter = express.Router()
    userRouter.use((req: Request, res: Response, next: NextFunction) => {
        req.repository = manager.getRepository(User)
    })
    userRouter.get("/", getUsers)
        .get('/', getUsers)
        .get("/:id", getUser)
       .post("/", createUser);
    return userRouter
}

export async function getUsers(request: TypedRequest<User>, response: Response) {
        // get a post repository to perform operations with post
        const postRepository = getManager().getRepository(User);

        // load a post by a given post id
        const posts = await postRepository.find();

        // return loaded posts
        response.send(posts);
}

export async function getUser(request: TypedRequest<User>, response: Response) {
        // get a post repository to perform operations with post
        const postRepository = getManager().getRepository(User);

        // load a post by a given post id
        const posts = await postRepository.find();

        // return loaded posts
        response.send(posts);
}

export async function createUser(req: TypedRequest<User>, res: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(User);

    // load a post by a given post id
    const posts = await postRepository.create(User.newUser(req.body));

    // return loaded posts
    res.send(posts);
}
