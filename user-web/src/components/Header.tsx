"use client";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import MobileMenu from "./MobileMenu";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import { UserNav } from "./UserNav";

const Header = () => {
    const { user } =  useAuth();
  return (
          <>
     
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        {/* logo */}
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        {/* NavButton */}
        <HeaderMenu />
        {/* NavAdmin */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />

          {
            user ? (
                <UserNav /> 
              ) : (
                <AuthModal />
              )
          }
        </div>
      </Container>
    </header>
          </>
  );
};
export default Header;
