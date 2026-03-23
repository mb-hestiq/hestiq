import { useState, useEffect, useRef, useCallback, memo } from "react";
import { RiCloseLine } from "react-icons/ri";

const FIELD_TYPES = [
	"text",
	"email",
	"password",
	"number",
	"select",
	"textarea",
];

const CrudModal = memo(function CrudModal({
	isOpen,
	title,
	fields,
	initialValues = {},
	onSubmit,
	onClose,
}) {
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const dialogRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			const defaults = {};
			for (const f of fields) {
				defaults[f.name] = initialValues[f.name] ?? f.defaultValue ?? "";
			}
			setForm(defaults);
			setErrors({});
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen, fields, initialValues]);

	const handleChange = useCallback((name, value) => {
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	}, []);

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
					<h2 className="text-lg font-semibold text-[#342937]">{title}</h2>
					<button onClick={onClose} className="admin-icon-btn" type="button">
						<RiCloseLine size={20} />
					</button>
				</div>

				{errors._form && (
					<div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">
						{errors._form}
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{fields.map((field) => (
						<div key={field.name} className="flex flex-col gap-1">
							<label className="text-sm font-medium text-[#342937]">
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
