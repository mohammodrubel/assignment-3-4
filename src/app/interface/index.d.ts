import { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Request {
        interface Request {
            user : JwtPayload
        }
    }
}