export interface Category {
  id: number
  name: string
  url: string
  isCommercial: boolean
}

export interface User {
  id: number
  userName: string
  email: string
}

export interface Comment {
  id: number
  user: User
  comment: string
  commentLike: number
}

export interface Video {
  id: number
  name: string
  description: string
  url: string
  userLike: number
  category: Category
  comments: Comment[]
}
