export const metadata = {
  title: 'Contact | {{projectName}}',
  description: 'Get in touch with {{projectName}}',
};

export default function Contact() {
  return (
    <div className="py-20 px-6 sm:px-12 selection:bg-white selection:text-black">
      <div className="max-w-2xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Let's Connect.
          </h1>
          <p className="text-xl text-[var(--muted)]">Have a project in mind or just want to chat?</p>
          <div className="w-12 h-1 bg-[var(--foreground)] mt-6"></div>
        </div>

        {/* Contact Form */}
        <div className="animate-fade-in delay-100 p-8 border border-[var(--border)] rounded-2xl bg-[var(--background)] shadow-2xl">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-[var(--muted)]">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-transparent border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[var(--muted)]">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-[var(--muted)]">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full bg-transparent border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] transition-colors resize-none"
                placeholder="Hello..."
              ></textarea>
            </div>
            <button 
              type="button"
              className="w-full py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Direct Links */}
        <div className="flex justify-center gap-8 pt-8 text-[var(--muted)] animate-fade-in delay-200">
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">Twitter</a>
        </div>

      </div>
    </div>
  );
}