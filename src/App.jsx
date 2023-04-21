import './App.css';
import '../vistas/styles/styles.css';
import img1 from '../vistas/imgs/🦆 illustration _Chicken_ (1).png';
import img2 from '../vistas/imgs/🦆 icon _shopping cart_.png';
import img3 from '../vistas/imgs/imagen-archivo-hamburguesas_98 1.jpg';
import img4 from '../vistas/imgs/Delivery Cartel.png';
import img5 from '../vistas/imgs/Take Away Cartel.png';
import img6 from '../vistas/imgs/Rectangle 187.png';
import img7 from '../vistas/imgs/Rectangle 188.png';
import img8 from '../vistas/imgs/Rectangle 189.png';
import img9 from '../vistas/imgs/Rectangle 190.png';
import img10 from '../vistas/imgs/image 2.png';
import img11 from '../vistas/imgs/Delivery Cartel.png';
import img12 from '../vistas/imgs/Take Away Cartel.png';
import LoginButton from './components/Auth0/LoginButton';
import LogoutButton from './components/Auth0/LogoutButton';
import Profile from './components/Auth0/Profile';
import AdminApiCall from './components/TestApiCalls/AdminApiCall';
import ProtectedApiCall from './components/TestApiCalls/ProtectedApiCall';
import PublicApiCall from './components/TestApiCalls/PublicApiCall';
import LoginHeader from './components/LoginHeader';

function App() {
  return (
    <div className="body_index">
      {/* Header */}
      <header className="header">
        <nav className="header_nav">
          <div className="header_search">
            <form method="get" className="header_search_container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-search header_search_vector"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="search"
                className="header_search_input"
                placeholder="Buscar..."
              />
            </form>
          </div>
          <div className="header_logo">
            <img src={img1} alt="buen sabor logo" className="header_img_logo" />
            <h1>el buen sabor</h1>
          </div>
          <div className="header_menu">
            <div className="header_dropdown">
              <a href="./menu.html" className="header_btn header_btn_dropdown">
                Productos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  fill="currentColor"
                  className="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                </svg>
              </a>
              <div className="header_dropdown_content">
                <a href="./menu.html" className="header_dropdown_content_item">
                  Categoria 1
                </a>
                <a href="./menu.html" className="header_dropdown_content_item">
                  Categoria 2
                </a>
                <a
                  href="./menu.html"
                  className="header_dropdown_content_item last_child"
                >
                  Categoria 3
                </a>
              </div>
            </div>
            <LoginHeader />
            <a href="./carrito.html" className="header_btn">
              <img src={img2} alt="cart" className="header_btn_cart" />
            </a>
            <a href="./registro.html" className="header_btn_registro">
              Registrarse
            </a>
          </div>
        </nav>
      </header>
      {/* Main */}
      <main>
        <div className="carrousel">
          <img src={img3} alt="burgas" className="carrousel_img" />
          <img
            src={img4}
            alt="delivery cartel"
            className="carrousel_addon_delivery"
          />
          <img
            src={img5}
            alt="takeway cartel"
            className="carrousel_addon_takeaway"
          />
        </div>
        <div className="main_categorias">
          <div className="main_categoria_container">
            <div className="main_categoria_btn">
              <img src={img6} alt="img_categoria" className="" />
              <h2 className="main_categoria_titulo">Categoria</h2>
            </div>
            <div className="main_categoria_btn">
              <img src={img7} alt="img_categoria" className="" />
              <h2 className="main_categoria_titulo">Categoria</h2>
            </div>
          </div>
          <div className="main_categoria_container">
            <div className="main_categoria_btn">
              <img src={img8} alt="img_categoria" className="" />
              <h2 className="main_categoria_titulo">Categoria</h2>
            </div>
            <div className="main_categoria_btn">
              <img src={img9} alt="img_categoria" className="" />
              <h2 className="main_categoria_titulo">Categoria</h2>
            </div>
          </div>
        </div>
      </main>
      <article />
      {/* Footer */}
      <footer className="footer">
        <div className="footer_nav">
          <div className="footer_nav_tree">
            <h2 className="footer_titulo">Navegá por nuestro sitio</h2>
            <a href="">Menu</a>
            <a href="">Iniciar sesión</a>
            <a href="">Registrarse</a>
            <a href="">Menu</a>
            <a href="">Acerca de</a>
            <a href="">Nosotros</a>
          </div>
          <div className="footer_nav_content">
            <h2 className="footer_titulo">Medios de Pago</h2>
            <img src={img10} alt="Medios de pago" />
          </div>
          <div className="footer_nav_content_otros">
            <img src={img12} alt="delivery cartel" />
            <img src={img11} alt="takeway cartel" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
