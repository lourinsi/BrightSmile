// src/components/AddPatientOverlay.tsx
import React, { useState, useRef } from 'react';

// Define the shape of the new patient data
interface NewPatientFormData {
  fullName: string;
  age: string; // Use string for input, convert to number on save
  sex: 'Male' | 'Female' | 'Other' | '';
  phoneNumber: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddPatientOverlayProps {
  isOpen: boolean; // Controls whether the overlay is visible
  onClose: () => void; // Function to call when the overlay should close
  onSave: (newPatient: NewPatientFormData) => void; // Function to call when the patient is saved
}

const AddPatientOverlay: React.FC<AddPatientOverlayProps> = ({ isOpen, onClose, onSave }) => {
  // If the overlay is not open, don't render anything
  if (!isOpen) return null;

  // Create a ref to attach to the modal content div
  const modalContentRef = useRef<HTMLDivElement>(null);

  // State to hold the form data
  const [formData, setFormData] = useState<NewPatientFormData>({
    fullName: '',
    age: '',
    sex: '',
    phoneNumber: '',
    emailAddress: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, sex: e.target.value as 'Male' | 'Female' | 'Other' }));
  };

  // Handle save button click
  const handleSave = () => {
    // Basic validation (can be expanded)
    if (!formData.fullName || !formData.age || !formData.sex || !formData.phoneNumber) {
      alert('Please fill in all required fields (marked with *)'); // Use a custom modal in real app
      return;
    }
    onSave(formData);
    // Optionally clear form after saving
    setFormData({
      fullName: '', age: '', sex: '', phoneNumber: '',
      emailAddress: '', streetAddress: '', city: '', state: '', zipCode: ''
    });
    onClose(); // Close the modal after saving
  };

  // Handle clicks on the overlay background
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click occurred directly on the overlay background (the parent div)
    // and not on the modal content itself (or any of its children).
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose(); // Call the onClose prop to close the overlay
    }
  };

  return (
    // Overlay background (darkens the rest of the page)
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={handleOverlayClick}>
      {/* Modal Content */}
      <div ref={modalContentRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2"> {/* Full Name spans both columns */}
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age <span className="text-red-500">*</span></label>
                <input
                  type="number" // Changed to number type for age
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex <span className="text-red-500">*</span></label>
                <div className="flex items-center space-x-4 h-10"> {/* Aligned with input height */}
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="Male"
                      checked={formData.sex === 'Male'}
                      onChange={handleRadioChange}
                      className="form-radio text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="Female"
                      checked={formData.sex === 'Female'}
                      onChange={handleRadioChange}
                      className="form-radio text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="Other"
                      checked={formData.sex === 'Other'}
                      onChange={handleRadioChange}
                      className="form-radio text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">Other</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2"> {/* Street Address spans both columns */}
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2"> {/* ZIP Code spans both columns */}
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter ZIP code"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 mt-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
          >
            Save Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientOverlay;
