import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-pink-700 mb-4">
              Laços Pet da Gabi
            </h3>
            <p className="text-gray-700 mb-4">
              Acessórios exclusivos e de qualidade para deixar seu pet ainda
              mais estiloso e confortável.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/lacospetdagabi?igsh=MWdhZm9kdjducmxvNQ== "
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <InstagramIcon size={24} />
              </a>

              <a
                href="https://wa.me/5547992920333"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <div size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-pink-700 mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 hover:text-pink-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categoria/lacose" className="text-gray-700 hover:text-pink-600">
                  Laços
                </Link>
              </li>
              <li>
                <Link to="/categoria/bandanas" className="text-gray-700 hover:text-pink-600">
                  Bandanas
                </Link>
              </li>
              <li>
                <Link to="/categoria/acessorios" className="text-gray-700 hover:text-pink-600">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-gray-700 hover:text-pink-600">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-pink-700 mb-4">Contato</h3>
            <p className="text-gray-700 mb-2">
              <strong>WhatsApp:</strong> (47) 99292-0333
            </p>
            <p className="text-gray-700">
              <strong>Endereço:</strong> Curitiba - PR
            </p>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-6 text-center text-gray-600">
        <p className="mt-2 flex justify-center items-center gap-1 text-sm text-gray-500">
  Desenvolvido por
  <a
    href="https://lunaris-seven.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 text-purple-500 hover:underline"
  >
    <span className="inline-flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-purple-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
      </svg>
    </span>
    Lunaris
  </a>
</p>

        </div>
      </div>
    </footer>
  );
};
