export const ROLE = {
    user:'user',
    admin:'admin'
}  as const


export type TRole = keyof typeof ROLE