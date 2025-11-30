export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-3xl prose prose-lg">
                <h1>Terms of Service</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>Welcome to Sunland News. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
                <h2>Use of Our Service</h2>
                <p>You agree to use our service only for lawful purposes and in accordance with these Terms.</p>
                <h2>Intellectual Property</h2>
                <p>The content on Sunland News, including text, graphics, and logos, is the property of Sunland News and is protected by copyright laws.</p>
                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at hello@sunland.news.</p>
            </div>
        </div>
    );
}
