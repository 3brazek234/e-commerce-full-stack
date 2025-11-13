import { categoriesData, quickLinksData } from "@/constants/data";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, Subtitle } from "./Text";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-700 text-gray-900 py-4">
      <Container>
        <FooterTop />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <Logo />
            <Subtitle>
              Discover curated furniture collections at Shopcart, blending style
              and comfort to elevate your living spaces
            </Subtitle>
            <SocialMedia />
          </div>
          <div>
            <Subtitle>Quick Links</Subtitle>
            <ul className="mt-2 space-y-1">
              {quickLinksData.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Subtitle>Categories</Subtitle>
            <ul className="mt-2 space-y-1">
              {categoriesData.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <Subtitle>Newsletter</Subtitle>
              <SubText>
                Subscribe to our newsletter for the latest updates{" "}
              </SubText>
              <form className="mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                  type="submit"
                  className="mt-2 w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="py-6 border-t text-center text-sm text-gray-600">
            <div>
              © {new Date().getFullYear()} <Logo className="text-sm" />. All
              rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
