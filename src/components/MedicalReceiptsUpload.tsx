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
    <div className="medical-receipts-upload bg-white p-4 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Medical Receipts</h3>
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-md p-4 h-64 overflow-y-auto">
        {uploadedFiles.length > 0 ? (
          <ul className="w-full">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-700 text-sm flex items-center gap-2">
                  📄 {file.name}
                </span>
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
          <div className="text-center text-gray-500">
            <p className="mb-2">Upload medical receipt (PDF)</p>
            <span className="text-4xl">📄</span>
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <input
          type="file"
          accept=".pdf"
          id="medicalReceiptsUpload"
          className="hidden"
          onChange={handleFileUpload}
          multiple
        />
        <label
          htmlFor="medicalReceiptsUpload"
          className="primary-btn cursor-pointer inline-flex items-center gap-2"
        >
          <span className="text-xl">⬆️</span> Upload PDF
        </label>
      </div>
    </div>
  );
};

export default MedicalReceiptsUpload;