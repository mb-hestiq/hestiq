import React from "react";
import { FaShieldHalved, FaListCheck } from "react-icons/fa6";
import { DatePicker } from "@heroui/date-picker";
import {
	now,
	getLocalTimeZone,
	isWeekend,
	today,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import Toast from "./ToastButton";

export default function BookConsultationSection() {
	const Today = today(getLocalTimeZone());
	const Now = now(getLocalTimeZone());

	const [date, setDate] = React.useState(Now);
	const [phone, setPhone] = React.useState("");
	const [bookedDates, setBookedDates] = React.useState(new Set());
	const [isLoading, setIsLoading] = React.useState(false);
	const [isBooked, setIsBooked] = React.useState(false);
	const [appointmentId, setAppointmentId] = React.useState(null);
	const [toast, setToast] = React.useState({
		type: null,
		title: "",
		description: "",
	});

	let { locale } = useLocale();

	React.useEffect(() => {
		const fetchBookedDates = async () => {
			try {
				const response = await fetch("/api/appointments/booked-dates");
				const result = await response.json();
				if (result.success) {
					setBookedDates(new Set(result.dates || []));
				}
			} catch (err) {
				console.error("Error fetching booked dates:", err);
			}
		};
		fetchBookedDates();
	}, []);

	const isDateUnavailable = (date) => {
		const dateString = date.toDate(getLocalTimeZone()).toDateString();
		return isWeekend(date, locale) || bookedDates.has(dateString);
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/appointments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ phone, date: date.toString() }),
			});

			const result = await response.json();
			if (result.success) {
				setAppointmentId(result.appointment._id);
				setIsBooked(true);
				setToast({
					type: "success",
					title: "Consultation Booked!",
					description: `Your consultation is confirmed for ${new Date(date.toString()).toLocaleString()}. We'll contact you at ${phone} shortly.`,
				});
			} else {
				setToast({
					type: "error",
					title: "Booking Failed",
					description:
						result.message ||
						"This date is already booked. Please select another.",
				});
			}
		} catch (err) {
			console.error("Error booking consultation:", err);
			setToast({
				type: "error",
				title: "Booking Error",
				description: "Something went wrong. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = async () => {
		if (!appointmentId) return;

		setIsLoading(true);
		try {
			const response = await fetch(`/api/appointments/${appointmentId}`, {
				method: "DELETE",
			});

			const result = await response.json();
			if (result.success) {
				setIsBooked(false);
				setAppointmentId(null);
				setPhone("");
				setDate(Now);
				setToast({
					type: "success",
					title: "Consultation Cancelled",
					description: "Your appointment has been cancelled.",
				});
				setBookedDates((prev) => {
					const newSet = new Set(prev);
					const dateString = new Date(result.appointment.date).toDateString();
					newSet.delete(dateString);
					return newSet;
				});
			} else {
				setToast({
					type: "error",
					title: "Cancellation Failed",
					description: "Could not cancel your appointment. Please try again.",
				});
			}
		} catch (err) {
			console.error("Error cancelling appointment:", err);
			setToast({
				type: "error",
				title: "Cancellation Error",
				description: "Something went wrong. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="ConsultationSection">
			<div className="ConsultationContainer lg:px-8">
				<div className="ConsultationGrid lg:max-w-none lg:grid-cols-2">
					<div className="ConsultationContent lg:max-w-lg">
						<h2 className="ConsultationTitle">Book A Free Consultation</h2>
						<p className="ConsultationDescription">
							Schedule a free consultation to discuss your goals, challenges,
							and ideas. We'll review your needs, suggest the right approach,
							and outline clear next steps - no commitment required.
						</p>
						<form
							name="Consultations"
							id="consultations"
							method="POST"
							className="ConsultationForm"
						>
							<label htmlFor="phone-number" className="ConsultationLabel">
								Phone number
							</label>
							<div className="ConsultationInputs">
								<input
									id="phone-number"
									type="tel"
									name="phone"
									required
									placeholder="Enter your phone number"
									autoComplete="tel"
									className="ConsultationInput sm:text-sm"
									value={phone}
									disabled={isBooked}
									onChange={(e) => {
										if (e.target.validity.valid) {
											setPhone(e.target.value);
										}
									}}
								/>
								<DatePicker
									className="DatePicker"
									isRequired={true}
									isReadOnly={false}
									isDisabled={isBooked}
									isInvalid={false}
									hideTimeZone={true}
									showMonthAndYearPickers={false}
									label="Reserve Date"
									firstDayOfWeek="mon"
									defaultValue={Now.add({ days: 1 })}
									minValue={Today}
									value={date}
									isDateUnavailable={isDateUnavailable}
									onChange={setDate}
									errorMessage={(value) => {
										if (value.isInvalid) {
											return "Please enter a valid date.";
										}
									}}
									classNames={{
										base: "DatePickerBase",
										calendar: "DatePickerCalendar",
										calendarContent: "DatePickerCalendarContent",
										selectorButton: "DatePickerSelectorButton",
										selectorIcon: "DatePickerSelectorIcon",
										popoverContent: "DatePickerPopoverContent",
										timeInputLabel: "DatePickerTimeInputLabel",
										timeInput: "DatePickerTimeInput",
									}}
								/>
							</div>

							<Toast
								title={toast.title}
								description={toast.description}
								onSubmit={isBooked ? handleCancel : handleSubmit}
								disabled={isLoading || (!isBooked && !phone)}
								validation={() => (!isBooked ? phone !== "" : true)}
								className="ConsultationButton"
							>
								{isLoading
									? "Processing..."
									: isBooked
										? "Cancel"
										: "Let's Talk"}
							</Toast>
						</form>
					</div>
					<dl className="ConsultationFeatures sm:grid-cols-2 lg:pt-2">
						<div className="ConsultationFeature">
							<div className="ConsultationIconWrapper">
								<FaShieldHalved className="ConsultationIcon" />
							</div>
							<dt className="ConsultationFeatureTitle">No Obligation</dt>
							<dd className="ConsultationFeatureDescription">
								A short, free call to understand your needs and see if we're a
								good fit - no pressure, no commitment.
							</dd>
						</div>
						<div className="ConsultationFeature">
							<div className="ConsultationIconWrapper">
								<FaListCheck className="ConsultationIcon" />
							</div>
							<dt className="ConsultationFeatureTitle">Clear Next Steps</dt>
							<dd className="ConsultationFeatureDescription">
								You'll leave with practical advice, scope clarity, and a
								recommended path forward.
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}
