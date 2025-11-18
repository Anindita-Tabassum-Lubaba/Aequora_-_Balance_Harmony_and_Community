export default function Metric({ label, value, tone }) {
  return (
    <div className={`metric ${tone ? `metric--${tone}` : ""}`}>
      <div className="metric__value">{value}</div>
      <div className="metric__label">{label}</div>
    </div>
  );
}
