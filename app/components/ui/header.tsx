import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

type HeaderProps = {
  logo: string;
};

const Header = ({ logo }: HeaderProps) => {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl">
              {logo}
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm" asChild>
                    <Link to="/payment">Payment</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm" asChild>
                    <Link to="/editor">Editor</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm" asChild>
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink active={false}>Help</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and Auth */}
          <div className="flex items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 rounded-md text-sm"
              />
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
            <Link to="https://github.com/laiso/hono-spa-react/issues">
              <Button variant="ghost" size="sm" className="ml-2">
                Feedback
                <ExternalLink className="pl-1 text-gray-400" size={16} />
              </Button>
            </Link>
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm" className="ml-2">
                  Log In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
