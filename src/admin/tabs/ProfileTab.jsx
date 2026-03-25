import { useState, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileTab() {
	const { user, updateAccount } = useAuth();
	const [form, setForm] = useState({
		name: user?.name || "",
		email: user?.email || "",
		password: "",
	});
	const [status, setStatus] = useState(null);
	const [saving, setSaving] = useState(false);

	const handleChange = useCallback((e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}, []);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			setSaving(true);
			setStatus(null);
			try {
				const payload = { name: form.name, email: form.email };
				if (form.password.length > 0) {
					if (form.password.length < 8) {
						setStatus({
							type: "error",
							message: "Password must be at least 8 characters.",
						});
						setSaving(false);
						return;
					}
					payload.password = form.password;
				}
				await updateAccount(payload);
				setForm((prev) => ({ ...prev, password: "" }));
				setStatus({
					type: "success",
					message: "Profile updated successfully.",
				});
			} catch (err) {
				setStatus({ type: "error", message: err.message });
			} finally {
				setSaving(false);
			}
		},
		[form, updateAccount],
	);

	return (
		<div className="max-w-lg">
			<h2 className="text-xl font-semibold text-[#342937] tab-title">
				Profile Settings
			</h2>
			<div className="bg-white rounded-xl border border-border p-6">
				{status && (
					<div
						className={`mb-5 p-3 rounded-md text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
					>
						{status.message}
					</div>
				)}
				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-[#342937]">Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							className="admin-input"
							placeholder="Your name"
							autoComplete="name"
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-[#342937]">Email</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							className="admin-input"
							placeholder="your@email.com"
							autoComplete="email"
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-[#342937]">
							New Password
						</label>
						<input
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							className="admin-input"
							placeholder="Leave blank to keep current password"
							autoComplete="new-password"
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={saving}
							className="admin-btn-primary"
						>
							{saving ? "Saving…" : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
