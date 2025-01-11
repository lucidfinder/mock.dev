import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="relative bg-gray-900">
      {/* Background Image */}
      <img
        src="/hh.jpeg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative flex items-center justify-start min-h-screen px-8">
        {/* Content Container */}
        <div className="w-full rounded-lg bg-white bg-opacity-90 shadow-xl backdrop-blur-md lg:max-w-4xl lg:flex lg:items-center lg:justify-between lg:space-x-12">
          {/* Left Section */}
          <div className="p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Welcome to <span className="text-blue-600">mock.dev</span>
            </h1>

            <p className="mt-4 text-gray-700">
              Practice and perfect your interview skills with our mock interview platform. Ready to land your dream job?
            </p>

            <a
              href="#"
              className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700"
            >
              Learn More
            </a>
          </div>

          {/* Right Section */}
          <div className="p-8 lg:p-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Sign In
              </h2>

              <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
