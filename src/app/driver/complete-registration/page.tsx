"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CompleteRegistrationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Vehicle
  const [carName, setCarName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [carType, setCarType] = useState("");
  const [carColor, setCarColor] = useState("");

  // Documents
  const [driversLicenseNumber, setDriversLicenseNumber] = useState("");
  const [driversLicense, setDriversLicense] = useState<string | null>(null);
  const [ninNumber, setNinNumber] = useState("");
  const [ninDoc, setNinDoc] = useState<string | null>(null);

  // Car photo
  const [carPhoto, setCarPhoto] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const licenseRef = useRef<HTMLInputElement>(null);
  const ninRef = useRef<HTMLInputElement>(null);
  const carPhotoRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File): Promise<string> =>
    new Promise((res) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.readAsDataURL(file);
    });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!carName.trim()) e.carName = "Required";
    if (!plateNumber.trim()) e.plateNumber = "Required";
    if (!carType) e.carType = "Required";
    if (!carColor.trim()) e.carColor = "Required";
    if (!driversLicenseNumber.trim()) e.driversLicenseNumber = "Required";
    if (!driversLicense) e.driversLicense = "Upload your driver's license";
    if (!ninNumber.trim()) e.ninNumber = "Required";
    if (ninNumber.replace(/\s/g, "").length !== 11) e.ninNumber = "NIN must be 11 digits";
    if (!ninDoc) e.ninDoc = "Upload your NIN slip";
    if (!carPhoto) e.carPhoto = "Upload a photo of your car";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const existing = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({
      ...existing,
      carName, plateNumber, carType, carColor,
      driversLicenseNumber, ninNumber,
      registrationComplete: true,
    }));
    router.push("/driver/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold ">Complete Registration</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in your vehicle and document details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Vehicle Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-base"> Vehicle Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Car Name / Model</label>
                <input
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  placeholder="Toyota Hiace 2020"
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.carName && <p className="text-red-500 text-xs mt-1">{errors.carName}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Plate Number</label>
                <input
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder="ABC-123-XY"
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.plateNumber && <p className="text-red-500 text-xs mt-1">{errors.plateNumber}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Car Type</label>
                <select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select type</option>
                  {["Sedan", "SUV", "Minibus", "Bus", "Coaster", "Hiace"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {errors.carType && <p className="text-red-500 text-xs mt-1">{errors.carType}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Car Color</label>
                <input
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  placeholder="White"
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.carColor && <p className="text-red-500 text-xs mt-1">{errors.carColor}</p>}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800 text-base">Documents</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Driver's License Number</label>
                <input
                  value={driversLicenseNumber}
                  onChange={(e) => setDriversLicenseNumber(e.target.value.toUpperCase())}
                  placeholder="FRN-ABC123456789"
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.driversLicenseNumber && <p className="text-red-500 text-xs mt-1">{errors.driversLicenseNumber}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">NIN</label>
                <input
                  value={ninNumber}
                  onChange={(e) => setNinNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="11-digit NIN"
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.ninNumber && <p className="text-red-500 text-xs mt-1">{errors.ninNumber}</p>}
              </div>
            </div>

            {/* Upload row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Upload Driver's License</label>
                <input ref={licenseRef} type="file" accept="image/*,application/pdf" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) setDriversLicense(await readFile(file));
                  }} />
                <button type="button" onClick={() => licenseRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-xl p-4 text-sm text-center transition
                    ${driversLicense
                      ? "border-green-400 bg-green-50 text-green-600"
                      : "border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500"}`}>
                  {driversLicense ? "✓ Uploaded" : "📎 Click to upload"}
                </button>
                {errors.driversLicense && <p className="text-red-500 text-xs mt-1">{errors.driversLicense}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Upload NIN Slip</label>
                <input ref={ninRef} type="file" accept="image/*,application/pdf" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) setNinDoc(await readFile(file));
                  }} />
                <button type="button" onClick={() => ninRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-xl p-4 text-sm text-center transition
                    ${ninDoc
                      ? "border-green-400 bg-green-50 text-green-600"
                      : "border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500"}`}>
                  {ninDoc ? "✓ Uploaded" : "📎 Click to upload"}
                </button>
                {errors.ninDoc && <p className="text-red-500 text-xs mt-1">{errors.ninDoc}</p>}
              </div>
            </div>
          </div>

          {/* Car Photo */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="font-semibold text-gray-800 text-base">Car Photo</h2>
            <p className="text-xs text-gray-400">Upload a clear front-facing photo of your vehicle</p>

            <input ref={carPhotoRef} type="file" accept="image/*" className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) setCarPhoto(await readFile(file));
              }} />

            <button type="button" onClick={() => carPhotoRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-xl overflow-hidden transition
                ${carPhoto ? "border-green-400" : "border-gray-200 hover:border-blue-300"}`}>
              {carPhoto ? (
                <img src={carPhoto} alt="Car" className="w-full h-48 object-cover" />
              ) : (
                <div className="h-40 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500 transition">
                  <span className="text-3xl">🚗</span>
                  <p className="text-sm">Click to upload car photo</p>
                </div>
              )}
            </button>

            {carPhoto && (
              <button type="button" onClick={() => carPhotoRef.current?.click()}
                className="text-xs text-blue-500 hover:underline">
                Change photo
              </button>
            )}
            {errors.carPhoto && <p className="text-red-500 text-xs">{errors.carPhoto}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : "Complete Registration"}
          </button>

        </form>
      </div>
    </div>
  );
}