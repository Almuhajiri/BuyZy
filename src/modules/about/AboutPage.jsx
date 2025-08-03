import AboutHero from './components/AboutHero.jsx';
import CompanyStory from './components/CompanyStory.jsx';
import CoreValues from './components/CoreValues.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import TeamSection from './components/TeamSection.jsx';
import ContactCta from './components/ContactCta.jsx';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <CompanyStory />
      <CoreValues />
      <WhyChooseUs />
      <TeamSection />
      <ContactCta />
    </div>
  );
};

export default AboutPage;
