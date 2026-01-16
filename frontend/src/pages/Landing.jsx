import { Link } from 'react-router-dom';
import { FiCheckCircle, FiCalendar, FiBell, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-page">
            {/* Navigation Bar */}
            <nav className="landing-nav">
                <div className="container">
                    <div className="nav-content">
                        <div className="logo-container">
                            <img src="/fvion-logo.png" alt="Fvion" className="logo-image" />
                        </div>
                        <div className="nav-links">
                            <Link to="/login" className="btn btn-secondary">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            Your Smart Task Management Solution
                        </div>
                        <h1 className="hero-title">
                            Organize Your Life,
                            <br />
                            <span className="highlight">Achieve Your Goals</span>
                        </h1>
                        <p className="hero-subtitle">
                            A beautiful, intuitive task management app designed to help you stay productive and focused. Built with modern design principles inspired by Figma.
                        </p>
                        <div className="hero-cta">
                            <Link to="/register" className="btn btn-primary btn-large">
                                Get Started Free
                                <FiArrowRight style={{ marginLeft: '8px' }} />
                            </Link>
                            <Link to="/login" className="btn btn-secondary btn-large">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Everything you need to stay organized</h2>
                    <p className="section-subtitle">Powerful features to help you manage your tasks efficiently</p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #7B61FF, #9D86FF)' }}>
                                <FiCheckCircle size={24} />
                            </div>
                            <h3>Task Management</h3>
                            <p>Create, edit, and organize your tasks with ease. Mark tasks as complete and track your progress.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #0FA3FF, #30CFD0)' }}>
                                <FiCalendar size={24} />
                            </div>
                            <h3>Deadline Tracking</h3>
                            <p>Set deadlines for your tasks and never miss an important date. Get visual indicators for due dates.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #1BC47D, #10B981)' }}>
                                <FiBell size={24} />
                            </div>
                            <h3>Smart Notifications</h3>
                            <p>Stay on top of your tasks with intelligent reminders and status updates.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #F24822, #FF7262)' }}>
                                <FiTrendingUp size={24} />
                            </div>
                            <h3>Progress Insights</h3>
                            <p>Track your productivity with detailed statistics and completion rates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to boost your productivity?</h2>
                        <p>Join thousands of users who organize their tasks efficiently</p>
                        <Link to="/register" className="btn btn-primary btn-large">
                            Start Organizing Today
                            <FiArrowRight style={{ marginLeft: '8px' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <img src="/fvion-logo.png" alt="Fvion" className="footer-logo-image" />
                        </div>
                        <p>&copy; 2026 Fvion. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
