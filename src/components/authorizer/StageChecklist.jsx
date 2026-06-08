function StageChecklist({ checklist, checkedItems, onToggle }) {
  return (
    <div className="checklistGrid">
      {checklist.map((item) => (
        <label className="checkTile" key={item}>
          <input
            type="checkbox"
            checked={checkedItems.includes(item)}
            onChange={() => onToggle(item)}
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}

export default StageChecklist;
