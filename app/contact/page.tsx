import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | WorldFlow",
  description:
    "Get in touch with WorldFlow — visit our Rajkot facility, call us, or write a message and our team will get back to you.",
};

export default function ContactPage() {
  return <ContactSection />;
}
