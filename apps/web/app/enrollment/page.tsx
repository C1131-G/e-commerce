"use client";

import { useState } from "react";

export default function EnrollmentPage() {
  const [step, setStep] = useState(1);

  const steps = [
    "Personal Details",
    "Land Details",
    "Ownership Documents",
    "Farming History",
    "Review & Submit",
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            🌾 Farmer Enrollment Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Complete all steps to enroll your farm.
          </p>
        </div>

        {/* Stepper */}

        <div className="flex justify-between mb-10 overflow-x-auto">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center min-w-[120px]`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
                ${
                  step >= index + 1 ? "bg-green-600 text-white" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>

              <p className="text-sm mt-2 text-center">{item}</p>
            </div>
          ))}
        </div>

        {/* Step 1 */}

        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">👤 Personal Details</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                placeholder="Full Name"
                className="border p-3 rounded-xl"
              />

              <input type="date" className="border p-3 rounded-xl" />

              <select className="border p-3 rounded-xl">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                placeholder="Phone Number"
                className="border p-3 rounded-xl"
              />

              <input placeholder="Email" className="border p-3 rounded-xl" />

              <input
                placeholder="Government ID Number"
                className="border p-3 rounded-xl"
              />
            </div>

            <div className="mt-5">
              <label>📄 Upload Government ID</label>
              <input type="file" className="mt-2" />
            </div>

            <div className="mt-5">
              <label>📸 Upload Profile Photo</label>
              <input type="file" className="mt-2" />
            </div>
          </div>
        )}

        {/* Step 2 */}

        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">📍 Land Details</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                placeholder="Farm Location"
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Land Size (Acres)"
                className="border p-3 rounded-xl"
              />

              <select className="border p-3 rounded-xl">
                <option>Area Type</option>
                <option>Agriculture</option>
                <option>Commercial</option>
              </select>

              <select className="border p-3 rounded-xl">
                <option>Ownership Type</option>
                <option>Owned</option>
                <option>Lease</option>
                <option>Rent</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3 */}

        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              📄 Ownership Documents
            </h2>

            <select className="border p-3 rounded-xl w-full mb-5">
              <option>Select Document Type</option>
              <option>Ownership Proof</option>
              <option>Lease Agreement</option>
            </select>

            <input type="file" />
          </div>
        )}

        {/* Step 4 */}

        {step === 4 && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">🚜 Farming History</h2>

            <input type="file" multiple className="mb-5" />

            <select className="border p-3 rounded-xl w-full mb-5">
              <option>Select Crop Type</option>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Sugarcane</option>
            </select>

            <input type="file" />
          </div>
        )}

        {/* Step 5 */}

        {step === 5 && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">✅ Review & Submit</h2>

            <div className="bg-green-50 p-5 rounded-xl">
              Review all submitted information before final submission.
            </div>

            <label className="flex items-center mt-5 gap-3">
              <input type="checkbox" />
              I confirm all details are correct.
            </label>

            <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl">
              Submit Enrollment
            </button>
          </div>
        )}

        {/* Navigation */}

        <div className="flex justify-between mt-8">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl"
          >
            Previous
          </button>

          <button
            disabled={step === 5}
            onClick={() => setStep(step + 1)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
}
