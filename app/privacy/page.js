export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-3xl prose prose-lg">
                <h1>Privacy Policy</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>At Sunland News, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                <h2>Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you subscribe to our newsletter, purchase a calendar subscription, or contact us.</p>
                <h2>How We Use Your Information</h2>
                <p>We use your information to send you our newsletter, provide the services you requested, and improve our content.</p>
                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at hello@sunland.news.</p>
            </div>
        </div>
    );
}
