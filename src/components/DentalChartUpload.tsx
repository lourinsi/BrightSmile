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
    <div className="dental-chart-upload bg-white p-4 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Dental Chart</h3>
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-md p-4 h-64 overflow-hidden">
        {chartImage ? (
          <img
            src={chartImage}
            alt={`${patientName}'s Dental Chart`}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <p className="text-gray-500">No dental chart uploaded yet.</p>
        )}
      </div>
      <div className="mt-4 text-center">
        <input
          type="file"
          accept="image/*"
          id="dentalChartUpload"
          className="hidden"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="dentalChartUpload"
          className="primary-btn cursor-pointer inline-flex items-center gap-2"
        >
          <span className="text-xl">⬆️</span> Upload New Chart
        </label>
      </div>
    </div>
  );
};

export default DentalChartUpload;