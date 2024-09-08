//Wysiwyg.jsx

/*
A component to manage the WYSIWYG editor for the store
*/

//INFO React Libraries
import { useEffect, useState } from "react";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Tiptap Libraries
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";

import { SketchPicker } from "react-color";

//Color Picker
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaPalette,
  FaStrikethrough,
  FaCode,
  FaQuoteRight,
} from "react-icons/fa";

function Wysiwyg() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#E2E8F0");
  const [pendingColor, setPendingColor] = useState("#E2E8F0"); // Store pending color
  const [name, setName] = useState(""); // Store the name of the object
  const [objects, setObjects] = useState([]); // Store array of objects
  const [content, setContent] = useState(""); // Store content as JSX string

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle, // For custom text styles
      Color, // For text color
      Underline, // To enable underline formatting
    ],
    content: "<p>Type something here...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Store the editor content as HTML string
    },
  });

  useEffect(() => {
    gsap.from(".editor-container", { opacity: 0, y: 20, duration: 1 });
  }, []);

  if (!editor) {
    return null;
  }

  // Function to apply the color only when the color picker is closed
  const applyColor = () => {
    editor.chain().focus().setColor(pendingColor).run();
    setCurrentColor(pendingColor); // Set the actual selected color
    setShowColorPicker(false); // Close the color picker
  };

  // Function to handle adding the object with the name and content to the array
  const handleAddObject = () => {
    if (name && content) {
      setObjects([...objects, { name, bio: content }]);
      setName(""); // Reset the name input
      editor.commands.clearContent(); // Clear the editor
      //set editor with placeholder text
      editor.commands.setContent("<p>Type something here...</p>");
    }
  };

  return (
    <div className="editor-container text-white">
      {/* Form for adding name */}
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter bio name..."
          className="w-full p-2 rounded-md text-black"
        />
      </div>

      {/* Toolbar */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 bg-gray-700 hover:bg-gray-600 rounded ${
            editor.isActive("bold") ? "bg-blue-500" : ""
          }`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 bg-gray-700 hover:bg-gray-600 rounded ${
            editor.isActive("italic") ? "bg-blue-500" : ""
          }`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 bg-gray-700 hover:bg-gray-600 rounded ${
            editor.isActive("underline") ? "bg-blue-500" : ""
          }`}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 bg-gray-700 hover:bg-gray-600 rounded ${
            editor.isActive("strike") ? "bg-blue-500" : ""
          }`}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 bg-gray-700 hover:bg-gray-600 rounded ${
            editor.isActive("codeBlock") ? "bg-blue-500" : ""
          }`}
        >
          <FaCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 bg-gray-700 hover:bg-gray-600 rounded ${
            editor.isActive("blockquote") ? "bg-blue-500" : ""
          }`}
        >
          <FaQuoteRight />
        </button>
        {/* Color Picker */}
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 bg-slate-700 hover:bg-gray-600 rounded"
        >
          <FaPalette style={{ color: currentColor }} />
        </button>
        {showColorPicker && (
          <div className="text-black absolute z-10">
            <SketchPicker
              color={pendingColor}
              onChange={(color) => {
                const rgbaColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
                setPendingColor(rgbaColor);
              }}
              styles={{
                default: {
                  picker: {
                    border: "1px solid #E2E8F0", // Custom border color
                    backgroundColor: "#6B7280", // Custom background color
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Custom shadow (optional)
                    borderRadius: "8px", // Custom border radius (optional)
                  },
                },
              }}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={applyColor}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose prose-lg p-4 rounded-lg shadow-lg border border-gray-300 bg-gray-800"
      />

      {/* Add Object Button */}
      <button
        onClick={handleAddObject}
        className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
      >
        Enter Bio
      </button>

      {/* Display Added Objects */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Saved Bios:</h3>
        <ul className="list-disc ml-6">
          {objects.map((obj, index) => (
            <li key={index} className="mb-2">
              <strong>{obj.name}:</strong>
              <div
                dangerouslySetInnerHTML={{ __html: obj.bio }} // Render the bio as JSX
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Wysiwyg;
