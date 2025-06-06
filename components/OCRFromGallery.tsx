"use client";
// components/OCRFromGallery.tsx
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRFromGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOCR = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(selectedImage, "eng", {
        logger: (m) => console.log(m),
      });
      setOcrText(text);
    } catch (err) {
      console.error("OCR Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {selectedImage && (
        <img
          src={selectedImage}
          alt="Preview"
          className="w-64 rounded shadow mb-4"
        />
      )}

      <button
        onClick={handleOCR}
        disabled={!selectedImage || loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Reading..." : "Run OCR"}
      </button>

      <pre className="mt-4 whitespace-pre-wrap bg-gray-100 p-3 rounded w-full">
        {ocrText || "OCR output will appear here"}
      </pre>
    </div>
  );
};

export default OCRFromGallery;
