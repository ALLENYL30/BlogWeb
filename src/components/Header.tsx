import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          MEZIANTOU&apos;S BLOG
        </h1>
        <p className="text-center text-sm mb-4">
          Blog about Microsoft technologies (.NET, ASP.NET Core, Blazor, EF
          Core, WPF, TypeScript, etc.)
        </p>
        <nav className="flex justify-center space-x-6 text-sm uppercase">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link href="/talks" className="hover:underline">
            Talks
          </Link>
          <Link href="/archives" className="hover:underline">
            Archives
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
