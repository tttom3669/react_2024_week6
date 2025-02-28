import { useDispatch, useSelector } from 'react-redux';
import {
  messages as messagesData,
  removeMessage,
} from '../slices/messageSlice';
import { useEffect, useRef } from 'react';
import { Toast as BSToast } from 'bootstrap';

export default function Toast() {
  const messages = useSelector(messagesData);
  const toastRefs = useRef({});
  const dispatch = useDispatch();

  const handleDismiss = (messageId) => {
    dispatch(removeMessage(messageId));
  };

  useEffect(() => {
    messages.forEach((message) => {
      const toastElement = toastRefs.current[message.id];

      if (toastElement) {
        const toastInstance = new BSToast(toastElement);
        toastInstance.show();
        setTimeout(() => {
          handleDismiss(message.id);
        }, 2000);
      }
    });
  }, [messages]);

  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1060 }}>
        {messages.map((message) => (
          <div
            key={message.id}
            ref={(el) => (toastRefs.current[message.id] = el)}
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div
              className={`toast-header text-white ${
                message.status === 'success' ? 'bg-success' : 'bg-danger'
              }`}
            >
              <strong className="me-auto">
                {message.status === 'success' ? '成功' : '失敗'}
              </strong>
              <button
                type="button"
                onClick={() => handleDismiss(message.id)}
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}
