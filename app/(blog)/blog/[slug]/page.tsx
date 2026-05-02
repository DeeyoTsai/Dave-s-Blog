
import { mockPosts } from "@/lib/mockData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({params}: Props) {
    const { slug } = await params
    const post = mockPosts.find(p => p.slug === slug)
    if (!post){
        notFound()
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.author.name}</p>
            <p>{post.createdAt.toLocaleDateString("zh-TW")}</p>
            <p>{post.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}</p>
            <p>{post.content}</p>
        </div>
    )
}

export async function generateStaticParams() {
    return mockPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = mockPosts.find(p => p.slug === slug)
    if (!post) return {}
    return {
        title:post.title,
        description: post.excerpt,
    }
}