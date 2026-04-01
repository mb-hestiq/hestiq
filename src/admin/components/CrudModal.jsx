import { useState, useEffect, useRef, useCallback, memo } from "react";
import { RiCloseLine, RiImageLine, RiLoader4Line } from "react-icons/ri";

const FIELD_TYPES = [
	"text",
	"email",
	"password",
	"number",
	"select",
	"textarea",
	"file",
	"multiselect",
];

const CrudModal = memo(function CrudModal({
	isOpen,
	title,
	fields,
	initialValues = {},
	onSubmit,
	onClose,
	uploadHandlers = {},
}) {
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [uploading, setUploading] = useState({});
	const dialogRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			const defaults = {};
			for (const f of fields) {
				if (f.type === "multiselect") {
					defaults[f.name] = Array.isArray(initialValues[f.name])
						? initialValues[f.name]
						: (f.defaultValue ?? []);
				} else {
					defaults[f.name] = initialValues[f.name] ?? f.defaultValue ?? "";
				}
			}
			setForm(defaults);
			setErrors({});
			setUploading({});
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen, fields, initialValues]);

	const handleChange = useCallback((name, value) => {
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	}, []);

	const handleMultiToggle = useCallback((name, value) => {
		setForm((prev) => {
			const current = Array.isArray(prev[name]) ? prev[name] : [];
			const next = current.includes(value)
				? current.filter((v) => v !== value)
				: [...current, value];
			return { ...prev, [name]: next };
		});
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	}, []);

	const handleFileChange = useCallback(
		async (name, file) => {
			const handler = uploadHandlers[name];
			if (!handler || !file) return;
			setUploading((prev) => ({ ...prev, [name]: true }));
			setErrors((prev) => ({ ...prev, [name]: undefined }));
			try {
				const url = await handler(file);
				setForm((prev) => ({ ...prev, [name]: url }));
			} catch (err) {
				setErrors((prev) => ({ ...prev, [name]: err.message }));
			} finally {
				setUploading((prev) => ({ ...prev, [name]: false }));
			}
		},
		[uploadHandlers],
	);

	const validate = useCallback(() => {
		const errs = {};
		for (const f of fields) {
			if (f.required && !form[f.name] && form[f.name] !== 0) {
				errs[f.name] = `${f.label} is required.`;
			}
		}
		return errs;
	}, [fields, form]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			const errs = validate();
			if (Object.keys(errs).length > 0) {
				setErrors(errs);
				return;
			}
			setSubmitting(true);
			try {
				await onSubmit(form);
				onClose();
			} catch (err) {
				setErrors({ _form: err.message });
			} finally {
				setSubmitting(false);
			}
		},
		[form, validate, onSubmit, onClose],
	);

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
			<div className="admin-dialog-panel w-full max-w-lg">
				<div className="flex items-center justify-between mb-5">
					<h2 className="admin-dialog-title">{title}</h2>
					<button onClick={onClose} className="admin-icon-btn" type="button">
						<RiCloseLine size={20} />
					</button>
				</div>

				{errors._form && (
					<div className="admin-alert admin-alert-error">{errors._form}</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{fields.map((field) => (
						<div key={field.name} className="flex flex-col gap-1">
							<label className="admin-form-label">
								{field.label}
								{field.required && <span className="text-red-500 ml-1">*</span>}
							</label>

							{field.type === "select" ? (
								<select
									className="admin-input"
									value={form[field.name] ?? ""}
									onChange={(e) => handleChange(field.name, e.target.value)}
								>
									{field.options?.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							) : field.type === "textarea" ? (
								<textarea
									className="admin-input min-h-20 resize-y"
									value={form[field.name] ?? ""}
									onChange={(e) => handleChange(field.name, e.target.value)}
									placeholder={field.placeholder}
								/>
							) : field.type === "multiselect" ? (
								<div className="flex flex-wrap gap-2 pt-1">
									{field.options?.map((opt) => {
										const selected = Array.isArray(form[field.name])
											? form[field.name].includes(opt.value)
											: false;
										return (
											<button
												key={opt.value}
												type="button"
												onClick={() => handleMultiToggle(field.name, opt.value)}
												className={`admin-choice-chip ${
													selected
														? "admin-choice-chip-active"
														: "admin-choice-chip-idle"
												}`}
											>
												{opt.label}
											</button>
										);
									})}
								</div>
							) : field.type === "file" ? (
								<div className="flex flex-col gap-2">
									{form[field.name] && (
										<img
											src={form[field.name]}
											alt="preview"
											className="w-20 h-20 object-cover rounded-lg border border-border"
										/>
									)}
									<label className="flex items-center gap-2 cursor-pointer admin-input w-fit">
										{uploading[field.name] ? (
											<RiLoader4Line size={16} className="animate-spin" />
										) : (
											<RiImageLine size={16} />
										)}
										<span className="text-sm">
											{uploading[field.name]
												? "Uploading…"
												: form[field.name]
													? "Replace image"
													: "Choose image"}
										</span>
										<input
											type="file"
											accept="image/*"
											className="hidden"
											disabled={uploading[field.name]}
											onChange={(e) =>
												handleFileChange(field.name, e.target.files?.[0])
											}
										/>
									</label>
								</div>
							) : (
								<input
									type={FIELD_TYPES.includes(field.type) ? field.type : "text"}
									className="admin-input"
									value={form[field.name] ?? ""}
									onChange={(e) =>
										handleChange(
											field.name,
											field.type === "number"
												? Number(e.target.value)
												: e.target.value,
										)
									}
									placeholder={field.placeholder}
									autoComplete={field.autoComplete}
								/>
							)}

							{errors[field.name] && (
								<span className="text-xs text-red-600">
									{errors[field.name]}
								</span>
							)}
						</div>
					))}

					<div className="flex justify-end gap-3 mt-2">
						<button type="button" onClick={onClose} className="admin-btn-ghost">
							Cancel
						</button>
						<button
							type="submit"
							disabled={submitting}
							className="admin-btn-primary"
						>
							{submitting ? "Saving…" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</dialog>
	);
});

export default CrudModal;
