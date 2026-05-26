export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Contact</h1>
          <p className="mt-3 text-text-secondary">Have a question or want to work together? Drop me a message.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full px-4 py-2.5 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-4 py-2.5 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                />
              </div>
              <button type="submit" className="w-full rounded-theme bg-primary px-6 py-3 text-white font-medium hover:bg-primary-hover transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-theme border border-border bg-card">
              <h2 className="text-lg font-semibold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-text-secondary">hello@alexchen.dev</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-text-secondary">San Francisco, CA</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Availability</p>
                  <p className="text-sm text-text-secondary">Open to freelance &amp; full-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
