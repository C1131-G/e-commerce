import {
  BadgeCheck,
  Bell,
  FileCheck2,
  FileText,
  IdCard,
  Leaf,
  MapPinned,
  Navigation,
  Ruler,
  ShieldCheck,
} from "lucide-react";

export const authorizer = {
  name: "Siva",
  role: "Authorizer",
  phone: "+91 98765 43210",
};

export const farmers = [
  {
    id: "FRM-1001",
    name: "Ramesh Kumar",
    phone: "+91 98450 11223",
    village: "Maddur",
    district: "Mandya",
    assignedDate: "2026-06-08",
    status: "In Progress",
    priority: "High",
    landSize: "3.5 acres",
    actualMeasuredSize: "3.4 acres",
    ownership: "Owner",
    crops: "Paddy, Sugarcane",
    farmingMethod: "Organic",
    gpsPin: "12.5842, 77.0451",
    currentLocation: "12.5801, 77.0495",
    distance: "2.8 km",
    travelTime: "12 min",
    bio: "Second-generation farmer using drip irrigation and organic inputs for seasonal crops.",
    documents: ["Aadhaar card", "RTC land record", "Organic certificate"],
    records: ["2024 crop subsidy record", "2025 crop insurance record"],
    photos: ["Identity photo", "Farm boundary", "Crop field"],
  },
  {
    id: "FRM-1002",
    name: "Lakshmi Devi",
    phone: "+91 99001 22334",
    village: "Hunsur",
    district: "Mysuru",
    assignedDate: "2026-06-08",
    status: "Assigned",
    priority: "High",
    landSize: "2.1 acres",
    actualMeasuredSize: "",
    ownership: "Family Owned",
    crops: "Ragi, Turmeric",
    farmingMethod: "Mixed",
    gpsPin: "12.3036, 76.2928",
    currentLocation: "12.3000, 76.2962",
    distance: "6.4 km",
    travelTime: "22 min",
    bio: "Smallholder farmer with mixed cultivation and seasonal government support records.",
    documents: ["Voter ID", "Mutation certificate", "Soil health card"],
    records: ["2024 seed purchase record", "2025 MSP sale record"],
    photos: ["Profile image", "Land sketch"],
  },
  {
    id: "FRM-1003",
    name: "Naveen Gowda",
    phone: "+91 99887 76655",
    village: "Channapatna",
    district: "Ramanagara",
    assignedDate: "2026-06-07",
    status: "Completed",
    priority: "Medium",
    landSize: "5 acres",
    actualMeasuredSize: "5 acres",
    ownership: "Lease",
    crops: "Coconut, Banana",
    farmingMethod: "Conventional",
    gpsPin: "12.6518, 77.2065",
    currentLocation: "12.6491, 77.2100",
    distance: "14.2 km",
    travelTime: "31 min",
    bio: "Lease farmer managing perennial crops with two years of sales and input records.",
    documents: ["PAN", "Lease agreement", "Water source proof"],
    records: ["2024 fertilizer record", "2025 warehouse receipt"],
    photos: ["Lease document", "Farm entrance"],
  },
];

export const verificationStages = [
  {
    id: "identity",
    number: 1,
    title: "Identity Check",
    route: "/authorizer/verification/identity",
    priority: "High",
    icon: IdCard,
    description:
      "Verify the farmer's identity on-site by checking government ID details.",
    checklist: [
      "Name match",
      "Photo match",
      "ID number match",
      "On-site photo captured",
    ],
    fields: [
      "Government ID number",
      "On-site photo reference",
      "Identity notes",
    ],
    userFlow:
      "Arrive at farm -> open stage -> verify ID in person -> upload a photo -> mark complete",
  },
  {
    id: "location",
    number: 2,
    title: "Farm Location",
    route: "/authorizer/verification/location",
    priority: "High",
    icon: MapPinned,
    description:
      "Confirm the physical farm location matches the GPS pin submitted on the map.",
    checklist: [
      "Submitted pin reviewed",
      "Current GPS captured",
      "Location match selected",
    ],
    fields: ["Distance discrepancy", "Current GPS location", "Location notes"],
    userFlow:
      "Open map -> compare submitted pin to actual location -> note difference -> mark complete",
  },
  {
    id: "land-size",
    number: 3,
    title: "Land Size",
    route: "/authorizer/verification/land-size",
    priority: "High",
    icon: Ruler,
    description:
      "Verify actual land size against the farmer's submitted land size.",
    checklist: [
      "Submitted size checked",
      "Actual measured size entered",
      "Boundary photo uploaded",
    ],
    fields: ["Actual measured size", "Match or mismatch", "Land size notes"],
    userFlow:
      "Measure land -> enter actual size -> compare submitted size -> mark complete",
  },
  {
    id: "ownership",
    number: 4,
    title: "Ownership Documents",
    route: "/authorizer/verification/ownership",
    priority: "High",
    icon: FileText,
    description:
      "Verify ownership type and check all supporting documents are genuine.",
    checklist: [
      "Ownership type reviewed",
      "Document authenticity checked",
      "Mismatch recorded if any",
    ],
    fields: [
      "Ownership verification result",
      "Additional document name",
      "Document notes",
    ],
    userFlow:
      "Review documents -> check authenticity -> toggle verified -> note issues -> mark complete",
  },
  {
    id: "crops",
    number: 5,
    title: "Crops and Farming Method",
    route: "/authorizer/verification/crops",
    priority: "High",
    icon: Leaf,
    description:
      "Confirm actual crops and farming method match the submitted details.",
    checklist: [
      "Observed crops entered",
      "Farming method verified",
      "Organic certificate checked",
    ],
    fields: ["Observed crops", "Observed farming method", "Crop notes"],
    userFlow:
      "Walk farm -> observe crops -> confirm or flag mismatch -> upload photos -> mark complete",
  },
  {
    id: "records",
    number: 6,
    title: "Two Year Records",
    route: "/authorizer/verification/records",
    priority: "Medium",
    icon: FileCheck2,
    description:
      "Review the last two years of government farming records submitted by the farmer.",
    checklist: [
      "2024 record reviewed",
      "2025 record reviewed",
      "Discrepancy notes captured",
    ],
    fields: [
      "2024 record status",
      "2025 record status",
      "Record discrepancy notes",
    ],
    userFlow:
      "Review records -> verify content -> note issues -> mark complete",
  },
];

export const dashboardCards = [
  { label: "Assigned", value: 1, tone: "blue", icon: ShieldCheck },
  { label: "In Progress", value: 1, tone: "amber", icon: BadgeCheck },
  { label: "Completed", value: 1, tone: "green", icon: FileCheck2 },
  { label: "Rejected", value: 0, tone: "red", icon: FileText },
];

export const notifications = [
  {
    id: "NOT-1",
    type: "New Assignment",
    priority: "High",
    time: "10 min ago",
    icon: Bell,
    message:
      "Lakshmi Devi has been assigned for urgent farm verification in Hunsur.",
  },
  {
    id: "NOT-2",
    type: "Reminder",
    priority: "Medium",
    time: "1 hr ago",
    icon: FileCheck2,
    message:
      "Complete final report submission for Ramesh Kumar after all six stages.",
  },
  {
    id: "NOT-3",
    type: "Navigation",
    priority: "High",
    time: "Today",
    icon: Navigation,
    message:
      "Pinned farm location is ready. Open navigation before starting the visit.",
  },
];
