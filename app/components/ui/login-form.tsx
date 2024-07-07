import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Enter your email below to create your account
            </p>
            <Input
              type="email"
              placeholder="name@example.com"
              className="w-full"
            />
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Sign In with Email
          </Button>
          <p className="text-xs text-center text-gray-500">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
