import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main>
      <section className="bg-header text-header-foreground py-16">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-header-foreground/70 max-w-2xl mx-auto">
            Have a question or need help? The Eco Laptop Store team is here for you.
          </p>
        </div>
      </section>

      <section className="container py-12">
        {/* Success Banner */}
        {submitted && (
          <div className="mb-8 flex items-start gap-4 p-5 rounded-xl border border-green-200 bg-green-50 text-green-800 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Message sent successfully!</p>
              <p className="text-sm text-green-700 mt-0.5">
                Thank you for reaching out to <span className="font-medium">Eco Laptop Store</span>. Our support team will get back to you within 24 hours.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary">
              <Phone className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Phone</h4>
                <p className="text-sm text-muted-foreground">+91 77426-76574</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Email</h4>
                <p className="text-sm text-muted-foreground">support@ecolaptopstore.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Address</h4>
                <p className="text-sm text-muted-foreground">71 street ,Ahmedabad, Gujarat, 380001</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="border rounded-md px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="border rounded-md px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              className="w-full border rounded-md px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full border rounded-md px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;