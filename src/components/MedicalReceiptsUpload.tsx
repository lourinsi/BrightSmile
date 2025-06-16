// src/components/MedicalReceiptsUpload.tsx
import React, { useState } from "react";

interface MedicalReceiptsUploadProps {
  patientName: string;
}

const MedicalReceiptsUpload: React.FC<MedicalReceiptsUploadProps> = ({ patientName }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // Check if files exist on the event target.
    // event.target.files is of type FileList | null.
    if (event.target.files) {
      // Explicitly cast event.target.files to FileList to satisfy TypeScript.
      // FileList is an ArrayLike object, and Array.from can convert it to an array of File objects.
      const newFiles: File[] = Array.from(event.target.files as FileList);
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  return (
    // Replaced 'medical-receipts-upload' with Tailwind classes for background, padding, rounded corners, and shadow
    <div className="bg-white p-4 rounded-xl shadow-sm">
      {/* Converted h3 to Tailwind for font size, weight, margin-bottom, and text color */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Medical Receipts</h3>
      {/* Converted flex container for uploaded files/placeholder to Tailwind flex, alignment, border, padding, height, and overflow */}
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-md p-4 h-64 overflow-y-auto">
        {uploadedFiles.length > 0 ? (
          // Unordered list with Tailwind for full width
          <ul className="w-full">
            {uploadedFiles.map((file, index) => (
              // List item with Tailwind flex, alignment, justification, padding, and border
              <li key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                {/* Span for file name with Tailwind text color, size, flex, and gap */}
                <span className="text-gray-700 text-sm flex items-center gap-2">
                  📄 {file.name}
                </span>
                {/* Anchor tag for viewing with Tailwind text color, hover underline, and text size */}
                <a
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        ) : (
          // Converted placeholder div to Tailwind text alignment and color
          <div className="text-center text-gray-500">
            {/* Paragraph with Tailwind margin-bottom */}
            <p className="mb-2">Upload medical receipt (PDF)</p>
            {/* Span with Tailwind font size */}
            <span className="text-4xl">📄</span>
          </div>
        )}
      </div>
      {/* Converted outer div for input/label to Tailwind margin-top and text-alignment */}
      <div className="mt-4 text-center">
        <input
          type="file"
          accept=".pdf"
          id="medicalReceiptsUpload"
          className="hidden" // Already Tailwind
          onChange={handleFileUpload}
          multiple
        />
        <label
          htmlFor="medicalReceiptsUpload"
          // Converted 'primary-btn' and other label styles to Tailwind classes
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer inline-flex items-center gap-2 hover:bg-blue-700 transition-colors duration-200"
        >
          <span className="text-xl">⬆️</span> Upload PDF
        </label>
      </div>
    </div>
  );
};

export default MedicalReceiptsUpload;
