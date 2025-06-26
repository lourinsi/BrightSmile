// src/components/AddDentalRecordOverlay.tsx
import React, { useState, useRef } from "react";
// Assuming DentalRecord status types from src/types/index.ts are used
import type { DentalRecord } from '../types';

// Use the exact status types from DentalRecord interface for the status field
type DentalRecordStatus = DentalRecord['status'];
// DentalRecordProcedure now allows any string when 'Other' is selected
type DentalRecordProcedure = DentalRecord['procedure'] | string;

// Define the shape of the new dental record data for the form
interface NewDentalRecordFormData {
  date: string; // Storing as string from input type="date"
  procedure: DentalRecordProcedure; // Can be a predefined procedure or a custom string
  totalCost: number;
  paymentLeft: number;
  status: DentalRecordStatus | ''; // Use specific status types, allow empty for initial state
  notes: string;
}

// Rename the props interface to match the component name
interface AddDentalRecordOverlayProps {
  isOpen: boolean; // Controls whether the overlay is visible
  onClose: () => void; // Function to call when the overlay should close
  onSave: (newDentalRecord: NewDentalRecordFormData) => void; // Function to call when the record is saved
}

const AddDentalRecordOverlay: React.FC<AddDentalRecordOverlayProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  // If the overlay is not open, don't render anything
  if (!isOpen) return null;

  // Create a ref to attach to the modal content div
  const modalContentRef = useRef<HTMLDivElement>(null);

  // State to hold the form data
  const [formData, setFormData] = useState<NewDentalRecordFormData>({
    date: '', // Initialize as empty string for date input
    procedure: '',
    totalCost: 0,
    paymentLeft: 0,
    status: '', // Initialize as empty string
    notes: '',
  });

  // State to track if 'Other' procedure is selected
  const [isOtherProcedure, setIsOtherProcedure] = useState(false);
  const [otherProcedureText, setOtherProcedureText] = useState('');


  // Handle changes for text, number, and select inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'procedure') {
      // If procedure is 'Other', set flag and clear custom text if not 'Other'
      setIsOtherProcedure(value === 'Other');
      // If user switches from 'Other' to a predefined procedure, clear otherProcedureText
      if (value !== 'Other') {
        setOtherProcedureText('');
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === 'otherProcedureText') {
      // If it's the custom 'other' input, update that state and also the main procedure in formData
      setOtherProcedureText(value);
      setFormData((prev) => ({ ...prev, procedure: value }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handleSave button click
  const handleSave = () => {
    // Determine the final procedure value
    const finalProcedure = isOtherProcedure ? otherProcedureText : formData.procedure;

    // Basic validation for required fields
    if (
      !formData.date ||
      !finalProcedure || // Validate finalProcedure
      !formData.status
    ) {
      alert("Please fill in all required fields correctly (marked with *)");
      return;
    }

    // Create the new dental record object with the final procedure
    const newDentalRecord = {
      ...formData,
      procedure: finalProcedure,
    };

    // Pass the form data to the onSave prop
    onSave(newDentalRecord);

    // Optionally clear form after saving
    setFormData({
      date: '',
      procedure: '',
      totalCost: 0,
      paymentLeft: 0,
      status: '',
      notes: '',
    });
    setOtherProcedureText(''); // Clear custom text
    setIsOtherProcedure(false); // Reset other procedure flag
    onClose(); // Close the modal after saving
  };

  // Handle clicks on the overlay background to close the modal
  // const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (
  //     modalContentRef.current &&
  //     !modalContentRef.current.contains(e.target as Node)
  //   ) {
  //     onClose(); // Call the onClose prop to close the overlay
  //   }
  // };

  return (
    // Overlay background (darkens the rest of the page)
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
    >
      {/* Modal Content */}
      <div
        ref={modalContentRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Dental Record</h2> {/* Updated title */}
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
          {/* Record Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Record Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="procedure"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Procedure <span className="text-red-500">*</span>
                </label>
                <select
                  id="procedure"
                  name="procedure"
                  value={formData.procedure === 'Other' ? 'Other' : formData.procedure} // Ensure 'Other' option is selected if custom text exists
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="" disabled>Select procedure</option>
                  <option value="Dental Cleaning">Dental Cleaning</option>
                  <option value="Tooth Extraction">Tooth Extraction</option>
                  <option value="Dental Fillings">Dental Fillings</option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Root Canal Treatment">Root Canal Treatment</option>
                  <option value="Braces">Braces</option>
                  <option value="Other">Other</option> {/* Added Other option */}
                </select>
                {/* Conditionally rendered input for 'Other' procedure */}
                {isOtherProcedure && (
                  <input
                    type="text"
                    id="otherProcedureText"
                    name="otherProcedureText"
                    value={otherProcedureText}
                    onChange={handleChange}
                    placeholder="Specify procedure"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="totalCost"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Total Cost
                </label>
                <input
                  type="number"
                  id="totalCost"
                  name="totalCost"
                  value={formData.totalCost}
                  onChange={handleChange}
                  placeholder="Enter total cost"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="paymentLeft"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Payment Left
                </label>
                <input
                  type="number"
                  id="paymentLeft"
                  name="paymentLeft"
                  value={formData.paymentLeft}
                  onChange={handleChange}
                  placeholder="Enter payment left"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="" disabled>Select status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter notes"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
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
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDentalRecordOverlay;
