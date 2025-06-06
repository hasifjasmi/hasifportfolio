import OCRCamera from "@/components/OCRCamera";
import OCRFromGallery from "@/components/OCRFromGallery";

export default function OCRPage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">OCR Tools</h1>

      <h2 className="text-xl font-semibold mb-2">📸 Use Camera</h2>
      <OCRCamera />

      <hr className="my-6 border-gray-300" />

      <h2 className="text-xl font-semibold mb-2">🖼️ Upload from Gallery</h2>
      <OCRFromGallery />
    </div>
  );
}
