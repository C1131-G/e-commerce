export default function AlertBanner() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-amber-800">Urgent Alerts</h3>

      <ul className="mt-3 space-y-2 text-sm text-amber-700">
        <li>• 24 Farmers waiting for approval</li>
        <li>• 12 Listings pending review</li>
        <li>• 5 Delivery assignments unallocated</li>
      </ul>
    </div>
  );
}
