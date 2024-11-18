import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(({ result, targetTime, score }, ref) => {
  const modelRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => modelRef.current.showModal(),
  }));

  return createPortal(
    <dialog className="result-modal" ref={modelRef}>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        Score: <strong>{score > 0 ? score : 0}</strong>
      </p>
      <form method="dialog">
        <button type="submit">close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
