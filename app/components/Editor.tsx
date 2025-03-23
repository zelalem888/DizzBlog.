"use client";

import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';

// Dynamically import the editor with SSR disabled
const RcTiptapEditor = dynamic(
  () => import('reactjs-tiptap-editor'),
  { ssr: false }
);

// Import necessary extensions
import {
  BaseKit,
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  FontFamily,
  Heading,
  BulletList,
  OrderedList,
  Blockquote,
  Code,
  TextAlign,
  History,
  HorizontalRule,
  ExportPdf,
} from 'reactjs-tiptap-editor/extension-bundle';

// Import styles
import 'reactjs-tiptap-editor/style.css';

// Default content for the editor
const DEFAULT = `<h1 class="headers font-bold text-gray-900 py-4" style="text-align: left"><span style="font-family: ubuntu">write your blog here</span></h1><p style="text-align: left"><span style="font-family: ubuntu">some instruction from the creator (Chuck Norris)</span></p><ul class="list-disc text-gray-700"><li><p style="text-align: left">first<span class="selection"> write the title in the title section</span></p></li><li><p style="text-align: left"><span class="selection">second upload the photo by pressing the upload photo button because it's mandatory</span></p></li><li><p style="text-align: left"><span class="selection">third write your blog in here section</span></p></li><li><p style="text-align: left"><span class="selection">lastly post the blog </span></p></li></ul><p style="text-align: center"><code class="bg-black text-white px-2 py-1 rounded-md overflow-x-auto max-w-full"><span class="selection">thanks</span></code></p><p style="text-align: left"><br class="ProseMirror-trailingBreak"></p>`;

// Configure extensions
const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
  }),
  Bold,
  Italic,
  Underline,
  Link.configure({
    HTMLAttributes:{
      class: "text-blue-500 underline hover:text-blue-700",
    }
  }),
  Image.configure({
  resourceImage: 'link',
  maxSize : 3,
  }),
  FontFamily.configure({
    fontFamilyList:['Roboto','Inter','Source Sans Pro','Poppins','Playfair Display','ubuntu']
  }),
  Heading.configure({
    levels: [1,3],
    HTMLAttributes: {
      class: 'headers font-bold text-gray-900 py-4',
    },
  }),
  BulletList.configure({
    HTMLAttributes:{
      class:"list-disc text-gray-700"
    }
  }),
  OrderedList.configure({
    HTMLAttributes:{
      class: "list-decimal  text-gray-700"
    }
  }),
  Blockquote.configure({
    HTMLAttributes:{
      class: "border-l-[3px] border-black pl-4 overflow-x-auto max-w-full"
    }
  }),
  Code.configure({
    HTMLAttributes:{
      class: "bg-black text-white px-2 py-1 rounded-md overflow-x-auto max-w-full"
    }
  }),
  TextAlign.configure({ types: ['heading', 'paragraph'], alignments:['left','center'], defaultAlignment:'left' }),
  History,
  HorizontalRule,
  ExportPdf.configure({ spacer: true }),
];

// Debounce function
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Editor component with onContentChange prop
interface EditorProps {
  onContentChange: (content: string) => void;
}

const Editor = ({ onContentChange }: EditorProps) => {
  const [content, setContent] = useState(DEFAULT);
  const [theme, setTheme] = useState('light');
  const [disable, setDisable] = useState(false);

  // Debounced content change handler
  const onValueChange = useCallback(
    debounce((value: string) => {
      setContent(value);
      onContentChange(value); // Pass content to parent
    }, 300),
    [onContentChange]
  );

  return (
    <main style={{ padding: '0' }}>
      <div style={{ maxWidth: 1024, margin: '0px auto 20px' }}>
        <RcTiptapEditor
          output="html"
          content={DEFAULT}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme === 'dark'}
          disabled={disable}
        />
        {/* {typeof content === 'string' && (
          <textarea
            readOnly
            style={{
              marginTop: 20,
              height: 200,
              width: '100%',
              borderRadius: 4,
              padding: 10,
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
            }}
            value={content}
          />
        )} */}
      </div>
    </main>
  );
};

export default Editor;