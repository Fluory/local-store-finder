import './StatusMessage.css';

export default function StatusMessage({ type, message }) {
  return (
    <div
      className={`status-message status-message--${type}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {type === 'loading' && (
        <span className="status-message__spinner" aria-hidden="true" />
      )}
      <p>{message}</p>
    </div>
  );
}
