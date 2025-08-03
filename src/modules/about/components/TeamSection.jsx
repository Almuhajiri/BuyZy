import { team } from '../data/team.js';
import { FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const TeamSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Behind Buyzy is a passionate team of innovators, creators, and customer advocates
            working together to build the future of e-commerce.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {team.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.linkedin}
                      className="p-2 bg-white rounded-full text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <FiLinkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.twitter}
                      className="p-2 bg-white rounded-full text-gray-600 hover:text-blue-400 transition-colors duration-200"
                      aria-label={`${member.name} Twitter`}
                    >
                      <FiTwitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@buyzy.com`}
                      className="p-2 bg-white rounded-full text-gray-600 hover:text-green-600 transition-colors duration-200"
                      aria-label={`Email ${member.name}`}
                    >
                      <FiMail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-200">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Want to Join Our Team?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for creating
            exceptional shopping experiences. Explore our open positions and become part of the Buyzy family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              View Open Positions
            </a>
            <a
              href="/careers/culture"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Learn About Our Culture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
