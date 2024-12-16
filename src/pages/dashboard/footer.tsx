

export default function Foot(){
    return(
        <div className="footer py-4 flex flex-col lg:flex-col">
        <div className="container-xxl flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-dark order-2 md:order-1">
            <span className="text-gray-400 font-bold mr-1">Created by</span>
            <a
              href="https://keenthemes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary font-bold mr-2 text-base"
            >
              Keenthemes
            </a>
          </div>
      
          {/* Right Section */}
          <ul className="menu flex space-x-2 text-gray-600 hover:text-primary font-bold order-1 md:order-2">
            <li>
              <a
                href="https://keenthemes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://keenthemes.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="https://keenthemes.com/products/seven-html-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2"
              >
                Purchase
              </a>
            </li>
          </ul>
        </div>
      </div>
      

    )
}