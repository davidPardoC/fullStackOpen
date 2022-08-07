import React, { forwardRef, useImperativeHandle } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./Togglable.css";

const Togglable = forwardRef(
  ({ children, label = "", showButton = true }, refs) => {
    const ref = useRef();
    const [childHeight, setChildHeight] = useState(0);
    const [visible, setVisible] = useState(false);

    const toggleVisisble = () => {
      setVisible(!visible);
    };
    useEffect(() => {
      const childHeightRaw = ref.current?.clientHeight + 50;
      const childHeight = `${childHeightRaw / 16}rem`;
      setChildHeight(childHeight);
    }, []);

    useImperativeHandle(refs, () => {
      return {
        toggleVisisble,
        visible,
      };
    });

    return (
      <div>
        <div
          className="content"
          style={{ maxHeight: visible ? childHeight : 0 }}
        >
          <div ref={ref}>{children}</div>
        </div>
        {showButton && (
          <button onClick={toggleVisisble}>
            {!visible ? label : "cancel"}
          </button>
        )}
      </div>
    );
  }
);

export default Togglable;
