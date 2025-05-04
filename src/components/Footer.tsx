
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dairy-gray pt-12 pb-8">
      <div className="dairy-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl text-dairy-dark mb-4">Daily Dairy</h3>
            <p className="text-gray-600 mb-4">
              Providing fresh dairy products directly to your doorstep.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-dairy-dark mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-dairy-accent">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-dairy-accent">Products</Link>
              </li>
              <li>
                <Link to="/subscription" className="text-gray-600 hover:text-dairy-accent">Subscriptions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-dairy-dark mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-dairy-accent">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-dairy-accent">FAQs</Link>
              </li>
              <li>
                <Link to="/policy" className="text-gray-600 hover:text-dairy-accent">Health Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-dairy-accent">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-dairy-dark mb-4">Contact Us</h4>
            <address className="not-italic text-gray-600">
              <p>123 Dairy Lane</p>
              <p>Milk City, MC 12345</p>
              <p className="mt-2">Email: info@dailydairy.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Daily Dairy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
