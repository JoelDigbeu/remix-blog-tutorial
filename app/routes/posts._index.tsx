import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

export const loader: LoaderFunction = async () => {
  return json({ posts: await getPosts() });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">All posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
