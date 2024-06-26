"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, List, Quote, Undo, Redo, UnderlineIcon } from "lucide-react"

const Tiptap = ({ setComment, comment }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "border border-gray-400 p-4 min-h-[10rem] max-h-[12rem] overflow-y-auto rounded-b-md",
      },
    },
    extensions: [StarterKit, Underline],
    content: comment,
    onUpdate: ({ editor }) => {
      setComment(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="m-auto my-8 max-w-4xl container">
      <section className="rounded-t-md flex items-center flex-wrap gap-x-4 bg-white  border border-gray-400 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? "is-active rounded bg-gray-200 p-1" : ""
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? "is-active rounded bg-gray-200 p-1" : ""
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "is-active rounded bg-gray-200 p-1"
              : ""
          }
        >
          <UnderlineIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "is-active rounded bg-gray-200 p-1"
              : ""
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <Redo className="w-5 h-5" />
        </button>
      </section>

      <EditorContent style={{ backgroundColor: "white" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
