"use client";
// components/OCRCamera.tsx
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const videoConstraints = {
  facingMode: "environment", // Use back camera on phones
};

const OCRCamera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const captureAndProcess = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      setLoading(true);
      try {
        const {
          data: { text },
        } = await Tesseract.recognize(imageSrc, "eng", {
          logger: (m) => console.log(m),
        });
        setOcrText(text);
      } catch (err) {
        console.error("OCR Error:", err);
      }
      setLoading(false);
    }
  }, [webcamRef]);

  return (
    <div className="flex flex-col items-center p-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        className="rounded border mb-4"
      />
      <button
        onClick={captureAndProcess}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Capture & Read Text"}
      </button>

      <pre className="mt-4 whitespace-pre-wrap bg-gray-100 p-3 rounded w-full">
        {ocrText || "OCR output will appear here"}
      </pre>
    </div>
  );
};

export default OCRCamera;
