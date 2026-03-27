import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
	FaCheck,
	FaChevronLeft,
	FaChevronUp,
	FaChevronDown,
	FaDesktop,
	FaMobileScreenButton,
	FaArrowLeft,
	FaArrowRight,
	FaTriangleExclamation,
	FaCircleXmark,
	FaCircleInfo,
	FaMagnifyingGlassPlus,
	FaMagnifyingGlassMinus,
} from "react-icons/fa6";
import Form from "../components/Form";
import backendUrl from "../utils/backend";
import "../styles/designer.css";

const allImages = import.meta.glob("../assets/Templates/**/*.png", {
	eager: true,
	import: "default",
});

function img(folder, filename) {
	return allImages[`../assets/Templates/${folder}/PNG/${filename}`] ?? null;
}

function buildDesigns(folder, desktopPrefix, mobilePrefix, entries) {
	return entries
		.map(({ v, name, mobile }) => ({
			id: v,
			name,
			desktop: img(folder, `${desktopPrefix} V${v}.png`),
			mobile:
				mobile != null
					? (img(folder, `${mobilePrefix} V${mobile}.png`) ?? null)
					: null,
		}))
		.filter((d) => d.desktop);
}

const headerDesigns = buildDesigns("Headers", "Headers", "Mobile Header", [
	{ v: 1, name: "Left Logo + Navigation", mobile: 1 },
	{ v: 2, name: "Centered Logo + Navigation", mobile: 1 },
	{ v: 3, name: "Logo with Nav Links & CTA", mobile: 1 },
	{ v: 4, name: "Minimal Left Logo", mobile: 2 },
	{ v: 5, name: "Bold Centered Header", mobile: 2 },
	{ v: 6, name: "Dark Navigation Bar", mobile: 2 },
	{ v: 7, name: "Transparent Overlay Header", mobile: 1 },
	{ v: 8, name: "Logo with Full Nav Menu", mobile: 1 },
	{ v: 9, name: "Compact Header with CTA", mobile: 2 },
	{ v: 10, name: "Wide Navigation Strip", mobile: 2 },
]);

const heroDesigns = buildDesigns("Heros", "Heros", "Mobile Hero", [
	{ v: 1, name: "Full-Width Text Hero", mobile: 1 },
	{ v: 2, name: "Text Left, Image Right", mobile: 2 },
	{ v: 3, name: "Centered Text with Background", mobile: null },
	{ v: 4, name: "Split Screen Hero", mobile: 4 },
	{ v: 5, name: "Bold Headline Hero", mobile: null },
	{ v: 6, name: "Image Left, Text Right", mobile: 6 },
	{ v: 7, name: "Video Background Hero", mobile: 7 },
	{ v: 8, name: "Minimal Text Hero", mobile: null },
	{ v: 9, name: "Hero with CTA Buttons", mobile: 9 },
	{ v: 10, name: "Dark Hero Section", mobile: null },
	{ v: 11, name: "Hero with Feature Highlights", mobile: 11 },
	{ v: 12, name: "Large Image Hero", mobile: null },
	{ v: 13, name: "Gradient Background Hero", mobile: 13 },
	{ v: 14, name: "Hero with Stats", mobile: 14 },
	{ v: 15, name: "Two-Column Text Hero", mobile: 15 },
	{ v: 16, name: "Hero with Trust Badges", mobile: 16 },
	{ v: 17, name: "Animated Text Hero", mobile: 17 },
	{ v: 18, name: "Wide Panoramic Hero", mobile: null },
	{ v: 19, name: "Hero with Form", mobile: 19 },
	{ v: 20, name: "Full-Screen Hero", mobile: 20 },
]);

const footerDesigns = buildDesigns("Footers", "Footers", "Mobile Footer", [
	{ v: 1, name: "Four-Column Footer", mobile: 1 },
	{ v: 2, name: "Logo + Links Footer", mobile: 2 },
	{ v: 3, name: "Centered Minimal Footer", mobile: 3 },
	{ v: 4, name: "Dark Footer with Newsletter", mobile: 4 },
	{ v: 5, name: "Three-Column Footer", mobile: 5 },
	{ v: 6, name: "Footer with Social Links", mobile: 6 },
	{ v: 7, name: "Wide Footer with Contact Info", mobile: 7 },
	{ v: 8, name: "Simple Footer with Logo", mobile: 8 },
	{ v: 9, name: "Footer with Navigation Grid", mobile: 9 },
	{ v: 10, name: "Footer with CTA Strip", mobile: 10 },
	{ v: 11, name: "Footer with Address Block", mobile: 11 },
	{ v: 12, name: "Full-Width Dark Footer", mobile: 12 },
	{ v: 13, name: "Two-Column Footer", mobile: 13 },
	{ v: 14, name: "Footer with Divider Sections", mobile: 14 },
	{ v: 15, name: "Compact Footer Strip", mobile: 15 },
]);

const contactDesigns = buildDesigns("Contacts", "Contact", "Mobile Contact", [
	{ v: 1, name: "Form Left, Info Right", mobile: 1 },
	{ v: 2, name: "Form Right, Info Left", mobile: 1 },
	{ v: 3, name: "Centered Contact Form", mobile: 3 },
	{ v: 4, name: "Split Contact Layout", mobile: 3 },
	{ v: 5, name: "Form with Map Background", mobile: 5 },
	{ v: 6, name: "Minimal Contact Section", mobile: 6 },
	{ v: 7, name: "Dark Contact Panel", mobile: 6 },
	{ v: 8, name: "Contact with Social Links", mobile: 8 },
	{ v: 9, name: "Contact with Team Photo", mobile: 8 },
	{ v: 10, name: "Full-Width Contact Strip", mobile: 10 },
	{ v: 11, name: "Contact Cards Layout", mobile: 11 },
	{ v: 12, name: "Two-Column Contact Form", mobile: 12 },
	{ v: 13, name: "Form with Background Image", mobile: 12 },
	{ v: 14, name: "Contact with Icon Blocks", mobile: 14 },
	{ v: 15, name: "Large Contact Form", mobile: 15 },
	{ v: 16, name: "Contact with FAQ Row", mobile: 16 },
	{ v: 17, name: "Side Panel Contact", mobile: 16 },
	{ v: 18, name: "Floating Contact Card", mobile: 18 },
	{ v: 19, name: "Contact with Testimonial", mobile: 18 },
	{ v: 20, name: "Contact Grid Layout", mobile: 20 },
	{ v: 21, name: "Inline Contact Fields", mobile: 20 },
]);

const ctaDesigns = buildDesigns("CTA", "Call To Action", "Mobile CTA", [
	{ v: 1, name: "Banner CTA with Button", mobile: 1 },
	{ v: 2, name: "Split CTA Layout", mobile: 2 },
	{ v: 3, name: "Centered CTA Block", mobile: 2 },
	{ v: 4, name: "CTA with Background Image", mobile: 4 },
	{ v: 5, name: "Dark CTA Section", mobile: 4 },
	{ v: 6, name: "CTA with Icon Row", mobile: 6 },
	{ v: 7, name: "Minimal One-Line CTA", mobile: 6 },
	{ v: 8, name: "CTA with Email Input", mobile: 8 },
	{ v: 9, name: "Two-Button CTA", mobile: 9 },
	{ v: 10, name: "CTA with Headline & Sub", mobile: 10 },
	{ v: 11, name: "Wide CTA Strip", mobile: 11 },
	{ v: 12, name: "CTA with Trust Badges", mobile: 12 },
	{ v: 13, name: "CTA with Stats Bar", mobile: 12 },
	{ v: 14, name: "CTA with Image Left", mobile: 14 },
	{ v: 15, name: "Full-Width CTA Banner", mobile: 15 },
	{ v: 16, name: "CTA with Countdown", mobile: 16 },
	{ v: 17, name: "CTA with Feature List", mobile: 16 },
	{ v: 18, name: "CTA with Newsletter", mobile: 18 },
	{ v: 19, name: "CTA with Social Proof", mobile: 19 },
	{ v: 20, name: "Gradient CTA Block", mobile: 19 },
]);

const logoStripDesigns = buildDesigns(
	"Logo Strips",
	"Logo Strip",
	"Mobile Logo Strip",
	[
		{ v: 1, name: "Single Row Logo Marquee", mobile: 1 },
		{ v: 2, name: "Two-Row Logo Grid", mobile: 2 },
		{ v: 3, name: "Logo Strip with Heading", mobile: 3 },
		{ v: 4, name: "Centered Logo Row", mobile: 4 },
		{ v: 5, name: "Logo Strip with Background", mobile: 5 },
		{ v: 6, name: "Dark Logo Strip", mobile: 6 },
		{ v: 7, name: "Logo Strip with Dividers", mobile: 7 },
		{ v: 8, name: "Mini Logo Row", mobile: 8 },
		{ v: 9, name: "Logo Strip with CTA", mobile: 9 },
		{ v: 10, name: "Scrolling Logo Band", mobile: 10 },
		{ v: 11, name: "Logo Grid with Title", mobile: 11 },
	],
);

const accordionDesigns = buildDesigns(
	"Accordions",
	"Accordion",
	"Mobile Accordion",
	[
		{ v: 1, name: "Simple FAQ List", mobile: 1 },
		{ v: 2, name: "FAQ with Icon Rows", mobile: 2 },
		{ v: 3, name: "Two-Column FAQ", mobile: 3 },
		{ v: 4, name: "FAQ with Category Tabs", mobile: 4 },
		{ v: 5, name: "FAQ with Side Panel", mobile: 5 },
		{ v: 6, name: "Dark FAQ Section", mobile: 6 },
		{ v: 7, name: "FAQ with Search Bar", mobile: 7 },
		{ v: 8, name: "Numbered FAQ List", mobile: 8 },
		{ v: 9, name: "FAQ with Images", mobile: 9 },
		{ v: 10, name: "Minimal Collapsible FAQ", mobile: 10 },
	],
);

const teamDesigns = buildDesigns(
	"Team Members",
	"Team Members",
	"Mobile Team Members",
	[
		{ v: 1, name: "Three-Column Team Grid", mobile: 1 },
		{ v: 2, name: "Four-Column Team Grid", mobile: 2 },
		{ v: 3, name: "Team with Bio Cards", mobile: 3 },
		{ v: 4, name: "Team with Social Links", mobile: 4 },
		{ v: 5, name: "Large Featured Team", mobile: 5 },
		{ v: 6, name: "Team Horizontal Scroll", mobile: 6 },
		{ v: 7, name: "Dark Team Section", mobile: 7 },
		{ v: 8, name: "Team with Photo Overlay", mobile: 8 },
		{ v: 9, name: "Two-Column Team Layout", mobile: 9 },
		{ v: 10, name: "Team with Role Badges", mobile: 10 },
		{ v: 11, name: "Team with Quote Cards", mobile: 11 },
		{ v: 12, name: "Minimal Team Row", mobile: 12 },
		{ v: 13, name: "Team with Background Images", mobile: 13 },
		{ v: 14, name: "Circle Photo Team Grid", mobile: 14 },
		{ v: 15, name: "Team with Department Filter", mobile: 15 },
		{ v: 16, name: "Team with LinkedIn Badges", mobile: 16 },
		{ v: 17, name: "Team Mosaic Layout", mobile: 17 },
		{ v: 18, name: "Team with Stats", mobile: 18 },
		{ v: 19, name: "Compact Team Cards", mobile: 19 },
		{ v: 20, name: "CEO Spotlight + Team", mobile: 20 },
	],
);

const testimonialDesigns = buildDesigns(
	"Testimonials",
	"Testimonials",
	"Mobile Testimonials",
	[
		{ v: 1, name: "Carousel Testimonials", mobile: 1 },
		{ v: 2, name: "Three-Card Testimonials", mobile: 2 },
		{ v: 3, name: "Full-Width Quote Block", mobile: 3 },
		{ v: 4, name: "Star Rating Cards", mobile: 4 },
		{ v: 5, name: "Testimonials with Avatars", mobile: 5 },
		{ v: 6, name: "Dark Testimonial Strip", mobile: 6 },
		{ v: 7, name: "Testimonial with Logo", mobile: 7 },
		{ v: 8, name: "Two-Column Testimonials", mobile: 8 },
		{ v: 9, name: "Testimonials Grid", mobile: 9 },
		{ v: 10, name: "Testimonial with Video", mobile: 10 },
		{ v: 11, name: "Minimal Text Testimonials", mobile: 11 },
		{ v: 12, name: "Testimonials with Background", mobile: 12 },
		{ v: 13, name: "Testimonials with Counter Strip", mobile: 13 },
		{ v: 14, name: "Large Quote Testimonial", mobile: 14 },
	],
);

const pricingDesigns = buildDesigns("Pricing", "Pricing", "Mobile Pricing", [
	{ v: 1, name: "Three-Tier Pricing Cards", mobile: 1 },
	{ v: 2, name: "Two-Plan Comparison", mobile: 2 },
	{ v: 3, name: "Pricing with Feature Table", mobile: 3 },
	{ v: 4, name: "Dark Pricing Section", mobile: 4 },
	{ v: 5, name: "Pricing with Annual Toggle", mobile: 5 },
	{ v: 6, name: "Minimal Pricing Strip", mobile: 6 },
	{ v: 7, name: "Pricing with Popular Badge", mobile: 7 },
	{ v: 8, name: "Pricing with Icon Features", mobile: 8 },
	{ v: 9, name: "Enterprise Pricing Block", mobile: 9 },
	{ v: 10, name: "Pricing with FAQ Below", mobile: 10 },
	{ v: 11, name: "One-Plan Focused Pricing", mobile: 11 },
	{ v: 12, name: "Pricing Card with CTA", mobile: 12 },
	{ v: 13, name: "Wide Pricing Comparison", mobile: 13 },
]);

const contentCardDesigns = buildDesigns(
	"Content Cards",
	"Content Cards",
	"Mobile Content Cards",
	[
		{ v: 1, name: "Three Icon Feature Cards", mobile: 1 },
		{ v: 2, name: "Four Feature Cards", mobile: 2 },
		{ v: 3, name: "Cards with Image Tops", mobile: 3 },
		{ v: 4, name: "Horizontal Feature Cards", mobile: 4 },
		{ v: 5, name: "Dark Feature Cards", mobile: 5 },
		{ v: 6, name: "Numbered Step Cards", mobile: 6 },
		{ v: 7, name: "Cards with Hover Effects", mobile: 7 },
		{ v: 8, name: "Two-Column Feature Cards", mobile: 8 },
		{ v: 9, name: "Cards with Background Images", mobile: 9 },
		{ v: 10, name: "Cards with Stats", mobile: 10 },
		{ v: 11, name: "Large Feature Cards", mobile: 11 },
		{ v: 12, name: "Cards with CTA Links", mobile: 12 },
		{ v: 13, name: "Testimonial-Style Cards", mobile: 13 },
		{ v: 14, name: "Minimal Info Cards", mobile: 14 },
		{ v: 15, name: "Cards with Icon Badges", mobile: 15 },
	],
);

const contentSectionDesigns = buildDesigns(
	"Content Sections",
	"Content Sections",
	"Mobile Content Section",
	[
		{ v: 1, name: "Text Left, Image Right", mobile: 1 },
		{ v: 2, name: "Text Right, Image Left", mobile: 1 },
		{ v: 3, name: "Centered Text Block", mobile: 3 },
		{ v: 4, name: "Text Block with Bullet Points", mobile: 3 },
		{ v: 5, name: "Split Screen Content", mobile: 5 },
		{ v: 6, name: "Content with Video Embed", mobile: 5 },
		{ v: 7, name: "Content with Icon Row", mobile: 7 },
		{ v: 8, name: "Content with Background Pattern", mobile: 8 },
		{ v: 9, name: "Dark Content Section", mobile: 8 },
		{ v: 10, name: "Content with Stats Bar", mobile: 10 },
		{ v: 11, name: "Content with Timeline", mobile: 11 },
		{ v: 12, name: "Content with Steps", mobile: 11 },
		{ v: 13, name: "Content with Quote Block", mobile: 13 },
		{ v: 14, name: "Wide Image Content", mobile: 14 },
		{ v: 15, name: "Content with Feature List", mobile: 15 },
		{ v: 16, name: "Content with Checkmarks", mobile: 16 },
		{ v: 17, name: "Content with Tabs", mobile: 17 },
		{ v: 18, name: "Content with Process Steps", mobile: 18 },
		{ v: 19, name: "Content with Social Proof", mobile: 19 },
		{ v: 20, name: "Content with Animated Counter", mobile: 20 },
		{ v: 21, name: "Minimal Two-Column Content", mobile: 20 },
	],
);

const galleryDesigns = buildDesigns("Gallery", "Gallery", "Mobile Gallery", [
	{ v: 1, name: "Masonry Photo Grid", mobile: 1 },
	{ v: 2, name: "Three-Column Grid Gallery", mobile: 2 },
	{ v: 3, name: "Four-Column Grid Gallery", mobile: 3 },
	{ v: 4, name: "Gallery with Lightbox", mobile: 4 },
	{ v: 5, name: "Gallery with Categories", mobile: 5 },
	{ v: 6, name: "Dark Gallery Section", mobile: 6 },
	{ v: 7, name: "Gallery with Captions", mobile: 7 },
	{ v: 8, name: "Full-Width Gallery Strip", mobile: 8 },
	{ v: 9, name: "Gallery with Hover Overlay", mobile: 9 },
	{ v: 10, name: "Mosaic Gallery Layout", mobile: 10 },
	{ v: 11, name: "Gallery with Featured Image", mobile: 11 },
	{ v: 12, name: "Minimal Two-Column Gallery", mobile: 12 },
]);

const STEPS = [
	{
		id: "header",
		label: "Header",
		description: "Choose a header style that matches your brand.",
		required: true,
		designs: headerDesigns,
	},
	{
		id: "hero",
		label: "Hero",
		description: "Select a hero section to make a strong first impression.",
		required: true,
		designs: heroDesigns,
	},
	{
		id: "footer",
		label: "Footer",
		description: "Choose a footer that ties your site together.",
		required: true,
		designs: footerDesigns,
	},
	{
		id: "contact",
		label: "Contact Form",
		description: "Add a contact section so visitors can reach you.",
		required: false,
		designs: contactDesigns,
	},
	{
		id: "cta",
		label: "Call to Action",
		description: "Drive conversions with a compelling CTA section.",
		required: false,
		designs: ctaDesigns,
	},
	{
		id: "logostrip",
		label: "Logo Strip",
		description: "Showcase your partners or clients with a logo strip.",
		required: false,
		designs: logoStripDesigns,
	},
	{
		id: "accordion",
		label: "FAQ / Accordion",
		description: "Answer common questions with an accordion section.",
		required: false,
		designs: accordionDesigns,
	},
	{
		id: "team",
		label: "Team Members",
		description: "Introduce your team to build trust and credibility.",
		required: false,
		designs: teamDesigns,
	},
	{
		id: "testimonials",
		label: "Testimonials",
		description: "Build social proof with client testimonials.",
		required: false,
		designs: testimonialDesigns,
	},
	{
		id: "pricing",
		label: "Pricing",
		description: "Display your pricing plans clearly.",
		required: false,
		designs: pricingDesigns,
	},
	{
		id: "contentcards",
		label: "Content Cards",
		description: "Highlight features or services with content cards.",
		required: false,
		designs: contentCardDesigns,
	},
	{
		id: "contentsections",
		label: "Content Section",
		description: "Add rich content sections with text and media.",
		required: false,
		designs: contentSectionDesigns,
	},
	{
		id: "gallery",
		label: "Gallery",
		description: "Showcase your work with a gallery section.",
		required: false,
		designs: galleryDesigns,
	},
];

const SCORE_WEIGHTS = {
	header: 20,
	hero: 15,
	footer: 20,
	contact: 10,
	cta: 8,
	pricing: 7,
	testimonials: 7,
	logostrip: 4,
	accordion: 3,
	team: 3,
	contentcards: 1,
	contentsections: 1,
	gallery: 1,
};

const MIDDLE_IDS = STEPS.filter(
	(s) => !["header", "hero", "footer"].includes(s.id),
).map((s) => s.id);

function parseSelectionsFromUrl() {
	const params = new URLSearchParams(window.location.search);
	const restored = {};
	for (const s of STEPS) {
		const val = params.get(s.id);
		if (val != null) {
			const num = parseInt(val, 10);
			if (!isNaN(num)) restored[s.id] = num;
		}
	}
	return restored;
}

function parseSectionOrderFromUrl() {
	const params = new URLSearchParams(window.location.search);
	const raw = params.get("order");
	if (raw) {
		const order = raw.split(",").filter((id) => MIDDLE_IDS.includes(id));
		const missing = MIDDLE_IDS.filter((id) => !order.includes(id));
		return [...order, ...missing];
	}
	return MIDDLE_IDS;
}

function computeScore(selections) {
	return Object.entries(SCORE_WEIGHTS).reduce(
		(sum, [id, weight]) => sum + (id in selections ? weight : 0),
		0,
	);
}

function computeRecommendations(selections) {
	const recs = [];
	for (const id of ["header", "hero", "footer"]) {
		if (!(id in selections)) {
			const s = STEPS.find((s) => s.id === id);
			recs.push({
				level: "error",
				text: `Missing required section: ${s.label}.`,
			});
		}
	}
	const recommended = [
		{
			id: "contact",
			tip: "A contact form makes it easy for visitors to reach you.",
		},
		{ id: "cta", tip: "A call-to-action section drives conversions." },
		{
			id: "pricing",
			tip: "Showing pricing reduces friction and builds trust.",
		},
		{ id: "testimonials", tip: "Social proof increases credibility." },
	];
	for (const { id, tip } of recommended) {
		if (!(id in selections)) {
			recs.push({ level: "warning", text: tip });
		}
	}
	const count = Object.keys(selections).length;
	if (count > 9) {
		recs.push({
			level: "info",
			text: "Consider simplifying — fewer focused sections often convert better.",
		});
	} else if (count === 0) {
		recs.push({
			level: "info",
			text: "Start by selecting a header, hero, and footer.",
		});
	}
	return recs;
}

export default function Designer() {
	const [currentStep, setCurrentStep] = useState(0);
	const [selections, setSelections] = useState(parseSelectionsFromUrl);
	const [pending, setPending] = useState(null);
	const [mode, setMode] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		return params.has("header") || params.has("hero") || params.has("order")
			? "preview"
			: "designer";
	});
	const [previewMobile, setPreviewMobile] = useState(false);
	const [sectionOrder, setSectionOrder] = useState(parseSectionOrderFromUrl);

	useEffect(() => {
		const handler = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, []);

	const step = STEPS[currentStep];
	const score = useMemo(() => computeScore(selections), [selections]);
	const recommendations = useMemo(
		() => computeRecommendations(selections),
		[selections],
	);
	const completedCount = Object.keys(selections).length;

	const syncPendingToStep = useCallback(
		(idx) => setPending(selections[STEPS[idx].id] ?? null),
		[selections],
	);

	const handleSelectDesign = useCallback((designId) => {
		setPending((prev) => (prev === designId ? null : designId));
	}, []);

	const handleAdd = useCallback(() => {
		if (pending == null) return;
		setSelections((prev) => ({ ...prev, [step.id]: pending }));
		if (currentStep < STEPS.length - 1) {
			const nextIdx = currentStep + 1;
			setCurrentStep(nextIdx);
			setPending(selections[STEPS[nextIdx].id] ?? null);
		} else {
			setPending(null);
		}
	}, [pending, step.id, currentStep, selections]);

	const handleSkip = useCallback(() => {
		setSelections((prev) => {
			const next = { ...prev };
			delete next[step.id];
			return next;
		});
		if (currentStep < STEPS.length - 1) {
			const nextIdx = currentStep + 1;
			setCurrentStep(nextIdx);
			setPending(selections[STEPS[nextIdx].id] ?? null);
		} else {
			setPending(null);
		}
	}, [step.id, currentStep, selections]);

	const handleBack = useCallback(() => {
		if (currentStep > 0) {
			const prevIdx = currentStep - 1;
			setCurrentStep(prevIdx);
			syncPendingToStep(prevIdx);
		}
	}, [currentStep, syncPendingToStep]);

	const handleStepClick = useCallback(
		(idx) => {
			setCurrentStep(idx);
			syncPendingToStep(idx);
		},
		[syncPendingToStep],
	);

	const moveSection = useCallback((id, dir) => {
		setSectionOrder((prev) => {
			const idx = prev.indexOf(id);
			if (idx === -1) return prev;
			const next = [...prev];
			const swap = idx + dir;
			if (swap < 0 || swap >= next.length) return prev;
			[next[idx], next[swap]] = [next[swap], next[idx]];
			return next;
		});
	}, []);

	const orderedSections = useMemo(() => {
		const result = [];
		const push = (id, fixed) => {
			if (!(id in selections)) return;
			const s = STEPS.find((x) => x.id === id);
			const design = s.designs.find((d) => d.id === selections[id]);
			if (design) result.push({ stepId: id, label: s.label, design, fixed });
		};
		push("header", "start");
		push("hero", "start");
		for (const id of sectionOrder) {
			if (!["header", "hero", "footer"].includes(id)) push(id, false);
		}
		push("footer", "end");
		return result;
	}, [selections, sectionOrder]);

	const previewUrl = useMemo(() => {
		const params = new URLSearchParams();
		for (const [k, v] of Object.entries(selections)) {
			params.set(k, String(v));
		}
		const middleSelected = sectionOrder.filter((id) => id in selections);
		if (middleSelected.length > 0) {
			params.set("order", middleSelected.join(","));
		}
		return `${window.location.origin}/designer?${params.toString()}`;
	}, [selections, sectionOrder]);

	if (mode === "preview") {
		return (
			<PreviewView
				sections={orderedSections}
				mobile={previewMobile}
				onToggleMobile={() => setPreviewMobile((v) => !v)}
				onMoveSection={moveSection}
				onBack={() => setMode("designer")}
				onOrder={() => setMode("order")}
			/>
		);
	}

	if (mode === "order") {
		return (
			<OrderView
				sections={orderedSections}
				previewUrl={previewUrl}
				onBack={() => setMode("preview")}
			/>
		);
	}

	return (
		<div className="ds-layout">
			<StepList
				steps={STEPS}
				currentStep={currentStep}
				selections={selections}
				completedCount={completedCount}
				onStepClick={handleStepClick}
			/>
			<TemplatePanel
				step={step}
				stepIndex={currentStep}
				totalSteps={STEPS.length}
				pending={pending}
				onSelect={handleSelectDesign}
				onBack={handleBack}
				onSkip={handleSkip}
				onAdd={handleAdd}
			/>
			<ReviewPanel
				score={score}
				recommendations={recommendations}
				selections={selections}
				onPreview={() => setMode("preview")}
			/>
		</div>
	);
}

function StepList({
	steps,
	currentStep,
	selections,
	completedCount,
	onStepClick,
}) {
	return (
		<aside className="ds-steps">
			<div className="ds-steps-header">
				<h2 className="ds-steps-title">Steps</h2>
				<span className="ds-steps-count">
					{completedCount} / {steps.length} completed
				</span>
				<div className="ds-steps-progress">
					<div
						className="ds-steps-progress-fill"
						style={{ width: `${(completedCount / steps.length) * 100}%` }}
					/>
				</div>
			</div>
			<nav className="ds-steps-nav">
				{steps.map((s, idx) => {
					const done = s.id in selections;
					const active = idx === currentStep;
					return (
						<button
							key={s.id}
							className="ds-step-item"
							data-active={String(active)}
							data-done={String(done)}
							onClick={() => onStepClick(idx)}
							type="button"
						>
							<span className="ds-step-dot">
								{done ? <FaCheck /> : <span>{idx + 1}</span>}
							</span>
							<div className="ds-step-info">
								<span className="ds-step-label">{s.label}</span>
								{done &&
									(() => {
										const design = s.designs.find(
											(d) => d.id === selections[s.id],
										);
										return (
											<span className="ds-step-chosen">
												{design?.name ?? `Design ${selections[s.id]}`}
											</span>
										);
									})()}
							</div>
							{s.required && !done && (
								<span className="ds-step-required-badge">req</span>
							)}
						</button>
					);
				})}
			</nav>
		</aside>
	);
}

function TemplatePanel({
	step,
	stepIndex,
	totalSteps,
	pending,
	onSelect,
	onBack,
	onSkip,
	onAdd,
}) {
	return (
		<section className="ds-templates">
			<header className="ds-templates-header">
				<div className="ds-templates-meta">
					<span className="ds-step-counter">
						Step {stepIndex + 1} of {totalSteps}
					</span>
					{!step.required && (
						<span className="ds-optional-badge">Optional</span>
					)}
				</div>
				<h2 className="ds-templates-title">{step.label}</h2>
				<p className="ds-templates-desc">{step.description}</p>
			</header>
			<div className="ds-templates-grid">
				{step.designs.map((design) => (
					<DesignCard
						key={design.id}
						design={design}
						selected={pending === design.id}
						onSelect={() => onSelect(design.id)}
					/>
				))}
			</div>
			<footer className="ds-templates-footer">
				<button
					className="ds-btn ds-btn-ghost"
					onClick={onBack}
					disabled={stepIndex === 0}
					type="button"
				>
					<FaChevronLeft />
					Back
				</button>
				<div className="ds-footer-right">
					<button
						className="ds-btn ds-btn-ghost"
						onClick={onSkip}
						type="button"
					>
						Skip
					</button>
					<button
						className="ds-btn ds-btn-primary"
						onClick={onAdd}
						disabled={pending == null}
						type="button"
					>
						Add Selected
						<FaCheck />
					</button>
				</div>
			</footer>
		</section>
	);
}

function DesignCard({ design, selected, onSelect }) {
	return (
		<button
			className="ds-card"
			data-selected={String(selected)}
			onClick={onSelect}
			type="button"
		>
			{selected && (
				<span className="ds-card-check">
					<FaCheck />
				</span>
			)}
			<div className="ds-card-img-wrap">
				<img
					src={design.desktop}
					alt={design.name}
					className="ds-card-img"
					loading="lazy"
				/>
			</div>
			<div className="ds-card-footer">
				<span className="ds-card-name">{design.name}</span>
				{design.mobile && (
					<span
						className="ds-card-mobile-badge"
						title="Mobile variant available"
					>
						<FaMobileScreenButton />
					</span>
				)}
			</div>
		</button>
	);
}

function ReviewPanel({ score, recommendations, selections, onPreview }) {
	const selectedCount = Object.keys(selections).length;
	const label =
		score >= 80
			? "Excellent"
			: score >= 60
				? "Good"
				: score >= 40
					? "Fair"
					: "Needs work";

	return (
		<aside className="ds-review">
			<div className="ds-review-block">
				<h3 className="ds-review-block-title">Design Score</h3>
				<div className="ds-score-row">
					<div className="ds-score-ring" style={{ "--score": score }}>
						<div className="ds-score-inner">
							<span className="ds-score-value">{score}</span>
							<span className="ds-score-denom">/100</span>
						</div>
					</div>
					<div className="ds-score-meta">
						<span className="ds-score-label">{label}</span>
						<span className="ds-score-sections">
							{selectedCount} section{selectedCount !== 1 ? "s" : ""} selected
						</span>
					</div>
				</div>
			</div>

			{recommendations.length > 0 && (
				<div className="ds-review-block">
					<h3 className="ds-review-block-title">Recommendations</h3>
					<ul className="ds-recs-list">
						{recommendations.map((rec, i) => (
							<li key={i} className="ds-rec-item" data-level={rec.level}>
								{rec.level === "error" ? (
									<FaCircleXmark />
								) : rec.level === "warning" ? (
									<FaTriangleExclamation />
								) : (
									<FaCircleInfo />
								)}
								<span>{rec.text}</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{selectedCount > 0 && (
				<div className="ds-review-block">
					<h3 className="ds-review-block-title">Included Sections</h3>
					<ul className="ds-included-list">
						{STEPS.filter((s) => s.id in selections).map((s) => {
							const design = s.designs.find((d) => d.id === selections[s.id]);
							return (
								<li key={s.id} className="ds-included-item">
									<FaCheck />
									<span className="ds-included-label">{s.label}</span>
									<span className="ds-included-design" title={design?.name}>
										{design?.name ?? `Design ${selections[s.id]}`}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			)}

			{selectedCount > 0 && (
				<button
					className="ds-btn ds-btn-primary ds-review-cta"
					onClick={onPreview}
					type="button"
				>
					Preview Design
					<FaArrowRight />
				</button>
			)}
		</aside>
	);
}

function PreviewView({
	sections,
	mobile,
	onToggleMobile,
	onMoveSection,
	onBack,
	onOrder,
}) {
	const movable = sections.filter((s) => s.fixed === false);
	const [zoom, setZoom] = useState(1);
	const zoomIn = useCallback(
		() => setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100)),
		[],
	);
	const zoomOut = useCallback(
		() => setZoom((z) => Math.max(0.25, Math.round((z - 0.25) * 100) / 100)),
		[],
	);

	return (
		<div className="ds-preview">
			<div className="ds-preview-toolbar">
				<button className="ds-btn ds-btn-ghost" onClick={onBack} type="button">
					<FaArrowLeft />
					Back to Designer
				</button>
				<div className="ds-preview-toolbar-center">
					<div className="ds-viewport-toggle">
						<button
							className="ds-viewport-btn"
							data-active={String(!mobile)}
							onClick={mobile ? onToggleMobile : undefined}
							type="button"
						>
							<FaDesktop />
							Desktop
						</button>
						<button
							className="ds-viewport-btn"
							data-active={String(mobile)}
							onClick={!mobile ? onToggleMobile : undefined}
							type="button"
						>
							<FaMobileScreenButton />
							Mobile
						</button>
					</div>
					<div className="ds-zoom-controls">
						<button
							className="ds-zoom-btn"
							onClick={zoomOut}
							disabled={zoom <= 0.25}
							type="button"
							title="Zoom out"
						>
							<FaMagnifyingGlassMinus />
						</button>
						<span className="ds-zoom-label">{Math.round(zoom * 100)}%</span>
						<button
							className="ds-zoom-btn"
							onClick={zoomIn}
							disabled={zoom >= 2}
							type="button"
							title="Zoom in"
						>
							<FaMagnifyingGlassPlus />
						</button>
					</div>
				</div>
				<button
					className="ds-btn ds-btn-primary"
					onClick={onOrder}
					type="button"
				>
					Place Order
					<FaArrowRight />
				</button>
			</div>
			<div className="ds-preview-canvas">
				{sections.length === 0 ? (
					<div className="ds-preview-empty">
						<p>No sections selected. Go back and choose your designs.</p>
					</div>
				) : (
					<div
						className="ds-preview-frame"
						data-mobile={String(mobile)}
						style={{ zoom }}
					>
						{sections.map((section) => {
							const src =
								mobile && section.design.mobile
									? section.design.mobile
									: section.design.desktop;
							const movableIdx = movable.indexOf(section);
							return (
								<div key={section.stepId} className="ds-preview-section">
									<div className="ds-preview-section-label">
										<span>{section.label}</span>
										{section.fixed !== false && (
											<span className="ds-preview-fixed-tag">fixed</span>
										)}
									</div>
									<img src={src} alt={section.label} />
									{section.fixed === false && (
										<div className="ds-preview-controls">
											<button
												className="ds-move-btn"
												onClick={() => onMoveSection(section.stepId, -1)}
												disabled={movableIdx === 0}
												type="button"
												title="Move up"
											>
												<FaChevronUp />
											</button>
											<button
												className="ds-move-btn"
												onClick={() => onMoveSection(section.stepId, 1)}
												disabled={movableIdx === movable.length - 1}
												type="button"
												title="Move down"
											>
												<FaChevronDown />
											</button>
										</div>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function OrderView({ sections, previewUrl, onBack }) {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [submitting, setSubmitting] = useState(false);
	const [feedback, setFeedback] = useState({ type: "idle", message: "" });

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}, []);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			setFeedback({ type: "idle", message: "" });
			if (!form.name.trim()) {
				setFeedback({ type: "error", message: "Name is required." });
				return;
			}
			if (!EMAIL_RE.test(form.email)) {
				setFeedback({ type: "error", message: "Invalid email address." });
				return;
			}
			setSubmitting(true);
			const selectionsSummary = sections
				.map((s) => `- ${s.label}: ${s.design.name}`)
				.join("\n");
			const combinedMessage = [
				form.message.trim(),
				`--- Design Selections ---\n${selectionsSummary}`,
				`Preview: ${previewUrl}`,
			]
				.filter(Boolean)
				.join("\n\n");
			try {
				const res = await fetch(`${backendUrl}/orders`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: form.name,
						email: form.email,
						message: combinedMessage,
						category: "Design",
						services: ["UI/UX Design"],
					}),
				});
				const data = await res.json().catch(() => null);
				if (!res.ok || data?.success === false) {
					throw new Error(data?.error ?? "Could not submit your order.");
				}
				setFeedback({
					type: "success",
					message:
						"Your order has been submitted! We'll review your design and get back to you soon.",
				});
			} catch (err) {
				setFeedback({
					type: "error",
					message:
						err instanceof Error ? err.message : "Could not submit your order.",
				});
			} finally {
				setSubmitting(false);
			}
		},
		[form, sections, previewUrl],
	);

	return (
		<div className="ds-order">
			<div className="ds-order-toolbar">
				<button className="ds-btn ds-btn-ghost" onClick={onBack} type="button">
					<FaArrowLeft />
					Back to Preview
				</button>
				<h1 className="ds-order-title">Place Your Order</h1>
				<div />
			</div>
			<div className="ds-order-content">
				<div className="ds-order-summary">
					<h2 className="ds-order-summary-title">Your Design Selections</h2>
					<ul className="ds-order-list">
						{sections.map((s) => (
							<li key={s.stepId} className="ds-order-item">
								<img
									src={s.design.desktop}
									alt={s.label}
									className="ds-order-thumb"
								/>
								<div className="ds-order-item-info">
									<span className="ds-order-item-section">{s.label}</span>
									<span className="ds-order-item-design">{s.design.name}</span>
								</div>
							</li>
						))}
					</ul>
					<div className="ds-order-preview-url">
						<span>Preview link:</span>
						<a href={previewUrl} target="_blank" rel="noreferrer">
							{previewUrl}
						</a>
					</div>
				</div>
				<Form>
					<Form.Header>
						<Form.Title>Contact Details</Form.Title>
						<Form.Description>
							Describe your project goals and any specific requests. Your design
							selections will be sent automatically.
						</Form.Description>
					</Form.Header>
					<Form.Body onSubmit={handleSubmit}>
						<Form.NameInput
							label="Name"
							value={form.name}
							onChange={handleChange}
							required
						/>
						<Form.EmailInput
							label="Email"
							value={form.email}
							onChange={handleChange}
							required
						/>
						<Form.MessageInput
							label="Message (optional)"
							value={form.message}
							onChange={handleChange}
						/>
						<Form.SubmitButton label="Submit Order" isLoading={submitting} />
						<Form.Feedback type={feedback.type} message={feedback.message} />
					</Form.Body>
				</Form>
			</div>
		</div>
	);
}
