import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const UPDATED = "May 31, 2026";

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
      <div className="text-gray-400 leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#FF415B]/10 flex items-center justify-center">
          <Shield size={20} className="text-[#FF415B]" />
        </div>
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      </div>
      <p className="text-gray-600 text-sm mb-8">Last updated: {UPDATED}</p>

      <Section title="Overview">
        <p>
          FanPass ("the app", "we", "us") is a companion app for the FIFA World Cup 2026™. This
          policy explains what information the app handles and how it is used. We aim to collect as
          little personal data as possible.
        </p>
      </Section>

      <Section title="Information We Collect">
        <p>
          <strong className="text-gray-300">Preferences you choose.</strong> When you select your
          country, favourite team, and language during onboarding, these are stored locally on your
          device and on our server so we can personalise your schedule, fan zones, and content. No
          name, email, or password is required to use the app.
        </p>
        <p>
          <strong className="text-gray-300">Content you create.</strong> If you post in the fan
          forums, create fan events, or save matches, that content (and any name you optionally
          attach to it) is stored on our server so other users can see it.
        </p>
        <p>
          <strong className="text-gray-300">Device storage.</strong> A randomly generated anonymous
          ID is stored on your device to associate your saved matches and preferences with you. It
          is not linked to any real-world identity.
        </p>
      </Section>

      <Section title="Information We Do NOT Collect">
        <p>
          We do not collect your name, email address, phone number, precise GPS location, contacts,
          photos, or payment information. We do not use third-party advertising or analytics
          trackers.
        </p>
      </Section>

      <Section title="How We Use Information">
        <p>
          Information is used solely to operate the app's features: showing your team's schedule,
          fan zones for your country, and displaying community content (forums and events) you and
          other fans create. We do not sell or share your data with advertisers.
        </p>
      </Section>

      <Section title="Data Storage & Security">
        <p>
          Data is stored in a managed PostgreSQL database (Neon) and transmitted over encrypted
          HTTPS connections. Preferences are also cached locally on your device.
        </p>
      </Section>

      <Section title="Your Choices & Data Deletion">
        <p>
          You can clear your local data at any time by using "Log Out" in the app or by uninstalling
          it. To request deletion of any forum posts, events, or saved matches associated with your
          anonymous ID from our server, contact us at the email below and we will remove them.
        </p>
      </Section>

      <Section title="Children's Privacy">
        <p>
          FanPass is intended for a general audience and does not knowingly collect personal
          information from children under 13.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this policy from time to time. The "Last updated" date at the top reflects
          the latest revision.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about this policy or data deletion requests:{" "}
          <a href="mailto:support@fanpass.app" className="text-[#FF415B] hover:underline">
            support@fanpass.app
          </a>
        </p>
      </Section>

      <p className="text-xs text-gray-600 border-t border-gray-800 pt-6 mt-8">
        FanPass is an independent fan companion app and is not affiliated with, endorsed by, or
        sponsored by FIFA. "FIFA World Cup 2026" is a trademark of FIFA.
      </p>
    </div>
  );
}
