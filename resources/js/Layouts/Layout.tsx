import { Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import { Customer } from "../../Interfaces/Customer";
// @ts-ignore
import logo from "@/assets/logo.png";

type PageProps = {
  customer: Customer;
};

export default function Layout({ children }: { children: React.ReactElement }) {
  const props = usePage<PageProps>().props;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-transparent dark:bg-neutral-900/60 fixed top-0 left-0 w-full z-50">
        <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hover:scale-110 transition-transform duration-300"
            >
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 md:w-14 md:h-14"
              />
            </Link>
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white hover:scale-110 transition-transform duration-300"
            >
              AESTHECTIC
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!props.customer ? (
              <>
                <Link
                  className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
                  href="/customer/login"
                >
                  Iniciar sesión
                </Link>
                <Link
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-800 text-gray-800 hover:border-blue-500 hover:text-blue-500 hover:scale-105 transition-transform duration-300 dark:border-white dark:text-white"
                  href="/customer/register"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  className={`py-2 px-3 flex items-center w-32 text-sm font-medium rounded-lg border ${
                    menuOpen
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-gray-800 text-gray-800 dark:border-white dark:text-white"
                  } hover:border-blue-500 hover:text-blue-500 transition-transform duration-300`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {props.customer.first_name}
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg">
                    <Link
                      href="/bookingList"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                      Reservas
                    </Link>
                    <Link
                      href="/customer/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                      Configuración
                    </Link>
                    <Link
                      href="/customer/logout"
                      className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                      Cerrar sesión
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 px-4">{children}</main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-3 text-sm mt-auto">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {/* Links */}
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/blog">Blog</Link>
              <Link href="/tools/about">Quiénes somos</Link>
              <Link href="/tools/pqrs">PQRS</Link>
              <Link href="/tools/terms">Condiciones del servicio</Link>
              <Link href="/tools/careers">Oportunidades laborales</Link>
            </div>

            <hr></hr>

            {/* Columna 2 - Redes Sociales */}
            <div className="flex justify-end space-x-4">
              {/* Botón WhatsApp */}
              <a
                data-social="whatsapp"
                aria-label="Whatsapp"
                href="https://api.whatsapp.com/send?phone=+573217706324&text=Save%20this%20to%20your%20Favorites%20-%20@Aesthectic"
                className="relative group transition-transform duration-300 transform hover:scale-110"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-whatsapp w-6 h-6 text-gray-200 hover:text-green-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </a>

              {/* Botón Facebook */}
              <a
                data-social="facebook"
                aria-label="Facebook"
                href="https://www.facebook.com/profile.php?id=61572660428636"
                className="relative group transition-transform duration-300 transform hover:scale-110"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-facebook w-6 h-6 text-gray-200 hover:text-blue-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </a>

              {/* Botón Instagram */}
              <a
                data-social="instagram"
                aria-label="Instagram"
                href="https://www.instagram.com/aesthecticagenda26/"
                className="relative group transition-transform duration-300 transform hover:scale-110"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16" 
                  fill="currentColor"
                  className="bi bi-instagram w-6 h-6 text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-orange-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
