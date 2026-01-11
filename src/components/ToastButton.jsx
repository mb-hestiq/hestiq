import React, { useState, useRef, useEffect} from 'react'
import { Toast } from "radix-ui";

export default function ToastButton({ title, description, action, validation, children, ...props }) {
  const [open, setOpen] = useState(false);
	const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleOnClick = () => {
    if (validation !== undefined && !validation()) return;

    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 100);
  }

  return (
    <Toast.Provider swipeDirectoin="right">
      <button
        className='Button'
        onClick={handleOnClick}
        {...props}
      >
        {children}
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">{title}</Toast.Title>
        <Toast.Description className="ToastDescription" asChild>
          <p>{description}</p>
        </Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText=""
        >
          {action}
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  )
}
