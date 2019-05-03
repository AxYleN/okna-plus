import React, { useEffect, useCallback } from 'react';
import './Modal.css';

export default function Modal(props) {
  const { onClose, containerClass = 'modal-container' } = props;

  const handleKeypress = useCallback(
    e => {
      if (e.key === 'Escape') onClose();
    },
    [props],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeypress);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeypress);
      document.body.style.overflow = null;
    };
  }, [props]);

  return (
    <div className="modal no-print" onClick={onClose}>
      <div className={containerClass} onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
}
