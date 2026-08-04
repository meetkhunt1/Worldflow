// Data lifted directly from the SpoiledChild homepage source.
// Product images point at their public CDN; swap if any 403.

export type Product = {
  name: string;
  url: string;
  price: string;
  color: string; // per-capsule neon accent from data-color
  image: string;
  wide?: boolean;
  label?: string; // e.g. "Fragrance free"
};

const CDN = "https://www.spoiledchild.com/media/catalog/product/cache";
const IMG = (p: string) => `${CDN}/6514bb26b52fa47cd558b8ec0d02ee56/${p}`;

export const products: Product[] = [
  { name: "O36+ Anti-Aging Triple-Peptide Moisturizer", url: "/o36-anti-aging-triple-peptide-moisturizer", price: "88.00", color: "#FF0283", image: IMG("s/k/skin_moisturizer_o36.png") },
  { name: "D35+ Anti-Aging Triple-Peptide Moisturizer", url: "/d35-anti-aging-triple-peptide-moisturizer", price: "88.00", color: "#ff005a", image: IMG("s/k/skin_moisturizer_d35.png"), label: "Fragrance free" },
  { name: "A22 Biotin Boost Hair + Scalp Serum", url: "/a22-biotin-boost-hair-scalp-serum", price: "59.00", color: "#ff9c00", image: IMG("h/a/hair_serum_a22.png") },
  { name: "S24 Rapid Recovery Hair Mask", url: "/s24-rapid-recovery-hair-mask", price: "45.00", color: "#FFB400", image: IMG("h/a/hair_mask_s24.png"), wide: true },
  { name: "A35 Anti-Aging Glycolic Renewing Serum", url: "/a35-anti-aging-glycolic-renewing-serum", price: "59.00", color: "#42D900", image: IMG("s/k/skin_serum_a35_2_1.png"), label: "Fragrance free" },
  { name: "M27 Anti-Aging Glycolic Renewing Serum", url: "/m27-anti-aging-glycolic-renewing-serum", price: "59.00", color: "#009953", image: IMG("s/k/skin_serum_m27_3.png") },
  { name: "S34 Clarifying Prebiotic Treatment", url: "/s34-anti-aging-clarifying-serum", price: "58.00", color: "#00CCAA", image: IMG("s/k/skin_serum_s34.png") },
  { name: "S33+ Anti-Aging Collagen Burst Serum", url: "/s33-anti-aging-collagen-burst-serum", price: "59.00", color: "#00E5DD", image: IMG("s/k/skin_serum_s33.png") },
  { name: "K27 Anti-Aging Vitamin C Boosting Serum", url: "/k27-anti-aging-vitamin-c-boosting-serum", price: "58.00", color: "#00ccff", image: IMG("s/k/skin_serum_k27.png") },
  { name: "G25+ Anti-Aging Retin + Night Rewind Serum", url: "/g25-anti-aging-retin-night-rewind-serum", price: "59.00", color: "#2780ff", image: IMG("s/k/skin_serum_g25_6.png") },
  { name: "F38+ Anti-Aging Retin + Night Rewind Serum", url: "/f38-anti-aging-retin-night-rewind-serum", price: "69.00", color: "#0051FF", image: IMG("s/k/skin_serum_f38_5.png"), label: "Fragrance free" },
  { name: "L28 Anti-Aging Restoring Moisturizer", url: "/l28-anti-aging-restoring-moisturizer", price: "58.00", color: "#6316DE", image: IMG("s/k/skin_moisturizer_l28.png") },
  { name: "C29 Anti-Aging Restoring Moisturizer", url: "/c29-anti-aging-restoring-moisturizer", price: "58.00", color: "#A62FFF", image: IMG("s/k/skin_moisturizer_c29.png"), label: "Fragrance free" },
  { name: "S27+ Anti-Aging Hyaluronic Lift Moisturizer", url: "/s27-anti-aging-hyaluronic-lift-moisturizer", price: "95.00", color: "#FF00FF", image: IMG("s/k/skin_moisturizer_s27.png") },
];

export type Review = {
  poster: string;
  avatar: string;
  name: string;
  productName: string;
  productImg: string;
  productUrl: string;
  wide?: boolean;
};

const REV_IMG = "https://files.ilmakiage.com/videos/kenzza/sc-reviews-img";
const REV_VID = "https://files.ilmakiage.com/videos/kenzza/sc-reviews-look";
const AV = "https://prod-influencer-profile-images.ilmakiage.com";
const PIMG = "https://www.spoiledchild.com/media/catalog/product/cache/c8f3aaecdf25d5eba295ed82be9e6e8d";

export const reviewImg = (id: string) => `${REV_IMG}/${id}.jpg`;
export const reviewVid = (id: string) => `${REV_VID}/${id}.mp4`;

// "Approved by dermatologists & experts"
export const expertReviews: (Review & { id: string })[] = [
  { id: "61e8c8c7d143fa001ce167a0", poster: reviewImg("61e8c8c7d143fa001ce167a0"), avatar: `${AV}/x790pTzR5Wp4ZkhnkQE7_profile-50b0dc81-e218-4d52-9255-7826f5dd0c85-2022-01-04-11-24-100w.jpg`, name: "Elizabeth Russeau, FNP-C, APRN", productName: "S24 Rapid Recovery Hair Mask", productImg: `${PIMG}/h/a/hair_mask_s24.png`, productUrl: "/s24-rapid-recovery-hair-mask", wide: true },
  { id: "61d4754f43b7a9001b10bcd3", poster: reviewImg("61d4754f43b7a9001b10bcd3"), avatar: `${AV}/kUh16FZ1QK52BvFAAwIc_profile-dc62e0b7-190e-41ab-9310-30b889132eed-2022-01-04-11-25-100w.jpg`, name: "Morgan Rackley, LE, LLP", productName: "S27+ Anti-Aging Hyaluronic Lift Moisturizer", productImg: `${PIMG}/s/k/skin_moisturizer_s27.png`, productUrl: "/s27-anti-aging-hyaluronic-lift-moisturizer" },
  { id: "61e8dc06d143fa001ce16a34", poster: reviewImg("61e8dc06d143fa001ce16a34"), avatar: `${AV}/DwfJaETT3G1x4XKKi58j_profile-12934f7e-9931-47fb-a598-a86810b68929-2022-01-19-10-47-100w.jpg`, name: "Nurse Liat, RN", productName: "F38+ Anti-Aging Retin + Night Rewind Serum", productImg: `${PIMG}/s/k/skin_serum_f38_5.png`, productUrl: "/f38-anti-aging-retin-night-rewind-serum" },
  { id: "61dc92f37f5f99001d1ea89f", poster: reviewImg("61dc92f37f5f99001d1ea89f"), avatar: `${AV}/fvrvYhuhTrmvx7sztzuG_profile-6f37393a-a5fb-4e09-bebc-aab03a4c04d3-2022-01-10-03-20-100w.jpg`, name: "Dr. Gabriella Vasile", productName: "A35 Anti-Aging Glycolic Renewing Serum", productImg: `${PIMG}/s/k/skin_serum_a35_2_1.png`, productUrl: "/a35-anti-aging-glycolic-renewing-serum" },
  { id: "61e89b86d143fa001ce165e8", poster: reviewImg("61e89b86d143fa001ce165e8"), avatar: `${AV}/wt1cfofZQeCDvnTNLUkP_profile-fee4b3b6-1dc1-4c66-bc31-ea2a2db437e3-2022-01-24-09-12-100w.jpg`, name: "Aliesh Pierce, LE", productName: "A22 Biotin Boost Hair + Scalp Serum", productImg: `${PIMG}/h/a/hair_serum_a22.png`, productUrl: "/a22-biotin-boost-hair-scalp-serum" },
  { id: "61e8df85d143fa001ce16aaa", poster: reviewImg("61e8df85d143fa001ce16aaa"), avatar: `${AV}/DwfJaETT3G1x4XKKi58j_profile-12934f7e-9931-47fb-a598-a86810b68929-2022-01-19-10-47-100w.jpg`, name: "Nurse Liat, RN", productName: "S34 Clarifying Prebiotic Treatment", productImg: `${PIMG}/s/k/skin_serum_s34.png`, productUrl: "/s34-anti-aging-clarifying-serum" },
  { id: "61dc95bf7f5f99001d1ea967", poster: reviewImg("61dc95bf7f5f99001d1ea967"), avatar: `${AV}/NW1W2sNRzCns9iOa50yl_profile-0d901d83-f677-46a3-9df4-c9bc198e5589-2022-01-03-05-17-100w.jpg`, name: "Lindsey Zubritsky MD, FAAD", productName: "G25+ Anti-Aging Retin + Night Rewind Serum", productImg: `${PIMG}/s/k/skin_serum_g25_6.png`, productUrl: "/g25-anti-aging-retin-night-rewind-serum" },
  { id: "61e8cb7081eb0e001cdcfe20", poster: reviewImg("61e8cb7081eb0e001cdcfe20"), avatar: `${AV}/wJQoj0dGRqWZA5uj8bQt_profile-6fcfbbb8-d6bb-4b0c-b143-d7e48268636b-2022-01-06-03-27-100w.jpg`, name: "Brit Lanier, Licensed Aesthetician", productName: "D35+ Anti-Aging Triple-Peptide Moisturizer", productImg: `${PIMG}/s/k/skin_moisturizer_d35.png`, productUrl: "/d35-anti-aging-triple-peptide-moisturizer" },
];

// "Loved by the spoiled"
export const lovedReviews: (Review & { id: string })[] = [
  { id: "61d3725843b7a9001b10ba09", poster: reviewImg("61d3725843b7a9001b10ba09"), avatar: `${AV}/LDYxMaxS2ytPgBXgDkFl_profile-c87e5821-fc0a-4d37-8367-dbd625a271ed-2022-01-03-05-07-100w.jpg`, name: "Taylor Kay", productName: "S34 Clarifying Prebiotic Treatment", productImg: `${PIMG}/s/k/skin_serum_s34.png`, productUrl: "/s34-anti-aging-clarifying-serum" },
  { id: "61dde0ec7f5f99001d1eb439", poster: reviewImg("61dde0ec7f5f99001d1eb439"), avatar: `${AV}/sfKIYTBnRQWKIcI14Tx9_profile-51033f48-0d7a-4cac-9e39-0f97b117a4a2-2022-01-11-02-54-100w.jpg`, name: "Brittney Adderly", productName: "S24 Rapid Recovery Hair Mask", productImg: `${PIMG}/h/a/hair_mask_s24.png`, productUrl: "/s24-rapid-recovery-hair-mask", wide: true },
  { id: "61ccbd356e40b0001c9e45ba", poster: reviewImg("61ccbd356e40b0001c9e45ba"), avatar: `${AV}/rbxCRmC1RmqXltibFC0Y_profile-915cb8ac-8d0a-4c46-9800-a110f86ab182-2021-12-28-11-35-100w.jpg`, name: "Lily Sanchez", productName: "O36+ Anti-Aging Triple-Peptide Moisturizer", productImg: `${PIMG}/s/k/skin_moisturizer_o36.png`, productUrl: "/o36-anti-aging-triple-peptide-moisturizer" },
  { id: "61bbaf8843b7a9001b107f12", poster: reviewImg("61bbaf8843b7a9001b107f12"), avatar: `${AV}/bviJST7TyeHUmjc6fHop_profile-de5cecc0-b9c4-4bb7-89dd-a5e7c5aa9feb-2019-06-24-10-40-100w.jpg`, name: "Sarah Butler", productName: "G25+ Anti-Aging Retin + Night Rewind Serum", productImg: `${PIMG}/s/k/skin_serum_g25_6.png`, productUrl: "/g25-anti-aging-retin-night-rewind-serum" },
  { id: "61d48d126e40b0001c9e627a", poster: reviewImg("61d48d126e40b0001c9e627a"), avatar: `${AV}/ZhB2Wcb6T3WAGqDOsERt_profile-b47b2b3b-8cc9-4949-af06-cac79c704b85-2022-01-04-01-15-100w.jpg`, name: "Julissa Guillen", productName: "A22 Biotin Boost Hair + Scalp Serum", productImg: `${PIMG}/h/a/hair_serum_a22.png`, productUrl: "/a22-biotin-boost-hair-scalp-serum" },
  { id: "61d4c2806e40b0001c9e6b79", poster: reviewImg("61d4c2806e40b0001c9e6b79"), avatar: `${AV}/DQbo3tfKSdOC8WiNra0S_profile-cd7c2f7c-7b6c-4f43-b209-fc3e49b59784-2021-09-01-11-40-100w.jpg`, name: "Cara Lovello", productName: "S27+ Anti-Aging Hyaluronic Lift Moisturizer", productImg: `${PIMG}/s/k/skin_moisturizer_s27.png`, productUrl: "/s27-anti-aging-hyaluronic-lift-moisturizer" },
  { id: "61d357dc43b7a9001b10b6be", poster: reviewImg("61d357dc43b7a9001b10b6be"), avatar: `${AV}/rOb0bzrTw7CQlh0qCUdA_profile-e572812e-7a7d-46d6-86ff-babd73875028-2020-09-09-04-00-100w.jpg`, name: "Kirsten Jordan", productName: "K27 Anti-Aging Vitamin C Boosting Serum", productImg: `${PIMG}/s/k/skin_serum_k27.png`, productUrl: "/k27-anti-aging-vitamin-c-boosting-serum" },
  { id: "61c422f16e40b0001c9e398d", poster: reviewImg("61c422f16e40b0001c9e398d"), avatar: `${AV}/fpXdXv7aTXWoWu43Q86C_profile-7ffaab58-4a3e-4b40-b731-8c0c1b1a6680-2019-07-01-12-16-100w.jpg`, name: "Adyel Juergensen", productName: "A35 Anti-Aging Glycolic Renewing Serum", productImg: `${PIMG}/s/k/skin_serum_a35_2_1.png`, productUrl: "/a35-anti-aging-glycolic-renewing-serum" },
];

export const SPOILED_BRAIN_URL = "/spoiled-brain?type=sc-mixed&v=sb1&fnl=ty&version=1";

export const hairConcerns = [
  { label: "Strength", href: "/hair-concerns-strength" },
  { label: "Thinning", href: "/hair-concerns-thinning" },
  { label: "Damage", href: "/hair-concerns-damage" },
  { label: "Dullness", href: "/hair-concerns-dullness" },
  { label: "Frizz", href: "/hair-concerns-frizz" },
  { label: "Split Ends", href: "/hair-concerns-split-ends" },
];

export const skinConcerns = [
  { label: "Blemishes", href: "/skin-concerns-blemishes" },
  { label: "Dullness", href: "/skin-concerns-dullness" },
  { label: "Wrinkles", href: "/skin-concerns-wrinkles" },
  { label: "Firmness", href: "/skin-concerns-firmness" },
];

// Header — Products mega-menu cards.
export const productMenu = [
  { label: "CPVC Plumbing Pipes", href: "/products/cpvc-plumbing-pipes", image: "/products/cpvc-plumbing-pipes.webp" },
  { label: "UPVC Plumbing Pipes & Fittings", href: "/products/upvc-plumbing-pipes", image: "/products/upvc-plumbing-pipes.webp" },
  { label: "SWR Drainage System", href: "/products/swr-drainage-system", image: "/products/swr-drainage-system.webp" },
  { label: "Column Pipes", href: "/products/column-pipes", image: "/products/column-pipes.webp" },
];

// Footer — brand blurb + link columns (WorldFlow content).
export const footerAbout = {
  description:
    "A brand of Hari Om Polyplast. Trusted manufacturer of PVC, CPVC, SWR, Column, and HDPE pipes. Engineered for durability and performance.",
  tagline: "“Brings Out The Best”",
};

export const footerProducts = [
  { label: "UPVC Plumbing Pipes", href: "/products/upvc-plumbing-pipes" },
  { label: "CPVC Plumbing Pipes", href: "/products/cpvc-plumbing-pipes" },
  { label: "SWR Drainage System", href: "/products/swr-drainage-system" },
  { label: "Column Pipes", href: "/products/column-pipes" },
];

export const footerQuickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Quality & Certificates", href: "/quality-certifications" },
  { label: "Contact Us", href: "/contact" },
  { label: "Career", href: "/career" },
];

export const footerContact = {
  phones: [
    { label: "Domestic", number: "+91 97276 75942" },
    { label: "International", number: "+91 84014 03884" },
  ],
  email: "worldflow8848@gmail.com",
  address: "Khodal Ind. Area, 8–B NH Veraval (Shapar), Rajkot Gujarat – 360024, India",
  mapLink: "https://maps.app.goo.gl/5RzMuwq3sJXC55eR7",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1847.51009168359!2d70.74602538860283!3d22.16330374494631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395835d837152155%3A0x2dd324ed43f5a3bb!2sWorldflow%20Pipes%20%26%20Fittings.!5e0!3m2!1sen!2sin!4v1785297126172!5m2!1sen!2sin",
  facebook: "https://www.facebook.com/hariompolyplast",
  instagram: "https://www.instagram.com/worldflow_pipes_and_fittings/?igsh=aHd4anU3a3lmaThq",
  linkedin: "https://www.linkedin.com/in/worldflow-pipe-and-fittings-0b4a2522b",
  youtube: "https://www.youtube.com/@hariompolyplast8981",
};

export const footerBottom = {
  copyright: "© 2026 Hari Om Polyplast. All rights reserved.",
  seoText: "PVC Pipe Manufacturer in Gujarat | CPVC Pipes Manufacturer in Gujarat",
};
