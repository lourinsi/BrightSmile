// src/components/DentalChartUpload.tsx
import React, { useState } from "react";

interface DentalChartUploadProps {
  patientName: string;
}

const DentalChartUpload: React.FC<DentalChartUploadProps> = ({ patientName }) => {
  const [chartImage, setChartImage] = useState<string | null>("/dental-chart-placeholder.png"); // Placeholder image

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setChartImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // Replaced 'dental-chart-upload' with Tailwind classes for background, padding, rounded corners, and shadow
    <div className="bg-white p-4 rounded-xl shadow-sm">
      {/* Converted h3 to Tailwind for font size, weight, margin-bottom, and text color */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Dental Chart</h3>
      {/* Converted flex container for image/placeholder to Tailwind flex, alignment, border, padding, height, and overflow */}
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-md p-4 h-64 overflow-hidden">
        {chartImage ? (
          <img
            src={chartImage}
            alt={`${patientName}'s Dental Chart`}
            className="max-w-full max-h-full object-contain" // Already Tailwind
          />
        ) : (
          // Converted paragraph to Tailwind text color
          <p className="text-gray-500">No dental chart uploaded yet.</p>
        )}
      </div>
      {/* Converted outer div for input/label to Tailwind margin-top and text-alignment */}
      <div className="mt-4 text-center">
        <input
          type="file"
          accept="image/*"
          id="dentalChartUpload"
          className="hidden" // Already Tailwind
          onChange={handleImageUpload}
        />
        <label
          htmlFor="dentalChartUpload"
          // Converted 'primary-btn' and other label styles to Tailwind classes
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer inline-flex items-center gap-2 hover:bg-blue-700 transition-colors duration-200"
        >
          <span className="text-xl">⬆️</span> Upload New Chart
        </label>
      </div>
    </div>
  );
};

export default DentalChartUpload;
