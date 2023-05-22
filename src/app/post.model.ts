export interface Post{
    title:string,
    content: string,
    id?: string // maksudnya ? itu optional karena dlm case ini si ID di provide firebase
}