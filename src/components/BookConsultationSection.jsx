import { FaShieldHalved, FaListCheck } from "react-icons/fa6";
import { Link } from "react-router";

export default function BookConsultationSection() {
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
						<Link to="/onboarding" className="ConsultationButton">
							Let's Talk
						</Link>
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
