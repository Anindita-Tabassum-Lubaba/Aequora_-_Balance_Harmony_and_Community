// frontend/src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { 
    Users, 
    Wrench, 
    Shield, 
    TrendingUp, 
    Zap, 
    Calendar, 
    Lock,
    MapPin,
    Building2 
} from 'lucide-react'; 

// Custom styles for the cards to match the reference exactly
const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease-in-out',
    height: '100%',
    backgroundColor: '#ffffff'
};

const iconWrapperStyle = {
    marginBottom: '1rem',
    color: '#111827' // Dark gray/black color for icons
};

const RoleCard = ({ icon: Icon, title, description }) => (
    <Card style={cardStyle} className="h-100 border-0">
        <Card.Body className="p-4 text-start d-flex flex-column">
            <div style={iconWrapperStyle}>
                <Icon size={36} strokeWidth={1.5} />
            </div>
            <Card.Title style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#111827' }}>
                {title}
            </Card.Title>
            <Card.Text style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.5' }}>
                {description}
            </Card.Text>
        </Card.Body>
    </Card>
);

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="d-flex align-items-start mb-4">
        <div className="me-3 mt-1 p-2 rounded" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
             <Icon size={20} strokeWidth={2} />
        </div>
        <div className="text-start">
            <h6 className="fw-bold mb-1" style={{ fontSize: '0.95rem', color: '#111827' }}>{title}</h6>
            <p className="small mb-0" style={{ color: '#6b7280', lineHeight: '1.4' }}>{description}</p>
        </div>
    </div>
);

function HomePage() {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navbar - Minimalist */}
      <Navbar bg="white" expand="lg" className="py-3 border-bottom">
        <Container>
            {/* Logo Area */}
            <Navbar.Brand href="/" className="d-flex align-items-center fw-bold text-dark" style={{ fontSize: '1.25rem' }}>
                <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                    <Building2 size={18} />
                </div>
                Aequora
            </Navbar.Brand>
            
            {/* Buttons */}
            <Nav className="ms-auto d-flex flex-row gap-2">
                <Link to="/login">
                    <Button variant="dark" className="rounded-pill px-4 fw-bold" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                    <Button variant="outline-dark" className="rounded-pill px-4 fw-bold" size="sm">Get Started</Button>
                </Link>
            </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="text-center py-5 mt-4">
        <div className="d-flex justify-content-center mb-4">
            <div className="bg-dark text-white p-3 rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '64px', height: '64px' }}>
                <Building2 size={32} strokeWidth={1.5} />
            </div>
        </div>

        <h1 className="fw-bolder text-dark mb-3" style={{ fontSize: '2.5rem' }}>Welcome to Aequora</h1>
        <p className="text-uppercase text-muted fw-bold small letter-spacing-2 mb-3">
            Your Smart Community Management Platform
        </p>
        <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            Connecting residents, service providers, and authorities for a better community experience.
        </p>

        <div className="d-flex justify-content-center gap-3 mb-5">
            <Link to="/login">
                <Button variant="dark" size="lg" className="px-4 py-2 fw-bold rounded-3" style={{ fontSize: '0.9rem' }}>Sign In</Button>
            </Link>
            <Link to="/register">
                <Button variant="light" size="lg" className="px-4 py-2 fw-bold border rounded-3 bg-white" style={{ fontSize: '0.9rem' }}>Get Started</Button>
            </Link>
        </div>
      </Container>

      {/* Role Cards Section - The core of your request */}
      <Container className="mb-5">
        <Row className="g-4">
            <Col md={6} lg={3}>
                <RoleCard 
                    icon={Users}
                    title="Resident Portal"
                    description="Report issues, book services, and stay connected with your community"
                />
            </Col>
            <Col md={6} lg={3}>
                <RoleCard 
                    icon={Wrench}
                    title="Service Providers"
                    description="Manage bookings, showcase services, and grow your business"
                />
            </Col>
            <Col md={6} lg={3}>
                <RoleCard 
                    icon={Shield}
                    title="Authorities"
                    description="Monitor issues, manage events, and respond to emergencies"
                />
            </Col>
            <Col md={6} lg={3}>
                <RoleCard 
                    icon={TrendingUp}
                    title="Analytics"
                    description="Track performance, analyze trends, and make data driven decisions"
                />
            </Col>
        </Row>
      </Container>

      {/* Platform Features Section */}
      <Container className="mb-5 pt-4">
        <div className="text-center mb-5">
            <h3 className="fw-bold" style={{ color: '#111827' }}>Platform Features</h3>
        </div>
        <Row className="g-4 px-lg-5">
            <Col md={4}>
                <FeatureItem icon={MapPin} title="Issue Tracking" description="Report and track community issues with location tagging." />
                <FeatureItem icon={Zap} title="Emergency SOS" description="Quick emergency alerts with location sharing." />
            </Col>
            <Col md={4}>
                <FeatureItem icon={Wrench} title="Service Booking" description="Book trusted local service providers with transparent pricing." />
                <FeatureItem icon={Users} title="Community Voting" description="Vote on important issues and help prioritize improvements." />
            </Col>
            <Col md={4}>
                <FeatureItem icon={Calendar} title="Community Events" description="Stay informed about events, meetings, and announcements." />
                <FeatureItem icon={Lock} title="Secure Platform" description="Role-based access control and secure authentication." />
            </Col>
        </Row>
      </Container>

      {/* Footer CTA */}
      <div className="bg-white border-top py-5 mt-auto">
        <Container className="text-center">
            <div style={{ backgroundColor: '#f3f4f6', borderRadius: '16px', padding: '3rem' }} className="mx-auto border">
                <h3 className="fw-bold mb-2" style={{ color: '#111827' }}>Ready to Get Started?</h3>
                <p className="text-secondary mb-4 small">Join Aequora today and experience better community management</p>
                <Link to="/register">
                    <Button variant="dark" className="px-4 py-2 fw-bold rounded-3" style={{ fontSize: '0.9rem' }}>Create Your Account</Button>
                </Link>
            </div>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;