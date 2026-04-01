import { useEffect, useRef, useCallback, memo } from "react";
import { RiCloseLine } from "react-icons/ri";

const ConfirmDialog = memo(function ConfirmDialog({
	isOpen,
	title,
	message,
	confirmLabel = "Delete",
	onConfirm,
	onClose,
}) {
	const dialogRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen]);

	const handleBackdropClick = useCallback(
		(e) => {
			if (e.target === dialogRef.current) onClose();
		},
		[onClose],
	);

	if (!isOpen) return null;

	return (
		<dialog
			ref={dialogRef}
			onClick={handleBackdropClick}
			className="admin-dialog"
		>
			<div className="admin-dialog-panel w-full max-w-sm">
				<div className="flex items-center justify-between mb-4">
					<h2 className="admin-dialog-title">{title}</h2>
					<button onClick={onClose} className="admin-icon-btn">
						<RiCloseLine size={20} />
					</button>
				</div>
				<p className="text-sm text-text-muted mb-6">{message}</p>
				<div className="flex justify-end gap-3">
					<button onClick={onClose} className="admin-btn-ghost">
						Cancel
					</button>
					<button onClick={onConfirm} className="admin-btn-danger">
						{confirmLabel}
					</button>
				</div>
			</div>
		</dialog>
	);
});

export default ConfirmDialog;
