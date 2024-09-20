export type SVGLogo = React.FunctionComponent<React.SVGProps<SVGSVGElement>> & {
  src: string
}

export interface Category {
  id: number
  name: string
  url: string
  description?: string
  isCommercial: boolean
  logo: SVGLogo
  logo2?: SVGLogo
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
