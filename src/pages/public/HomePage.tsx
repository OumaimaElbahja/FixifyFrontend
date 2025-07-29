

// Layout Components - Selon votre architecture
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

// Home Sections - Selon votre architecture
import { Hero } from '../../components/home/Hero';
import { HowItWorks } from '../../components/home/HowItWorks';
import { Services } from '../../components/home/Services';
import { Marketplace } from '../../components/home/Marketplace';
import { RepairersAndReviews } from '../../components/home/RepairersAndReviews';
import { Blogs } from '../../components/home/Blogs';

// Common Components - Selon votre architecture


import Chatbot from '../../components/chat/SimpleChatbot';


export function HomePage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-white">
      {/* Test Element for Styles */}



      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main className="relative">
          <div id="home">
            <Hero/>
          </div>
          <div id="services">
            <Services />
          </div>
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <div id="avis">
            <RepairersAndReviews />
          </div>
          <div id="marketplace">
            <Marketplace />
          </div>
          <div id="blogs">
            <Blogs />
          </div>
          <div id="contact">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}