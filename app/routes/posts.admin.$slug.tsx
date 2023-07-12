import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json({ post });
};

export default function UpdatePost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input
            type="text"
            name="title"
            className={inputClassName}
            value={post.title}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input
            type="text"
            name="slug"
            className={inputClassName}
            value={post.slug}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={15}
          name="markdown"
          className={`${inputClassName} font-mono`}
          value={post.markdown}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Update Post
        </button>
      </p>
    </Form>
  );
}
