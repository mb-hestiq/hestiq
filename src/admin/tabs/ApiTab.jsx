import { useState, useCallback } from "react";
import { API_DOCS } from "../../../shared/api.js";
import {
	RiPlayFill,
	RiArrowDownSLine,
	RiArrowUpSLine,
	RiLockLine,
} from "react-icons/ri";
import { backendUrl } from "../../../shared/company.js";

const METHOD_CLASS = {
	GET: "api-method-get",
	POST: "api-method-post",
	PUT: "api-method-put",
	PATCH: "api-method-patch",
	DELETE: "api-method-delete",
};

function MethodBadge({ method }) {
	return (
		<span
			className={`api-method-badge ${METHOD_CLASS[method] ?? "api-method-get"}`}
		>
			{method}
		</span>
	);
}

function InputField({ field, value, onChange }) {
	const isComplex = field.type.startsWith("Array") || field.type === "Object";
	const isNumber = field.type === "Number";
	const isPassword = field.name.toLowerCase().includes("password");

	return (
		<div className="api-input-row">
			<label className="api-input-label">
				{field.name}
				{field.required && <span className="api-required">*</span>}
			</label>
			<div className="api-field-wrap">
				{isComplex ? (
					<textarea
						className="api-textarea"
						value={value ?? ""}
						onChange={(e) => onChange(field.name, e.target.value)}
						placeholder={field.placeholder}
						rows={3}
					/>
				) : (
					<input
						className="admin-input"
						type={isPassword ? "password" : isNumber ? "number" : "text"}
						value={value ?? ""}
						onChange={(e) => onChange(field.name, e.target.value)}
						placeholder={field.placeholder}
					/>
				)}
				<span className="api-input-desc">{field.description}</span>
			</div>
		</div>
	);
}

function EndpointItem({ endpoint }) {
	const [expanded, setExpanded] = useState(false);
	const [inputs, setInputs] = useState({});
	const [result, setResult] = useState(null);
	const [running, setRunning] = useState(false);

	const handleInput = useCallback((name, value) => {
		setInputs((prev) => ({ ...prev, [name]: value }));
	}, []);

	const runRequest = useCallback(async () => {
		setRunning(true);
		setResult(null);
		try {
			let url = `${backendUrl}${endpoint.path}`;

			for (const p of endpoint.params ?? []) {
				url = url.replace(
					`:${p.name}`,
					encodeURIComponent(inputs[p.name] ?? ""),
				);
			}

			const qPairs = (endpoint.query ?? [])
				.filter((q) => inputs[q.name])
				.map((q) => `${q.name}=${encodeURIComponent(inputs[q.name])}`);
			if (qPairs.length) url += `?${qPairs.join("&")}`;

			const headers = { "Content-Type": "application/json" };
			if (endpoint.auth) {
				const token = localStorage.getItem("auth_token");
				if (token) headers["Authorization"] = `Bearer ${token}`;
			}

			const bodyFields = endpoint.body ?? [];
			let bodyPayload = undefined;
			if (bodyFields.length > 0) {
				const obj = {};
				for (const f of bodyFields) {
					const raw = inputs[f.name];
					if (raw === undefined || raw === "") continue;
					if (f.type.startsWith("Array") || f.type === "Object") {
						try {
							obj[f.name] = JSON.parse(raw);
						} catch {
							obj[f.name] = raw;
						}
					} else if (f.type === "Number") {
						obj[f.name] = Number(raw);
					} else {
						obj[f.name] = raw;
					}
				}
				if (Object.keys(obj).length > 0) bodyPayload = JSON.stringify(obj);
			}

			const res = await fetch(url, {
				method: endpoint.method,
				headers,
				body: bodyPayload,
			});

			const data = await res.json().catch(() => null);
			setResult({
				status: res.status,
				ok: res.ok,
				data: data ?? { _raw: res.statusText },
			});
		} catch (err) {
			setResult({ status: 0, ok: false, data: { error: err.message } });
		} finally {
			setRunning(false);
		}
	}, [endpoint, inputs]);

	const hasInputs =
		(endpoint.params?.length ?? 0) +
			(endpoint.query?.length ?? 0) +
			(endpoint.body?.length ?? 0) >
		0;

	return (
		<div
			className={`api-endpoint-item${expanded ? " api-endpoint-item-expanded" : ""}`}
		>
			<button
				className="api-endpoint-header"
				onClick={() => setExpanded((v) => !v)}
			>
				<div className="api-endpoint-summary">
					<MethodBadge method={endpoint.method} />
					<code className="api-endpoint-path">{endpoint.path}</code>
					{endpoint.auth && (
						<span className="api-auth-badge">
							<RiLockLine size={11} />
							{endpoint.auth}
						</span>
					)}
				</div>
				{expanded ? (
					<RiArrowUpSLine size={18} />
				) : (
					<RiArrowDownSLine size={18} />
				)}
			</button>

			{expanded && (
				<div className="api-endpoint-body">
					<p className="api-endpoint-description">{endpoint.description}</p>

					{endpoint.response.length > 0 && (
						<div className="api-section">
							<h4 className="api-section-title">Response Fields</h4>
							<table className="api-table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Type</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									{endpoint.response.map((r) => (
										<tr key={r.name}>
											<td>
												<code>{r.name}</code>
											</td>
											<td>
												<span className="api-type-badge">{r.type}</span>
											</td>
											<td>{r.description}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					{endpoint.errors.length > 0 && (
						<div className="api-section">
							<h4 className="api-section-title">Error Responses</h4>
							<table className="api-table">
								<thead>
									<tr>
										<th>Status</th>
										<th>Reason</th>
									</tr>
								</thead>
								<tbody>
									{endpoint.errors.map((e, i) => (
										<tr key={i}>
											<td>
												<span className="api-status-code api-status-error">
													{e.status}
												</span>
											</td>
											<td>{e.reason}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					<div className="api-section api-playground">
						<h4 className="api-section-title">Playground</h4>

						{!hasInputs && (
							<p className="api-no-inputs">
								No inputs required for this endpoint.
							</p>
						)}

						{(endpoint.params?.length ?? 0) > 0 && (
							<div className="api-input-group">
								<span className="api-input-group-label">URL Parameters</span>
								{endpoint.params.map((f) => (
									<InputField
										key={f.name}
										field={f}
										value={inputs[f.name]}
										onChange={handleInput}
									/>
								))}
							</div>
						)}

						{(endpoint.query?.length ?? 0) > 0 && (
							<div className="api-input-group">
								<span className="api-input-group-label">Query Parameters</span>
								{endpoint.query.map((f) => (
									<InputField
										key={f.name}
										field={f}
										value={inputs[f.name]}
										onChange={handleInput}
									/>
								))}
							</div>
						)}

						{(endpoint.body?.length ?? 0) > 0 && (
							<div className="api-input-group">
								<span className="api-input-group-label">Request Body</span>
								{endpoint.body.map((f) => (
									<InputField
										key={f.name}
										field={f}
										value={inputs[f.name]}
										onChange={handleInput}
									/>
								))}
							</div>
						)}

						{endpoint.auth && (
							<p className="api-auth-note">
								<RiLockLine size={13} />
								Auth token from your current session will be sent automatically.
							</p>
						)}

						<button
							className="admin-btn-primary api-run-btn"
							onClick={runRequest}
							disabled={running}
						>
							<RiPlayFill size={14} />
							{running ? "Running…" : "Run request"}
						</button>

						{result && (
							<div className="api-result">
								<div className="api-result-header">
									<span
										className={`api-status-code ${result.ok ? "api-status-ok" : "api-status-error"}`}
									>
										{result.status}
									</span>
									<span className="api-result-label">
										{result.ok ? "OK" : "Error"}
									</span>
								</div>
								<pre className="api-result-json">
									{JSON.stringify(result.data, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default function ApiTab() {
	return (
		<div className="api-tab">
			<div className="api-tab-header">
				<h2 className="api-tab-title">API Reference</h2>
				<p className="api-tab-subtitle">
					Interactive documentation and playground for all server endpoints.
				</p>
			</div>

			{API_DOCS.map((group) => (
				<div key={group.category} className="api-category">
					<h3 className="api-category-title">{group.category}</h3>
					<div className="api-endpoint-list">
						{group.endpoints.map((ep) => (
							<EndpointItem key={ep.id} endpoint={ep} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}
