export type PostType = Post[]

export interface Post {
  id?: string;
  category: string
  description: string
  status: string
  upvotes: number
  title: string
  upvoted:boolean
}
