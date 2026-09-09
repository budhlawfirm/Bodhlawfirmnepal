import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Palette,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Table as TableIcon,
  Trash2,
  Underline as UnderlineIcon,
  Undo,
  Unlink,
  Upload
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write or paste your article content here (supports copying directly from Microsoft Word)...'
}) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState(value);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState('#c5a059');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        }
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#c5a059] underline hover:text-[#d4b050] transition-colors',
          target: '_blank'
        }
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg my-4 max-w-full h-auto border border-[#332e24] shadow-lg mx-auto block'
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-4 border border-[#332e24]'
        }
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-[#24211a]'
        }
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-[#1a1710] text-[#c5a059] font-bold p-3 text-left border border-[#332e24]'
        }
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'p-3 border border-[#24211a] text-sm text-[#bcb7ab]'
        }
      }),
      Placeholder.configure({
        placeholder
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setHtmlSource(html);
    }
  });

  // Keep editor content in sync when value changes externally (e.g. switching selected blog)
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || '');
      setHtmlSource(value || '');
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="h-64 bg-[#0a0907] border border-[#24211a] rounded flex items-center justify-center text-[#7d796f] text-sm">
        Loading MS Word Rich Text Editor...
      </div>
    );
  }

  const handleInsertImageFromUrl = () => {
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter Web Link URL:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleHtmlSourceChange = (newHtml: string) => {
    setHtmlSource(newHtml);
    onChange(newHtml);
    editor.commands.setContent(newHtml);
  };

  return (
    <div className="w-full bg-[#0a0907] border border-[#2e2a22] rounded-lg overflow-hidden shadow-2xl">
      {/* Editor Main Toolbar (MS Word Style) */}
      <div className="bg-[#14120e] border-b border-[#29251d] p-2 flex flex-wrap items-center gap-1 text-xs select-none sticky top-0 z-20">
        {/* Undo & Redo */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[#29251d]">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded text-[#a39f93] hover:text-white hover:bg-[#242018] disabled:opacity-30 disabled:hover:bg-transparent"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded text-[#a39f93] hover:text-white hover:bg-[#242018] disabled:opacity-30 disabled:hover:bg-transparent"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Text Style / Heading Dropdown */}
        <div className="flex items-center gap-1 px-2 border-r border-[#29251d]">
          <select
            value={
              editor.isActive('heading', { level: 1 })
                ? 'h1'
                : editor.isActive('heading', { level: 2 })
                ? 'h2'
                : editor.isActive('heading', { level: 3 })
                ? 'h3'
                : editor.isActive('heading', { level: 4 })
                ? 'h4'
                : editor.isActive('blockquote')
                ? 'quote'
                : editor.isActive('codeBlock')
                ? 'code'
                : 'p'
            }
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'p') editor.chain().focus().setParagraph().run();
              else if (val === 'h1') editor.chain().focus().toggleHeading({ level: 1 }).run();
              else if (val === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
              else if (val === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run();
              else if (val === 'h4') editor.chain().focus().toggleHeading({ level: 4 }).run();
              else if (val === 'quote') editor.chain().focus().toggleBlockquote().run();
              else if (val === 'code') editor.chain().focus().toggleCodeBlock().run();
            }}
            className="bg-[#0a0907] border border-[#383327] text-[#f3ece0] text-xs rounded px-2 py-1 outline-none focus:border-[#c5a059]"
          >
            <option value="p">Normal Paragraph</option>
            <option value="h1">Heading 1 (Main Title)</option>
            <option value="h2">Heading 2 (Section Title)</option>
            <option value="h3">Heading 3 (Subsection)</option>
            <option value="h4">Heading 4 (Minor Subhead)</option>
            <option value="quote">Quote Block</option>
            <option value="code">Code Block</option>
          </select>
        </div>

        {/* Character Formatting (Bold, Italic, Underline, Strike, Color, Highlight) */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[#29251d]">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('bold')
                ? 'bg-[#c5a059] text-black font-bold'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('italic')
                ? 'bg-[#c5a059] text-black font-bold'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('underline')
                ? 'bg-[#c5a059] text-black font-bold'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('strike')
                ? 'bg-[#c5a059] text-black font-bold'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          {/* Text Color Picker */}
          <div className="relative flex items-center ml-1">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                editor.chain().focus().setColor(e.target.value).run();
              }}
              className="w-5 h-5 bg-transparent border-0 cursor-pointer p-0"
              title="Text Color"
            />
          </div>

          {/* Text Highlight */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#c5a05940' }).run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('highlight')
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Highlight Text"
          >
            <Highlighter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="p-1.5 rounded text-[#a39f93] hover:text-red-400 hover:bg-[#242018]"
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[#29251d]">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'justify' })
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Justify Text"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[#29251d]">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('bulletList')
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('orderedList')
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded text-[#a39f93] hover:text-white hover:bg-[#242018]"
            title="Horizontal Divider"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Media & Objects (Link, Image, Table) */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[#29251d]">
          <button
            type="button"
            onClick={setLink}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('link')
                ? 'bg-[#c5a059] text-black'
                : 'text-[#a39f93] hover:text-white hover:bg-[#242018]'
            }`}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          {editor.isActive('link') && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded text-red-400 hover:bg-[#242018]"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>
          )}

          {/* Insert Image Button */}
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="p-1.5 rounded text-[#a39f93] hover:text-[#c5a059] hover:bg-[#242018] flex items-center gap-1"
            title="Insert Article Image"
          >
            <ImageIcon className="w-4 h-4 text-[#c5a059]" />
            <span className="text-[10px] hidden xl:inline font-medium">Image</span>
          </button>

          {/* Table Insert */}
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
            className="p-1.5 rounded text-[#a39f93] hover:text-white hover:bg-[#242018]"
            title="Insert 3x3 Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Table Management Actions (when inside a table) */}
        {editor.isActive('table') && (
          <div className="flex items-center gap-1 px-2 border-r border-[#29251d] bg-[#1a1710] py-0.5 rounded">
            <button
              type="button"
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a241a] text-[#c5a059] hover:bg-[#3d3424]"
            >
              +Row
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a241a] text-[#c5a059] hover:bg-[#3d3424]"
            >
              +Col
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 hover:bg-red-900"
            >
              Del Table
            </button>
          </div>
        )}

        {/* HTML Source Code Toggle */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsHtmlMode(!isHtmlMode)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
              isHtmlMode
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'bg-[#1c1913] text-[#a39f93] border border-[#2b271e] hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            {isHtmlMode ? 'WYSIWYG Mode' : 'HTML Code'}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="min-h-[380px] max-h-[600px] overflow-y-auto p-4 sm:p-6 bg-[#060606] text-[#f3ece0]">
        {isHtmlMode ? (
          <textarea
            value={htmlSource}
            onChange={(e) => handleHtmlSourceChange(e.target.value)}
            className="w-full h-96 bg-[#0a0907] font-mono text-xs text-[#62d6b2] border border-[#29251d] p-4 rounded outline-none focus:border-[#c5a059] leading-relaxed resize-y"
            placeholder="Edit HTML directly..."
          />
        ) : (
          <EditorContent
            editor={editor}
            className="prose prose-invert max-w-none focus:outline-none focus:ring-0 [&_.tiptap]:outline-none [&_.tiptap]:min-h-[340px] [&_.tiptap_p]:mb-3 [&_.tiptap_p]:leading-relaxed [&_.tiptap_h1]:text-2xl [&_.tiptap_h1]:font-serif [&_.tiptap_h1]:text-[#f3ece0] [&_.tiptap_h1]:my-4 [&_.tiptap_h2]:text-xl [&_.tiptap_h2]:font-serif [&_.tiptap_h2]:text-[#c5a059] [&_.tiptap_h2]:my-3 [&_.tiptap_h3]:text-lg [&_.tiptap_h3]:font-serif [&_.tiptap_h3]:text-[#e6dfd3] [&_.tiptap_h3]:my-2 [&_.tiptap_blockquote]:border-l-2 [&_.tiptap_blockquote]:border-[#c5a059] [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:italic [&_.tiptap_blockquote]:text-[#bcb7ab] [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6 [&_.tiptap_ul]:my-2 [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_ol]:my-2 [&_.tiptap_table]:w-full [&_.tiptap_table]:border-collapse [&_.tiptap_td]:border [&_.tiptap_td]:border-[#332e24] [&_.tiptap_td]:p-2 [&_.tiptap_th]:border [&_.tiptap_th]:border-[#332e24] [&_.tiptap_th]:p-2 [&_.tiptap_th]:bg-[#1a1710] [&_.tiptap_th]:text-[#c5a059]"
          />
        )}
      </div>

      {/* Editor Footer Status Bar */}
      <div className="bg-[#12100a] border-t border-[#24211a] px-4 py-2 flex items-center justify-between text-[11px] text-[#7d796f]">
        <div className="flex items-center gap-3">
          <span>
            Words:{' '}
            <strong className="text-[#a39f93]">
              {editor.getText().trim() ? editor.getText().trim().split(/\s+/).length : 0}
            </strong>
          </span>
          <span>
            Characters:{' '}
            <strong className="text-[#a39f93]">{editor.getText().length}</strong>
          </span>
        </div>
        <div className="text-emerald-400/90 font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          MS Word Paste & Formatting Ready
        </div>
      </div>

      {/* Insert Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12100d] border border-[#383327] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#29251d] pb-3">
              <h3 className="text-sm font-semibold text-[#f3ece0] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#c5a059]" />
                Insert Article Image
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-[#7d796f] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Option 1: File Upload */}
            <div>
              <label className="block text-xs text-[#a39f93] mb-1.5 font-medium">
                Option A: Upload Image from Computer
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  handleFileUpload(e);
                  setShowImageModal(false);
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-[#1f1b14] hover:bg-[#2e291f] border border-[#383327] rounded text-xs text-[#c5a059] flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <Upload className="w-4 h-4" />
                Choose Local Image File
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#24211a]" />
              <span className="flex-shrink mx-3 text-[10px] text-[#7d796f] uppercase">
                Or enter image URL
              </span>
              <div className="flex-grow border-t border-[#24211a]" />
            </div>

            {/* Option 2: Image Web URL */}
            <div>
              <label className="block text-xs text-[#a39f93] mb-1 font-medium">
                Option B: Web Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-[#0a0907] border border-[#2b271e] focus:border-[#c5a059] p-2.5 text-xs text-[#f3ece0] rounded outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2 justify-end">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 rounded text-xs text-[#a39f93] hover:text-white bg-[#1a1712]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImageFromUrl}
                className="px-4 py-2 rounded text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d4b050]"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
