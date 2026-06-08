import { Send } from "lucide-react";

function ReportForm() {
  return (
    <form className="reportForm">
      <label>
        Overall verdict
        <select defaultValue="Approved">
          <option>Approved</option>
          <option>Rejected</option>
          <option>Needs Revisit</option>
        </select>
      </label>

      <label>
        Rejection reason
        <input placeholder="Enter reason if rejected" />
      </label>

      <label className="wideField">
        Final notes
        <textarea rows="5" placeholder="Write final report notes for Admin" />
      </label>

      <label className="wideField">
        Supporting photo gallery
        <input type="file" multiple />
      </label>

      <button className="primaryButton" type="button">
        <Send size={17} />
        Submit report
      </button>
    </form>
  );
}

export default ReportForm;
