export interface User {
    id: string
    name: string | null
    email: string
    image: string | null
    role: 'USER' | 'ADMIN'
    createdAt: Date
}

export interface Post {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    published: boolean
    createdAt: Date
    updatedAt: Date
    author: Pick<User, 'id' | 'name' | 'image'>
    tags: Ｔag[]
    _count?: { comments: number }
}

export interface Comment {
    id: string
    content: string
    createdAt: Date
    author: Pick<User, 'id' | 'name' | 'image'>
}

export interface Tag {
    id: string
    name: string
}