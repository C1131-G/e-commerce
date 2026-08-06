import { NextResponse } from "next/server";

const farmerProfiles = [
  {
    id: "1",
    name: "Ramesh Kumar",
    age: 42,
    email: "ramesh.kumar@example.com",
    phone: "+91 98765 43210",
    village: "Nellore",
    district: "Nellore, Andhra Pradesh",
    farmLocation: "Nellore, Andhra Pradesh",
    landSize: "3.5 acres",
    soilType: "Loamy",
    irrigation: "Drip irrigation",
    cropType: "Rice, Pulses",
    documents: [
      { id: "doc-1", title: "Aadhar Card", fileType: "PDF" },
      { id: "doc-2", title: "Land Record", fileType: "Image" },
      { id: "doc-3", title: "Farming License", fileType: "PDF" },
    ],
    records: [
      {
        year: 2025,
        crop: "Rice",
        yield: "4.2 tons",
        inspection: "Verified",
      },
      {
        year: 2024,
        crop: "Pulses",
        yield: "2.1 tons",
        inspection: "Verified",
      },
    ],
  },
  {
    id: "2",
    name: "Suresh Babu",
    age: 38,
    email: "suresh.babu@example.com",
    phone: "+91 91234 56789",
    village: "Guntur",
    district: "Guntur, Andhra Pradesh",
    farmLocation: "Guntur, Andhra Pradesh",
    landSize: "5 acres",
    soilType: "Sandy loam",
    irrigation: "Canal irrigation",
    cropType: "Chilies, Cotton",
    documents: [
      { id: "doc-4", title: "Aadhar Card", fileType: "PDF" },
      { id: "doc-5", title: "Land Ownership", fileType: "Image" },
      { id: "doc-6", title: "Organic Certificate", fileType: "PDF" },
    ],
    records: [
      {
        year: 2025,
        crop: "Chilies",
        yield: "3.8 tons",
        inspection: "Verified",
      },
      {
        year: 2024,
        crop: "Cotton",
        yield: "1.9 tons",
        inspection: "Verified",
      },
    ],
  },
];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const profile = farmerProfiles.find((farmer) => farmer.id === id);

  if (!profile) {
    return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
  }

  return NextResponse.json({ data: profile });
}
