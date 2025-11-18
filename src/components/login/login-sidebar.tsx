import React from "react";

const LoginSidebar = () => {
  return (
    <div className="lg:w-1/2 p-4 lg:flex hidden bg-background">
      <div className="bg-linear-to-br from-card-foreground to-card-foreground/80 rounded-xl p-12 flex flex-col justify-between text-white w-full">
        <div>
          <h1 className="text-4xl font-bold mb-2">Markdown Editor</h1>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold leading-tight">
            Write, Preview & Export
            <br />
            Your Markdown Content
          </h2>
          <p className="text-lg text-white/80">
            Welcome back! Log in to continue working on your documents and
            access all your saved content.
          </p>

          {/* Feature Steps */}
          <div className="grid gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-bold mb-2">1</div>
              <div className="font-semibold mb-1">Sign in to your account</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-bold mb-2">2</div>
              <div className="font-semibold mb-1">
                Access your workspace and documents
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl font-bold mb-2">3</div>
              <div className="font-semibold mb-1">
                Continue creating amazing content
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar;
