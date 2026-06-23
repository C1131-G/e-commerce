import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Filter,
  Home,
  IdCard,
  Layers,
  Leaf,
  LocateFixed,
  LogIn,
  LogOut,
  MapPinned,
  Menu,
  Navigation,
  Phone,
  Ruler,
  Search,
  ShieldCheck,
  Upload,
  UserRound,
  X
} from "lucide-react";

const farmers = [
  {
    id: "FRM-1042",
    name: "Ramesh Kumar",
    village: "Maddur",
    district: "Mandya",
    assignedDate: "2026-06-06",
    status: "In Progress",
    urgency: "High",
    phone: "+91 98765 43210",
    landSize: "3.5 acres",
    ownership: "Owner",
    crop: "Paddy, Sugarcane",
    farmingMethod: "Organic",
    coordinates: "12.5842, 77.0451",
    documents: ["Aadhaar", "Land Record RTC", "Organic Certificate"],
    records: ["2024 subsidy record", "2025 crop insurance record"]
  },
  {
    id: "FRM-1088",
    name: "Lakshmi Devi",
    village: "Hunsur",
    district: "Mysuru",
    assignedDate: "2026-06-07",
    status: "Assigned",
    urgency: "High",
    phone: "+91 91234 56780",
    landSize: "2.1 acres",
    ownership: "Family Owned",
    crop: "Ragi, Turmeric",
    farmingMethod: "Mixed",
    coordinates: "12.3036, 76.2928",
    documents: ["Voter ID", "Mutation Certificate", "Soil Report"],
    records: ["2024 seed purchase record", "2025 MSP sale record"]
  },
  {
    id: "FRM-1155",
    name: "Naveen Gowda",
    village: "Channapatna",
    district: "Ramanagara",
    assignedDate: "2026-06-04",
    status: "Completed",
    urgency: "Medium",
    phone: "+91 99887 76655",
    landSize: "5 acres",
    ownership: "Lease",
    crop: "Coconut, Banana",
    farmingMethod: "Conventional",
    coordinates: "12.6518, 77.2065",
    documents: ["PAN", "Lease Agreement", "Water Source Proof"],
    records: ["2024 fertilizer record", "2025 warehouse receipt"]
  }
];

const verificationStages = [
  {
    id: "identity",
    title: "Identity Check",
    icon: IdCard,
    priority: "High",
    purpose: "Verify the farmer's identity on-site against the government ID submitted.",
    checks: ["Name match", "Photo match", "ID number match", "On-site photo captured"],
    fields: ["Photo upload", "Notes", "Mark stage complete"]
  },
  {
    id: "location",
    title: "Farm Location",
    icon: MapPinned,
    priority: "High",
    purpose: "Confirm the physical farm location matches the submitted GPS pin.",
    checks: ["Submitted pin compared", "Current GPS captured", "Location match decision"],
    fields: ["Distance discrepancy", "Farm photo upload", "Mark stage complete"]
  },
  {
    id: "land",
    title: "Land Size",
    icon: Ruler,
    priority: "High",
    purpose: "Measure actual land size and compare it with the farmer submission.",
    checks: ["Submitted size reviewed", "Actual measured size entered", "Boundary photo checked"],
    fields: ["Actual size", "Match or mismatch", "Notes"]
  },
  {
    id: "ownership",
    title: "Ownership Documents",
    icon: FileText,
    priority: "High",
    purpose: "Verify ownership type and supporting documents for authenticity.",
    checks: ["Ownership type reviewed", "Document verified", "Mismatch captured if present"],
    fields: ["Document viewer", "Additional upload", "Notes"]
  },
  {
    id: "crops",
    title: "Crops and Farming Method",
    icon: Leaf,
    priority: "High",
    purpose: "Confirm crops and farming method match what was submitted.",
    checks: ["Observed crops entered", "Farming method checked", "Certificate checked if applicable"],
    fields: ["Field photos", "Crop mismatch flag", "Mark stage complete"]
  },
  {
    id: "records",
    title: "Two Year Records",
    icon: Layers,
    priority: "Medium",
    purpose: "Review the last two years of government farming records.",
    checks: ["Submitted records displayed", "Record content verified", "Discrepancy notes captured"],
    fields: ["Verified toggle", "Additional document upload", "Mark stage complete"]
  }
];

const notifications = [
  {
    id: 1,
    type: "Assignment",
    message: "New high priority farmer verification assigned in Hunsur.",
    time: "10 min ago",
    unread: true
  },
  {
    id: 2,
    type: "Reminder",
    message: "Final report pending for Ramesh Kumar.",
    time: "1 hr ago",
    unread: true
  },
  {
    id: 3,
    type: "Admin",
    message: "Upload clear land boundary photos for all high priority tasks.",
    time: "Yesterday",
    unread: false
  }
];

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "farmers", label: "Farmers", icon: UserRound },
  { id: "verification", label: "Verification", icon: ClipboardCheck },
  { id: "navigation", label: "Navigation", icon: Navigation },
  { id: "notifications", label: "Notifications", icon: Bell }
];

function priorityClass(priority) {
  return priority === "High" ? "priorityHigh" : "priorityMedium";
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedFarmerId, setSelectedFarmerId] = useState(farmers[0].id);
  const [selectedStageId, setSelectedStageId] = useState(verificationStages[0].id);
  const [stageResults, setStageResults] = useState({});
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const selectedFarmer = farmers.find((farmer) => farmer.id === selectedFarmerId) ?? farmers[0];
  const selectedStage =
    verificationStages.find((stage) => stage.id === selectedStageId) ?? verificationStages[0];

  const filteredFarmers = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return farmers;
    return farmers.filter((farmer) =>
      [farmer.name, farmer.village, farmer.district, farmer.status, farmer.id]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [query]);

  const counts = useMemo(
    () => ({
      assigned: farmers.filter((farmer) => farmer.status === "Assigned").length,
      inProgress: farmers.filter((farmer) => farmer.status === "In Progress").length,
      completed: farmers.filter((farmer) => farmer.status === "Completed").length,
      rejected: Object.values(stageResults).filter((result) => result.verdict === "Rejected").length
    }),
    [stageResults]
  );

  const completedStages = Object.values(stageResults).filter(
    (result) => result.verdict === "Approved" || result.verdict === "Rejected"
  ).length;

  const updateStageResult = (field, value) => {
    setStageResults((current) => ({
      ...current,
      [selectedStage.id]: {
        verdict: "Pending",
        notes: "",
        uploaded: false,
        ...current[selectedStage.id],
        [field]: value
      }
    }));
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="appShell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebarOpen" : ""}`}>
        <div className="brand">
          <ShieldCheck size={28} />
          <div>
            <span>FarmVerify</span>
            <small>Authorizer Portal</small>
          </div>
        </div>

        <nav aria-label="Main navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                className={`navItem ${activeTab === tab.id ? "active" : ""}`}
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileNavOpen(false);
                }}
                title={tab.label}
              >
                <Icon size={19} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="logoutButton" onClick={() => setIsLoggedIn(false)} title="Log out">
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </aside>

      <main className="content">
        <header className="topbar">
          <button
            className="iconButton mobileOnly"
            onClick={() => setMobileNavOpen((open) => !open)}
            title={mobileNavOpen ? "Close menu" : "Open menu"}
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div>
            <p className="eyebrow">Logged in as Siva</p>
            <h1>{tabs.find((tab) => tab.id === activeTab)?.label}</h1>
          </div>
          <div className="topbarActions">
            <span className="dateBadge">
              <CalendarDays size={16} />
              08 Jun 2026
            </span>
            <span className="priorityPill priorityHigh">High priority</span>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <Dashboard
            counts={counts}
            farmers={farmers}
            setActiveTab={setActiveTab}
            selectFarmer={setSelectedFarmerId}
          />
        )}
        {activeTab === "farmers" && (
          <FarmersPage
            farmers={filteredFarmers}
            query={query}
            setQuery={setQuery}
            selectedFarmer={selectedFarmer}
            selectFarmer={setSelectedFarmerId}
            startVerification={() => setActiveTab("verification")}
          />
        )}
        {activeTab === "verification" && (
          <VerificationPage
            farmer={selectedFarmer}
            stages={verificationStages}
            selectedStage={selectedStage}
            selectedStageId={selectedStageId}
            setSelectedStageId={setSelectedStageId}
            stageResults={stageResults}
            updateStageResult={updateStageResult}
            completedStages={completedStages}
          />
        )}
        {activeTab === "navigation" && <NavigationPage farmer={selectedFarmer} />}
        {activeTab === "notifications" && <NotificationsPage setActiveTab={setActiveTab} />}
      </main>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState("siva@authorizer.in");
  const [password, setPassword] = useState("admin-created");

  return (
    <main className="loginPage">
      <section className="loginPanel">
        <div className="loginIntro">
          <ShieldCheck size={42} />
          <h1>FarmVerify Authorizer</h1>
          <p>Use the credentials created by Admin to access assigned farm verification tasks.</p>
        </div>

        <form
          className="loginForm"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
        >
          <label>
            Email or phone
            <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <div className="loginMeta">
            <a href="#forgot">Forgot password?</a>
            <span>Role verified after login</span>
          </div>
          <button className="primaryButton" type="submit">
            <LogIn size={18} />
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

function Dashboard({ counts, farmers, setActiveTab, selectFarmer }) {
  return (
    <section className="pageStack">
      <div className="summaryGrid">
        <SummaryCard label="Assigned" value={counts.assigned} tone="blue" />
        <SummaryCard label="In Progress" value={counts.inProgress} tone="amber" />
        <SummaryCard label="Completed" value={counts.completed} tone="green" />
        <SummaryCard label="Rejected" value={counts.rejected} tone="red" />
      </div>

      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Task list ordered by urgency</p>
          <h2>Upcoming farm visits</h2>
        </div>
        <button className="secondaryButton" onClick={() => setActiveTab("farmers")}>
          <UserRound size={17} />
          View all
        </button>
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Location</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <tr key={farmer.id}>
                <td>
                  <strong>{farmer.name}</strong>
                  <span>{farmer.id}</span>
                </td>
                <td>{farmer.village}, {farmer.district}</td>
                <td><span className="statusBadge">{farmer.status}</span></td>
                <td><span className={`priorityPill ${priorityClass(farmer.urgency)}`}>{farmer.urgency}</span></td>
                <td>{farmer.assignedDate}</td>
                <td>
                  <button
                    className="textButton"
                    onClick={() => {
                      selectFarmer(farmer.id);
                      setActiveTab("verification");
                    }}
                  >
                    Start
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SummaryCard({ label, value, tone }) {
  return (
    <article className={`summaryCard ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function FarmersPage({ farmers, query, setQuery, selectedFarmer, selectFarmer, startVerification }) {
  return (
    <section className="twoColumn">
      <div className="pageStack">
        <div className="toolbar">
          <div className="searchBox">
            <Search size={18} />
            <input
              placeholder="Search by name, village, status, or ID"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <button className="iconButton" title="Filter list">
            <Filter size={19} />
          </button>
        </div>

        <div className="farmerList">
          {farmers.map((farmer) => (
            <button
              key={farmer.id}
              className={`farmerRow ${farmer.id === selectedFarmer.id ? "selected" : ""}`}
              onClick={() => selectFarmer(farmer.id)}
            >
              <span>
                <strong>{farmer.name}</strong>
                <small>{farmer.village}, {farmer.district}</small>
              </span>
              <span className={`priorityPill ${priorityClass(farmer.urgency)}`}>{farmer.urgency}</span>
            </button>
          ))}
        </div>
      </div>

      <FarmerProfile farmer={selectedFarmer} startVerification={startVerification} />
    </section>
  );
}

function FarmerProfile({ farmer, startVerification }) {
  return (
    <section className="profilePanel">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Read-only farmer profile</p>
          <h2>{farmer.name}</h2>
        </div>
        <button className="primaryButton" onClick={startVerification}>
          <ClipboardCheck size={17} />
          Start verification
        </button>
      </div>

      <div className="profileGrid">
        <InfoItem label="Phone" value={farmer.phone} icon={Phone} />
        <InfoItem label="Land size" value={farmer.landSize} icon={Ruler} />
        <InfoItem label="Crop" value={farmer.crop} icon={Leaf} />
        <InfoItem label="GPS pin" value={farmer.coordinates} icon={LocateFixed} />
      </div>

      <div className="mapPreview">
        <MapPinned size={34} />
        <span>Submitted farm location pinned on map</span>
        <strong>{farmer.coordinates}</strong>
      </div>

      <div className="documentGrid">
        <DocumentGroup title="Submitted documents" items={farmer.documents} />
        <DocumentGroup title="Last 2 years records" items={farmer.records} />
      </div>
    </section>
  );
}

function InfoItem({ label, value, icon: Icon }) {
  return (
    <article className="infoItem">
      <Icon size={19} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function DocumentGroup({ title, items }) {
  return (
    <div className="documentGroup">
      <h3>{title}</h3>
      {items.map((item) => (
        <span key={item}>
          <FileText size={16} />
          {item}
        </span>
      ))}
    </div>
  );
}

function VerificationPage({
  farmer,
  stages,
  selectedStage,
  selectedStageId,
  setSelectedStageId,
  stageResults,
  updateStageResult,
  completedStages
}) {
  const result = stageResults[selectedStage.id] ?? {
    verdict: "Pending",
    notes: "",
    uploaded: false
  };

  return (
    <section className="verificationLayout">
      <aside className="stageRail">
        <p className="eyebrow">Stage-by-stage process</p>
        {stages.map((stage) => {
          const Icon = stage.icon;
          const finished = stageResults[stage.id]?.verdict && stageResults[stage.id]?.verdict !== "Pending";
          return (
            <button
              key={stage.id}
              className={`stageButton ${stage.id === selectedStageId ? "selected" : ""}`}
              onClick={() => setSelectedStageId(stage.id)}
            >
              <Icon size={18} />
              <span>{stage.title}</span>
              {finished && <CheckCircle2 size={16} />}
            </button>
          );
        })}
      </aside>

      <section className="stageWorkspace">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">{farmer.name} - {farmer.id}</p>
            <h2>{selectedStage.title}</h2>
          </div>
          <span className={`priorityPill ${priorityClass(selectedStage.priority)}`}>
            {selectedStage.priority}
          </span>
        </div>

        <p className="purposeText">{selectedStage.purpose}</p>

        <div className="checkGrid">
          {selectedStage.checks.map((check) => (
            <label className="checkItem" key={check}>
              <input type="checkbox" />
              <span>{check}</span>
            </label>
          ))}
        </div>

        <div className="formGrid">
          {selectedStage.fields.map((field) => (
            <label key={field}>
              {field}
              <input placeholder={`Enter ${field.toLowerCase()}`} />
            </label>
          ))}
        </div>

        <label className="wideField">
          Verification notes
          <textarea
            rows="5"
            placeholder="Write observations, mismatches, and evidence notes"
            value={result.notes}
            onChange={(event) => updateStageResult("notes", event.target.value)}
          />
        </label>

        <div className="actionRow">
          <button
            className={`secondaryButton ${result.uploaded ? "successButton" : ""}`}
            onClick={() => updateStageResult("uploaded", true)}
          >
            {result.uploaded ? <CheckCircle2 size={17} /> : <Upload size={17} />}
            {result.uploaded ? "Photo uploaded" : "Upload photo"}
          </button>
          <button className="primaryButton" onClick={() => updateStageResult("verdict", "Approved")}>
            <CheckCircle2 size={17} />
            Mark complete
          </button>
          <button className="dangerButton" onClick={() => updateStageResult("verdict", "Rejected")}>
            <AlertCircle size={17} />
            Flag issue
          </button>
        </div>

        <FinalReport completedStages={completedStages} totalStages={stages.length} stageResults={stageResults} />
      </section>
    </section>
  );
}

function FinalReport({ completedStages, totalStages, stageResults }) {
  const [recommendation, setRecommendation] = useState("Approved");
  const canSubmit = completedStages === totalStages;

  return (
    <section className="finalReport">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Final report submission</p>
          <h2>{completedStages} of {totalStages} stages completed</h2>
        </div>
        <select value={recommendation} onChange={(event) => setRecommendation(event.target.value)}>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Needs Revisit</option>
        </select>
      </div>
      <div className="reportSummary">
        {verificationStages.map((stage) => (
          <span key={stage.id}>
            {stage.title}: <strong>{stageResults[stage.id]?.verdict ?? "Pending"}</strong>
          </span>
        ))}
      </div>
      <button className="primaryButton" disabled={!canSubmit}>
        <Camera size={17} />
        Submit report to Admin
      </button>
    </section>
  );
}

function NavigationPage({ farmer }) {
  return (
    <section className="navigationPage">
      <div className="routePanel">
        <p className="eyebrow">Farm navigation</p>
        <h2>{farmer.name}'s farm location</h2>
        <div className="routeStats">
          <InfoItem label="Distance" value="18.4 km" icon={Navigation} />
          <InfoItem label="Estimated travel" value="34 min" icon={CalendarDays} />
          <InfoItem label="GPS pin" value={farmer.coordinates} icon={LocateFixed} />
        </div>
        <button className="primaryButton">
          <MapPinned size={17} />
          Open maps app
        </button>
      </div>
      <div className="largeMap">
        <MapPinned size={54} />
        <span>Submitted pin versus current GPS location</span>
      </div>
    </section>
  );
}

function NotificationsPage({ setActiveTab }) {
  return (
    <section className="pageStack">
      {notifications.map((notification) => (
        <article className={`notificationItem ${notification.unread ? "unread" : ""}`} key={notification.id}>
          <Bell size={20} />
          <div>
            <strong>{notification.type}</strong>
            <p>{notification.message}</p>
            <small>{notification.time}</small>
          </div>
          <button className="textButton" onClick={() => setActiveTab("verification")}>
            Open
          </button>
        </article>
      ))}
    </section>
  );
}

export default App;
