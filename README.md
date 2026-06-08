# Authorizer Farm Verification Frontend

React frontend for the Authorizer workflow: farm verification stages, reports, navigation, assigned farmers, and notifications.

## Run In VS Code

1. Open this folder in VS Code.
2. Open the terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the Vite URL, usually:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

## Folder Structure

```text
src/
  pages/
    auth/Login.jsx
    authorizer/Dashboard.jsx
    authorizer/AssignedFarmers.jsx
    authorizer/FarmerProfile.jsx
    authorizer/Verification.jsx
    authorizer/FinalReport.jsx
    authorizer/Notifications.jsx
    authorizer/FarmNavigation.jsx
  components/
    authorizer/Sidebar.jsx
    authorizer/Navbar.jsx
    authorizer/FarmerCard.jsx
    authorizer/FarmerTable.jsx
    authorizer/VerificationStepper.jsx
    authorizer/StageChecklist.jsx
    authorizer/DocumentViewer.jsx
    authorizer/ReportForm.jsx
    authorizer/NotificationCard.jsx
    authorizer/MapCard.jsx
  data/stages.js
  routes/AppRoutes.jsx
  layouts/AuthorizerLayout.jsx
  App.jsx
  main.jsx
```

## Screen Explanation

- Login Page: Authorizer enters Admin-created credentials and is redirected to the dashboard.
- Dashboard: Shows assigned, in progress, completed, rejected counts, urgent tasks, and map summary.
- Assigned Farmers: Searchable farmer table and farmer cards with start verification actions.
- Farmer Profile: Read-only farmer bio, land details, document list, map pin, and last two years records.
- Verification: One reusable page for all six stages. Stage content changes from `src/data/stages.js`.
- Final Report: Shows all stage status, final recommendation, rejection reason, notes, and submit button.
- Farm Navigation: Displays pinned farm location, current location, distance, and travel time.
- Notifications: Shows assignment alerts, reminders, and Admin messages.

## Data And Backend Notes

The app currently uses mock data in `src/data/stages.js`. To connect a backend later:

- Replace farmer arrays with API responses.
- Replace local form state with API create/update calls.
- Connect login to your authentication endpoint.
- Upload files to server/cloud storage.
- Replace the map placeholder with Google Maps, Mapbox, or a native maps deep link.
