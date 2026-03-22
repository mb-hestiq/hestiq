import React, { useState, useRef, useEffect } from "react";
import { Toast } from "radix-ui";

export default function ToastButton({
	title,
	description,
	action,
	validation,
	onSubmit,
	children,
	disabled,
	...props
}) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [displayTitle, setDisplayTitle] = useState(title);
	const [displayDescription, setDisplayDescription] = useState(description);
	const timerRef = useRef(0);

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	useEffect(() => {
		setDisplayTitle(title);
		setDisplayDescription(description);
	}, [title, description]);

	const handleOnClick = async (e) => {
		if (validation !== undefined && !validation()) return;
		if (disabled) return;

		if (onSubmit) {
			setIsLoading(true);
			try {
				await onSubmit(e);
			} finally {
				setIsLoading(false);
			}
		}

		setOpen(false);
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			setOpen(true);
		}, 100);
	};

	return (
		<Toast.Provider swipeDirectoin="right">
			<button
				className="Button"
				onClick={handleOnClick}
				disabled={disabled || isLoading}
				{...props}
			>
				{children}
			</button>

			<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
				<Toast.Title className="ToastTitle">{displayTitle}</Toast.Title>
				<Toast.Description className="ToastDescription" asChild>
					<p>{displayDescription}</p>
				</Toast.Description>
				<Toast.Action className="ToastAction" asChild altText="">
					{action}
				</Toast.Action>
			</Toast.Root>
			<Toast.Viewport className="ToastViewport" />
		</Toast.Provider>
	);
}
