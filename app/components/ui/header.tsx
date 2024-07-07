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
            <span className="font-bold text-xl">{logo}</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm">
                    Documentation
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm">
                    Guides
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm">
                    Help
                  </NavigationMenuLink>
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
            <a href="https://github.com/laiso/hono-spa-react/issues">
              <Button variant="ghost" size="sm" className="ml-2">
                Feedback
                <ExternalLink className="pl-1 text-gray-400" size={16} />
              </Button>
            </a>
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
