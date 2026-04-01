import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExternalLink from "../components/ExternalLink";

export default function Refunds() {
	return (
		<>
			<Header />
			<main className="document">
				<h1 className="title">Refund Policy</h1>
				<p className="subtitle">Last updated: 2026-03-19</p>

				<p>
					We offer a 30-day refund policy on all purchases, including design and
					programming services as well as any physical products. You have 30
					days from the date of delivery or final service completion to request
					a refund or resolution.
				</p>

				<h1>Services</h1>
				<p>
					For design and programming services, refund eligibility is evaluated
					on a case-by-case basis depending on the amount of work completed.
					Refunds are not available for work that has been fully completed and
					approved by you, or for project phases that have been signed off. We
					also cannot issue refunds for delays or outcomes caused by incomplete
					or inaccurate information provided by the client. You'll need your
					original invoice or proof of purchase when submitting a request.
				</p>

				<h1>Physical Products</h1>
				<p>
					For physical products, items must be returned in the same condition
					you received them - unused, with original tags and packaging. You'll
					need your receipt or proof of purchase. To start a return, contact us
					at{" "}
					<ExternalLink href="mailto:contact@hestiq.com">
						contact@hestiq.com
					</ExternalLink>
					. If your return is accepted, we'll provide a return shipping label
					and instructions. Items sent back without first requesting a return
					will not be accepted. Please note that if your country of residence is
					not Lithuania, shipping may take longer than expected.
				</p>

				<h1>Non-Returnable Items</h1>
				<p>
					Certain items are not eligible for return or refund. For services,
					this includes fully completed and approved work. For physical
					products, this includes perishable goods (such as food, flowers, or
					plants), custom or personalized items, personal care goods (such as
					beauty products), hazardous materials, flammable liquids, and gases.
					We also cannot accept returns on sale items or gift cards. Contact us
					if you have questions about a specific item.
				</p>

				<h1>Issues and Disputes</h1>
				<p>
					Please inspect physical orders upon receipt and review service
					deliverables promptly. Contact us immediately at{" "}
					<ExternalLink href="mailto:contact@hestiq.com">
						contact@hestiq.com
					</ExternalLink>{" "}
					if anything is defective, damaged, incorrect, or does not meet the
					agreed scope, so we can evaluate the issue and make it right.
				</p>

				<h1>Revisions and Exchanges</h1>
				<p>
					For services, the preferred resolution for unsatisfactory work is
					revisions per your service agreement - refunds are a last resort where
					revision is not feasible. For physical products, the fastest way to
					get what you want is to return the original item and place a new order
					once the return is accepted.
				</p>

				<h1>European Union 14-day cooling off period</h1>
				<p>
					If you are located in the European Union, you have the right to cancel
					an order within 14 days without providing a reason. For physical
					products, this applies from the date you receive the item. For
					services, this applies from the date of purchase, provided work has
					not yet commenced - if you have expressly requested that work begin
					within the 14-day period, you waive this right and may be entitled to
					a partial refund proportional to work not yet completed. As with
					standard returns, physical items must be unused, with original tags
					and packaging, and you'll need proof of purchase.
				</p>

				<h1>Refunds</h1>
				<p>
					Once we've received and reviewed your return or refund request, we'll
					notify you whether it has been approved. If approved, the refund will
					be issued to your original payment method within 10 business days.
					Allow additional time for your bank or payment provider to process it.
					If more than 15 business days have passed since approval and you
					haven't received it, contact us at{" "}
					<ExternalLink href="mailto:contact@hestiq.com">
						contact@hestiq.com
					</ExternalLink>
					.
				</p>
			</main>
			<Footer />
		</>
	);
}
