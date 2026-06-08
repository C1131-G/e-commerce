import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import FarmerCard from "../../components/authorizer/FarmerCard.jsx";
import FarmerTable from "../../components/authorizer/FarmerTable.jsx";
import { farmers } from "../../data/stages.js";

function AssignedFarmers() {
  const [query, setQuery] = useState("");

  const filteredFarmers = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return farmers;
    return farmers.filter((farmer) =>
      [
        farmer.id,
        farmer.name,
        farmer.village,
        farmer.district,
        farmer.status,
        farmer.priority,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [query]);

  return (
    <section className="pageStack">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">Farmer verification</p>
          <h1>Assigned Farmers List</h1>
        </div>
      </div>

      <div className="toolbar">
        <label className="searchBox">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search farmer, location, status, or priority"
          />
        </label>
        <button className="secondaryButton" type="button">
          <Filter size={17} />
          Filter
        </button>
      </div>

      <div className="farmerCardsGrid">
        {filteredFarmers.map((farmer) => (
          <FarmerCard farmer={farmer} key={farmer.id} />
        ))}
      </div>

      <section className="panel">
        <div className="panelHeader">
          <h2>Detailed assignment table</h2>
        </div>
        <FarmerTable farmers={filteredFarmers} />
      </section>
    </section>
  );
}

export default AssignedFarmers;
