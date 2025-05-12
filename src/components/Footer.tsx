const Footer = () => {
  return (
    <footer className="border-t dark:border-gray-800 mt-8 py-4 text-center text-gray-600 dark:text-gray-300 text-sm">
      <div className="container mx-auto px-4">
        © {new Date().getFullYear()} - Mono BLOG
      </div>
    </footer>
  );
};

export default Footer;
